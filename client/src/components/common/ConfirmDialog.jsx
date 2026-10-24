import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this operation?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger', // 'danger' | 'primary' | 'success'
  iconVariant = 'warning', // 'warning' | 'danger' | 'info' | 'success'
  loading = false
}) {
  const iconConfig = {
    warning: { icon: AlertTriangle, bg: 'bg-amber-50 text-amber-600 border-amber-200' },
    danger: { icon: AlertTriangle, bg: 'bg-rose-50 text-rose-600 border-rose-200' },
    info: { icon: Info, bg: 'bg-sky-50 text-sky-600 border-sky-200' },
    success: { icon: CheckCircle2, bg: 'bg-emerald-50 text-emerald-600 border-emerald-200' }
  };

  const { icon: Icon, bg } = iconConfig[iconVariant] || iconConfig.warning;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center p-2 space-y-3">
        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${bg}`}>
          <Icon className="w-7 h-7" />
        </div>
        <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">{title}</h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">{message}</p>
      </div>
    </Modal>
  );
}
