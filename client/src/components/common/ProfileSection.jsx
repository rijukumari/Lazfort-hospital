import React from 'react';
import Avatar from './Avatar';
import { LogOut } from 'lucide-react';

export default function ProfileSection({
  name = 'User',
  role = 'Staff',
  subtitle,
  avatarSrc,
  status = 'online',
  onLogout,
  onClick,
  collapsed = false,
  className = ''
}) {
  if (collapsed) {
    return (
      <div className={`flex justify-center group relative ${className}`}>
        <button
          type="button"
          onClick={onLogout || onClick}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
          title={`Sign Out (${name})`}
          aria-label={`Sign Out (${name})`}
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>
        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-semibold rounded-lg shadow-xl border border-slate-700 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition z-50">
          Sign Out / Logout ({name})
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      <div
        className={`flex items-center space-x-2.5 min-w-0 ${onClick ? 'cursor-pointer group/profile' : ''}`}
        onClick={onClick}
        title={onClick ? `View Profile: ${name}` : name}
      >
        <Avatar name={name} src={avatarSrc} status={status} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-white truncate group-hover/profile:text-sky-300 transition-colors" title={name}>
            {name}
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-sky-400 font-semibold truncate">{role}</span>
            {subtitle && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                <span className="text-[10px] text-slate-400 font-mono truncate" title={subtitle}>
                  {subtitle}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center group/logout"
          title="Sign Out / Logout"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4 transition-transform group-hover/logout:scale-110" />
        </button>
      )}
    </div>
  );
}
