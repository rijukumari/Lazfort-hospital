import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, Activity, X, ChevronLeft, ChevronRight, LogOut, ArrowLeft, AlertTriangle } from 'lucide-react';
import { ProfileSection, ErrorBoundary } from '../components/common';

export default function BaseRoleLayout({
  roleTitle = 'Portal',
  roleBadge = 'ERP',
  navSections = [], // [{ title, items: [{ id, label, icon: Icon, badge, isAction }] }]
  activeTab,
  setActiveTab,
  profileData = {}, // { name, role, subtitle, avatarSrc }
  footerNote,
  children
}) {
  const { user, logout, tenant } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Close mobile drawer on Escape key or close logout modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showLogoutModal) {
          setShowLogoutModal(false);
        } else if (mobileOpen) {
          setMobileOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, showLogoutModal]);

  // Lock body scroll when mobile drawer is open
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

  // Dynamic --sidebar-width: 0rem (<1024px tablet/mobile), 5rem (collapsed desktop), 18rem/288px (desktop)
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

  // Reset scroll on tab change
  useEffect(() => {
    const el = document.getElementById('main-content-viewport');
    if (el) {
      el.scrollTop = 0;
    }
  }, [activeTab]);

  const handleItemClick = (item) => {
    if (item.isAction && item.id === 'logout_action') {
      setShowLogoutModal(true);
      return;
    }
    setActiveTab(item.id);
    setMobileOpen(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const hospitalName = tenant?.name || 'LAZFORT Memorial Hospital';
  const displayName = profileData.name || user?.fullName || user?.name || 'Hospital User';
  const displayRole = profileData.role || (user?.role ? user.role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Staff');

  const sidebarContent = (
    <div
      className={`flex flex-col h-full bg-slate-950 text-slate-300 border-r border-slate-800/80 shadow-2xl transition-all duration-300 ease-in-out w-[280px] max-w-[85vw] lg:max-w-none ${
        collapsed ? 'lg:w-20' : 'lg:w-72'
      }`}
    >
      {/* 1. Header with Logo & Role */}
      <div className="p-3.5 sm:p-4 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/60 shrink-0">
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
                  {roleBadge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate" title={roleTitle}>
                {roleTitle}
              </p>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle (>= 1024px) */}
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

        {/* Mobile Drawer Close */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          title="Close navigation"
          aria-label="Close navigation drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Scrollable Role-Specific Menu */}
      <div 
        className="flex-1 overflow-y-auto px-2.5 py-3.5 space-y-4 custom-scrollbar-dark text-xs"
        style={{ scrollbarWidth: 'thin' }}
      >
        {navSections.map((section) => {
          const visibleItems = section.items || [];
          if (visibleItems.length === 0) return null;

          return (
            <div key={section.title} className="space-y-1">
              {!collapsed ? (
                <div className="px-2.5 py-1 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase text-sky-400/80">
                  {section.title}
                </div>
              ) : (
                <div className="border-t border-slate-800/60 my-2 mx-1" />
              )}

              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = 
                    activeTab === item.id || 
                    (item.id === 'dashboard' && activeTab === 'dashboard') ||
                    (item.id === 'nurse_dashboard' && activeTab === 'nurse_dashboard') ||
                    (item.id === 'billing_dashboard' && activeTab === 'billing_dashboard') ||
                    (item.id === 'pharmacy_dashboard' && activeTab === 'pharmacy_dashboard') ||
                    (item.id === 'patient_dashboard' && (activeTab === 'patient_portal' || activeTab === 'patient_dashboard' || activeTab === 'dashboard' || activeTab === 'patient'));
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
                      {Icon && (
                        <Icon
                          className={`w-[18px] h-[18px] shrink-0 transition-transform group-hover:scale-110 ${
                            isActive
                              ? 'text-white'
                              : isAction
                              ? 'text-rose-400'
                              : 'text-sky-400 group-hover:text-sky-300'
                          }`}
                        />
                      )}

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

      {/* 3. Bottom Profile Card & Footer */}
      <div className="p-3 border-t border-slate-800/90 bg-slate-900/60 shrink-0 space-y-2">
        <ProfileSection
          name={displayName}
          role={displayRole}
          subtitle={profileData.subtitle}
          avatarSrc={profileData.avatarSrc}
          onLogout={() => setShowLogoutModal(true)}
          onClick={() => setActiveTab('my_profile')}
          collapsed={collapsed}
        />
        {!collapsed && footerNote && (
          <p className="text-[10px] text-slate-500 leading-tight border-t border-slate-800/60 pt-2 truncate" title={footerNote}>
            {footerNote}
          </p>
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
                {roleTitle} &bull; {hospitalName}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 leading-relaxed text-left">
              You are currently signed into <strong className="text-slate-900">{hospitalName}</strong> as <strong className="text-slate-900">{displayName}</strong> ({displayRole}). Signing out will conclude your session on this browser.
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
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Mobile & Tablet Top Header (Screens < 1024px) */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-xs no-print shrink-0">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1 mr-2">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100 transition active:scale-95 border border-slate-200/80 bg-slate-50/80 shrink-0"
            title="Toggle Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0 font-black text-xs">
              LZ
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs text-slate-900 tracking-tight block truncate">
                  <span className="sm:hidden">LAZFORT</span>
                  <span className="hidden sm:inline">{hospitalName}</span>
                </span>
                {roleBadge && (
                  <span className="text-[9px] uppercase font-extrabold bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded border border-sky-200 shrink-0">
                    {roleBadge}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 font-medium block truncate">
                <span className="sm:hidden">{roleTitle.replace('Self-Service ', '').replace('Hospital ', '')}</span>
                <span className="hidden sm:inline">{roleTitle}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs ring-2 ring-white">
            {displayName.charAt(0)}
          </div>
        </div>
      </header>

      {/* Main Workspace: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden min-w-0">
        {/* Desktop Sticky Sidebar (>= 1024px) */}
        <aside className="hidden lg:flex shrink-0 h-full z-20 relative no-print">
          {sidebarContent}
        </aside>

        {/* Mobile & Tablet Slide-out Drawer (< 1024px) */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex no-print">
            <div
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation overlay"
            />
            <div className="relative z-10 flex h-full w-[280px] max-w-[85vw] animate-in slide-in-from-left duration-200 shadow-2xl">
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <div id="main-content-viewport" className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
          <main className="p-3 sm:p-5 lg:p-6 max-w-7xl mx-auto w-full min-w-0">
            <ErrorBoundary onNavigateHome={() => setActiveTab && setActiveTab('dashboard')}>
              {children}
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </div>
  );
}
