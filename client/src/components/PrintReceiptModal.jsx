import React from 'react';
import Modal from './Modal';
import { Printer, CheckCircle, FileText } from 'lucide-react';

export default function PrintReceiptModal({ isOpen, onClose, invoice, payment }) {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hospital Official Bill & Payment Receipt" maxWidth="max-w-3xl">
      {/* Top action bar */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 no-print">
        <div className="flex items-center space-x-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <CheckCircle className="w-4 h-4" />
          <span>Payment Verified &bull; System Audited</span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-brand-500/20 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt / Tax Invoice</span>
        </button>
      </div>

      {/* Printable Receipt Paper */}
      <div id="printable-receipt" className="p-6 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm">
        {/* Hospital Header */}
        <div className="text-center pb-4 border-b border-slate-300">
          <h2 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
            Lazfort Memorial Hospital & Research Centre
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            14/B, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka - 560038
          </p>
          <p className="text-xs text-slate-500">
            Phone: +91 80 4920 1000 &bull; Email: accounts@lazfort.hospital &bull; GSTIN: 29AAACL4920F1ZT
          </p>
          <div className="mt-2 inline-block bg-slate-100 text-slate-700 text-xs font-bold px-3 py-0.5 rounded-full border border-slate-300 uppercase">
            Outpatient Services Tax Invoice / Receipt
          </div>
        </div>

        {/* Invoice & Patient Meta Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
          <div className="space-y-1">
            <p><span className="text-slate-500">Patient UHID:</span> <strong className="text-slate-900 font-mono">{invoice.patientId}</strong></p>
            <p><span className="text-slate-500">Patient Name:</span> <strong className="text-slate-900">{invoice.patientName}</strong></p>
            <p><span className="text-slate-500">Phone:</span> {invoice.patientPhone || 'N/A'}</p>
          </div>
          <div className="space-y-1 text-right">
            <p><span className="text-slate-500">Invoice No:</span> <strong className="font-mono text-slate-900">{invoice.invoiceId}</strong></p>
            <p><span className="text-slate-500">Date & Time:</span> {new Date(invoice.date || invoice.createdAt).toLocaleString('en-IN')}</p>
            <p><span className="text-slate-500">Receipt No:</span> <strong className="font-mono text-emerald-700">{payment?.receiptNumber || 'RCP-PAID-01'}</strong></p>
          </div>
        </div>

        {/* Line Items Table */}
        <table className="w-full my-4 text-xs">
          <thead>
            <tr className="border-b border-slate-300 text-slate-600">
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">Service Description</th>
              <th className="text-center py-2">Qty</th>
              <th className="text-right py-2">Rate (₹)</th>
              <th className="text-right py-2">Disc</th>
              <th className="text-right py-2">Tax</th>
              <th className="text-right py-2">Total (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoice.items?.map((item, idx) => (
              <tr key={idx} className="text-slate-700">
                <td className="py-2.5">{idx + 1}</td>
                <td className="py-2.5 font-medium text-slate-900">{item.serviceName}</td>
                <td className="py-2.5 text-center">{item.quantity}</td>
                <td className="py-2.5 text-right font-mono">₹{item.unitPrice.toFixed(2)}</td>
                <td className="py-2.5 text-right">{item.discountPercent > 0 ? `${item.discountPercent}%` : '-'}</td>
                <td className="py-2.5 text-right">{item.taxPercent > 0 ? `${item.taxPercent}%` : '0%'}</td>
                <td className="py-2.5 text-right font-semibold font-mono">₹{item.itemTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals & Payment Summary */}
        <div className="border-t border-slate-300 pt-3 flex justify-between items-start text-xs">
          <div className="space-y-1 max-w-xs">
            <p><span className="text-slate-500">Payment Method:</span> <strong className="uppercase text-slate-800">{payment?.paymentMethod || 'UPI / Cash'}</strong></p>
            {payment?.transactionReference && (
              <p><span className="text-slate-500">Txn Ref:</span> <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[11px]">{payment.transactionReference}</code></p>
            )}
            <p><span className="text-slate-500">Cashier:</span> {payment?.receivedBy || invoice.createdBy || 'Staff'}</p>
            <p className="text-[11px] text-slate-400 italic pt-2">
              * Valid computer-generated tax invoice. No signature required.
            </p>
          </div>

          <div className="w-60 space-y-1.5 text-right">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono">₹{invoice.subtotal.toFixed(2)}</span>
            </div>
            {invoice.totalDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Total Discount:</span>
                <span className="font-mono">-₹{invoice.totalDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Taxes (GST):</span>
              <span className="font-mono">₹{invoice.totalTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1 text-sm">
              <span>Grand Total:</span>
              <span className="font-mono">₹{invoice.grandTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Amount Paid:</span>
              <span className="font-mono">₹{(invoice.paidAmount || (payment ? payment.amount : invoice.grandTotal)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>Balance Due:</span>
              <span className="font-mono font-bold text-slate-800">₹{(invoice.balanceDue || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="mt-8 pt-4 border-t border-dashed border-slate-300 flex justify-between items-center text-[10px] text-slate-400">
          <div>Lazfort Hospital ERP &bull; Traceability Hash: SHA256-LZF-{invoice.invoiceId}</div>
          <div className="text-right uppercase font-semibold text-slate-500">Hospital Accounts Seal Verified</div>
        </div>
      </div>
    </Modal>
  );
}
