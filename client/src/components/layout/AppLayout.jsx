import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';

export default function AppLayout({
  brandTitle = 'LAZFORT',
  roleTitle = 'Hospital Portal',
  roleBadge = 'ERP',
  navGroups = [],
  activeTab,
  setActiveTab,
  userProfile = {},
  footerNote,
  children
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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

  // Reset scroll on activeTab change
  useEffect(() => {
    const el = document.getElementById('main-content-viewport');
    if (el) {
      el.scrollTop = 0;
    }
  }, [activeTab]);

  const handleSelectTab = (item) => {
    if (item.isAction && item.onClick) {
      item.onClick();
      return;
    }
    setActiveTab(item.id);
    setMobileOpen(false);
  };

  const sidebarElement = (
    <Sidebar
      brandTitle={brandTitle}
      roleTitle={roleTitle}
      roleBadge={roleBadge}
      groups={navGroups}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      userProfile={userProfile}
      footerNote={footerNote}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed(!collapsed)}
      onCloseMobile={() => setMobileOpen(false)}
    />
  );

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Mobile Top Header (Screens < 768px) */}
      <Header
        title={brandTitle}
        subtitle={roleTitle}
        badge={roleBadge}
        userName={userProfile.name}
        onMenuToggle={() => setMobileOpen(true)}
      />

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden min-w-0">
        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:flex shrink-0 h-full z-20 relative no-print">
          {sidebarElement}
        </aside>

        {/* Mobile Navigation Drawer */}
        <MobileNavigation isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          {sidebarElement}
        </MobileNavigation>

        {/* Responsive Content Viewport */}
        <div id="main-content-viewport" className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
          <main className="p-3 sm:p-5 lg:p-6 max-w-7xl mx-auto w-full min-w-0 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
