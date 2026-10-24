import React, { useState, useEffect, useRef } from 'react';
import { useAuth, demoAccounts } from '../context/AuthContext';
import Modal from './Modal';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Command, 
  Clock, 
  ChevronDown, 
  LogOut, 
  User, 
  ShieldCheck, 
  Stethoscope, 
  CreditCard, 
  ClipboardList,
  HeartPulse, 
  Pill, 
  UserCheck, 
  Server, 
  Building2, 
  Menu, 
  X, 
  Zap, 
  CheckCircle2, 
  Activity, 
  Layers,
  ArrowRight,
  SlidersHorizontal,
  CalendarClock,
  UserPlus,
  Receipt,
  FlaskConical,
  Phone,
  Mail,
  Award,
  Check
} from 'lucide-react';

export default function Navbar({ mobileOpen, setMobileOpen, activeTab, setActiveTab }) {
  const { user, tenant, quickLogin, logout } = useAuth();
  
  // States
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const searchInputRef = useRef(null);

  const isSuperAdmin = user?.role === 'super_admin';

  // Live Clock updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut for Cmd/Ctrl + K Spotlight search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setShowSwitcher(false);
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // Tab Breadcrumbs & Context
  const getTabInfo = (tab) => {
    switch (tab) {
      case 'saas_overview':
        return { section: 'SaaS Platform', title: 'Global Multi-Tenant Mesh', icon: Server, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
      case 'saas_tenants':
        return { section: 'SaaS Platform', title: 'Hospital Tenant Clusters', icon: Building2, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
      case 'clinical':
        return { section: 'Clinical Workspace', title: 'Doctor Live OPD Encounter', icon: Stethoscope, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
      case 'appointments':
        return { section: 'Front Desk', title: 'OPD Appointments & Queue', icon: CalendarClock, color: 'text-blue-600 bg-blue-50 border-blue-200' };
      case 'patients':
        return { section: 'Registration', title: 'Patient Registration & EMR', icon: UserPlus, color: 'text-sky-600 bg-sky-50 border-sky-200' };
      case 'nurse_station':
      case 'nurse_dashboard':
        return { section: 'Inpatient Care', title: 'Nurse Station & Triage', icon: HeartPulse, color: 'text-rose-600 bg-rose-50 border-rose-200' };
      case 'billing':
      case 'billing_dashboard':
        return { section: 'Revenue & Finance', title: 'Billing, Tariffs & Cashier', icon: Receipt, color: 'text-amber-600 bg-amber-50 border-amber-200' };
      case 'pharmacy_dashboard':
      case 'pharmacy_lab':
        return { section: 'Diagnostics', title: 'Pharmacy & Laboratory Orders', icon: Pill, color: 'text-teal-600 bg-teal-50 border-teal-200' };
      case 'patient_dashboard':
      case 'patient_portal':
        return { section: 'Patient Portal', title: 'My Health Records & Tokens', icon: UserCheck, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' };
      default:
        return { section: isSuperAdmin ? 'Platform Root' : 'Hospital ERP', title: 'Operational Command Center', icon: Activity, color: 'text-brand-600 bg-brand-50 border-brand-200' };
    }
  };

  const currentTabInfo = getTabInfo(activeTab);
  const TabIcon = currentTabInfo.icon;

  // Search shortcuts
  const navigationShortcuts = [
    { id: 'dashboard', label: 'Overview Dashboard', category: 'General', icon: Activity },
    { id: 'patients', label: 'Patient Registration & New OPD', category: 'Clinical', icon: UserPlus },
    { id: 'appointments', label: 'Appointments & Token Queue', category: 'Front Desk', icon: CalendarClock },
    { id: 'clinical', label: 'Doctor OPD Consultation Desk', category: 'Clinical', icon: Stethoscope },
    { id: 'nurse_station', label: 'Nurse Station Triage & Vitals', category: 'Nursing', icon: HeartPulse },
    { id: 'billing', label: 'Billing Invoices & Tariff Receipts', category: 'Finance', icon: Receipt },
    { id: 'pharmacy_dashboard', label: 'Pharmacy Dispensary & Stock', category: 'Pharmacy', icon: Pill },
    { id: 'lab_orders', label: 'Lab Orders & Pathology Tests', category: 'Diagnostics', icon: FlaskConical },
    { id: 'staff', label: 'Hospital Staff & Practitioners', category: 'Admin', icon: User },
    { id: 'hospital_settings', label: 'Hospital Configuration & Tariffs', category: 'Admin', icon: SlidersHorizontal },
  ];

  const filteredShortcuts = searchQuery.trim() === '' 
    ? navigationShortcuts 
    : navigationShortcuts.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase()));

  // Role badges & icons
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

  const getRoleIcon = (role) => {
    switch (role) {
      case 'super_admin': return <Server className="w-3.5 h-3.5 text-indigo-600" />;
      case 'hospital_admin': return <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />;
      case 'receptionist': return <ClipboardList className="w-3.5 h-3.5 text-blue-600" />;
      case 'doctor': return <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />;
      case 'nurse': return <HeartPulse className="w-3.5 h-3.5 text-rose-600" />;
      case 'billing_executive': return <CreditCard className="w-3.5 h-3.5 text-amber-600" />;
      case 'pharmacist': return <Pill className="w-3.5 h-3.5 text-teal-600" />;
      case 'patient': return <UserCheck className="w-3.5 h-3.5 text-cyan-600" />;
      default: return <User className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const formatRole = (role) => {
    if (!role) return '';
    return role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  // Mock live hospital notifications
  const notifications = [
    { id: 1, title: 'Patient Token #104 Checked-in', time: '2m ago', desc: 'Rajesh Kumar arrived at General OPD Room 3', unread: true },
    { id: 2, title: 'Urgent Vitals Alert', time: '14m ago', desc: 'Nurse Marykutty marked BP 148/96 for Bed #12', unread: true },
    { id: 3, title: 'Prescription Dispensed', time: '35m ago', desc: 'Amoxicillin 500mg batch #B-204 dispensed to patient', unread: false },
    { id: 4, title: 'Payment Receipt #INV-9204', time: '1h ago', desc: '₹850 collected via UPI at Billing Counter 1', unread: false },
  ];

  return (
    <>
      {/* ── TOP NAVBAR BAR (Positioned after the Sidebar) ── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2.5 transition-all duration-200 shadow-sm no-print">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Mobile Toggle + Breadcrumb Module Identity */}
          <div className="flex items-center space-x-3 min-w-0">
            {setMobileOpen && (
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-950 rounded-xl hover:bg-slate-100 transition shrink-0 border border-slate-200"
                title="Toggle Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Dynamic Breadcrumbs & Section Title */}
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-xs shrink-0 ${currentTabInfo.color}`}>
                <TabIcon className="w-4 h-4" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                    {currentTabInfo.section}
                  </span>
                  <span className="text-slate-300 text-xs hidden sm:inline">&bull;</span>
                  <span className="text-xs font-black text-slate-800 truncate hidden sm:inline">
                    {currentTabInfo.title}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span className="truncate font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[10px]">
                    {isSuperAdmin ? 'Global Root Active' : (tenant?.name || 'Lazfort Hospital Main')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Command Palette Trigger Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-100/80 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl border border-slate-200/90 text-xs transition group shadow-xs cursor-pointer"
            >
              <div className="flex items-center space-x-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 transition" />
                <span className="truncate">Search patients, tokens, invoices, records...</span>
              </div>
              <div className="flex items-center space-x-1 text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-500 shadow-2xs shrink-0 ml-2">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </button>
          </div>

          {/* Right: Actions, Notifications, Switcher & User Avatar */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Live Clock Pill (hidden on very small screens) */}
            <div className="hidden xl:flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl shadow-xs">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold tabular-nums text-slate-700">{currentTime || '01:00 PM'}</span>
            </div>

            {/* Quick Action Button */}
            {!isSuperAdmin && (
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('patients')}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-brand-600 to-sky-600 hover:from-brand-700 hover:to-sky-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-brand-600/20 transition active:scale-95"
                title="Register New Patient"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>+ New OPD</span>
              </button>
            )}

            {/* Notifications Hub */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSwitcher(false);
                  setShowUserMenu(false);
                }}
                className="relative p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                    <span className="font-black text-slate-800">Clinical Alerts & Notifications</span>
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">2 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-1">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5 px-2 hover:bg-slate-50 rounded-xl transition cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0"></span>}
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-center">
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="text-brand-600 hover:text-brand-700 font-bold text-[11px]"
                    >
                      Dismiss & Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Persona Switcher Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowSwitcher(!showSwitcher);
                  setShowUserMenu(false);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 transition"
                title="Switch active demo persona"
              >
                <div className="flex items-center space-x-1">
                  {getRoleIcon(user?.role)}
                  <span className="hidden sm:inline font-bold text-slate-800 text-[11px]">
                    {formatRole(user?.role)}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Persona Switcher Dropdown */}
              {showSwitcher && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Quick Persona Switch</p>
                      <p className="text-[10px] text-slate-400">One-click role toggle for multi-user workflow</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-brand-600" />
                  </div>

                  <div className="max-h-80 overflow-y-auto space-y-1 py-1.5">
                    {demoAccounts.map((account) => {
                      const isActive = user?.role === account.role;
                      return (
                        <button
                          key={account.role}
                          onClick={() => {
                            quickLogin(account.role);
                            setShowSwitcher(false);
                          }}
                          className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition ${
                            isActive ? 'bg-brand-50 border border-brand-200 shadow-2xs' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                              {getRoleIcon(account.role)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">{account.roleName}</p>
                              <p className="text-[10px] text-slate-400 truncate">{account.name}</p>
                            </div>
                          </div>
                          {isActive ? (
                            <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                          ) : (
                            <span className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold ${account.badge}`}>
                              Switch
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Popover Menu */}
            <div className="relative pl-1 sm:pl-2 border-l border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowSwitcher(false);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 transition group"
                title={`${user?.fullName || 'User'} Menu`}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 via-sky-600 to-indigo-700 p-0.5 shadow-sm group-hover:shadow-md transition">
                    <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center font-black text-xs text-brand-700">
                      {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-xs">
                  <div className="p-2.5 border-b border-slate-100 bg-slate-50/60 rounded-xl mb-1">
                    <p className="font-extrabold text-slate-900 truncate">{user?.fullName || 'Hospital User'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email || 'user@lazfort.com'}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-bold ${getRoleBadge(user?.role)}`}>
                        {formatRole(user?.role)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 flex items-center justify-between transition font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>View Credentials & Profile</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition font-bold"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ── COMMAND SPOTLIGHT MODAL (⌘K) ── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-brand-600 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Jump to patients, appointments, billing, pharmacy or lab..."
                className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions / Shortcuts */}
            <div className="p-3 max-h-96 overflow-y-auto space-y-1 text-xs">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Navigation Shortcuts
              </div>
              {filteredShortcuts.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (setActiveTab) setActiveTab(item.id);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between transition group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-brand-50 text-slate-600 group-hover:text-brand-600 flex items-center justify-center transition">
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 group-hover:text-brand-700 transition">{item.label}</p>
                        <p className="text-[10px] text-slate-400">{item.category}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 transition group-hover:translate-x-0.5" />
                  </button>
                );
              })}
              {filteredShortcuts.length === 0 && (
                <div className="p-6 text-center text-slate-400">
                  No matching hospital views found for "{searchQuery}"
                </div>
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Use <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↑</kbd> <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↓</kbd> to navigate</span>
              <span>Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">ESC</kbd> to exit</span>
            </div>
          </div>
        </div>
      )}

      {/* ── PRACTITIONER / USER PROFILE MODAL ── */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="Practitioner & Account Details"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-6 text-xs text-slate-700">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 shadow-lg">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-2xl text-white">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-slate-950">
                    ACTIVE
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{user?.fullName || 'Dr. Practitioner'}</h3>
                  <p className="text-sky-300 text-xs font-medium">
                    {user?.specialization || 'Clinical Healthcare Provider'}
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {tenant?.name || 'Lazfort Memorial Hospital'} &bull; Indiranagar Campus
                  </p>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold text-[10px] tracking-wide uppercase">
                  {formatRole(user?.role)}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">Status: Fully Verified</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
              <p className="font-bold text-slate-800 text-xs">{user?.email || 'doctor@lazfort.com'}</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</span>
              <p className="font-bold text-slate-800 text-xs">{user?.department || 'Clinical Operations'}</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">License / Registration</span>
              <p className="font-bold text-slate-800 text-xs">{user?.licenseNumber || 'MCI-2015-88492'}</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tenant Mesh Scoped</span>
              <p className="font-bold text-slate-800 text-xs">{tenant?._id || 'tenant_lazfort_blr_01'}</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowProfileModal(false)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition text-xs shadow-sm"
            >
              Done & Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
