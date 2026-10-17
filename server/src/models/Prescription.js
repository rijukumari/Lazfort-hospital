import mongoose from 'mongoose';

const prescriptionItemSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  genericName: { type: String },
  dosage: { type: String, required: true }, // e.g. "500 mg"
  route: { type: String, default: 'Oral' }, // Oral, IV, IM, Topical, Inhalation
  frequency: { type: String, required: true }, // e.g. "1-0-1 (Twice daily)"
  timing: { type: String, default: 'After food' }, // Before food, After food, Empty stomach
  durationDays: { type: Number, required: true },
  instructions: { type: String }
}, { _id: false });

const labOrderItemSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  clinicalNotes: { type: String },
  urgent: { type: Boolean, default: false }
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  prescriptionId: { type: String, required: true },
  encounterId: { type: String, required: true, index: true },
  patientId: { type: String, required: true, index: true },
  patientName: { type: String, required: true },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  medicines: [prescriptionItemSchema],
  labOrders: [labOrderItemSchema],
  generalAdvice: { type: String },
  dietaryRestrictions: { type: String },
  status: { type: String, enum: ['active', 'dispensed', 'cancelled'], default: 'active' }
}, { timestamps: true });

prescriptionSchema.index({ tenantId: 1, prescriptionId: 1 }, { unique: true });

export const Prescription = mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema);
