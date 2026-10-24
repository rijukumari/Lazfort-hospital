import React from 'react';

export default function Card({
  title,
  subtitle,
  icon: Icon,
  action,
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  footerClassName = '',
  hoverEffect = false,
  ...props
}) {
  return (
    <div
      className={`
        bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden
        ${hoverEffect ? 'hover:shadow-md hover:border-slate-300 transition duration-200' : ''}
        ${className}
      `}
      {...props}
    >
      {(title || subtitle || Icon || action) && (
        <div className={`p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 ${headerClassName}`}>
          <div className="flex items-center space-x-3 min-w-0">
            {Icon && (
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0">
              {title && <h3 className="font-bold text-sm sm:text-base text-slate-900 truncate">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 truncate mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-4 sm:p-5 ${bodyClassName}`}>{children}</div>
      {footer && (
        <div className={`p-3.5 sm:p-4 bg-slate-50 border-t border-slate-100 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
