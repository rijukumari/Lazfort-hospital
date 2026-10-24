import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading this section. Please try again.',
  onRetry,
  compact = false,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-6 px-4' : 'py-12 px-6'} ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-sm sm:text-base font-bold text-slate-800">{title}</h4>
      {message && <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">{message}</p>}
      {onRetry && (
        <div className="mt-4">
          <Button variant="secondary" size="sm" icon={RotateCcw} onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
