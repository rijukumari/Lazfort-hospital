import React from 'react';
import { Check } from 'lucide-react';

export default function Checkbox({
  label,
  description,
  id,
  name,
  checked,
  onChange,
  disabled = false,
  error,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`flex items-start gap-2.5 ${wrapperClassName}`}>
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          type="checkbox"
          id={inputId}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div
          onClick={() => !disabled && onChange && onChange({ target: { checked: !checked, name } })}
          className={`
            w-4.5 h-4.5 rounded-md border transition cursor-pointer flex items-center justify-center
            ${checked ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white hover:border-slate-400'}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}
            ${error ? 'border-rose-400' : ''}
            ${className}
          `}
        >
          {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
      {(label || description) && (
        <label htmlFor={inputId} className={`cursor-pointer select-none ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
          {label && <span className="block text-xs sm:text-sm font-semibold text-slate-800">{label}</span>}
          {description && <span className="block text-[11px] text-slate-500 mt-0.5">{description}</span>}
          {error && <span className="block text-[11px] text-rose-600 mt-0.5 font-medium">{error}</span>}
        </label>
      )}
    </div>
  );
}
