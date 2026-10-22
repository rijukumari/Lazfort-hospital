import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, index: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { 
    type: String, 
    enum: [
      'super_admin',
      'hospital_admin',
      'doctor',
      'receptionist',
      'nurse',
      'billing_executive',
      'pharmacist',
      'lab_technician',
      'patient'
    ], 
    required: true 
  },
  department: { type: String },
  specialization: { type: String },
  phone: { type: String },
  licenseNumber: { type: String },
  consultationFee: { type: Number, default: 500 },
  active: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, { timestamps: true });

userSchema.index({ tenantId: 1, email: 1 }, { unique: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
