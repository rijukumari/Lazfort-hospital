import React, { useState } from 'react';
import { useAuth, demoAccounts } from '../context/AuthContext';
import { Activity, ShieldCheck, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';

export default function Login() {
  const { login, quickLogin, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (!res.success) {
      setError(res.message || 'Login failed');
    }
  };

  const handleQuick = async (role) => {
    setError('');
    const res = await quickLogin(role);
    if (!res.success) {
      setError(res.message || 'Quick login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Branding Column */}
        <div className="md:col-span-5 bg-gradient-to-br from-brand-700 via-brand-800 to-slate-900 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 shadow-inner">
              <Activity className="w-7 h-7 text-sky-300 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">LAZFORT</h1>
            <p className="text-xs uppercase tracking-widest text-sky-200 font-semibold mt-0.5">
              Hospital ERP Platform
            </p>
            <p className="text-xs text-sky-100/80 mt-4 leading-relaxed">
              Unified Outpatient, Clinical Consultation, Queue Management, Pharmacy & Hospital Billing System designed for safety, traceability, and speed.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-xs text-sky-100/70">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Server-Enforced Multi-Tenant Isolation</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Immutable Clinical & Billing Audit Trails</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>NABH & India-first Outpatient Workflows</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="md:col-span-7 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Sign in to Hospital Portal</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select a quick persona to test role-based access, or enter credentials.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1-Click Quick Demo Switchers */}
          <div className="mb-6">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              1-Click Instant Persona Sign-in
            </label>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.slice(0, 4).map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleQuick(acc.role)}
                  className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-brand-700">
                      {acc.roleName}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 transition transform group-hover:translate-x-0.5" />
                  </div>
                  <span className="text-[11px] text-slate-500 block truncate mt-0.5">{acc.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold text-[10px]">Or sign in with email</span>
            </div>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email or Username</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. dr.rajesh@lazfort.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl text-xs shadow-md shadow-brand-500/20 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
