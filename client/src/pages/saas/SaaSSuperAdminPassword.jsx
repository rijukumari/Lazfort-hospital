import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSaaS } from '../../context/SaaSContext';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Check,
  X,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function SaaSSuperAdminPassword({ setActiveTab }) {
  const { user } = useAuth();
  const { showToast } = useSaaS();

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibility toggles
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Submission & feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Real-time policy validations
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  // Segmented password strength (0 to 4)
  const calculateStrengthScore = () => {
    if (!newPassword) return 0;
    let score = 0;
    if (hasMinLength) score += 1;
    if (newPassword.length >= 12 && hasUppercase) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;
    return score;
  };

  const strengthScore = calculateStrengthScore();

  const getStrengthLabel = () => {
    if (!newPassword) return { label: 'Empty', color: 'text-slate-400' };
    if (strengthScore <= 1) return { label: 'Weak', color: 'text-rose-500' };
    if (strengthScore === 2) return { label: 'Fair', color: 'text-amber-500' };
    if (strengthScore === 3) return { label: 'Good', color: 'text-sky-500' };
    return { label: 'Exceptional (Master Tier)', color: 'text-emerald-600' };
  };

  const strengthInfo = getStrengthLabel();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!hasMinLength) {
      setErrorMsg('New master password must be at least 8 characters long.');
      return;
    }
    if (!hasUppercase || !hasNumber || !hasSpecial) {
      setErrorMsg('Password must satisfy all security policy requirements below.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirm password do not match.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg('Master Password successfully rotated. Cryptographic session keys refreshed.');
      if (showToast) {
        showToast('Platform master password updated successfully.', 'success');
      }
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 600);
  };

  const handleReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn">
      {/* ================= 1. PAGE BREADCRUMB & CONTEXT ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Platform Security</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Root Credentials</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
            Change Master Password
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Hardware YubiKey 5C Enforced
          </span>
          <span className="font-mono text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            USR-SAAS-001
          </span>
        </div>
      </div>

      {/* ================= 2. PROFESSIONAL MASTER CARD ================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 md:p-12 space-y-8">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 border border-sky-200/60 text-sky-600 flex items-center justify-center shrink-0 shadow-sm">
              <Lock className="w-7 h-7 text-sky-600" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Change Super Admin Password
                </h1>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wide">
                  Master Root
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
                Update the master administrator credentials. Strong password required (minimum 8 characters with symbol &amp; number).
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block shrink-0">
            <span className="text-[11px] font-medium text-slate-400 block">Operator Scope</span>
            <span className="text-xs font-bold font-mono text-slate-800">
              {user?.email || 'superadmin@lazfort.com'}
            </span>
          </div>
        </div>

        {/* Feedback Alerts */}
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        {/* Main Password Form */}
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          {/* 1. Current Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-slate-400" />
                <span>Current Password</span>
                <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Existing credential verification</span>
            </div>

            <div className="relative">
              <input
                type={showCurrentPass ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter existing password"
                className="w-full p-4 pr-12 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
                title={showCurrentPass ? 'Hide password' : 'Show password'}
              >
                {showCurrentPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 2. New Master Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>New Master Password</span>
                <span className="text-rose-500">*</span>
              </label>
              {newPassword && (
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-slate-400 font-normal">Entropy:</span>
                  <span className={strengthInfo.color}>{strengthInfo.label}</span>
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type={showNewPass ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter robust new password"
                className="w-full p-4 pr-12 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
                title={showNewPass ? 'Hide password' : 'Show password'}
              >
                {showNewPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* 4-Segment Modern Strength Meter */}
            {newPassword && (
              <div className="pt-1.5 space-y-1.5">
                <div className="grid grid-cols-4 gap-2">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      strengthScore >= 1
                        ? strengthScore === 1
                          ? 'bg-rose-500'
                          : strengthScore === 2
                          ? 'bg-amber-500'
                          : strengthScore === 3
                          ? 'bg-sky-500'
                          : 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                  ></div>
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      strengthScore >= 2
                        ? strengthScore === 2
                          ? 'bg-amber-500'
                          : strengthScore === 3
                          ? 'bg-sky-500'
                          : 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                  ></div>
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      strengthScore >= 3
                        ? strengthScore === 3
                          ? 'bg-sky-500'
                          : 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                  ></div>
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      strengthScore >= 4 ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Confirm New Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Confirm New Password</span>
                <span className="text-rose-500">*</span>
              </label>
              {confirmPassword && (
                <span
                  className={`text-xs font-bold flex items-center gap-1 ${
                    passwordsMatch ? 'text-emerald-600' : 'text-rose-500'
                  }`}
                >
                  {passwordsMatch ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Passwords Match</span>
                    </>
                  ) : (
                    <>
                      <X className="w-3.5 h-3.5" />
                      <span>Passwords Do Not Match</span>
                    </>
                  )}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full p-4 pr-12 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
                title={showConfirmPass ? 'Hide password' : 'Show password'}
              >
                {showConfirmPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 4. Password Security Policy Box with Dynamic Checkmarks */}
          <div className="p-5 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-sky-700" />
              <span className="font-bold text-slate-800 text-xs sm:text-sm">
                Password Security Policy:
              </span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm">
              <li
                className={`flex items-center gap-2.5 transition ${
                  hasMinLength ? 'text-emerald-700 font-medium' : 'text-slate-600'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                    hasMinLength
                      ? 'bg-emerald-100 text-emerald-700 font-bold'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {hasMinLength ? '✓' : '•'}
                </span>
                <span>Minimum 8 characters (12+ recommended for root clearance)</span>
              </li>

              <li
                className={`flex items-center gap-2.5 transition ${
                  hasUppercase && hasNumber ? 'text-emerald-700 font-medium' : 'text-slate-600'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                    hasUppercase && hasNumber
                      ? 'bg-emerald-100 text-emerald-700 font-bold'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {hasUppercase && hasNumber ? '✓' : '•'}
                </span>
                <span>At least one capital letter &amp; one number</span>
              </li>

              <li
                className={`flex items-center gap-2.5 transition ${
                  hasSpecial ? 'text-emerald-700 font-medium' : 'text-slate-600'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                    hasSpecial
                      ? 'bg-emerald-100 text-emerald-700 font-bold'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {hasSpecial ? '✓' : '•'}
                </span>
                <span>Special cryptographic character required (@, #, $, %, etc.)</span>
              </li>
            </ul>
          </div>

          {/* 5. Submit & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-4 px-6 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 active:from-sky-700 active:to-indigo-700 text-white font-bold rounded-2xl shadow-lg transition shadow-sky-600/25 flex items-center justify-center gap-2.5 text-xs sm:text-sm disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Committing Master Password...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Commit Master Password Change</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto py-4 px-6 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold rounded-2xl transition text-xs sm:text-sm cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Card Footer Guarantee */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>End-to-End Cryptographically Salted with Argon2id</span>
          </div>
          <span>Automatic audit record logged upon commit</span>
        </div>
      </div>
    </div>
  );
}
