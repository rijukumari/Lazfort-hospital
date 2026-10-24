import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  changeType = 'increase', // 'increase' | 'decrease' | 'neutral'
  subtitle,
  icon: Icon,
  variant = 'blue', // 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple'
  onClick,
  className = ''
}) {
  const variantStyles = {
    blue: {
      iconBg: 'bg-sky-50 text-sky-600 border-sky-100',
      glow: 'group-hover:border-sky-300'
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      glow: 'group-hover:border-emerald-300'
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      glow: 'group-hover:border-amber-300'
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      glow: 'group-hover:border-rose-300'
    },
    indigo: {
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      glow: 'group-hover:border-indigo-300'
    },
    purple: {
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      glow: 'group-hover:border-purple-300'
    }
  };

  const style = variantStyles[variant] || variantStyles.blue;

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs transition duration-200 group
        ${onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''}
        ${style.glow}
        ${className}
      `}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block truncate">{title}</span>
        {Icon && (
          <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${style.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono">{value}</span>
        {change && (
          <span className={`inline-flex items-center text-xs font-bold gap-0.5 ${
            changeType === 'increase' ? 'text-emerald-600' : changeType === 'decrease' ? 'text-rose-600' : 'text-slate-500'
          }`}>
            {changeType === 'increase' ? <TrendingUp className="w-3.5 h-3.5" /> : changeType === 'decrease' ? <TrendingDown className="w-3.5 h-3.5" /> : null}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-slate-500 mt-1 truncate">{subtitle}</p>
      )}
    </div>
  );
}
