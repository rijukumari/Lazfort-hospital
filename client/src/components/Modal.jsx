import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[var(--sidebar-width,18rem)] z-20 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Top Header Card with ONLY the Back Icon and Title */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {title && (
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {title}
            </h1>
          )}
        </div>

        {/* Full Page Content Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
