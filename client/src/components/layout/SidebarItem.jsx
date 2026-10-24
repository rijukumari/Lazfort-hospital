import React from 'react';

export default function SidebarItem({
  id,
  label,
  icon: Icon,
  badge,
  isActive = false,
  isAction = false,
  collapsed = false,
  onClick
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`w-full flex items-center ${
        collapsed ? 'justify-center px-2' : 'space-x-2.5 px-3'
      } py-2 min-h-[40px] sm:min-h-[42px] rounded-xl text-xs font-semibold transition group relative select-none ${
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
          <span className="truncate text-left flex-1 font-medium">{label}</span>
          {badge && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold shrink-0">
              {badge}
            </span>
          )}
        </>
      )}

      {/* Tooltip in collapsed icon mode */}
      {collapsed && (
        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-semibold rounded-lg shadow-xl border border-slate-700 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition z-50">
          {label}
        </div>
      )}
    </button>
  );
}
