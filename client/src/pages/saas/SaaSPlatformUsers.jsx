import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import Modal from '../../components/Modal';
import {
  ShieldCheck,
  Search,
  Plus,
  Eye,
  Pencil,
  Power,
  UserCheck,
  Mail,
  Phone,
  Shield,
  Key
} from 'lucide-react';

export default function SaaSPlatformUsers() {
  const { platformUsers, setPlatformUsers, showToast } = useSaaS();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Platform Support',
    department: 'Technical Operations & Tenant Support',
    phone: '+91 98450 00010'
  });

  const filteredUsers = platformUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    const newUser = {
      id: `PU-00${platformUsers.length + 1}`,
      ...formData,
      status: 'Active',
      lastLogin: 'Never',
      twoFactorEnabled: true
    };
    setPlatformUsers([...platformUsers, newUser]);
    showToast(`Platform user ${newUser.name} created successfully!`);
    setAddModalOpen(false);
    setFormData({
      name: '',
      email: '',
      role: 'Platform Support',
      department: 'Technical Operations & Tenant Support',
      phone: '+91 98450 00010'
    });
  };

  const toggleStatus = (id) => {
    setPlatformUsers(platformUsers.map(u => {
      if (u.id === id) {
        const next = u.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`User ${u.name} status updated to ${next}!`);
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
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-0.5 rounded-full">
              Platform Governance
            </span>
            <span className="text-xs text-slate-500 font-medium">
              &bull; Global Cloud Operators
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Platform Users
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Internal operators with privileged infrastructure, support, and platform maintenance access.
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Platform User</span>
        </button>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search platform operators by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold"
          >
            <option value="All">All Platform Roles</option>
            <option value="SaaS Super Admin">SaaS Super Admin</option>
            <option value="Platform Support">Platform Support</option>
            <option value="Platform Operations">Platform Operations</option>
          </select>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50/75 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Operator Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Platform Role</th>
                <th className="p-4">Department / Scope</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Login</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900">
                    <div>{u.name}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{u.id}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-600">{u.email}</td>
                  <td className="p-4">
                    <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full text-[10px]">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{u.department}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                      u.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
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
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="View Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {u.role !== 'SaaS Super Admin' && (
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Toggle Status"
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MODAL */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Platform Operations User"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Platform Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
            >
              <option value="Platform Support">Platform Support</option>
              <option value="Platform Operations">Platform Operations</option>
              <option value="SaaS Super Admin">SaaS Super Admin</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Department</label>
            <input
              type="text"
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
            >
              Create Operator
            </button>
          </div>
        </form>
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Platform Operator Specifications"
        maxWidth="max-w-md"
      >
        {selectedUser && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-indigo-700">{selectedUser.id}</span>
              <h3 className="text-base font-bold text-slate-900">{selectedUser.name}</h3>
              <p className="text-slate-500">{selectedUser.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Role</span>
                <span className="font-bold text-indigo-700">{selectedUser.role}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Status</span>
                <span className="font-bold text-emerald-700">{selectedUser.status}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">2FA Auth</span>
                <span className="font-bold text-slate-800">Enforced Hardware Token</span>
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
