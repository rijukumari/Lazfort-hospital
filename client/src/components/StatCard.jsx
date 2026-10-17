import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'brand', trend }) {
  const colorMap = {
    brand: 'bg-sky-500/10 text-sky-600 border-sky-200/60 shadow-sky-500/10',
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60 shadow-emerald-500/10',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-200/60 shadow-amber-500/10',
    rose: 'bg-rose-500/10 text-rose-600 border-rose-200/60 shadow-rose-500/10',
    purple: 'bg-indigo-500/10 text-indigo-600 border-indigo-200/60 shadow-indigo-500/10'
  };

  return (
    <div className="card-3d glass-card rounded-3xl p-6 border border-white/80 shadow-xl transition-all duration-300 relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{title}</p>
        {Icon && (
          <div className={`p-3 rounded-2xl border shadow-inner ${colorMap[color] || colorMap.brand} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight font-mono">{value}</h3>
        {subtitle && (
          <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1.5">
            {trend && <span className="font-extrabold text-emerald-600">{trend}</span>}
            <span>{subtitle}</span>
          </p>
        )}
      </div>
    </div>
  );
}
