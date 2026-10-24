import React from 'react';

export default function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  size = 'md',
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const inputId = id || name;

  const sizeMap = {
    sm: 'text-xs py-1.5 px-3 min-h-[36px]',
    md: 'text-xs sm:text-sm py-2.5 px-3.5 min-h-[42px]',
    lg: 'text-sm sm:text-base py-3 px-4 min-h-[48px]'
  };

  return (
    <div className={`space-y-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={`
            w-full rounded-xl border bg-slate-50/60 font-medium text-slate-900 placeholder:text-slate-400
            transition focus:outline-none focus:ring-2 focus:bg-white disabled:opacity-50 disabled:bg-slate-100
            ${Icon ? 'pl-10' : ''}
            ${RightIcon ? 'pr-10' : ''}
            ${error ? 'border-rose-400 focus:ring-rose-400/30 focus:border-rose-500' : 'border-slate-200 focus:ring-sky-500/20 focus:border-sky-500'}
            ${sizeMap[size] || sizeMap.md}
            ${className}
          `}
          {...props}
        />
        {RightIcon && (
          <div 
            onClick={onRightIconClick}
            className={`absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 ${onRightIconClick ? 'cursor-pointer hover:text-slate-600' : 'pointer-events-none'}`}
          >
            <RightIcon className="w-4 h-4" />
          </div>
        )}
      </div>
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
