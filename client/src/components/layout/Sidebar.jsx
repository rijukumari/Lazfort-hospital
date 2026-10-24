import React, { useState } from 'react';
import { Activity, ChevronLeft, ChevronRight, X } from 'lucide-react';
import SidebarGroup from './SidebarGroup';
import UserProfile from './UserProfile';

export default function Sidebar({
  brandTitle = 'LAZFORT',
  roleTitle = 'Hospital ERP',
  roleBadge = 'ERP',
  groups = [],
  activeTab,
  onSelectTab,
  userProfile = {},
  footerNote,
  collapsed = false,
  onToggleCollapse,
  onCloseMobile
}) {
  return (
    <div
      className={`flex flex-col h-full bg-slate-950 text-slate-300 border-r border-slate-800/80 shadow-2xl transition-all duration-300 ease-in-out w-[280px] max-w-[85vw] md:max-w-none ${
        collapsed ? 'md:w-20' : 'md:w-64 lg:w-72'
      }`}
    >
      {/* 1. Brand Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/60 shrink-0">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 shrink-0">
            <Activity className="w-5 h-5 animate-pulse text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-white truncate">
                  {brandTitle}
                </span>
                {roleBadge && (
                  <span className="text-[9px] uppercase tracking-wider font-extrabold bg-sky-500/20 text-sky-400 border border-sky-400/30 px-1.5 py-0.2 rounded shrink-0">
                    {roleBadge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate" title={roleTitle}>
                {roleTitle}
              </p>
            </div>
          )}
        </div>

        {/* Desktop / Tablet Collapse Toggle */}
        {onToggleCollapse && (
          <div className="hidden md:flex items-center">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition"
              title={collapsed ? 'Expand sidebar' : 'Collapse to icon mode'}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Mobile Drawer Close */}
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            title="Close navigation"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 2. Scrollable Middle Navigation Groups */}
      <div
        className="flex-1 overflow-y-auto px-2.5 py-3.5 space-y-4 custom-scrollbar-dark text-xs"
        style={{ scrollbarWidth: 'thin' }}
      >
        {groups.map((group) => (
          <SidebarGroup
            key={group.key || group.title}
            title={group.title}
            items={group.items}
            activeTab={activeTab}
            onSelectTab={onSelectTab}
            collapsed={collapsed}
          />
        ))}
      </div>

      {/* 3. Bottom Profile Card & Footer */}
      <div className="p-3 border-t border-slate-800/90 bg-slate-900/60 shrink-0 space-y-2">
        <UserProfile
          name={userProfile.name}
          role={userProfile.role}
          subtitle={userProfile.subtitle}
          avatarSrc={userProfile.avatarSrc}
          collapsed={collapsed}
          onLogout={userProfile.onLogout}
          onClick={userProfile.onClick}
        />
        {!collapsed && footerNote && (
          <p className="text-[10px] text-slate-500 leading-tight border-t border-slate-800/60 pt-2 truncate" title={footerNote}>
            {footerNote}
          </p>
        )}
      </div>
    </div>
  );
}
