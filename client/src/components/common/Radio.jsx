import React from 'react';

export default function Radio({
  label,
  description,
  id,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const inputId = id || `${name}-${value}`;

  return (
    <div className={`flex items-start gap-2.5 ${wrapperClassName}`}>
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div
          onClick={() => !disabled && onChange && onChange({ target: { value, name } })}
          className={`
            w-4.5 h-4.5 rounded-full border transition cursor-pointer flex items-center justify-center
            ${checked ? 'border-sky-600 bg-white' : 'border-slate-300 bg-white hover:border-slate-400'}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}
            ${className}
          `}
        >
          {checked && <div className="w-2.5 h-2.5 rounded-full bg-sky-600" />}
        </div>
      </div>
      {(label || description) && (
        <label htmlFor={inputId} className={`cursor-pointer select-none ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
          {label && <span className="block text-xs sm:text-sm font-semibold text-slate-800">{label}</span>}
          {description && <span className="block text-[11px] text-slate-500 mt-0.5">{description}</span>}
        </label>
      )}
    </div>
  );
}
