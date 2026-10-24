import React from 'react';

export default function Textarea({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`space-y-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className={`
          w-full rounded-xl border bg-slate-50/60 p-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400
          transition focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-50 disabled:bg-slate-100 leading-relaxed
          ${error ? 'border-rose-400 focus:ring-rose-400/30 focus:border-rose-500' : 'border-slate-200 focus:ring-sky-500/20 focus:border-sky-500'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
