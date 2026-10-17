import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  uhid: { type: String, required: true, index: true }, // e.g. LZF-2026-0001
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dob: { type: Date },
  age: { type: Number, required: true },
  phone: { type: String, required: true, index: true },
  email: { type: String },
  bloodGroup: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
    default: 'Unknown'
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  allergies: [{ type: String }],
  chronicConditions: [{ type: String }],
  duplicateFlag: { type: Boolean, default: false },
  duplicateNotes: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'merged'], default: 'active' }
}, { timestamps: true });

patientSchema.index({ tenantId: 1, uhid: 1 }, { unique: true });
patientSchema.index({ tenantId: 1, phone: 1 });

export const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
