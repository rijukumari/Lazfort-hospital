import React from 'react';

export default function Tooltip({
  content,
  position = 'top', // 'top' | 'right' | 'bottom' | 'left'
  children,
  className = ''
}) {
  const positionMap = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2'
  };

  if (!content) return children;

  return (
    <div className={`relative inline-flex group ${className}`}>
      {children}
      <div
        className={`
          absolute ${positionMap[position] || positionMap.top}
          px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-lg shadow-xl
          border border-slate-700 whitespace-nowrap opacity-0 pointer-events-none
          group-hover:opacity-100 transition duration-150 z-50
        `}
      >
        {content}
      </div>
    </div>
  );
}
