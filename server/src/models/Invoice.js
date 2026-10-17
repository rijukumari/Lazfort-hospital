import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  serviceCode: { type: String, required: true },
  serviceName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  discountPercent: { type: Number, default: 0, min: 0, max: 100 },
  taxPercent: { type: Number, default: 0, min: 0 },
  itemTotal: { type: Number, required: true }
}, { _id: false });

const invoiceSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  invoiceId: { type: String, required: true },
  patientId: { type: String, required: true, index: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String },
  encounterId: { type: String },
  date: { type: Date, default: Date.now, index: true },
  items: [invoiceItemSchema],
  subtotal: { type: Number, required: true, min: 0 },
  totalDiscount: { type: Number, default: 0, min: 0 },
  totalTax: { type: Number, default: 0, min: 0 },
  grandTotal: { type: Number, required: true, min: 0 },
  paidAmount: { type: Number, default: 0, min: 0 },
  balanceDue: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: ['unpaid', 'partial', 'paid', 'refunded', 'void'], 
    default: 'unpaid',
    index: true 
  },
  notes: { type: String },
  createdBy: { type: String, required: true },
  voidReason: { type: String }
}, { timestamps: true });

invoiceSchema.index({ tenantId: 1, invoiceId: 1 }, { unique: true });

export const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
