import React, { useState } from 'react';
import { Receipt, Search, Download } from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

export default function PlatformInvoices() {
  const { invoices = [], showToast } = useSaaS();
  const [invoiceSearch, setInvoiceSearch] = useState('');

  const filteredInvoices = invoices.filter(inv =>
    !invoiceSearch ||
    inv.hospital?.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
    inv.id?.toLowerCase().includes(invoiceSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">
            <Receipt className="w-4 h-4" />
            <span>Commercial Ledger</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Platform B2B Invoices</h1>
          <p className="text-xs text-slate-500 mt-1">Commercial SaaS subscription invoices issued to hospital tenants.</p>
        </div>
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice or tenant..."
            value={invoiceSearch}
            onChange={(e) => setInvoiceSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[680px]">
            <thead className="bg-slate-50/80 text-slate-600 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Hospital Tenant</th>
                <th className="p-4">Plan Tier</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Billing Period</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Tax Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-slate-400">
                    <Receipt className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-slate-700 text-sm">No invoices found</p>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-mono font-bold text-sky-700">{inv.id}</td>
                    <td className="p-4 font-bold text-slate-900">{inv.hospital}</td>
                    <td className="p-4 font-medium">{inv.plan}</td>
                    <td className="p-4 font-mono font-bold text-slate-900">₹{inv.amount?.toLocaleString('en-IN')}</td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{inv.billingPeriod}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => showToast && showToast(`Downloaded verified tax invoice ${inv.id}`, 'info')}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold flex items-center gap-1.5 ml-auto transition text-xs active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
