import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import { connectDB } from './config/db.js';
import { Tenant } from './models/Tenant.js';
import { User } from './models/User.js';
import { Department } from './models/Department.js';
import { Patient } from './models/Patient.js';
import { Appointment } from './models/Appointment.js';
import { Encounter } from './models/Encounter.js';
import { Prescription } from './models/Prescription.js';
import { ServiceCatalog } from './models/ServiceCatalog.js';
import { Invoice } from './models/Invoice.js';
import { Payment } from './models/Payment.js';
import { AuditLog } from './models/AuditLog.js';
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
} from './data/seedData.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const runSeed = async () => {
  console.log('[Seed] Connecting to MongoDB...');
  const connected = await connectDB();
  if (!connected) {
    console.error('[Seed Error] Could not connect to MongoDB. Aborting seed script.');
    process.exit(1);
  }

  try {
    console.log('[Seed] Clearing existing records for tenant TEN-LAZFORT-001...');
    await Tenant.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await User.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await Department.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await ServiceCatalog.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await Patient.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await Appointment.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await Encounter.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await Prescription.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await Invoice.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await Payment.deleteMany({ tenantId: 'TEN-LAZFORT-001' });
    await AuditLog.deleteMany({ tenantId: 'TEN-LAZFORT-001' });

    console.log('[Seed] Inserting fresh records...');
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

    console.log('[Seed Success] Database populated with Lazfort initial data!');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]', err);
    process.exit(1);
  }
};

runSeed();
