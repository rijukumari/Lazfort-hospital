import React from 'react';
import { LogOut } from 'lucide-react';

export default function UserProfile({
  name = 'Hospital User',
  role = 'Staff',
  subtitle,
  avatarSrc,
  collapsed = false,
  onLogout,
  onClick
}) {
  const initial = (name || 'U').charAt(0).toUpperCase();

  return (
    <div
      className={`flex items-center ${
        collapsed ? 'justify-center p-1.5' : 'p-2 space-x-2.5'
      } rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 transition select-none`}
    >
      <button
        type="button"
        onClick={onClick}
        title={collapsed ? `${name} (${role})` : undefined}
        className="flex items-center space-x-2.5 min-w-0 flex-1 text-left"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-sky-500/20 shrink-0">
          {avatarSrc ? (
            <img src={avatarSrc} alt={name} className="w-full h-full object-cover rounded-xl" />
          ) : (
            initial
          )}
        </div>

        {!collapsed && (
          <div className="min-w-0 flex-1">
            <span className="font-bold text-xs text-white block truncate">{name}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-sky-400 font-medium truncate block">{role}</span>
              {subtitle && (
                <>
                  <span className="text-[10px] text-slate-500">&bull;</span>
                  <span className="text-[10px] text-slate-400 truncate block">{subtitle}</span>
                </>
              )}
            </div>
          </div>
        )}
      </button>

      {!collapsed && onLogout && (
        <button
          type="button"
          onClick={onLogout}
          title="Sign out"
          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
