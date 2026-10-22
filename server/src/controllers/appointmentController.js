import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { Appointment } from '../models/Appointment.js';
import { Patient } from '../models/Patient.js';
import { User } from '../models/User.js';
import { Department } from '../models/Department.js';
import { logAuditEvent } from '../middleware/audit.js';

export const getAppointments = async (req, res) => {
  try {
    const { date, doctorId, status, patientId } = req.query;
    let appointments = [];

    // Enforce patient-level isolation: patients can only query their own appointments
    let targetPatientId = patientId;
    if (req.user?.role === 'patient') {
      const userUhid = req.user.licenseNumber?.replace('UHID-', '') || (req.user.fullName?.match(/LZF-\d{4}-\d{4}/)?.[0]) || 'LZF-2026-0001';
      targetPatientId = userUhid;
    }

    if (isMongoDBActive()) {
      const filter = { tenantId: req.tenantId };
      if (date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        filter.appointmentDate = { $gte: start, $lte: end };
      }
      if (doctorId) filter.doctorId = doctorId;
      if (status) filter.status = status;
      if (targetPatientId) filter.patientId = targetPatientId;

      appointments = await Appointment.find(filter).sort({ queueNumber: 1 }).lean();
    } else {
      appointments = inMemoryStore.appointments.filter(a => a.tenantId === req.tenantId);
      if (date) {
        appointments = appointments.filter(a => {
          const aDate = new Date(a.appointmentDate).toISOString().split('T')[0];
          return aDate === date;
        });
      }
      if (doctorId) {
        appointments = appointments.filter(a => a.doctorId === doctorId);
      }
      if (status) {
        appointments = appointments.filter(a => a.status === status);
      }
      if (targetPatientId) {
        appointments = appointments.filter(a => a.patientId === targetPatientId);
      }
      appointments.sort((a, b) => a.queueNumber - b.queueNumber);
    }

    return res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getQueue = async (req, res) => {
  try {
    const { doctorId } = req.query;
    const today = new Date().toISOString().split('T')[0];
    let list = [];

    if (isMongoDBActive()) {
      const start = new Date(today);
      start.setHours(0, 0, 0, 0);
      const end = new Date(today);
      end.setHours(23, 59, 59, 999);

      const filter = {
        tenantId: req.tenantId,
        appointmentDate: { $gte: start, $lte: end }
      };
      if (doctorId) filter.doctorId = doctorId;

      list = await Appointment.find(filter).sort({ queueNumber: 1 }).lean();
    } else {
      list = inMemoryStore.appointments.filter(a => {
        if (a.tenantId !== req.tenantId) return false;
        const aDate = new Date(a.appointmentDate).toISOString().split('T')[0];
        const matchDate = aDate === today;
        const matchDoc = doctorId ? a.doctorId === doctorId : true;
        return matchDate && matchDoc;
      });
      list.sort((a, b) => a.queueNumber - b.queueNumber);
    }

    const waiting = list.filter(a => a.status === 'checked_in');
    const inConsultation = list.filter(a => a.status === 'in_consultation');
    const completed = list.filter(a => a.status === 'completed');
    const booked = list.filter(a => a.status === 'booked');
    const cancelled = list.filter(a => a.status === 'cancelled');

    return res.json({
      success: true,
      summary: {
        total: list.length,
        waiting: waiting.length,
        inConsultation: inConsultation.length,
        completed: completed.length,
        booked: booked.length,
        cancelled: cancelled.length
      },
      queue: {
        waiting,
        inConsultation,
        completed,
        booked,
        cancelled
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const bookAppointment = async (req, res) => {
  let {
    patientId,
    doctorId,
    departmentId,
    appointmentDate,
    timeSlot,
    priority = 'normal',
    reasonForVisit = ''
  } = req.body;

  // Prevent patients from scheduling appointments under another patient's UHID
  if (req.user?.role === 'patient') {
    const userUhid = req.user.licenseNumber?.replace('UHID-', '') || (req.user.fullName?.match(/LZF-\d{4}-\d{4}/)?.[0]) || 'LZF-2026-0001';
    patientId = userUhid;
  }

  if (!patientId || !doctorId || !departmentId || !appointmentDate || !timeSlot) {
    return res.status(400).json({
      success: false,
      message: 'Missing required appointment scheduling parameters.'
    });
  }

  try {
    // Validate Patient
    let patient = null;
    let doctor = null;
    let dept = null;

    if (isMongoDBActive()) {
      patient = await Patient.findOne({ tenantId: req.tenantId, uhid: patientId }).lean();
      doctor = await User.findOne({ tenantId: req.tenantId, userId: doctorId }).lean();
      dept = await Department.findOne({ tenantId: req.tenantId, deptId: departmentId }).lean();
    } else {
      patient = inMemoryStore.patients.find(p => p.tenantId === req.tenantId && p.uhid === patientId);
      doctor = inMemoryStore.users.find(u => u.tenantId === req.tenantId && u.userId === doctorId);
      dept = inMemoryStore.departments.find(d => d.tenantId === req.tenantId && d.deptId === departmentId);
    }

    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    // Conflict check (PRD FR-005: prevent conflicting provider slots)
    const targetDateStr = new Date(appointmentDate).toISOString().split('T')[0];
    let conflict = false;

    if (isMongoDBActive()) {
      const start = new Date(targetDateStr);
      start.setHours(0, 0, 0, 0);
      const end = new Date(targetDateStr);
      end.setHours(23, 59, 59, 999);

      const existingSlot = await Appointment.findOne({
        tenantId: req.tenantId,
        doctorId,
        appointmentDate: { $gte: start, $lte: end },
        timeSlot,
        status: { $ne: 'cancelled' }
      });
      if (existingSlot) conflict = true;
    } else {
      const existingSlot = inMemoryStore.appointments.find(a => {
        if (a.tenantId !== req.tenantId || a.doctorId !== doctorId || a.status === 'cancelled') return false;
        const aDate = new Date(a.appointmentDate).toISOString().split('T')[0];
        return aDate === targetDateStr && a.timeSlot === timeSlot;
      });
      if (existingSlot) conflict = true;
    }

    if (conflict) {
      return res.status(409).json({
        success: false,
        message: `Schedule conflict: Dr. ${doctor.fullName} already has an active booking at ${timeSlot} on ${targetDateStr}.`
      });
    }

    // Determine Queue Number & Token
    let todayCount = 0;
    if (isMongoDBActive()) {
      const start = new Date(targetDateStr);
      start.setHours(0, 0, 0, 0);
      const end = new Date(targetDateStr);
      end.setHours(23, 59, 59, 999);
      todayCount = await Appointment.countDocuments({
        tenantId: req.tenantId,
        doctorId,
        appointmentDate: { $gte: start, $lte: end }
      });
    } else {
      todayCount = inMemoryStore.appointments.filter(a => {
        if (a.tenantId !== req.tenantId || a.doctorId !== doctorId) return false;
        const aDate = new Date(a.appointmentDate).toISOString().split('T')[0];
        return aDate === targetDateStr;
      }).length;
    }

    const queueNumber = todayCount + 1;
    const deptPrefix = dept ? dept.code : 'OPD';
    const tokenNumber = `${deptPrefix}-${queueNumber.toString().padStart(2, '0')}`;
    const appointmentId = `APT-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`;

    const newAppointment = {
      tenantId: req.tenantId,
      appointmentId,
      patientId: patient.uhid,
      patientName: `${patient.firstName} ${patient.lastName}`,
      patientPhone: patient.phone,
      patientGender: patient.gender,
      patientAge: patient.age,
      doctorId: doctor.userId,
      doctorName: doctor.fullName,
      departmentId: dept ? dept.deptId : 'DEP-GEN',
      departmentName: dept ? dept.name : 'General Medicine',
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      queueNumber,
      tokenNumber,
      priority,
      status: 'booked',
      reasonForVisit,
      bookedBy: req.user ? `${req.user.fullName} (${req.user.role})` : 'Front Desk',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isMongoDBActive()) {
      await Appointment.create(newAppointment);
    } else {
      inMemoryStore.appointments.push(newAppointment);
    }

    // Audit Log
    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: 'APPOINTMENT_BOOKED',
      entityType: 'Appointment',
      entityId: appointmentId,
      details: `Booked appointment for ${patient.uhid} with ${doctor.fullName} at ${timeSlot}. Token: ${tokenNumber}`,
      metadata: { appointmentId, tokenNumber, queueNumber, doctorId },
      ipAddress: req.ip
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      appointment: newAppointment
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  const validTransitions = ['booked', 'checked_in', 'in_consultation', 'completed', 'cancelled'];
  if (!validTransitions.includes(status)) {
    return res.status(400).json({ success: false, message: `Invalid status: ${status}` });
  }

  try {
    const timeUpdates = {};
    const now = new Date();
    if (status === 'checked_in') timeUpdates.checkInTime = now;
    if (status === 'in_consultation') timeUpdates.consultationStartTime = now;
    if (status === 'completed') timeUpdates.consultationEndTime = now;

    let updated = null;
    if (isMongoDBActive()) {
      updated = await Appointment.findOneAndUpdate(
        { tenantId: req.tenantId, appointmentId },
        { status, ...timeUpdates, updatedAt: now },
        { new: true }
      ).lean();
    } else {
      const idx = inMemoryStore.appointments.findIndex(a => a.tenantId === req.tenantId && a.appointmentId === appointmentId);
      if (idx !== -1) {
        inMemoryStore.appointments[idx] = {
          ...inMemoryStore.appointments[idx],
          status,
          ...timeUpdates,
          updatedAt: now
        };
        updated = inMemoryStore.appointments[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: status === 'checked_in' ? 'APPOINTMENT_CHECKED_IN' : 'CONSULTATION_STARTED',
      entityType: 'Appointment',
      entityId: appointmentId,
      details: `Appointment status transitioned to '${status}' for token ${updated.tokenNumber}`,
      metadata: { status, appointmentId },
      ipAddress: req.ip
    });

    return res.json({ success: true, message: `Status updated to ${status}`, appointment: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
