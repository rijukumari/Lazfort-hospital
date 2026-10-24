import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingState({
  message = 'Loading data...',
  description = 'Connecting to high-speed healthcare node',
  size = 'md',
  fullHeight = false,
  className = ''
}) {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-3xl ${
        fullHeight ? 'min-h-[400px]' : 'py-12'
      } ${className}`}
    >
      <div className="relative mb-3">
        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-600 shadow-inner">
          <Loader className={`${iconSizes[size] || iconSizes.md} animate-spin text-sky-600`} />
        </div>
      </div>
      <h4 className="text-sm font-extrabold text-slate-800 tracking-tight">{message}</h4>
      {description && <p className="text-xs text-slate-400 mt-0.5 max-w-sm">{description}</p>}
    </div>
  );
}
