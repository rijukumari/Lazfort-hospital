import React, { useState } from 'react';
import { useAuth, demoAccounts } from '../context/AuthContext';
import Modal from './Modal';
import { 
  Building2, 
  ChevronDown, 
  LogOut, 
  Activity, 
  ShieldCheck, 
  Stethoscope, 
  CreditCard, 
  ClipboardList,
  User,
  Award,
  Phone,
  Mail,
  Clock,
  Calendar,
  Lock,
  CheckCircle,
  FileText,
  Server,
  HeartPulse,
  Pill,
  UserCheck,
  Menu
} from 'lucide-react';

export default function Navbar({ mobileOpen, setMobileOpen, activeTab, setActiveTab }) {
  const { user, tenant, quickLogin, logout } = useAuth();
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const isSuperAdmin = user?.role === 'super_admin';

  const getRoleIcon = (role) => {
    switch (role) {
      case 'super_admin': return <Server className="w-4 h-4 text-indigo-600" />;
      case 'hospital_admin': return <ShieldCheck className="w-4 h-4 text-purple-600" />;
      case 'receptionist': return <ClipboardList className="w-4 h-4 text-blue-600" />;
      case 'doctor': return <Stethoscope className="w-4 h-4 text-emerald-600" />;
      case 'nurse': return <HeartPulse className="w-4 h-4 text-rose-600" />;
      case 'billing_executive': return <CreditCard className="w-4 h-4 text-amber-600" />;
      case 'pharmacist': return <Pill className="w-4 h-4 text-teal-600" />;
      case 'patient': return <UserCheck className="w-4 h-4 text-cyan-600" />;
      default: return <User className="w-4 h-4 text-slate-600" />;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'super_admin': return 'bg-indigo-500/10 text-indigo-700 border-indigo-300';
      case 'hospital_admin': return 'bg-purple-500/10 text-purple-700 border-purple-300';
      case 'receptionist': return 'bg-blue-500/10 text-blue-700 border-blue-300';
      case 'doctor': return 'bg-emerald-500/10 text-emerald-700 border-emerald-300';
      case 'nurse': return 'bg-rose-500/10 text-rose-700 border-rose-300';
      case 'billing_executive': return 'bg-amber-500/10 text-amber-700 border-amber-300';
      case 'pharmacist': return 'bg-teal-500/10 text-teal-700 border-teal-300';
      case 'patient': return 'bg-cyan-500/10 text-cyan-700 border-cyan-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const formatRoleName = (role) => {
    if (!role) return '';
    return role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <>
      <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 pr-6 sm:pr-10 lg:pr-16 flex items-center justify-between sticky top-0 z-30 shadow-sm no-print">
        {/* Brand & Context */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition"
              title="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 via-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-brand-500/25 shrink-0">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">LAZFORT</span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200">
                  {isSuperAdmin ? 'SaaS Control' : 'Hospital ERP'}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold hidden sm:inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  {isSuperAdmin ? 'Global Root Mesh' : 'Multi-Tenant Scoped'}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">
                  {isSuperAdmin
                    ? 'Global Cloud Platform Operations &bull; 24 Hospital Clusters'
                    : `${tenant?.name || 'Lazfort Memorial Hospital'} • Indiranagar Campus`}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Controls: Role Switcher & Doctor Profile Pill */}
        <div className="flex items-center space-x-3 sm:space-x-4 mr-4 sm:mr-8 lg:mr-14">
          {/* Quick Persona Switcher for pair testing */}
          <div className="relative">
            <button
              onClick={() => setShowSwitcher(!showSwitcher)}
              className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition shadow-sm"
              title="Switch demo persona for testing"
            >
              <span className="text-slate-400 font-normal">Role:</span>
              <span className="font-bold text-brand-700 flex items-center gap-1">
                {getRoleIcon(user?.role)}
                {formatRoleName(user?.role)}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showSwitcher && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Active Persona
                </div>
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    onClick={() => {
                      quickLogin(account.role);
                      setShowSwitcher(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 flex flex-col transition ${
                      user?.role === account.role ? 'bg-brand-50/80 border-l-4 border-brand-600' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{account.roleName}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${account.badge}`}>
                        {account.role}
                      </span>
                    </div>
                    <span className="text-slate-500 text-[11px] mt-0.5">{account.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile Icon Button (Opens Doctor Profile Account Modal) */}
          <div className="pl-2.5 sm:pl-3 border-l border-slate-200 flex items-center space-x-2 mr-2 sm:mr-4">
            <button
              onClick={() => setShowProfileModal(true)}
              className="relative group focus:outline-none"
              title={`${user?.fullName || 'Profile'} — Click to view account`}
            >
              {/* Circular Profile Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 via-sky-500 to-indigo-600 p-0.5 shadow-md shadow-brand-500/30 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-500/40 transition-all duration-200">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-sm text-brand-700">
                  {user?.fullName?.charAt(0)?.toUpperCase() || <User className="w-5 h-5 text-brand-600" />}
                </div>
              </div>
              {/* Online Status Dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= DOCTOR PROFILE ACCOUNT DETAILS MODAL ================= */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="Doctor & Clinical Practitioner Profile"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-6 text-xs text-slate-700">
          {/* Top 3D Doctor Header Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white shadow-xl relative overflow-hidden">
            <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-sky-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 shadow-lg">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-2xl text-white">
                      {user?.fullName?.charAt(0) || 'D'}
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-slate-950">
                    ACTIVE
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{user?.fullName || 'Dr. Rajesh Sharma, MD'}</h3>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-sky-200 text-xs mt-0.5 font-medium">
                    {user?.specialization || 'Internal Medicine & Diabetology'}
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Department: <strong className="text-white">{user?.department || 'General Medicine'}</strong>
                  </p>
                </div>
              </div>

              <div className="sm:text-right space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-300 block">Registration License</span>
                <span className="font-mono font-bold text-xs bg-white/10 px-2.5 py-1 rounded-lg border border-white/20 inline-block">
                  {user?.licenseNumber || 'MCI-2008-41029'}
                </span>
                <p className="text-[10px] text-slate-400">Karnataka Medical Council</p>
              </div>
            </div>
          </div>

          {/* Clinical KPIs & Performance */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[11px] block">Consultation Fee</span>
              <span className="text-base font-black text-slate-900 mono">₹{user?.consultationFee || 600}</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-emerald-700 text-[11px] block font-semibold">Active Since</span>
              <span className="text-base font-black text-emerald-900 mono">2018</span>
            </div>
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-200">
              <span className="text-sky-700 text-[11px] block font-semibold">Patients Consulted</span>
              <span className="text-base font-black text-sky-950 mono">1,482+</span>
            </div>
          </div>

          {/* Account Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact & Branch */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Contact & OPD Location</h4>
              
              <div className="flex items-center space-x-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{user?.email || 'dr.rajesh@lazfort.com'}</span>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">{user?.phone || '+91 98450 22002'}</span>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Main Campus &bull; 1st Floor, OPD Wing A, Room 104</span>
              </div>
            </div>

            {/* Shift & Security Privileges */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Schedule & Privileges</h4>

              <div className="flex items-center space-x-2 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>OPD Hours: <strong>09:00 AM - 04:30 PM (Mon-Sat)</strong></span>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Clinical Authorization: <strong>BR-07 Finalize & Rx Lock</strong></span>
              </div>

              <div className="flex items-center space-x-2 text-slate-600">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Session: <strong>Encrypted JWT (24h)</strong></span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-200">
            <span className="text-[11px] text-slate-400">
              Lazfort Hospital ERP &bull; Practitioner ID: {user?.userId || 'USR-DOC-001'}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  alert('Profile settings update dialog');
                }}
                className="px-3.5 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-slate-700 transition"
              >
                Edit Preferences
              </button>
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  logout();
                }}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold transition inline-flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
