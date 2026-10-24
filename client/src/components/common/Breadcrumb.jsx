import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({
  items = [], // [{ label, onClick, active }]
  className = ''
}) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-1.5 text-xs text-slate-500 overflow-x-auto custom-scrollbar py-1 ${className}`}>
      <span className="flex items-center text-slate-400">
        <Home className="w-3.5 h-3.5" />
      </span>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast || item.active ? (
              <span className="font-bold text-slate-800 truncate" aria-current="page">
                {item.label}
              </span>
            ) : item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className="hover:text-slate-800 transition truncate hover:underline"
              >
                {item.label}
              </button>
            ) : (
              <span className="truncate">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
