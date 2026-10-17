import mongoose from 'mongoose';
import { Tenant } from '../models/Tenant.js';
import { User } from '../models/User.js';
import { Department } from '../models/Department.js';
import { Patient } from '../models/Patient.js';
import { Appointment } from '../models/Appointment.js';
import { Encounter } from '../models/Encounter.js';
import { Prescription } from '../models/Prescription.js';
import { ServiceCatalog } from '../models/ServiceCatalog.js';
import { Invoice } from '../models/Invoice.js';
import { Payment } from '../models/Payment.js';
import { AuditLog } from '../models/AuditLog.js';
import {
  defaultTenant,
  initialUsers,
  initialDepartments,
  initialServiceCatalog,
  initialPatients,
  initialAppointments,
  initialEncounters,
  initialPrescriptions,
  initialInvoices,
  initialPayments,
  initialAuditLogs
} from '../data/seedData.js';

// In-Memory store instances for resilient offline / local running
export const inMemoryStore = {
  tenants: [{ ...defaultTenant }],
  users: [...initialUsers.map(u => ({ ...u }))],
  departments: [...initialDepartments.map(d => ({ ...d }))],
  serviceCatalog: [...initialServiceCatalog.map(s => ({ ...s }))],
  patients: [...initialPatients.map(p => ({ ...p }))],
  appointments: [...initialAppointments.map(a => ({ ...a }))],
  encounters: [...initialEncounters.map(e => ({ ...e }))],
  prescriptions: [...initialPrescriptions.map(p => ({ ...p }))],
  invoices: [...initialInvoices.map(i => ({ ...i }))],
  payments: [...initialPayments.map(p => ({ ...p }))],
  auditLogs: [...initialAuditLogs.map(a => ({ ...a }))]
};

export const isMongoDBActive = () => mongoose.connection.readyState === 1;

export const seedMongoDBIfEmpty = async () => {
  if (!isMongoDBActive()) return;
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[Seed] Seeding MongoDB with initial Lazfort ERP records...');
      await Tenant.create(defaultTenant);
      await User.insertMany(initialUsers);
      await Department.insertMany(initialDepartments);
      await ServiceCatalog.insertMany(initialServiceCatalog);
      await Patient.insertMany(initialPatients);
      await Appointment.insertMany(initialAppointments);
      await Encounter.insertMany(initialEncounters);
      await Prescription.insertMany(initialPrescriptions);
      await Invoice.insertMany(initialInvoices);
      await Payment.insertMany(initialPayments);
      await AuditLog.insertMany(initialAuditLogs);
      console.log('[Seed] MongoDB successfully seeded!');
    }
  } catch (err) {
    console.error('[Seed Error]', err.message);
  }
};
