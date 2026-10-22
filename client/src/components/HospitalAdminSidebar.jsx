import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  UserPlus,
  CalendarClock,
  Stethoscope,
  HeartPulse,
  FileText,
  UserCog,
  Building2,
  GitFork,
  Sliders,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Building,
  Activity,
  AlertTriangle,
  Pill,
  TestTube,
  Search as SearchIcon,
  Users,
  Clock,
  ClipboardList,
  ArrowLeftRight,
  BookOpen,
  Printer,
  FlaskConical,
  Package,
  Truck,
  CalendarPlus,
  ArrowLeft
} from 'lucide-react';

export default function HospitalAdminSidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen
}) {
  const { user, tenant, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', collapsed ? '5rem' : '18rem');
    return () => {
      document.documentElement.style.setProperty('--sidebar-width', '18rem');
    };
  }, [collapsed]);

  const role = user?.role || 'hospital_admin';

  // Check if pharmacy/lab is enabled for the hospital (either via tenant flag or pharmacist role)
  const isPharmacyLabEnabled =
    Boolean(tenant?.modules?.pharmacy || tenant?.hasPharmacy || tenant?.enablePharmacyLab) ||
    role === 'pharmacist' ||
    role === 'lab_technician';

  /**
   * Build role-specific navigation sections.
   * Receptionist, Doctor, Nurse, Billing Executive, Pharmacist, and Patient get focused role structures.
   * All other hospital roles use the full admin structure filtered by `roles` array.
   */
  const getNavSections = () => {
    // ── PATIENT: exact 9 items in strict order ───────────────────
    if (role === 'patient') {
      return [
        {
          title: 'PATIENT PORTAL',
          items: [
            { id: 'patient_dashboard',       label: 'My Health Portal',         icon: LayoutDashboard },
            { id: 'patient_appointments',    label: 'My Appointments & Tokens', icon: CalendarClock },
            { id: 'patient_book_opd',        label: 'Book New OPD Visit',       icon: CalendarPlus, badge: 'Book OPD' },
            { id: 'patient_prescriptions',   label: 'My Prescriptions',         icon: Pill },
            { id: 'patient_medical_records', label: 'My Medical Records',       icon: FileText },
            { id: 'patient_lab_reports',      label: 'Lab Reports',              icon: FlaskConical },
            { id: 'patient_invoices',        label: 'Invoices & Receipts',      icon: Receipt }
          ]
        },
        {
          title: 'ACCOUNT',
          items: [
            { id: 'my_profile',              label: 'My Profile',               icon: UserCircle }
          ]
        }
      ];
    }

    // ── RECEPTIONIST: exact 3 sections, 6 items ──────────────────
    if (role === 'receptionist') {
      return [
        {
          title: 'CLINICAL OPERATIONS',
          items: [
            { id: 'dashboard',       label: 'Reception Dashboard',       icon: LayoutDashboard },
            { id: 'patients',        label: 'Patient Registration',       icon: UserPlus },
            { id: 'appointments',    label: 'Appointments & OPD Queue',   icon: CalendarClock },
            { id: 'patient_search',  label: 'Patient Search & Records',   icon: SearchIcon }
          ]
        },
        {
          title: 'BILLING',
          items: [
            { id: 'billing',             label: 'Billing & Invoicing',   icon: Receipt },
            { id: 'payments_receipts',   label: 'Payments & Receipts',   icon: CreditCard }
          ]
        },
        {
          title: 'ACCOUNT',
          items: [
            { id: 'my_profile',    label: 'My Profile', icon: UserCircle }
          ]
        }
      ];
    }

    // ── DOCTOR: exact 3 sections, 7 items ──────────────────────
    if (role === 'doctor') {
      return [
        {
          title: 'CLINICAL WORKSPACE',
          items: [
            { id: 'clinical',          label: 'Doctor OPD Consultation',        icon: Stethoscope, badge: 'Live OPD' },
            { id: 'appointments',      label: 'Appointments & OPD Queue',       icon: CalendarClock },
            { id: 'clinical_records',  label: 'Clinical Records & Prescriptions', icon: FileText },
            { id: 'nurse_station',     label: 'Nurse Triage & Vitals',          icon: HeartPulse },
            { id: 'my_patients',       label: 'My Patients',                    icon: Users }
          ]
        },
        {
          title: 'DOCTOR SETTINGS',
          items: [
            { id: 'doctor_profile_timings', label: 'Doctor Profile & Timings', icon: Clock }
          ]
        },
        {
          title: 'ACCOUNT',
          items: [
            { id: 'my_profile',    label: 'My Profile', icon: UserCircle }
          ]
        }
      ];
    }

    // ── NURSE: exact 3 sections, 9 items in strict order ───────
    if (role === 'nurse') {
      return [
        {
          title: 'NURSING OPERATIONS',
          items: [
            { id: 'nurse_dashboard',   label: 'Nurse Dashboard',                 icon: LayoutDashboard },
            { id: 'nurse_station',     label: 'Nurse Triage & Vitals',          icon: HeartPulse, badge: 'Live Triage' },
            { id: 'patients',          label: 'Patient Registration',            icon: UserPlus },
            { id: 'appointments',      label: 'Appointments & OPD Queue',       icon: CalendarClock }
          ]
        },
        {
          title: 'PATIENT CARE & TASKS',
          items: [
            { id: 'assigned_patients', label: 'Assigned Patients',               icon: Users },
            { id: 'care_tasks',        label: 'Care Tasks',                      icon: ClipboardList },
            { id: 'clinical_records',  label: 'Clinical Records & Prescriptions', icon: FileText },
            { id: 'shift_handover',    label: 'Nursing Shift Handover',          icon: ArrowLeftRight }
          ]
        },
        {
          title: 'ACCOUNT',
          items: [
            { id: 'my_profile',        label: 'My Profile',                      icon: UserCircle }
          ]
        }
      ];
    }

    // ── BILLING EXECUTIVE: exact 2 sections, 8 items in strict order ──
    if (role === 'billing_executive') {
      return [
        {
          title: 'BILLING & FINANCE',
          items: [
            { id: 'billing_dashboard',    label: 'Billing Dashboard',          icon: LayoutDashboard },
            { id: 'billing',              label: 'Billing & Invoicing',        icon: Receipt, badge: 'Cashier Desk' },
            { id: 'tariffs',              label: 'Service Tariffs & Charges',  icon: FileSpreadsheet },
            { id: 'payments_refunds',     label: 'Payments & Refunds',         icon: CreditCard },
            { id: 'revenue_collections',  label: 'Revenue & Collections',      icon: TrendingUp },
            { id: 'invoice_ledger',       label: 'Invoice Ledger',             icon: BookOpen },
            { id: 'receipts_reports',     label: 'Receipts & Reports',         icon: Printer }
          ]
        },
        {
          title: 'ACCOUNT',
          items: [
            { id: 'my_profile',           label: 'My Profile',                 icon: UserCircle }
          ]
        }
      ];
    }

    // ── PHARMACIST / LAB STAFF: exact 2 sections, 8 items in strict order ──
    if (role === 'pharmacist') {
      return [
        {
          title: 'PHARMACY & LAB OPERATIONS',
          items: [
            { id: 'pharmacy_dashboard', label: 'Pharmacy Dashboard',                icon: LayoutDashboard },
            { id: 'prescription_queue', label: 'Prescription Queue',                icon: Pill, badge: 'Live Rx' },
            { id: 'lab_orders',         label: 'Lab Orders & Samples',              icon: FlaskConical },
            { id: 'stock_inventory',    label: 'Stock & Inventory',                 icon: Package },
            { id: 'test_results',       label: 'Test Results & Release',            icon: Activity },
            { id: 'purchase_suppliers', label: 'Purchase & Suppliers',              icon: Truck },
            { id: 'clinical_records',   label: 'Clinical Records & Prescriptions',  icon: FileText }
          ]
        },
        {
          title: 'ACCOUNT',
          items: [
            { id: 'my_profile',         label: 'My Profile',                        icon: UserCircle }
          ]
        }
      ];
    }

    // ── ALL OTHER HOSPITAL ROLES (Hospital Admin, Nurse, etc.) ──
    return [
    {
      title: 'HOSPITAL OPERATIONS',
      items: [
        {
          id: 'dashboard',
          label: 'Hospital Dashboard',
          icon: LayoutDashboard,
          roles: ['hospital_admin', 'doctor', 'receptionist', 'nurse', 'billing_executive', 'pharmacist', 'super_admin']
        },
        {
          id: 'patients',
          label: 'Patient Registration',
          icon: UserPlus,
          roles: ['hospital_admin', 'receptionist', 'nurse', 'doctor', 'billing_executive', 'super_admin']
        },
        {
          id: 'appointments',
          label: 'Appointments & OPD Queue',
          icon: CalendarClock,
          roles: ['hospital_admin', 'receptionist', 'doctor', 'nurse', 'billing_executive', 'super_admin']
        },
        {
          id: 'clinical',
          label: 'Doctor OPD Consultation',
          icon: Stethoscope,
          roles: ['hospital_admin', 'doctor', 'nurse', 'super_admin'],
          badge: role === 'doctor' ? 'Live OPD' : null
        },
        {
          id: 'nurse_station',
          label: 'Nurse Triage & Vitals',
          icon: HeartPulse,
          roles: ['hospital_admin', 'nurse', 'doctor', 'super_admin']
        },
        {
          id: 'clinical_records',
          label: 'Clinical Records & Prescriptions',
          icon: FileText,
          roles: ['hospital_admin', 'doctor', 'nurse', 'pharmacist', 'super_admin']
        },
        // Pharmacy & Lab Queue: separate navigation item only if enabled for hospital
        ...(isPharmacyLabEnabled
          ? [
              {
                id: 'pharmacy_lab',
                label: 'Pharmacy & Lab Queue',
                icon: Pill,
                roles: ['hospital_admin', 'pharmacist', 'lab_technician', 'doctor', 'nurse', 'super_admin'],
                badge: 'Add-on'
              }
            ]
          : [])
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        {
          id: 'staff',
          label: 'Staff Management',
          icon: UserCog,
          roles: ['hospital_admin', 'super_admin']
        },
        {
          id: 'departments',
          label: 'Departments & Specialties',
          icon: Building2,
          roles: ['hospital_admin', 'super_admin']
        },
        {
          id: 'hospital_branches',
          label: 'Branches Management',
          icon: GitFork,
          roles: ['hospital_admin', 'super_admin']
        },
        {
          id: 'hospital_settings',
          label: 'Hospital Settings',
          icon: Sliders,
          roles: ['hospital_admin', 'super_admin']
        },
        {
          id: 'tariffs',
          label: 'Service Tariffs & Charges',
          icon: FileSpreadsheet,
          roles: ['hospital_admin', 'billing_executive', 'super_admin']
        }
      ]
    },
    {
      title: 'FINANCE & REPORTS',
      items: [
        {
          id: 'billing',
          label: 'Billing & Invoicing',
          icon: Receipt,
          roles: ['hospital_admin', 'billing_executive', 'receptionist', 'super_admin']
        },
        {
          id: 'payments_refunds',
          label: 'Payments & Refunds',
          icon: CreditCard,
          roles: ['hospital_admin', 'billing_executive', 'super_admin']
        },
        {
          id: 'operational_reports',
          label: 'Operational Reports',
          icon: BarChart3,
          roles: ['hospital_admin', 'super_admin']
        },
        {
          id: 'revenue_collections',
          label: 'Revenue & Collections',
          icon: TrendingUp,
          roles: ['hospital_admin', 'billing_executive', 'super_admin']
        }
      ]
    },
    {
      title: 'SECURITY & ACCOUNT',
      items: [
        {
          id: 'hospital_users_roles',
          label: 'Users & Roles',
          icon: ShieldCheck,
          roles: ['hospital_admin', 'super_admin']
        },
        {
          id: 'audit',
          label: 'Security Audit Trail',
          icon: ShieldAlert,
          roles: ['hospital_admin', 'super_admin']
        },
        {
          id: 'my_profile',
          label: 'My Profile',
          icon: UserCircle,
          roles: ['hospital_admin', 'doctor', 'nurse', 'receptionist', 'billing_executive', 'pharmacist', 'super_admin', 'patient']
        }
      ]
    }
  ];
  };

  const navSections = getNavSections();

  const handleItemClick = (item) => {
    if (item.isAction && item.id === 'logout_action') {
      setShowLogoutModal(true);
      return;
    }
    setActiveTab(item.id);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const hospitalName = tenant?.name || 'Lazfort Memorial Hospital';
  const adminName = user?.fullName || user?.name || (role === 'patient' ? 'Ramesh Kumar' : (role === 'pharmacist' ? 'Kavita Nair, B.Pharm' : (role === 'billing_executive' ? 'Amit Saxena' : (role === 'nurse' ? 'Sister Marykutty Joseph' : (role === 'doctor' ? 'Dr. Rajesh Sharma, MD' : (role === 'receptionist' ? 'Receptionist' : 'Hospital Administrator'))))));
  const adminRoleDisplay = user?.role === 'patient'
    ? 'Patient Portal'
    : user?.role === 'pharmacist'
    ? 'Pharmacist'
    : user?.role
    ? user.role
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Hospital Admin';

  const sidebarContent = (
    <div
      className={`flex flex-col h-full bg-slate-950 text-slate-300 border-none shadow-2xl transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* 1. Hospital Logo & Name Header */}
      <div className="p-4 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/60 shrink-0">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 shrink-0">
            <Activity className="w-5 h-5 animate-pulse text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-white truncate">
                  LAZFORT
                </span>
                <span className="text-[9px] uppercase tracking-wider font-extrabold bg-sky-500/20 text-sky-400 border border-sky-400/30 px-1.5 py-0.2 rounded shrink-0">
                  ERP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate" title={hospitalName}>
                {hospitalName}
              </p>
            </div>
          )}
        </div>

        {/* Desktop Collapse / Expand Toggle Button */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition"
            title={collapsed ? 'Expand sidebar' : 'Collapse to icon mode'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Drawer Close Button */}
        {setMobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 2. Scrollable Navigation Menu Items */}
      <div 
        className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-scrollbar no-scrollbar text-xs"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {navSections.map((section) => {
          // Filter items based on role access
          const visibleItems = section.items.filter(
            (item) => !item.roles || item.roles.includes(role)
          );

          if (visibleItems.length === 0) return null;

          return (
            <div key={section.title} className="space-y-1">
              {/* Section Header */}
              {!collapsed ? (
                <div className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase text-sky-400/80">
                  {section.title}
                </div>
              ) : (
                <div className="border-t border-slate-800/60 my-2 mx-1" />
              )}

              {/* Items List */}
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id || (item.id === 'patient_dashboard' && (activeTab === 'patient_portal' || (role === 'patient' && activeTab === 'dashboard')));
                  const isAction = item.isAction;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemClick(item)}
                      title={collapsed ? item.label : undefined}
                      className={`w-full flex items-center ${
                        collapsed ? 'justify-center px-2' : 'space-x-3 px-3'
                      } py-2.5 rounded-xl text-xs font-semibold transition group relative ${
                        isActive
                          ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                          : isAction
                          ? 'text-rose-400 hover:text-rose-200 hover:bg-rose-950/40'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900/90'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive
                            ? 'text-white'
                            : isAction
                            ? 'text-rose-400'
                            : 'text-sky-300/80 group-hover:text-sky-200'
                        }`}
                      />

                      {!collapsed && (
                        <>
                          <span className="truncate text-left flex-1 font-medium">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {/* Tooltip on collapsed desktop view */}
                      {collapsed && (
                        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-semibold rounded-lg shadow-xl border border-slate-700 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition z-50">
                          {item.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Profile Card: Logged-in Hospital Admin */}
      <div className="p-3 border-t border-slate-800/90 bg-slate-900/50 shrink-0">
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            {/* Avatar with Status Dot */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-extrabold text-white text-sm">
                  {adminName.charAt(0)}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
            </div>

            {/* Admin Info */}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate" title={adminName}>
                {adminName}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-sky-400 font-semibold truncate">
                  {adminRoleDisplay}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-[10px] text-slate-400 font-mono">
                  {role === 'patient' ? (user?.licenseNumber || 'UHID: LZF-2026-0001') : role === 'pharmacist' ? (user?.department || 'Central Pharmacy & Lab') : (role === 'billing_executive' ? (user?.department || 'Patient Accounts & Billing') : (role === 'nurse' ? (user?.department || 'OPD Triage Station') : (role === 'doctor' ? (user?.department || 'General Medicine') : 'Indiranagar')))}
                </span>
              </div>
            </div>

            {/* Logout Icon Button */}
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition shrink-0 group/logout"
              title="Sign Out / Logout"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover/logout:scale-110" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center group relative">
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition shrink-0 group/logout"
              title="Sign Out / Logout"
            >
              <LogOut className="w-5 h-5 transition-transform group-hover/logout:scale-110" />
            </button>
            {/* Tooltip on collapsed */}
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-semibold rounded-lg shadow-xl border border-slate-700 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition z-50">
              Sign Out / Logout ({adminName})
            </div>
          </div>
        )}
      </div>

      {/* 4. Logout Confirmation Dedicated Page View */}
      {showLogoutModal && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[var(--sidebar-width,18rem)] z-20 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Sign Out Confirmation
              </h1>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6 text-slate-800 text-center">
              <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-sm">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900">Are you sure you want to sign out?</h2>
                <p className="text-xs text-slate-500">
                  {role === 'patient' ? 'Patient Self-Service Portal' : role === 'pharmacist' ? 'Pharmacy & Lab Portal' : (role === 'billing_executive' ? 'Billing Executive Portal' : (role === 'nurse' ? 'Nurse Station Portal' : (role === 'doctor' ? 'Doctor Clinical Portal' : (role === 'receptionist' ? 'Receptionist Portal' : 'Hospital Admin Portal'))))}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 leading-relaxed text-left">
                You are currently logged into <strong className="text-slate-900">{hospitalName}</strong> as <strong className="text-slate-900">{adminName}</strong>. Signing out will conclude your session on this browser. Any unsaved consultation notes or draft entries will be closed.
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Stay Signed In
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-rose-600/30 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Confirm & Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Fixed / Sticky Sidebar */}
      <aside className="hidden md:flex shrink-0 h-[calc(100vh-4rem)] sticky top-16 self-start z-20 relative no-print">
        {sidebarContent}
      </aside>

      {/* Mobile & Tablet Slide-out Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex no-print">
          <div
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 flex">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
