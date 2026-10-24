import React from 'react';
import { Calendar } from 'lucide-react';

export default function DatePicker({
  label,
  id,
  name,
  value,
  onChange,
  min,
  max,
  error,
  helperText,
  disabled = false,
  required = false,
  size = 'md',
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const inputId = id || name;

  const sizeMap = {
    sm: 'text-xs py-1.5 pl-9 pr-3 min-h-[36px]',
    md: 'text-xs sm:text-sm py-2.5 pl-10 pr-3.5 min-h-[42px]',
    lg: 'text-sm sm:text-base py-3 pl-11 pr-4 min-h-[48px]'
  };

  return (
    <div className={`space-y-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Calendar className="w-4 h-4" />
        </div>
        <input
          id={inputId}
          name={name}
          type="date"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
          className={`
            w-full rounded-xl border bg-slate-50/60 font-medium text-slate-900
            transition focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-50 disabled:bg-slate-100
            ${error ? 'border-rose-400 focus:ring-rose-400/30 focus:border-rose-500' : 'border-slate-200 focus:ring-sky-500/20 focus:border-sky-500'}
            ${sizeMap[size] || sizeMap.md}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
