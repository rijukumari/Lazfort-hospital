import React from 'react';

export default function Avatar({
  name = 'User',
  src,
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status, // 'online' | 'busy' | 'offline'
  className = ''
}) {
  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const statusColorMap = {
    online: 'bg-emerald-500',
    busy: 'bg-rose-500',
    offline: 'bg-slate-400'
  };

  const initial = name ? name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div className={`${sizeMap[size] || sizeMap.md} rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-xs`}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-extrabold text-white">
            {initial}
          </div>
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${statusColorMap[status] || statusColorMap.online}`}
        />
      )}
    </div>
  );
}
