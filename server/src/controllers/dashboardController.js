import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { Patient } from '../models/Patient.js';
import { Appointment } from '../models/Appointment.js';
import { Encounter } from '../models/Encounter.js';
import { Invoice } from '../models/Invoice.js';
import { Payment } from '../models/Payment.js';
import { AuditLog } from '../models/AuditLog.js';
import { User } from '../models/User.js';

export const getDashboardMetrics = async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    let patientCount = 0;
    let doctorsCount = 0;
    let appointmentsToday = [];
    let invoicesToday = [];
    let paymentsToday = [];
    let recentLogs = [];

    if (isMongoDBActive()) {
      const start = new Date(todayStr);
      start.setHours(0, 0, 0, 0);
      const end = new Date(todayStr);
      end.setHours(23, 59, 59, 999);

      patientCount = await Patient.countDocuments({ tenantId: req.tenantId });
      doctorsCount = await User.countDocuments({ tenantId: req.tenantId, role: 'doctor', active: true });
      appointmentsToday = await Appointment.find({
        tenantId: req.tenantId,
        appointmentDate: { $gte: start, $lte: end }
      }).lean();
      invoicesToday = await Invoice.find({
        tenantId: req.tenantId,
        date: { $gte: start, $lte: end }
      }).lean();
      paymentsToday = await Payment.find({
        tenantId: req.tenantId,
        receivedAt: { $gte: start, $lte: end }
      }).lean();
      recentLogs = await AuditLog.find({ tenantId: req.tenantId }).sort({ timestamp: -1 }).limit(8).lean();
    } else {
      patientCount = inMemoryStore.patients.filter(p => p.tenantId === req.tenantId).length;
      doctorsCount = inMemoryStore.users.filter(u => u.tenantId === req.tenantId && u.role === 'doctor' && u.active).length;
      appointmentsToday = inMemoryStore.appointments.filter(a => {
        if (a.tenantId !== req.tenantId) return false;
        const aDate = new Date(a.appointmentDate).toISOString().split('T')[0];
        return aDate === todayStr;
      });
      invoicesToday = inMemoryStore.invoices.filter(i => {
        if (i.tenantId !== req.tenantId) return false;
        const iDate = new Date(i.date).toISOString().split('T')[0];
        return iDate === todayStr;
      });
      paymentsToday = inMemoryStore.payments.filter(p => {
        if (p.tenantId !== req.tenantId) return false;
        const pDate = new Date(p.receivedAt).toISOString().split('T')[0];
        return pDate === todayStr;
      });
      recentLogs = inMemoryStore.auditLogs
        .filter(l => l.tenantId === req.tenantId)
        .slice(0, 8);
    }

    const queueWaiting = appointmentsToday.filter(a => a.status === 'checked_in').length;
    const queueInConsultation = appointmentsToday.filter(a => a.status === 'in_consultation').length;
    const queueCompleted = appointmentsToday.filter(a => a.status === 'completed').length;
    const queueBooked = appointmentsToday.filter(a => a.status === 'booked').length;

    const totalBilledToday = invoicesToday.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
    const totalCollectedToday = paymentsToday.reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalOutstandingToday = invoicesToday.reduce((sum, inv) => sum + (inv.balanceDue || 0), 0);

    // Payment methods aggregation
    const paymentMethodsSummary = {
      cash: 0,
      upi: 0,
      credit_card: 0,
      debit_card: 0,
      net_banking: 0,
      insurance_tpa: 0
    };
    paymentsToday.forEach(p => {
      if (paymentMethodsSummary[p.paymentMethod] !== undefined) {
        paymentMethodsSummary[p.paymentMethod] += p.amount;
      }
    });

    return res.json({
      success: true,
      timestamp: new Date(),
      metrics: {
        patients: {
          totalRegistered: patientCount
        },
        doctors: {
          activeOnDuty: doctorsCount
        },
        appointments: {
          totalToday: appointmentsToday.length,
          waiting: queueWaiting,
          inConsultation: queueInConsultation,
          completed: queueCompleted,
          booked: queueBooked
        },
        finance: {
          billedToday: Number(totalBilledToday.toFixed(2)),
          collectedToday: Number(totalCollectedToday.toFixed(2)),
          outstandingToday: Number(totalOutstandingToday.toFixed(2)),
          methods: paymentMethodsSummary
        },
        recentAuditLogs: recentLogs
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
