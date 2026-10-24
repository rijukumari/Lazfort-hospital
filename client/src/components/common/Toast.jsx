import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({
  type = 'info', // 'success' | 'error' | 'warning' | 'info'
  message,
  description,
  onClose,
  className = ''
}) {
  const typeMap = {
    success: {
      icon: CheckCircle2,
      style: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      iconStyle: 'text-emerald-600'
    },
    error: {
      icon: AlertCircle,
      style: 'bg-rose-50 border-rose-200 text-rose-800',
      iconStyle: 'text-rose-600'
    },
    warning: {
      icon: AlertTriangle,
      style: 'bg-amber-50 border-amber-200 text-amber-800',
      iconStyle: 'text-amber-600'
    },
    info: {
      icon: Info,
      style: 'bg-sky-50 border-sky-200 text-sky-800',
      iconStyle: 'text-sky-600'
    }
  };

  const { icon: Icon, style, iconStyle } = typeMap[type] || typeMap.info;

  return (
    <div className={`p-3.5 sm:p-4 rounded-2xl border shadow-sm flex items-start gap-3 text-xs sm:text-sm animate-in fade-in duration-200 ${style} ${className}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconStyle}`} />
      <div className="flex-1 min-w-0">
        <p className="font-bold">{message}</p>
        {description && <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 hover:bg-black/5 rounded-lg transition shrink-0 -mr-1"
          aria-label="Dismiss message"
        >
          <X className="w-4 h-4 opacity-70" />
        </button>
      )}
    </div>
  );
}
