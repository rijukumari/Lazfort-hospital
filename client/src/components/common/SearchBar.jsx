import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search records, patients, encounters...',
  size = 'md',
  className = '',
  autoFocus = false,
  ...props
}) {
  const sizeMap = {
    sm: 'py-1.5 pl-9 pr-8 text-xs min-h-[34px]',
    md: 'py-2 pl-10 pr-9 text-xs sm:text-sm min-h-[40px]',
    lg: 'py-2.5 pl-11 pr-10 text-sm min-h-[46px]'
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`
          w-full bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 placeholder:text-slate-400
          transition focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white
          ${sizeMap[size] || sizeMap.md}
        `}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
          title="Clear search"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
