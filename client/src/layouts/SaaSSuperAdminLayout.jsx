import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';
import SaaSSuperAdminSidebar from '../components/SaaSSuperAdminSidebar';
import { ErrorBoundary } from '../components/common';

export default function SaaSSuperAdminLayout({
  activeTab,
  setActiveTab,
  children
}) {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Reset scroll on tab change
  useEffect(() => {
    const el = document.getElementById('main-content-viewport');
    if (el) {
      el.scrollTop = 0;
    }
  }, [activeTab]);

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Mobile & Tablet Header Bar (< 1024px) */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-xs no-print shrink-0">
        <div className="flex items-center space-x-2.5 min-w-0">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100 transition active:scale-95 border border-slate-200/80 bg-slate-50/80 shrink-0"
            title="Toggle Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0 font-black text-xs">
              LZ
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-xs text-slate-900 tracking-tight block truncate">
                LAZFORT SaaS
              </span>
              <span className="text-[10px] text-sky-600 font-semibold block truncate">
                SaaS Super Admin
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {user?.fullName?.charAt(0) || 'V'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden min-w-0">
        <SaaSSuperAdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <div id="main-content-viewport" className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
          <main className="p-3 sm:p-5 lg:p-6 max-w-7xl mx-auto w-full min-w-0">
            <ErrorBoundary onNavigateHome={() => setActiveTab && setActiveTab('saas_overview')}>
              {children}
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </div>
  );
}
