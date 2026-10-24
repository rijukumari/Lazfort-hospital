import React from 'react';

export default function Tabs({
  items = [], // [{ id, label, icon: Icon, badge, count }]
  activeTab,
  onChange,
  variant = 'pills', // 'pills' | 'underline'
  className = ''
}) {
  return (
    <div className={`overflow-x-auto custom-scrollbar flex items-center ${variant === 'underline' ? 'border-b border-slate-200 gap-6' : 'bg-slate-100 p-1.5 rounded-2xl gap-1.5'} ${className}`}>
      {items.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        if (variant === 'underline') {
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`
                flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap
                ${isActive ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}
              `}
            >
              {Icon && <Icon className="w-4 h-4 shrink-0" />}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap
              ${isActive ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}
            `}
          >
            {Icon && <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${isActive ? 'bg-sky-100 text-sky-700' : 'bg-slate-200 text-slate-700'}`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
