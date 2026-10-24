import React from 'react';
import { Menu, Activity } from 'lucide-react';

export default function Header({
  title = 'LAZFORT Memorial Hospital',
  subtitle = 'Hospital ERP',
  badge = 'ERP',
  userName = 'User',
  onMenuToggle,
  rightActions
}) {
  const initial = (userName || 'U').charAt(0).toUpperCase();

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-3.5 py-2.5 flex items-center justify-between shadow-xs no-print shrink-0">
      <div className="flex items-center space-x-2.5 min-w-0">
        <button
          type="button"
          onClick={onMenuToggle}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100 transition active:scale-95 border border-slate-200/80 bg-slate-50/80 shrink-0"
          title="Toggle Navigation Menu"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0 font-black text-xs">
            <Activity className="w-4 h-4 animate-pulse text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-slate-900 tracking-tight block truncate">
                <span className="sm:hidden">LAZFORT</span>
                <span className="hidden sm:inline">{title}</span>
              </span>
              {badge && (
                <span className="text-[9px] uppercase font-extrabold bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded border border-sky-200 shrink-0">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <span className="text-[10px] text-slate-500 font-medium block truncate">
                <span className="sm:hidden">{subtitle.replace('Self-Service ', '').replace('Hospital ', '')}</span>
                <span className="hidden sm:inline">{subtitle}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0">
        {rightActions}
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
          {initial}
        </div>
      </div>
    </header>
  );
}
