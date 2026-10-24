import React from 'react';

export default function Spinner({ size = 'md', variant = 'primary', className = '' }) {
  const sizeMap = {
    xs: 'w-3.5 h-3.5 border-2',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-10 h-10 border-4'
  };

  const variantMap = {
    primary: 'border-sky-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    slate: 'border-slate-500 border-t-transparent',
    emerald: 'border-emerald-600 border-t-transparent',
    rose: 'border-rose-600 border-t-transparent'
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`rounded-full animate-spin shrink-0 ${sizeMap[size] || sizeMap.md} ${variantMap[variant] || variantMap.primary} ${className}`}
    />
  );
}
