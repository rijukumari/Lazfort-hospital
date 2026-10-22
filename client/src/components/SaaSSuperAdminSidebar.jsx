import React, { useState } from 'react';
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
  Sliders,
  Globe2,
  ShieldAlert,
  Users2,
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
  X
} from 'lucide-react';

export default function SaaSSuperAdminSidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();

  // Collapsible state for each section (all open by default for quick access)
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

  const toggleGroup = (key) => {
    setCollapsedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
        { id: 'saas_settings', label: 'Platform Settings', icon: Sliders },
        { id: 'saas_config', label: 'Global Configuration', icon: Globe2 }
      ]
    },
    {
      key: 'access',
      title: 'ACCESS CONTROL',
      items: [
        { id: 'saas_platform_users', label: 'Platform Users', icon: ShieldCheck },
        { id: 'saas_hospital_users', label: 'Hospital Users', icon: Users2 },
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
      logout();
      return;
    }
    setActiveTab(item.id);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300 w-72 shrink-0 border-r border-slate-800/80 shadow-2xl">
      {/* SaaS Brand Header */}
      <div className="p-4 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider text-white">LAZFORT ERP</span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold bg-sky-500/20 text-sky-400 border border-sky-400/30 px-1.5 py-0.2 rounded">
                SaaS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">SaaS Super Admin</p>
          </div>
        </div>

        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar text-xs">
        {navGroups.map((group) => {
          const isCollapsed = collapsedGroups[group.key];

          return (
            <div key={group.key} className="space-y-1">
              {/* Collapsible Group Header */}
              <button
                type="button"
                onClick={() => toggleGroup(group.key)}
                className="w-full flex items-center justify-between px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase text-slate-500 hover:text-slate-300 transition group"
              >
                <span>{group.title}</span>
                {isCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
                )}
              </button>

              {/* Group Items */}
              {!isCollapsed && (
                <div className="space-y-0.5 mt-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    // Active highlighting: saas_overview is also active if activeTab is 'dashboard'
                    const isActive = activeTab === item.id || (item.id === 'saas_overview' && activeTab === 'dashboard');

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                            : item.isAction
                            ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.isAction ? 'text-rose-400' : 'text-slate-400'}`} />
                        <span className="truncate text-left flex-1">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer User Info & Logout Button */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950 text-[11px] text-slate-500 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shrink-0">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-black text-white text-xs">
                {user?.fullName?.charAt(0) || 'V'}
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.fullName || 'Super Admin'}</p>
              <span className="text-[10px] text-sky-400 font-mono block">Global Root</span>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition shrink-0 group/logout"
            title="Sign Out / Logout"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover/logout:scale-110" />
          </button>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight border-t border-slate-800/60 pt-2">
          Multi-Tenant Orchestration &bull; Build v2.4.1
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sticky Sidebar */}
      <aside className="hidden md:flex shrink-0 h-[calc(100vh-4rem)] sticky top-16 self-start z-20 relative no-print">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
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
