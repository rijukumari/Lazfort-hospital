import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  disabled = false,
  required = false,
  size = 'md',
  className = '',
  wrapperClassName = '',
  children,
  ...props
}) {
  const selectId = id || name;

  const sizeMap = {
    sm: 'text-xs py-1.5 pl-3 pr-8 min-h-[36px]',
    md: 'text-xs sm:text-sm py-2.5 pl-3.5 pr-10 min-h-[42px]',
    lg: 'text-sm sm:text-base py-3 pl-4 pr-10 min-h-[48px]'
  };

  return (
    <div className={`space-y-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={selectId} className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full rounded-xl border bg-slate-50/60 font-medium text-slate-900 appearance-none
            transition focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-50 disabled:bg-slate-100 cursor-pointer
            ${error ? 'border-rose-400 focus:ring-rose-400/30 focus:border-rose-500' : 'border-slate-200 focus:ring-sky-500/20 focus:border-sky-500'}
            ${sizeMap[size] || sizeMap.md}
            ${className}
          `}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.length > 0
            ? options.map((opt) => {
                const optVal = typeof opt === 'object' ? opt.value : opt;
                const optLabel = typeof opt === 'object' ? opt.label : opt;
                return (
                  <option key={optVal} value={optVal}>
                    {optLabel}
                  </option>
                );
              })
            : children}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
