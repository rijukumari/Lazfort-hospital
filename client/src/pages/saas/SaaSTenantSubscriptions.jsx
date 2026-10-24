import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import Modal from '../../components/Modal';
import {
  FileCheck,
  Search,
  Filter,
  Eye,
  Calendar,
  CreditCard,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Receipt,
  Download
} from 'lucide-react';

export default function SaaSTenantSubscriptions() {
  const { tenants } = useSaaS();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedSub, setSelectedSub] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Filter subscriptions mapped from tenants
  const filteredSubs = tenants.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 px-3 py-0.5 rounded-full">
              SaaS Billing Governance
            </span>
            <span className="text-xs text-slate-500 font-medium">
              &bull; {tenants.length} Active Hospital Contracts
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Tenant Subscriptions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor institutional subscription validity, auto-renewals, start/expiry schedules, and billing health.
          </p>
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by hospital, tenant ID, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
          </div>

          {/* Status Filters (All, Active, Expired, Pending, Suspended) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['All', 'Active', 'Suspended', 'Pending', 'Expired'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition shrink-0 ${
                  statusFilter === st
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-slate-50/75 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Hospital Name</th>
                <th className="p-4">Tenant ID</th>
                <th className="p-4">Subscription Plan</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Subscription Status</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSubs.length > 0 ? (
                filteredSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-bold text-slate-900">
                      <div>{sub.name}</div>
                      <span className="text-[10px] text-slate-400 font-normal">{sub.city}, {sub.state}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-sky-700">{sub.id}</td>
                    <td className="p-4">
                      <span className="font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full text-[10px]">
                        {sub.plan}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{sub.regDate}</td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{sub.expiryDate}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                        sub.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                        sub.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : sub.paymentStatus === 'Overdue'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {sub.paymentStatus || 'Paid'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedSub(sub);
                          setDetailsModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition inline-flex items-center gap-1 font-semibold"
                        title="View Subscription"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No subscriptions match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUBSCRIPTION DETAILS MODAL */}
      <Modal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title="Subscription Contract & Billing Details"
        maxWidth="max-w-lg"
      >
        {selectedSub && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-sky-700">{selectedSub.id}</span>
              <h3 className="text-base font-bold text-slate-900">{selectedSub.name}</h3>
              <p className="text-slate-500">{selectedSub.address || selectedSub.city}, {selectedSub.country}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Plan Tier</span>
                <span className="font-bold text-purple-700">{selectedSub.plan}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Billing Cycle</span>
                <span className="font-semibold text-slate-800">Annual Advance (12 Mo)</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Contract Started</span>
                <span className="font-mono font-bold text-slate-800">{selectedSub.regDate}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Contract Renewal</span>
                <span className="font-mono font-bold text-slate-800">{selectedSub.expiryDate}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 block">Commercial MRR Value:</span>
                <span className="font-mono font-black text-slate-900 text-sm">
                  ₹{(selectedSub.mrr || 35000).toLocaleString('en-IN')} / month
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedSub.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {selectedSub.paymentStatus || 'Paid'}
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  alert(`Invoice statement downloaded for ${selectedSub.id}`);
                }}
                className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Invoice</span>
              </button>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
