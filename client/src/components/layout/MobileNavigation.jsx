import React, { useEffect } from 'react';

export default function MobileNavigation({
  isOpen,
  onClose,
  children
}) {
  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex no-print">
      {/* Dimmed backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-label="Close navigation overlay"
      />

      {/* Slide-in sidebar container */}
      <div className="relative z-10 flex h-full w-[280px] max-w-[85vw] animate-in slide-in-from-left duration-200 shadow-2xl">
        {children}
      </div>
    </div>
  );
}
