import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import Modal from '../../components/Modal';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Power,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Users,
  HardDrive
} from 'lucide-react';

export default function SaaSHospitalTenants() {
  const { tenants, addTenant, updateTenant, toggleTenantStatus } = useSaaS();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [actionType, setActionType] = useState('Suspend');
  const [confirmReason, setConfirmReason] = useState('');

  // Add Hospital Form state & errors
  const [addFormData, setAddFormData] = useState({
    name: '',
    regNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    plan: 'Professional',
    userLimit: 50,
    branchLimit: 2,
    storageLimit: '250 GB'
  });
  const [formErrors, setFormErrors] = useState({});

  // Filter
  const filteredTenants = tenants.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPlan = planFilter === 'All' || t.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage) || 1;
  const paginatedTenants = filteredTenants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const validateAddForm = () => {
    const errors = {};
    if (!addFormData.name.trim()) errors.name = 'Hospital Name is required';
    if (!addFormData.regNumber.trim()) errors.regNumber = 'Registration Number is required';
    if (!addFormData.email.trim()) errors.email = 'Hospital Email is required';
    else if (!/\S+@\S+\.\S+/.test(addFormData.email)) errors.email = 'Invalid email address';
    if (!addFormData.phone.trim()) errors.phone = 'Contact Number is required';
    if (!addFormData.address.trim()) errors.address = 'Street Address is required';
    if (!addFormData.city.trim()) errors.city = 'City is required';
    if (!addFormData.state.trim()) errors.state = 'State is required';
    if (!addFormData.country.trim()) errors.country = 'Country is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!validateAddForm()) return;

    // Generate mock tenant code
    const words = addFormData.name.split(' ');
    const code = words.length >= 2 
      ? (words[0].slice(0, 2) + words[1].slice(0, 1)).toUpperCase() 
      : addFormData.name.slice(0, 3).toUpperCase();

    addTenant({
      ...addFormData,
      code
    });

    setAddModalOpen(false);
    // Reset form
    setAddFormData({
      name: '',
      regNumber: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      plan: 'Professional',
      userLimit: 50,
      branchLimit: 2,
      storageLimit: '250 GB'
    });
    setFormErrors({});
  };

  const handleOpenEdit = (t) => {
    setSelectedTenant(t);
    setAddFormData({
      name: t.name,
      regNumber: t.regNumber || '',
      email: t.email,
      phone: t.phone,
      address: t.address || '',
      city: t.city,
      state: t.state || '',
      country: t.country || 'India',
      plan: t.plan,
      userLimit: t.userLimit,
      branchLimit: t.branchLimit,
      storageLimit: t.storageLimit || '250 GB'
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedTenant) return;
    updateTenant(selectedTenant.id, addFormData);
    setEditModalOpen(false);
  };

  const handleOpenConfirm = (t, action) => {
    setSelectedTenant(t);
    setActionType(action);
    setConfirmReason('');
    setConfirmModalOpen(true);
  };

  const handleExecuteStatusToggle = () => {
    if (!selectedTenant) return;
    const newStatus = actionType === 'Activate' ? 'Active' : 'Suspended';
    toggleTenantStatus(selectedTenant.id, newStatus, confirmReason);
    setConfirmModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 px-3 py-0.5 rounded-full">
              Tenant Management
            </span>
            <span className="text-xs text-slate-500 font-medium">
              &bull; {tenants.length} Total Registered Hospitals
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Hospital Tenants
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full lifecycle control, provisioning, subscriptions, quota allocation, and tenant status.
          </p>
        </div>

        <button
          onClick={() => {
            setFormErrors({});
            setAddModalOpen(true);
          }}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-sky-600/20 transition flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Hospital</span>
        </button>
      </div>

      {/* Main Directory Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Controls Bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by hospital name, tenant ID, or city..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Suspended">Suspended Only</option>
            </select>

            <select
              value={planFilter}
              onChange={(e) => {
                setPlanFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Subscription Plans</option>
              <option value="Basic">Basic Plan</option>
              <option value="Professional">Professional Plan</option>
              <option value="Enterprise">Enterprise Plan</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Hospital Name & Details</th>
                <th className="p-4">Tenant ID</th>
                <th className="p-4">Location</th>
                <th className="p-4">Plan & Quota</th>
                <th className="p-4">Users</th>
                <th className="p-4">Status</th>
                <th className="p-4">Registration</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedTenants.length > 0 ? (
                paginatedTenants.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">Reg: {t.regNumber || 'N/A'}</div>
                      <div className="text-[10px] text-slate-500">{t.email} &bull; {t.phone}</div>
                    </td>
                    <td className="p-4 font-mono font-bold text-sky-700">{t.id}</td>
                    <td className="p-4">
                      <div>{t.city}</div>
                      <div className="text-[10px] text-slate-400">{t.state}, {t.country}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                        t.plan === 'Enterprise'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : t.plan === 'Professional'
                          ? 'bg-sky-50 text-sky-700 border-sky-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {t.plan}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Max {t.branchLimit} branches &bull; {t.storageLimit || '250 GB'}
                      </div>
                    </td>
                    <td className="p-4 font-mono font-semibold">
                      {t.totalUsers} / {t.userLimit}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                        t.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{t.regDate}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedTenant(t);
                            setViewModalOpen(true);
                          }}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(t)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Edit Hospital"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {t.status === 'Active' ? (
                          <button
                            onClick={() => handleOpenConfirm(t, 'Suspend')}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Suspend Hospital"
                          >
                            <Power className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenConfirm(t, 'Activate')}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            title="Activate Hospital"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No hospital tenants found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredTenants.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredTenants.length)} of {filteredTenants.length} tenants
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 font-semibold text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ADD HOSPITAL MODAL WITH VALIDATION */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add & Provision New Hospital Tenant"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Hospital Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={addFormData.name}
                onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                placeholder="e.g. Apollo Memorial Hospital"
                className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs ${
                  formErrors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {formErrors.name && <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.name}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Hospital Registration Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={addFormData.regNumber}
                onChange={(e) => setAddFormData({ ...addFormData, regNumber: e.target.value })}
                placeholder="e.g. HOSP-KA-2026-9011"
                className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-mono ${
                  formErrors.regNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {formErrors.regNumber && <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.regNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Hospital Official Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={addFormData.email}
                onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
                placeholder="admin@apollohospital.org"
                className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs ${
                  formErrors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {formErrors.email && <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contact Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={addFormData.phone}
                onChange={(e) => setAddFormData({ ...addFormData, phone: e.target.value })}
                placeholder="+91 80 4920 1000"
                className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-mono ${
                  formErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {formErrors.phone && <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={addFormData.address}
              onChange={(e) => setAddFormData({ ...addFormData, address: e.target.value })}
              placeholder="e.g. 14/B, 100 Feet Road, HAL 2nd Stage"
              className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs ${
                formErrors.address ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
            {formErrors.address && <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.address}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                City <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={addFormData.city}
                onChange={(e) => setAddFormData({ ...addFormData, city: e.target.value })}
                placeholder="Bengaluru"
                className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs ${
                  formErrors.city ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {formErrors.city && <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.city}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                State <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={addFormData.state}
                onChange={(e) => setAddFormData({ ...addFormData, state: e.target.value })}
                placeholder="Karnataka"
                className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs ${
                  formErrors.state ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {formErrors.state && <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.state}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Country <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={addFormData.country}
                onChange={(e) => setAddFormData({ ...addFormData, country: e.target.value })}
                placeholder="India"
                className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs ${
                  formErrors.country ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {formErrors.country && <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.country}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subscription Plan</label>
              <select
                value={addFormData.plan}
                onChange={(e) => setAddFormData({ ...addFormData, plan: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="Basic">Basic (₹15k/mo)</option>
                <option value="Professional">Professional (₹35k/mo)</option>
                <option value="Enterprise">Enterprise (₹75k/mo)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">User Limit</label>
              <input
                type="number"
                min="5"
                value={addFormData.userLimit}
                onChange={(e) => setAddFormData({ ...addFormData, userLimit: parseInt(e.target.value) || 20 })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Branch Limit</label>
              <input
                type="number"
                min="1"
                value={addFormData.branchLimit}
                onChange={(e) => setAddFormData({ ...addFormData, branchLimit: parseInt(e.target.value) || 1 })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Storage Limit</label>
              <select
                value={addFormData.storageLimit}
                onChange={(e) => setAddFormData({ ...addFormData, storageLimit: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="50 GB">50 GB</option>
                <option value="250 GB">250 GB</option>
                <option value="2 TB">2 TB</option>
                <option value="5 TB">5 TB</option>
              </select>
            </div>
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
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md"
            >
              Provision Hospital Tenant
            </button>
          </div>
        </form>
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Hospital Tenant Information"
        maxWidth="max-w-xl"
      >
        {selectedTenant && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-sky-700">{selectedTenant.id}</span>
              <h3 className="text-base font-bold text-slate-900">{selectedTenant.name}</h3>
              <p className="text-slate-500">{selectedTenant.address || selectedTenant.city}, {selectedTenant.state}, {selectedTenant.country}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Registration No</span>
                <span className="font-mono font-bold text-slate-800">{selectedTenant.regNumber || 'N/A'}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Subscription Plan</span>
                <span className="font-bold text-purple-700">{selectedTenant.plan}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Users Allocation</span>
                <span className="font-mono font-bold text-slate-800">{selectedTenant.totalUsers} / {selectedTenant.userLimit}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Storage Usage</span>
                <span className="font-mono font-bold text-slate-800">{selectedTenant.storageUsed || '0 GB'} / {selectedTenant.storageLimit || '250 GB'}</span>
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

      {/* EDIT MODAL */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Hospital Profile & Quotas"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hospital Name</label>
            <input
              type="text"
              required
              value={addFormData.name}
              onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City</label>
              <input
                type="text"
                required
                value={addFormData.city}
                onChange={(e) => setAddFormData({ ...addFormData, city: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Plan</label>
              <select
                value={addFormData.plan}
                onChange={(e) => setAddFormData({ ...addFormData, plan: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="Basic">Basic</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={addFormData.email}
                onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone</label>
              <input
                type="text"
                required
                value={addFormData.phone}
                onChange={(e) => setAddFormData({ ...addFormData, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM STATUS TOGGLE MODAL */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title={`Confirm Hospital ${actionType}`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs text-slate-700">
          <div className={`p-4 rounded-2xl border ${
            actionType === 'Suspend' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <p className="font-bold">
              Are you sure you want to {actionType.toLowerCase()} tenant "{selectedTenant?.name}"?
            </p>
            <p className="text-[11px] mt-1 opacity-90">
              {actionType === 'Suspend'
                ? 'Suspending this hospital will temporarily disable staff sign-ins and OPD terminal check-ins until reactivated.'
                : 'Activating this hospital will restore full access to its clinical and billing workspaces.'}
            </p>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Audit Note / Justification (Required)
            </label>
            <textarea
              required
              rows={3}
              value={confirmReason}
              onChange={(e) => setConfirmReason(e.target.value)}
              placeholder={`Reason for ${actionType.toLowerCase()}ing hospital tenant...`}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setConfirmModalOpen(false)}
              className="px-4 py-2 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 text-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!confirmReason.trim()}
              onClick={handleExecuteStatusToggle}
              className={`px-5 py-2 text-white font-bold rounded-xl disabled:opacity-50 ${
                actionType === 'Suspend' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              Confirm {actionType}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
