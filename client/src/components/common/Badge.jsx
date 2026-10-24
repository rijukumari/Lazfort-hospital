import React from 'react';

export default function Badge({
  children,
  variant = 'neutral', // 'success' | 'warning' | 'danger' | 'info' | 'brand' | 'neutral' | 'purple'
  size = 'md', // 'sm' | 'md'
  dot = false,
  className = ''
}) {
  const sizeMap = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-2.5 py-1'
  };

  const variantMap = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/80',
    info: 'bg-sky-50 text-sky-700 border-sky-200/80',
    brand: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80'
  };

  const dotColorMap = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    brand: 'bg-indigo-500',
    neutral: 'bg-slate-500',
    purple: 'bg-purple-500'
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-bold rounded-full border tracking-wide uppercase font-mono
        ${sizeMap[size] || sizeMap.md}
        ${variantMap[variant] || variantMap.neutral}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColorMap[variant] || dotColorMap.neutral}`} />
      )}
      <span>{children}</span>
    </span>
  );
}
