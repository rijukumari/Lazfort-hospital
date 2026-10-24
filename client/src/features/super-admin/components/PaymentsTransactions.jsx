import React, { useState } from 'react';
import {
  Receipt,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

export default function PaymentsTransactions() {
  const { showToast } = useSaaS();

  const [txnSubPage, setTxnSubPage] = useState('list'); // 'list' | 'detail'
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [txnSearch, setTxnSearch] = useState('');
  const [txnStatusFilter, setTxnStatusFilter] = useState('ALL');
  const [txnMethodFilter, setTxnMethodFilter] = useState('ALL');
  const [txnTenantFilter, setTxnTenantFilter] = useState('ALL');

  const [transactions] = useState([
    {
      id: 'TXN-98412',
      gatewayRef: 'pay_Pq78Xb92N1La',
      tenantId: 'TEN-LZF-001',
      hospital: 'Lazfort Memorial Hospital',
      branch: 'Indiranagar Main Campus',
      type: 'Enterprise SaaS Annual Renewal',
      grossAmount: 75000,
      fee: 1350,
      gst: 243,
      netAmount: 73407,
      method: 'UPI Auto-Debit',
      status: 'Settled',
      payoutUtr: 'HDFCR520261021008819',
      date: '2026-10-22 14:32 IST',
      settlementDate: '2026-10-23 (T+1 Immediate)',
      gateway: 'Razorpay Enterprise'
    },
    {
      id: 'TXN-98411',
      gatewayRef: 'pay_Pq77Km19B2Cc',
      tenantId: 'TEN-APX-002',
      hospital: 'Apex Super Specialty Hospital Group',
      branch: 'Sector 62 Mega Hospital',
      type: 'Enterprise Plus Monthly Tier',
      grossAmount: 115000,
      fee: 2070,
      gst: 372,
      netAmount: 112558,
      method: 'Corporate NetBanking',
      status: 'Settled',
      payoutUtr: 'ICICIR520261021009112',
      date: '2026-10-22 11:15 IST',
      settlementDate: '2026-10-23 (T+1 Immediate)',
      gateway: 'Razorpay Enterprise'
    },
    {
      id: 'TXN-98410',
      gatewayRef: 'pay_Pq76Nn81M3Dd',
      tenantId: 'TEN-MLF-003',
      hospital: 'MediLife Daycare Clinics & Diagnostics',
      branch: 'Koramangala Daycare Centre',
      type: 'Standard Clinic Tier (Q3 Invoicing)',
      grossAmount: 35000,
      fee: 630,
      gst: 113,
      netAmount: 34257,
      method: 'Business Credit Card',
      status: 'Settled',
      payoutUtr: 'UTIB000109928120019',
      date: '2026-10-21 16:40 IST',
      settlementDate: '2026-10-22 (T+1 Immediate)',
      gateway: 'Stripe Global India'
    },
    {
      id: 'TXN-98409',
      gatewayRef: 'pay_Pq75Pp90V4Ee',
      tenantId: 'TEN-CRH-004',
      hospital: 'Caring Hands Community Health Network',
      branch: 'Community Health Outpost',
      type: 'Non-Profit Health Tier Subsidized',
      grossAmount: 15000,
      fee: 270,
      gst: 48,
      netAmount: 14682,
      method: 'UPI Auto-Debit',
      status: 'In Escrow',
      payoutUtr: 'Awaiting Bank Settlement Window',
      date: '2026-10-23 09:10 IST',
      settlementDate: '2026-10-24 06:00 IST (Scheduled)',
      gateway: 'Razorpay Enterprise'
    }
  ]);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = !txnSearch ||
      t.id.toLowerCase().includes(txnSearch.toLowerCase()) ||
      t.gatewayRef.toLowerCase().includes(txnSearch.toLowerCase()) ||
      t.hospital.toLowerCase().includes(txnSearch.toLowerCase()) ||
      t.payoutUtr.toLowerCase().includes(txnSearch.toLowerCase());
    const matchesStatus = txnStatusFilter === 'ALL' || t.status === txnStatusFilter;
    const matchesMethod = txnMethodFilter === 'ALL' || t.method.toLowerCase().includes(txnMethodFilter.toLowerCase());
    const matchesTenant = txnTenantFilter === 'ALL' || t.hospital === txnTenantFilter;
    return matchesSearch && matchesStatus && matchesMethod && matchesTenant;
  });

  const totalGrossVolume = transactions.reduce((acc, t) => acc + t.grossAmount, 0);
  const escrowBalance = transactions.filter(t => t.status === 'In Escrow' || t.status === 'Processing').reduce((acc, t) => acc + t.grossAmount, 0);
  const settledVolume = transactions.filter(t => t.status === 'Settled').reduce((acc, t) => acc + t.grossAmount, 0);
  const uniqueTxnTenants = Array.from(new Set(transactions.map(t => t.hospital)));

  const handleExportLedgerCSV = () => {
    const headers = ['Transaction ID', 'Gateway Ref', 'Hospital Tenant', 'Gross Amount', 'Gateway Fee', 'GST', 'Net Amount', 'Method', 'Status', 'UTR Reference', 'Date'];
    const rows = filteredTransactions.map(t => [
      t.id,
      `"${t.gatewayRef}"`,
      `"${t.hospital}"`,
      t.grossAmount,
      t.fee,
      t.gst,
      t.netAmount,
      `"${t.method}"`,
      t.status,
      `"${t.payoutUtr}"`,
      `"${t.date}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lazfort_settlement_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Settlement ledger CSV exported successfully.', 'success');
  };

  // Detail Subpage
  if (txnSubPage === 'detail' && selectedTxn) {
    return (
      <div className="space-y-6 animate-in fade-in duration-150">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setTxnSubPage('list')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back to Settlement Mesh</span>
          </button>
          <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {selectedTxn.id} &bull; {selectedTxn.status}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">{selectedTxn.gatewayRef}</span>
              <h2 className="text-2xl font-black text-slate-900 mt-0.5">{selectedTxn.hospital}</h2>
              <p className="text-xs text-slate-500">{selectedTxn.type} &bull; {selectedTxn.branch}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Settled Net Amount</span>
              <span className="text-2xl font-black text-emerald-600 font-mono">₹{selectedTxn.netAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Gross Billed</span>
              <span className="text-lg font-black text-slate-900 font-mono mt-1 block">₹{selectedTxn.grossAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Payment Gateway Fee + GST</span>
              <span className="text-lg font-black text-slate-700 font-mono mt-1 block">₹{selectedTxn.fee + selectedTxn.gst}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Bank UTR Reference</span>
              <span className="text-xs font-mono font-bold text-sky-700 mt-1 block truncate">{selectedTxn.payoutUtr}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default List View
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">
            <ArrowLeftRight className="w-4 h-4" />
            <span>Multi-Tenant Financial Settlement Mesh</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Payments &amp; Transactions</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time gateway settlements, multi-tenant automated escrow sweeps, and UTR audits.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportLedgerCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Settlement Ledger</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Gross Volume</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">₹{totalGrossVolume.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-emerald-600 font-bold block">100% Verified</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Settled Volume</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600">₹{settledVolume.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-slate-500 font-medium block">T+1 Immediate</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Escrow Hold</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-amber-600">₹{escrowBalance.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-amber-600 font-bold block">Pending Batch</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Gateway Health</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-sky-600">99.98%</div>
          <span className="text-[10px] text-sky-600 font-bold block">Razorpay &bull; Stripe</span>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={txnSearch}
            onChange={(e) => setTxnSearch(e.target.value)}
            placeholder="Search by Txn ID, Gateway Ref, Hospital or UTR..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={txnStatusFilter}
            onChange={(e) => setTxnStatusFilter(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="Settled">Settled</option>
            <option value="In Escrow">In Escrow</option>
          </select>

          <select
            value={txnTenantFilter}
            onChange={(e) => setTxnTenantFilter(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
          >
            <option value="ALL">All Tenants</option>
            {uniqueTxnTenants.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="bg-slate-50/90 text-slate-600 uppercase font-bold border-b border-slate-200 tracking-wider">
              <tr>
                <th className="p-4">Transaction / Ref</th>
                <th className="p-4">Hospital Tenant</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Gross Amount</th>
                <th className="p-4">Net Settlement</th>
                <th className="p-4">Settlement Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-slate-400">
                    <Receipt className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-slate-700 text-sm">No transactions match your filters</p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4">
                      <div>
                        <div className="font-mono font-bold text-sky-700 text-xs">{t.id}</div>
                        <div className="text-[11px] font-mono text-slate-400 mt-0.5">{t.gatewayRef}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{t.date}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-slate-900">{t.hospital}</div>
                        <div className="text-[11px] text-slate-500">{t.branch}</div>
                        <div className="text-[10px] text-sky-600 font-medium mt-0.5">{t.type}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-slate-700">{t.method}</span>
                      <span className="text-[10px] text-slate-400 block">{t.gateway}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900">₹{t.grossAmount.toLocaleString('en-IN')}</td>
                    <td className="p-4 font-mono font-bold text-emerald-600">₹{t.netAmount.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'Settled' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTxn(t);
                          setTxnSubPage('detail');
                        }}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition"
                        title="View audit details"
                      >
                        <Eye className="w-4 h-4" />
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
