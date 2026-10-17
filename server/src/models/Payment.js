import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  paymentId: { type: String, required: true },
  receiptNumber: { type: String, required: true },
  invoiceId: { type: String, required: true, index: true },
  patientId: { type: String, required: true, index: true },
  patientName: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'upi', 'credit_card', 'debit_card', 'net_banking', 'insurance_tpa'],
    required: true 
  },
  transactionReference: { type: String }, // e.g. UPI UTR / Card Auth Code
  receivedBy: { type: String, required: true },
  receivedAt: { type: Date, default: Date.now },
  notes: { type: String },
  isRefund: { type: Boolean, default: false },
  refundReason: { type: String }
}, { timestamps: true });

paymentSchema.index({ tenantId: 1, paymentId: 1 }, { unique: true });
paymentSchema.index({ tenantId: 1, receiptNumber: 1 }, { unique: true });

export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
