import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  deptId: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  headOfDepartment: { type: String },
  description: { type: String },
  floorNumber: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

departmentSchema.index({ tenantId: 1, deptId: 1 }, { unique: true });

export const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);
