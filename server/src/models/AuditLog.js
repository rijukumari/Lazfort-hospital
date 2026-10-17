import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  logId: { type: String, required: true },
  actorId: { type: String, required: true },
  actorName: { type: String, required: true },
  actorRole: { type: String, required: true },
  action: { 
    type: String, 
    enum: [
      'USER_LOGIN',
      'USER_LOGOUT',
      'PATIENT_REGISTERED',
      'PATIENT_UPDATED',
      'APPOINTMENT_BOOKED',
      'APPOINTMENT_CHECKED_IN',
      'CONSULTATION_STARTED',
      'ENCOUNTER_FINALIZED',
      'ENCOUNTER_AMENDED',
      'PRESCRIPTION_CREATED',
      'INVOICE_GENERATED',
      'PAYMENT_RECORDED',
      'INVOICE_VOIDED',
      'PAYMENT_REFUNDED',
      'TARIFF_MODIFIED'
    ],
    required: true,
    index: true 
  },
  entityType: { type: String, required: true }, // 'Patient', 'Appointment', 'Encounter', 'Invoice', etc.
  entityId: { type: String, required: true },
  details: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
  ipAddress: { type: String, default: '127.0.0.1' },
  timestamp: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

auditLogSchema.index({ tenantId: 1, timestamp: -1 });

export const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
