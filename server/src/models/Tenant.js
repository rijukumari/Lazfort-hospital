import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  website: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, default: 'India' }
  },
  currency: { type: String, default: 'INR' },
  currencySymbol: { type: String, default: '₹' },
  timezone: { type: String, default: 'Asia/Kolkata' },
  branches: [{
    branchId: String,
    name: String,
    code: String,
    isMain: { type: Boolean, default: false }
  }],
  settings: {
    opdTokenPrefix: { type: String, default: 'OPD' },
    defaultTaxRate: { type: Number, default: 0 },
    enableSmsAlerts: { type: Boolean, default: true }
  },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const Tenant = mongoose.models.Tenant || mongoose.model('Tenant', tenantSchema);
