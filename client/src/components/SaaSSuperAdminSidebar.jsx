import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  BarChart3,
  Activity,
  Building2,
  UserPlus,
  GitFork,
  CreditCard,
  FileCheck,
  Receipt,
  ArrowLeftRight,
  Gauge,
  Boxes,
  SlidersHorizontal,
  Globe,
  ShieldAlert,
  Users,
  ShieldCheck,
  FileSearch,
  KeyRound,
  Terminal,
  AlertTriangle,
  LifeBuoy,
  BellRing,
  Wrench,
  Cpu,
  UserCircle,
  LockKeyhole,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  ArrowLeft
} from 'lucide-react';

export default function SaaSSuperAdminSidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // All 8 sections default to expanded for quick, full access to all 28 items
  const [collapsedGroups, setCollapsedGroups] = useState({
    main: false,
    tenants: false,
    billing: false,
    platform: false,
    access: false,
    security: false,
    support: false,
    account: false
  });

  // Handle Escape key to close mobile drawer or logout modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showLogoutModal) {
          setShowLogoutModal(false);
        } else if (mobileOpen && setMobileOpen) {
          setMobileOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, setMobileOpen, showLogoutModal]);

  // Prevent background scrolling when mobile navigation drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Dynamic --sidebar-width: 0rem (<1024px tablet/mobile), 5rem (collapsed desktop), 18rem/288px (desktop lg)
  useEffect(() => {
    const updateSidebarWidth = () => {
      if (window.innerWidth < 1024) {
        document.documentElement.style.setProperty('--sidebar-width', '0rem');
      } else if (collapsed) {
        document.documentElement.style.setProperty('--sidebar-width', '5rem');
      } else {
        document.documentElement.style.setProperty('--sidebar-width', '18rem');
      }
    };
    updateSidebarWidth();
    window.addEventListener('resize', updateSidebarWidth);
    return () => {
      window.removeEventListener('resize', updateSidebarWidth);
      document.documentElement.style.setProperty('--sidebar-width', '18rem');
    };
  }, [collapsed]);

  const toggleGroup = (key) => {
    setCollapsedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Exact 8 groups containing all 28 items in requested order
  const navGroups = [
    {
      key: 'main',
      title: 'MAIN',
      items: [
        { id: 'saas_overview', label: 'Platform Overview', icon: LayoutDashboard },
        { id: 'saas_analytics', label: 'Platform Analytics', icon: BarChart3 },
        { id: 'saas_health', label: 'System Health', icon: Activity }
      ]
    },
    {
      key: 'tenants',
      title: 'TENANT MANAGEMENT',
      items: [
        { id: 'saas_tenants', label: 'Hospital Tenants', icon: Building2 },
        { id: 'saas_onboarding', label: 'Tenant Onboarding', icon: UserPlus },
        { id: 'saas_branches', label: 'Branch Management', icon: GitFork }
      ]
    },
    {
      key: 'billing',
      title: 'SUBSCRIPTIONS & BILLING',
      items: [
        { id: 'saas_plans', label: 'Subscription Plans', icon: CreditCard },
        { id: 'saas_subscriptions', label: 'Tenant Subscriptions', icon: FileCheck },
        { id: 'saas_invoices', label: 'Platform Invoices', icon: Receipt },
        { id: 'saas_transactions', label: 'Payments & Transactions', icon: ArrowLeftRight },
        { id: 'saas_usage', label: 'Usage & Limits', icon: Gauge }
      ]
    },
    {
      key: 'platform',
      title: 'PLATFORM CONFIGURATION',
      items: [
        { id: 'saas_modules', label: 'Module Management', icon: Boxes },
        { id: 'saas_settings', label: 'Platform Settings', icon: SlidersHorizontal },
        { id: 'saas_config', label: 'Global Configuration', icon: Globe }
      ]
    },
    {
      key: 'access',
      title: 'ACCESS CONTROL',
      items: [
        { id: 'saas_platform_users', label: 'Platform Users', icon: ShieldCheck },
        { id: 'saas_hospital_users', label: 'Hospital Users', icon: Users },
        { id: 'saas_roles', label: 'Roles & Permissions', icon: ShieldAlert }
      ]
    },
    {
      key: 'security',
      title: 'SECURITY & MONITORING',
      items: [
        { id: 'saas_audit', label: 'Security Audit Trail', icon: FileSearch },
        { id: 'saas_sessions', label: 'Login & Sessions', icon: KeyRound },
        { id: 'saas_logs', label: 'System Logs', icon: Terminal },
        { id: 'saas_alerts', label: 'Security Alerts', icon: AlertTriangle }
      ]
    },
    {
      key: 'support',
      title: 'SUPPORT & OPERATIONS',
      items: [
        { id: 'saas_tickets', label: 'Support Tickets', icon: LifeBuoy },
        { id: 'saas_notifications', label: 'Platform Notifications', icon: BellRing },
        { id: 'saas_maintenance', label: 'Maintenance Management', icon: Wrench },
        { id: 'saas_integrations', label: 'Integration Management', icon: Cpu }
      ]
    },
    {
      key: 'account',
      title: 'ACCOUNT',
      items: [
        { id: 'saas_profile', label: 'My Profile', icon: UserCircle },
        { id: 'saas_password', label: 'Change Password', icon: LockKeyhole }
      ]
    }
  ];

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

  const adminName = user?.fullName || 'Vikramaditya Singhania';

  const sidebarContent = (
    <div
      className={`flex flex-col h-full bg-slate-950 text-slate-300 border-r border-slate-800/80 shadow-2xl transition-all duration-300 ease-in-out w-[280px] max-w-[85vw] lg:max-w-none ${
        collapsed ? 'lg:w-20' : 'lg:w-72'
      }`}
    >
      {/* 1. SaaS Brand Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/60 shrink-0">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/25 shrink-0">
            <Activity className="w-5 h-5 animate-pulse text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-white truncate">
                  LAZFORT
                </span>
                <span className="text-[9px] uppercase tracking-wider font-extrabold bg-sky-500/20 text-sky-400 border border-sky-400/30 px-1.5 py-0.2 rounded shrink-0">
                  SaaS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                SaaS Super Admin
              </p>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle Button (>= 1024px) */}
        <div className="hidden lg:flex items-center">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition"
            title={collapsed ? 'Expand sidebar' : 'Collapse to icon mode'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile & Tablet Drawer Close Button */}
        {setMobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            title="Close menu"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 2. Scrollable Navigation Menu (All 28 items in 8 collapsible groups) */}
      <div 
        className="flex-1 overflow-y-auto px-2.5 py-3.5 space-y-3.5 custom-scrollbar-dark text-xs"
        style={{ scrollbarWidth: 'thin' }}
      >
        {navGroups.map((group) => {
          const isCollapsed = collapsedGroups[group.key];

          return (
            <div key={group.key} className="space-y-1">
              {/* Group Header with Chevron Collapse Toggle */}
              {!collapsed ? (
                <button
                  type="button"
                  onClick={() => toggleGroup(group.key)}
                  className="w-full flex items-center justify-between px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase text-sky-400/80 hover:text-sky-300 transition group rounded-lg hover:bg-slate-900/60"
                  title={`${isCollapsed ? 'Expand' : 'Collapse'} ${group.title}`}
                >
                  <span className="truncate">{group.title}</span>
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-300 transition-transform shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-300 transition-transform shrink-0" />
                  )}
                </button>
              ) : (
                <div className="border-t border-slate-800/60 my-2 mx-1" />
              )}

              {/* Group Items (Visible if group is not collapsed or in icon mode) */}
              {(!isCollapsed || collapsed) && (
                <div className="space-y-0.5 mt-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id || (item.id === 'saas_overview' && activeTab === 'dashboard');
                    const isAction = item.isAction;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleItemClick(item)}
                        title={collapsed ? item.label : undefined}
                        className={`w-full flex items-center ${
                          collapsed ? 'justify-center px-2' : 'space-x-2.5 px-3'
                        } py-2 min-h-[40px] sm:min-h-[42px] rounded-xl text-xs font-semibold transition group relative ${
                          isActive
                            ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                            : isAction
                            ? 'text-rose-400 hover:text-rose-200 hover:bg-rose-950/40'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900/90'
                        }`}
                      >
                        <Icon
                          className={`w-[18px] h-[18px] shrink-0 transition-transform group-hover:scale-110 ${
                            isActive
                              ? 'text-white'
                              : isAction
                              ? 'text-rose-400'
                              : 'text-sky-400 group-hover:text-sky-300'
                          }`}
                        />

                        {!collapsed && (
                          <span className="truncate text-left flex-1 font-medium">
                            {item.label}
                          </span>
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
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Profile Section & Multi-Tenant Footer */}
      <div className="p-3 border-t border-slate-800/90 bg-slate-900/60 shrink-0 space-y-2.5">
        {!collapsed ? (
          <>
            <div className="flex items-center justify-between gap-2">
              <div 
                className="flex items-center space-x-2.5 min-w-0 cursor-pointer group/profile"
                onClick={() => handleItemClick({ id: 'saas_profile' })}
                title="View SaaS Profile"
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-md">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-black text-white text-xs">
                      {adminName.charAt(0)}
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate group-hover/profile:text-sky-300 transition-colors" title={adminName}>
                    {adminName}
                  </p>
                  <span className="text-[10px] text-sky-400 font-mono block">
                    Global Root
                  </span>
                </div>
              </div>

              {/* Logout Icon Button */}
              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition shrink-0 group/logout min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Sign Out / Logout"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4 transition-transform group-hover/logout:scale-110" />
              </button>
            </div>

            {/* Build & Orchestration Label */}
            <p className="text-[10px] text-slate-500 leading-tight border-t border-slate-800/60 pt-2 truncate" title="Multi-Tenant Orchestration • Build v2.4.1">
              Multi-Tenant Orchestration &bull; Build v2.4.1
            </p>
          </>
        ) : (
          <div className="flex justify-center group relative">
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition shrink-0 group/logout min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Sign Out / Logout"
              aria-label="Logout"
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

      {/* 4. Sign Out Confirmation Modal */}
      {showLogoutModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="fixed inset-0"
            onClick={() => setShowLogoutModal(false)}
            aria-label="Close modal overlay"
          />
          <div className="relative z-10 bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-800 text-center max-w-xl w-full mx-auto animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">Are you sure you want to sign out?</h2>
              <p className="text-xs text-slate-500 font-medium">
                LAZFORT ERP SaaS Super Admin Console (Global Root)
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 leading-relaxed text-left">
              You are currently signed in as <strong className="text-slate-900">{adminName}</strong> with platform root privileges. Signing out will close your active session across tenant orchestration services.
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
        </div>,
        document.body
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sticky Sidebar (>= 1024px) */}
      <aside className="hidden lg:flex shrink-0 h-full z-20 relative no-print">
        {sidebarContent}
      </aside>

      {/* Mobile & Tablet Slide-out Drawer (< 1024px) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex no-print">
          <div
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />
          <div className="relative z-10 flex h-full w-[280px] max-w-[85vw] animate-in slide-in-from-left duration-200 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
