import mongoose from 'mongoose';

const serviceCatalogSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  serviceCode: { type: String, required: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: [
      'consultation', 
      'laboratory', 
      'radiology', 
      'procedure', 
      'nursing', 
      'pharmacy', 
      'bed_ward',
      'emergency',
      'critical_care',
      'ambulance'
    ],
    required: true 
  },
  department: { type: String, required: true },
  branchId: { type: String, default: 'LZF-HQ' },
  standardPrice: { type: Number, required: true, min: 0 },
  taxPercent: { type: Number, default: 0, min: 0 },
  description: { type: String },
  bookingEnabled: { type: Boolean, default: true },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Maintenance'], 
    default: 'Active' 
  },
  contactPhone: { type: String },
  instructions: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

serviceCatalogSchema.index({ tenantId: 1, serviceCode: 1 }, { unique: true });

export const ServiceCatalog = mongoose.models.ServiceCatalog || mongoose.model('ServiceCatalog', serviceCatalogSchema);
