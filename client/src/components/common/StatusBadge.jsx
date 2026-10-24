import React from 'react';

const statusConfig = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  finalized: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
  waiting: 'bg-amber-50 text-amber-700 border-amber-200',
  draft: 'bg-amber-50 text-amber-700 border-amber-200',
  
  inactive: 'bg-slate-100 text-slate-700 border-slate-200',
  cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
  archived: 'bg-slate-100 text-slate-600 border-slate-200',
  
  error: 'bg-rose-50 text-rose-700 border-rose-200',
  danger: 'bg-rose-50 text-rose-700 border-rose-200',
  failed: 'bg-rose-50 text-rose-700 border-rose-200',
  suspended: 'bg-rose-50 text-rose-700 border-rose-200',
  critical: 'bg-rose-50 text-rose-700 border-rose-200',
  
  info: 'bg-sky-50 text-sky-700 border-sky-200',
  planned: 'bg-sky-50 text-sky-700 border-sky-200',
  scheduled: 'bg-sky-50 text-sky-700 border-sky-200',
  trial: 'bg-indigo-50 text-indigo-700 border-indigo-200'
};

export default function StatusBadge({ status = 'active', text, size = 'sm', pulse = false, className = '' }) {
  const normalizedKey = String(status).toLowerCase().replace(/[\s-]/g, '_');
  const colorClasses = statusConfig[normalizedKey] || 'bg-slate-100 text-slate-700 border-slate-200';
  const displayText = text || status;

  const sizeClasses = size === 'xs'
    ? 'text-[10px] px-1.5 py-0.2'
    : size === 'lg'
    ? 'text-xs px-3 py-1 font-extrabold'
    : 'text-[11px] px-2 py-0.5 font-bold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase font-mono ${sizeClasses} ${colorClasses} ${className}`}
    >
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping opacity-75 shrink-0" />
      )}
      <span className="truncate">{displayText}</span>
    </span>
  );
}
