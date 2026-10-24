import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import Modal from '../../components/Modal';
import {
  Users,
  Search,
  Filter,
  Eye,
  ShieldAlert,
  Building2,
  UserCheck,
  CheckCircle2,
  Lock,
  Stethoscope,
  HeartPulse,
  Receipt,
  Pill,
  Microscope,
  Power
} from 'lucide-react';

export default function SaaSHospitalUsers() {
  const { hospitalUsers, tenants, setHospitalUsers, showToast } = useSaaS();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [hospitalFilter, setHospitalFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const filteredUsers = hospitalUsers.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.hospitalName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesHospital = hospitalFilter === 'All' || u.tenantId === hospitalFilter;
    return matchesSearch && matchesRole && matchesHospital;
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Doctor':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Hospital Admin':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Nurse':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Billing Executive':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Pharmacist':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Lab Staff':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const toggleUserActive = (id) => {
    setHospitalUsers(hospitalUsers.map(u => {
      if (u.id === id) {
        const next = u.status === 'Active' ? 'Suspended' : 'Active';
        showToast(`Staff member ${u.name} status updated to ${next}!`);
        return { ...u, status: next };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 px-3 py-0.5 rounded-full">
              Multi-Tenant Staff Directory
            </span>
            <span className="text-xs text-slate-500 font-medium">
              &bull; Global Health Personnel Registry
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Hospital Users & Staff
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Platform-wide directory of hospital administrators, doctors, triage nurses, cashiers, and lab technicians.
          </p>
        </div>
      </div>

      {/* Security & Clinical Privacy Disclaimer Notice */}
      <div className="p-4 bg-sky-50/60 border border-sky-200 rounded-2xl flex items-start gap-3 text-xs text-sky-950">
        <Lock className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-sky-900 block">
            Healthcare Regulatory Isolation & Patient Privacy Policy
          </span>
          <p className="text-sky-800/90 mt-0.5 leading-relaxed">
            SaaS Super Admins have administrative oversight of user accounts, license quotas, and authentication tokens across tenant hospitals. In accordance with NABH and ABDM guidelines, Super Admins are <strong>not granted access to confidential patient health records or clinical consultation notes</strong>.
          </p>
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by staff name, email, or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={hospitalFilter}
              onChange={(e) => setHospitalFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Hospital Tenants</option>
              {tenants.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Hospital Roles</option>
              <option value="Hospital Admin">Hospital Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Billing Executive">Billing Executive</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Lab Staff">Lab Staff</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50/75 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Staff Member</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Hospital Tenant</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Login</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-bold text-slate-900">
                      <div>{u.name}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{u.id}</span>
                    </td>
                    <td className="p-4 font-mono text-slate-600">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${getRoleBadge(u.role)}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-slate-800">
                      <div>{u.hospitalName}</div>
                      <span className="font-mono text-[10px] text-sky-700">{u.tenantId}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                        u.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{u.lastLogin}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedUser(u);
                            setViewModalOpen(true);
                          }}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleUserActive(u.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Toggle Status"
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No hospital staff members match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Hospital Staff Member Specifications"
        maxWidth="max-w-md"
      >
        {selectedUser && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-sky-700">{selectedUser.id}</span>
              <h3 className="text-base font-bold text-slate-900">{selectedUser.name}</h3>
              <p className="text-slate-500">{selectedUser.hospitalName} &bull; {selectedUser.tenantId}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Role</span>
                <span className="font-bold text-slate-800">{selectedUser.role}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Status</span>
                <span className="font-bold text-emerald-700">{selectedUser.status}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Email</span>
                <span className="font-mono text-slate-800 truncate block">{selectedUser.email}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Last Activity</span>
                <span className="font-mono font-bold text-slate-800">{selectedUser.lastLogin}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setViewModalOpen(false)}
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
