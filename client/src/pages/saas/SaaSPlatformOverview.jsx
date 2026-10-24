import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSaaS } from '../../context/SaaSContext';
import Modal from '../../components/Modal';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Users,
  CreditCard,
  TrendingUp,
  LifeBuoy,
  Activity,
  Search,
  Filter,
  Eye,
  Pencil,
  Power,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Bell,
  UserCircle,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function SaaSPlatformOverview({ setActiveTab }) {
  const { user, logout } = useAuth();
  const { tenants, toggleTenantStatus, updateTenant, tickets, notifications } = useSaaS();

  // Search, Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [actionTarget, setActionTarget] = useState(null);
  const [actionType, setActionType] = useState('Suspend'); // 'Activate' or 'Suspend'
  const [confirmReason, setConfirmReason] = useState('');

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: '',
    city: '',
    plan: '',
    email: '',
    phone: '',
    userLimit: 50,
    branchLimit: 2
  });

  // Calculate Metrics from realistic local state (no random numbers)
  const totalHospitals = tenants.length;
  const activeTenants = tenants.filter(t => t.status === 'Active').length;
  const suspendedTenants = tenants.filter(t => t.status === 'Suspended').length;
  const totalUsers = tenants.reduce((acc, t) => acc + (t.totalUsers || 0), 0);
  const activeSubscriptions = activeTenants;
  const mrrTotal = tenants
    .filter(t => t.status === 'Active')
    .reduce((acc, t) => acc + (t.mrr || (t.plan === 'Enterprise' ? 75000 : t.plan === 'Professional' ? 35000 : 15000)), 0);
  const pendingTickets = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const systemHealth = '99.98% SLA';

  // Filter Tenants
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

  const handleOpenView = (tenant) => {
    setSelectedTenant(tenant);
    setViewModalOpen(true);
  };

  const handleOpenEdit = (tenant) => {
    setSelectedTenant(tenant);
    setEditFormData({
      name: tenant.name,
      city: tenant.city,
      plan: tenant.plan,
      email: tenant.email,
      phone: tenant.phone,
      userLimit: tenant.userLimit,
      branchLimit: tenant.branchLimit
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedTenant) return;
    updateTenant(selectedTenant.id, editFormData);
    setEditModalOpen(false);
  };

  const handleOpenConfirm = (tenant, action) => {
    setActionTarget(tenant);
    setActionType(action);
    setConfirmReason('');
    setConfirmModalOpen(true);
  };

  const handleExecuteAction = () => {
    if (!actionTarget) return;
    const newStatus = actionType === 'Activate' ? 'Active' : 'Suspended';
    toggleTenantStatus(actionTarget.id, newStatus, confirmReason);
    setConfirmModalOpen(false);
  };

  const currentDateFormatted = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* 3D SaaS Command Banner matching user reference image */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-5 sm:p-6 lg:p-7 text-white shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Continuous Cardiac ECG Line in background */}
        <div className="absolute inset-0 flex items-center opacity-10 pointer-events-none overflow-hidden">
          <svg className="w-full h-24 stroke-sky-400 fill-none" preserveAspectRatio="none" viewBox="0 0 1200 100">
            <path d="M0,50 L200,50 L220,20 L230,80 L240,10 L250,90 L260,50 L500,50 L520,20 L530,80 L540,10 L550,90 L560,50 L800,50 L820,20 L830,80 L840,10 L850,90 L860,50 L1200,50" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full">
                SaaS Super Admin Platform
              </span>
              <span className="text-[11px] sm:text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live &bull; {currentDateFormatted}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Welcome back, {user?.fullName || 'Vikramaditya Singhania'}
            </h1>
            <p className="text-xs text-sky-200/80 max-w-xl leading-relaxed">
              Global governance, hospital tenant lifecycles, subscriptions, and platform operations.
            </p>
          </div>


        </div>
      </div>

      {/* 8 Metric Cards - Responsive 2-col on mobile, 4-col on tablet & desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* 1. Total Hospitals */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-sm space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Hospitals</span>
            <div className="p-1.5 sm:p-2 bg-sky-50 text-sky-600 rounded-xl">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">{totalHospitals}</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600">+2 MoM</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Onboarded health nodes</p>
        </div>

        {/* 2. Active Tenants */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-sm space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Tenants</span>
            <div className="p-1.5 sm:p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">{activeTenants}</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600">Live</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Active clinical traffic</p>
        </div>

        {/* 3. Suspended Tenants */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-sm space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Suspended</span>
            <div className="p-1.5 sm:p-2 bg-amber-50 text-amber-600 rounded-xl">
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-700">{suspendedTenants}</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-amber-600">Review</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Overdue policy hold</p>
        </div>

        {/* 4. Total Platform Users */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-sm space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Platform Users</span>
            <div className="p-1.5 sm:p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">{totalUsers}</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-indigo-600">Doctors/Staff</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Across all hospitals</p>
        </div>

        {/* 5. Active Subscriptions */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-sm space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Subscriptions</span>
            <div className="p-1.5 sm:p-2 bg-purple-50 text-purple-600 rounded-xl">
              <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">{activeSubscriptions}</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-purple-600">Recurring</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Basic, Pro &amp; Enterprise</p>
        </div>

        {/* 6. Monthly Recurring Revenue */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-sm space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">MRR Revenue</span>
            <div className="p-1.5 sm:p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 truncate">
              ₹{(mrrTotal).toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Platform Monthly Ingress</p>
        </div>

        {/* 7. Pending Support Tickets */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-sm space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Support Tickets</span>
            <div className="p-1.5 sm:p-2 bg-rose-50 text-rose-600 rounded-xl">
              <LifeBuoy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">{pendingTickets}</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-amber-600">Active</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Tech resolution queue</p>
        </div>

        {/* 8. System Health */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-sm space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">System Health</span>
            <div className="p-1.5 sm:p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-700">{systemHealth}</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">3 regional clusters green</p>
        </div>
      </div>

      {/* Hospital Tenants Section with Search, Filters, Responsive Table/Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden min-w-0 max-w-full">
        {/* Table Header Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Hospital Tenants Directory</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status, plan subscriptions, user quota, and tenant control actions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full xl:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search hospital, ID, or city..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
              />
            </div>

            {/* Status & Plan Filters Grid on mobile */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-auto text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                className="w-full sm:w-auto text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="All">All Plans</option>
                <option value="Basic">Basic Plan</option>
                <option value="Professional">Professional Plan</option>
                <option value="Enterprise">Enterprise Plan</option>
              </select>
            </div>

            {/* Onboard Button */}
            <button
              onClick={() => setActiveTab('saas_onboarding')}
              className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md shadow-sky-600/20 transition flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Onboard Hospital</span>
            </button>
          </div>
        </div>

        {/* DESKTOP TABLE VIEW (Visible strictly on md+ screens >= 768px) */}
        <div className="hidden md:block overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs table-auto border-collapse">
            <thead className="sticky top-0 z-20 bg-slate-100/95 backdrop-blur-md text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200 shadow-xs">
              <tr>
                <th className="py-3.5 px-4 whitespace-nowrap sticky top-0 z-20 bg-slate-100/95">Hospital Name</th>
                <th className="py-3.5 px-3 whitespace-nowrap sticky top-0 z-20 bg-slate-100/95">Tenant ID</th>
                <th className="py-3.5 px-3 whitespace-nowrap sticky top-0 z-20 bg-slate-100/95">City</th>
                <th className="py-3.5 px-3 whitespace-nowrap sticky top-0 z-20 bg-slate-100/95">Subscription Plan</th>
                <th className="py-3.5 px-3 whitespace-nowrap sticky top-0 z-20 bg-slate-100/95">Users</th>
                <th className="py-3.5 px-3 whitespace-nowrap text-center sticky top-0 z-20 bg-slate-100/95">Status</th>
                <th className="py-3.5 px-3 whitespace-nowrap sticky top-0 z-20 bg-slate-100/95">Registration Date</th>
                <th className="py-3.5 px-4 pr-6 whitespace-nowrap text-right sticky right-0 top-0 z-30 bg-slate-100/95 shadow-[-6px_0_8px_-3px_rgba(0,0,0,0.08)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
              {paginatedTenants.length > 0 ? (
                paginatedTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-slate-50/80 transition group">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{tenant.name}</div>
                      <span className="text-[10px] text-slate-400 font-normal">{tenant.email}</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-sky-700 whitespace-nowrap">{tenant.id}</td>
                    <td className="py-3.5 px-3 whitespace-nowrap">{tenant.city}, {tenant.state}</td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                        tenant.plan === 'Enterprise'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : tenant.plan === 'Professional'
                          ? 'bg-sky-50 text-sky-700 border-sky-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-semibold whitespace-nowrap">
                      {tenant.totalUsers} / {tenant.userLimit}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-center">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                        tenant.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">{tenant.regDate}</td>
                    <td className="py-3.5 px-4 pr-6 text-right whitespace-nowrap sticky right-0 z-10 bg-white group-hover:bg-slate-50/90 transition shadow-[-6px_0_8px_-3px_rgba(0,0,0,0.08)]">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenView(tenant)}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(tenant)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Edit Hospital"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {tenant.status === 'Active' ? (
                          <button
                            onClick={() => handleOpenConfirm(tenant, 'Suspend')}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Suspend Hospital"
                          >
                            <Power className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenConfirm(tenant, 'Activate')}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            title="Activate Hospital"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No hospital tenants match your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW (Strictly visible on mobile screens < 768px) */}
        <div className="md:hidden divide-y divide-slate-100">
          {paginatedTenants.length > 0 ? (
            paginatedTenants.map((tenant) => (
              <div key={tenant.id} className="p-4 space-y-3 bg-white hover:bg-slate-50/50 transition">
                {/* Header: Name + Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{tenant.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 shrink-0">
                        {tenant.id}
                      </span>
                      <span className="text-slate-400 text-xs">&bull;</span>
                      <span className="text-xs text-slate-500 truncate">{tenant.city}, {tenant.state}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border shrink-0 ${
                    tenant.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {tenant.status}
                  </span>
                </div>

                {/* Plan + Users Allocation */}
                <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                      tenant.plan === 'Enterprise'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : tenant.plan === 'Professional'
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {tenant.plan} Plan
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {tenant.totalUsers} / {tenant.userLimit} Users
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        tenant.plan === 'Enterprise' ? 'bg-purple-600' : 'bg-sky-600'
                      }`}
                      style={{ width: `${Math.min(100, Math.round((tenant.totalUsers / tenant.userLimit) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                {/* Contact Email & Registration */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                  <span className="truncate max-w-[190px]">{tenant.email}</span>
                  <span className="font-mono text-[10px]">{tenant.regDate}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenView(tenant)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition active:scale-95 shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleOpenEdit(tenant)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition active:scale-95 shadow-xs"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  {tenant.status === 'Active' ? (
                    <button
                      onClick={() => handleOpenConfirm(tenant, 'Suspend')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 transition active:scale-95 shadow-xs"
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>Suspend</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenConfirm(tenant, 'Activate')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition active:scale-95 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Activate</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              No hospital tenants match your search and filter criteria.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Showing {filteredTenants.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredTenants.length)} of {filteredTenants.length} tenants
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 font-semibold text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Hospital Tenant Specifications & Details"
        maxWidth="max-w-2xl"
      >
        {selectedTenant && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sky-700">{selectedTenant.id}</span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  selectedTenant.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {selectedTenant.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{selectedTenant.name}</h3>
              <p className="text-slate-500">{selectedTenant.address}, {selectedTenant.city}, {selectedTenant.state}, {selectedTenant.country}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Registration No</span>
                <span className="font-mono font-bold text-slate-800">{selectedTenant.regNumber || 'N/A'}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Subscription Plan</span>
                <span className="font-bold text-purple-700">{selectedTenant.plan}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Billing MRR</span>
                <span className="font-mono font-bold text-slate-800">₹{(selectedTenant.mrr || 35000).toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">User Seats</span>
                <span className="font-mono font-bold text-slate-800">{selectedTenant.totalUsers} / {selectedTenant.userLimit} Users</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Branches Count</span>
                <span className="font-mono font-bold text-slate-800">{selectedTenant.branchesCount || 1} / {selectedTenant.branchLimit || 2} Allowed</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Storage Usage</span>
                <span className="font-mono font-bold text-slate-800">{selectedTenant.storageUsed || '12 GB'} / {selectedTenant.storageLimit || '250 GB'}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
              <div>
                <span className="text-slate-500">Contact Email: </span>
                <strong className="text-slate-800">{selectedTenant.email}</strong>
              </div>
              <div>
                <span className="text-slate-500">Phone: </span>
                <strong className="text-slate-800 font-mono">{selectedTenant.phone}</strong>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-900"
              >
                Close Details
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Hospital Tenant Profile"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hospital Name</label>
            <input
              type="text"
              required
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City</label>
              <input
                type="text"
                required
                value={editFormData.city}
                onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subscription Plan</label>
              <select
                value={editFormData.plan}
                onChange={(e) => setEditFormData({ ...editFormData, plan: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="Basic">Basic Plan</option>
                <option value="Professional">Professional Plan</option>
                <option value="Enterprise">Enterprise Plan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">User Limit</label>
              <input
                type="number"
                min="1"
                value={editFormData.userLimit}
                onChange={(e) => setEditFormData({ ...editFormData, userLimit: parseInt(e.target.value) || 20 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Branch Limit</label>
              <input
                type="number"
                min="1"
                value={editFormData.branchLimit}
                onChange={(e) => setEditFormData({ ...editFormData, branchLimit: parseInt(e.target.value) || 1 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
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
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRMATION MODAL (Activate / Suspend) */}
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
              Are you sure you want to {actionType.toLowerCase()} tenant "{actionTarget?.name}"?
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
              onClick={handleExecuteAction}
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
