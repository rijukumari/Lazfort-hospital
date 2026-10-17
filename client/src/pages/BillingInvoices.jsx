import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import PrintReceiptModal from '../components/PrintReceiptModal';
import {
  Receipt,
  PlusCircle,
  CreditCard,
  Printer,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  Clock,
  Search,
  Trash2,
  Plus
} from 'lucide-react';

export default function BillingInvoices() {
  const { user, tenant } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Service Catalog & Patients for invoice creation
  const [services, setServices] = useState([]);
  const [patients, setPatients] = useState([]);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);

  // Active items for modals
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // New Invoice Form
  const [invoicePatientId, setInvoicePatientId] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([
    { serviceCode: '', quantity: 1, discountPercent: 0 }
  ]);
  const [invoiceNotes, setInvoiceNotes] = useState('');
  const [submittingInvoice, setSubmittingInvoice] = useState(false);
  const [invoiceError, setInvoiceError] = useState('');

  // Payment Form
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('upi');
  const [payRef, setPayRef] = useState('');
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [payError, setPayError] = useState('');

  // Refund Form
  const [refundReason, setRefundReason] = useState('');
  const [submittingRefund, setSubmittingRefund] = useState(false);
  const [refundError, setRefundError] = useState('');

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const url = `/billing/invoices${statusFilter ? `?status=${statusFilter}` : ''}`;
      const res = await api.get(url);
      if (res.success) {
        setInvoices(res.invoices);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalogsAndPatients = async () => {
    try {
      const [catRes, patRes] = await Promise.all([
        api.get('/catalog/services'),
        api.get('/patients')
      ]);
      if (catRes.success) setServices(catRes.services);
      if (patRes.success) setPatients(patRes.patients);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchCatalogsAndPatients();
  }, [statusFilter]);

  const handleOpenPayment = (inv) => {
    setSelectedInvoice(inv);
    setPayAmount(inv.balanceDue.toString());
    setPayMethod('upi');
    setPayRef('');
    setPayError('');
    setIsPayOpen(true);
  };

  const handleOpenPrint = async (inv) => {
    try {
      const res = await api.get(`/billing/invoices/${inv.invoiceId}`);
      if (res.success) {
        setSelectedInvoice(res.invoice);
        setSelectedPayment(res.payments?.[0] || null);
        setIsPrintOpen(true);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOpenRefund = (inv) => {
    setSelectedInvoice(inv);
    setRefundReason('');
    setRefundError('');
    setIsRefundOpen(true);
  };

  const handleAddLineItem = () => {
    setInvoiceItems([...invoiceItems, { serviceCode: '', quantity: 1, discountPercent: 0 }]);
  };

  const handleRemoveLineItem = (idx) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== idx));
  };

  const handleLineItemChange = (idx, field, value) => {
    const updated = [...invoiceItems];
    updated[idx][field] = value;
    setInvoiceItems(updated);
  };

  const handleCreateInvoiceSubmit = async (e) => {
    e.preventDefault();
    setInvoiceError('');
    setSubmittingInvoice(true);

    try {
      const validItems = invoiceItems.filter(item => item.serviceCode);
      if (validItems.length === 0) {
        throw new Error('Please select at least one billable hospital service.');
      }

      const res = await api.post('/billing/invoices', {
        patientId: invoicePatientId,
        items: validItems,
        notes: invoiceNotes
      });

      if (res.success) {
        setIsCreateOpen(false);
        fetchInvoices();
        setInvoiceItems([{ serviceCode: '', quantity: 1, discountPercent: 0 }]);
        setInvoiceNotes('');
      } else {
        setInvoiceError(res.message);
      }
    } catch (err) {
      setInvoiceError(err.message);
    } finally {
      setSubmittingInvoice(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPayError('');
    setSubmittingPayment(true);

    try {
      const res = await api.post(`/billing/invoices/${selectedInvoice.invoiceId}/pay`, {
        amount: Number(payAmount),
        paymentMethod: payMethod,
        transactionReference: payRef
      });

      if (res.success) {
        setIsPayOpen(false);
        fetchInvoices();
        // Immediately offer print receipt
        setSelectedPayment(res.payment);
        setSelectedInvoice({
          ...selectedInvoice,
          paidAmount: res.invoiceStatus.paidAmount,
          balanceDue: res.invoiceStatus.balanceDue,
          status: res.invoiceStatus.status
        });
        setIsPrintOpen(true);
      } else {
        setPayError(res.message);
      }
    } catch (err) {
      setPayError(err.message);
    } finally {
      setSubmittingPayment(false);
    }
  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    setRefundError('');
    setSubmittingRefund(true);

    try {
      const res = await api.post(`/billing/invoices/${selectedInvoice.invoiceId}/refund`, {
        reason: refundReason
      });

      if (res.success) {
        setIsRefundOpen(false);
        fetchInvoices();
      } else {
        setRefundError(res.message);
      }
    } catch (err) {
      setRefundError(err.message);
    } finally {
      setSubmittingRefund(false);
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      inv.invoiceId.toLowerCase().includes(q) ||
      inv.patientName.toLowerCase().includes(q) ||
      inv.patientId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt className="w-5 h-5 text-amber-600" />
            <span>Cashier Desk, Tariffs & Billing Invoices</span>
          </h2>
          <p className="text-xs text-slate-500">
            Server-side tariff calculations, idempotent payment recording, and official receipts
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-700"
          >
            <option value="">All Invoice Statuses</option>
            <option value="unpaid">Unpaid</option>
            <option value="partial">Partially Paid</option>
            <option value="paid">Fully Settled (Paid)</option>
            <option value="refunded">Refunded / Void</option>
          </select>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-brand-500/20 transition flex items-center space-x-1.5 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Generate Invoice</span>
          </button>
        </div>
      </div>

      {/* Invoice Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search by Invoice ID, UHID, Patient Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
        />
      </div>

      {/* Invoices List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Invoice No</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Patient & UHID</th>
                <th className="py-3 px-4 text-right">Grand Total (₹)</th>
                <th className="py-3 px-4 text-right">Amount Paid</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400">Loading billing records...</td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400">No invoices found matching criteria.</td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.invoiceId} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {inv.invoiceId}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {new Date(inv.date || inv.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block">{inv.patientName}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{inv.patientId}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      ₹{inv.grandTotal.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-700 font-semibold">
                      ₹{inv.paidAmount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-800">
                      ₹{inv.balanceDue.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        inv.status === 'partial' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        inv.status === 'refunded' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                        'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {inv.balanceDue > 0 && inv.status !== 'refunded' && (
                        <button
                          onClick={() => handleOpenPayment(inv)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] px-2.5 py-1 rounded-lg transition"
                        >
                          Collect
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenPrint(inv)}
                        className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[11px] px-2.5 py-1 rounded-lg transition inline-flex items-center gap-1"
                        title="Print official receipt"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </button>

                      {inv.status !== 'refunded' && (user?.role === 'hospital_admin' || user?.role === 'billing_executive') && (
                        <button
                          onClick={() => handleOpenRefund(inv)}
                          className="text-rose-600 hover:text-rose-800 text-[11px] px-2 py-1 rounded hover:bg-rose-50 transition"
                          title="Authorized Refund / Void (PRD FR-011)"
                        >
                          Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Itemized Invoice Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Outpatient Billing Invoice"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4 text-xs">
          {invoiceError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{invoiceError}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
            <select
              required
              value={invoicePatientId}
              onChange={e => setInvoicePatientId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">-- Choose Patient (UHID) --</option>
              {patients.map(p => (
                <option key={p.uhid} value={p.uhid}>
                  {p.uhid} - {p.firstName} {p.lastName} ({p.phone})
                </option>
              ))}
            </select>
          </div>

          {/* Service Line Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-700">Billable Services & Hospital Tariffs:</span>
              <button
                type="button"
                onClick={handleAddLineItem}
                className="text-brand-600 hover:text-brand-800 font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="space-y-2">
              {invoiceItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <select
                    required
                    value={item.serviceCode}
                    onChange={e => handleLineItemChange(idx, 'serviceCode', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-medium"
                  >
                    <option value="">-- Select Tariff Service --</option>
                    {services.map(s => (
                      <option key={s.serviceCode} value={s.serviceCode}>
                        {s.name} (₹{s.standardPrice} + {s.taxPercent}% GST)
                      </option>
                    ))}
                  </select>

                  <div className="w-20">
                    <input
                      type="number"
                      min="1"
                      required
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={e => handleLineItemChange(idx, 'quantity', Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-center"
                    />
                  </div>

                  <div className="w-24">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Disc %"
                      value={item.discountPercent}
                      onChange={e => handleLineItemChange(idx, 'discountPercent', Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-center"
                    />
                  </div>

                  {invoiceItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLineItem(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 italic">
              * Line item taxes, discounts, and grand totals are verified and calculated server-side per PRD BR-05.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Invoice Remarks / Clinical Reference</label>
            <input
              type="text"
              value={invoiceNotes}
              onChange={e => setInvoiceNotes(e.target.value)}
              placeholder="e.g. OPD Consultation + Blood panel"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submittingInvoice}
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md shadow-brand-500/20 disabled:opacity-50"
            >
              {submittingInvoice ? 'Calculating...' : 'Generate Invoice'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Collect Payment Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={isPayOpen}
          onClose={() => setIsPayOpen(false)}
          title={`Collect Payment - Invoice ${selectedInvoice.invoiceId}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
            {payError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{payError}</span>
              </div>
            )}

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{selectedInvoice.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Grand Total:</span>
                <span className="font-mono font-bold text-slate-900">₹{selectedInvoice.grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Already Paid:</span>
                <span className="font-mono text-emerald-700 font-semibold">₹{selectedInvoice.paidAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 text-sm font-bold">
                <span className="text-amber-900">Balance Due:</span>
                <span className="font-mono text-amber-900">₹{selectedInvoice.balanceDue.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Amount to Collect (₹) *</label>
              <input
                type="number"
                step="0.01"
                required
                max={selectedInvoice.balanceDue}
                value={payAmount}
                onChange={e => setPayAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono font-bold text-base"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Method *</label>
              <select
                required
                value={payMethod}
                onChange={e => setPayMethod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
              >
                <option value="upi">UPI / Instant QR Code</option>
                <option value="cash">Cash Settlement</option>
                <option value="credit_card">Credit Card (POS)</option>
                <option value="debit_card">Debit Card (POS)</option>
                <option value="net_banking">Net Banking / NEFT</option>
                <option value="insurance_tpa">Insurance / TPA Pre-auth</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Transaction Ref / UPI UTR</label>
              <input
                type="text"
                placeholder="e.g. UPI/329104881920 or Card Auth Code"
                value={payRef}
                onChange={e => setPayRef(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsPayOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingPayment}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md shadow-emerald-500/20 disabled:opacity-50"
              >
                {submittingPayment ? 'Recording...' : 'Accept & Issue Receipt'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Authorized Refund Modal (PRD FR-011) */}
      {selectedInvoice && (
        <Modal
          isOpen={isRefundOpen}
          onClose={() => setIsRefundOpen(false)}
          title={`Process Void / Refund - ${selectedInvoice.invoiceId}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleRefundSubmit} className="space-y-4 text-xs">
            {refundError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{refundError}</span>
              </div>
            )}

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
              <p className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Hospital Audit Warning
              </p>
              <p className="text-[11px] mt-0.5">
                Per hospital governance (BR-04, FR-011), voiding an invoice generates an immutable entry in the system audit trail with your digital signature.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Formal Refund Reason (Mandatory) *
              </label>
              <textarea
                required
                rows={3}
                value={refundReason}
                onChange={e => setRefundReason(e.target.value)}
                placeholder="State clinical or billing justification (e.g. Test cancelled by physician; patient discharged before procedure)"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsRefundOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingRefund}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md shadow-rose-500/20 disabled:opacity-50"
              >
                {submittingRefund ? 'Processing...' : 'Authorize Refund'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Official Print Receipt Modal */}
      <PrintReceiptModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        invoice={selectedInvoice}
        payment={selectedPayment}
      />
    </div>
  );
}
