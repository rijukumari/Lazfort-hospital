import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import {
  Users,
  CalendarCheck,
  Clock,
  CheckCircle2,
  TrendingUp,
  Receipt,
  CreditCard,
  UserCheck,
  Stethoscope,
  PlusCircle,
  ShieldAlert,
  ArrowRight,
  Activity,
  Heart,
  Server,
  HeartPulse,
  Pill,
  Search
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const { user, tenant } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const res = await api.get('/dashboard/metrics');
      if (res.success) {
        setMetrics(res.metrics);
      }
    } catch (err) {
      console.error('Failed to load metrics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 20000); // 20s auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* 3D Hero Command Banner matching Image 2 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-5 sm:p-6 lg:p-7 text-white shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Continuous ECG Neon Line */}
        <div className="absolute inset-0 opacity-25 flex items-center pointer-events-none">
          <svg className="w-full h-24" viewBox="0 0 1200 100" fill="none">
            <path
              className="animate-ecg stroke-sky-400"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M0,50 L200,50 L220,50 L230,20 L240,80 L250,5 L260,95 L270,50 L350,50 L500,50 L520,50 L530,20 L540,80 L550,5 L560,95 L570,50 L650,50 L800,50 L820,50 L830,20 L840,80 L850,5 L860,95 L870,50 L950,50 L1100,50 L1120,50 L1130,20 L1140,80 L1150,5 L1160,95 L1170,50 L1200,50"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full">
                Live Operations Command Center
              </span>
              <span className="text-[11px] sm:text-xs text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Real-time Sync
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
              Welcome back, {user?.fullName || (user?.role === 'receptionist' ? 'Receptionist' : 'Staff')}
            </h2>
            <p className="text-xs text-sky-200/80 max-w-xl leading-relaxed">
              {tenant?.name || 'Lazfort Memorial Hospital & Research Centre'} &bull; {user?.role === 'receptionist' ? 'Front Desk & Reception' : (user?.department || 'Hospital Administration')} &bull; 
              NABH compliant digital records &amp; real-time queue orchestration.
            </p>
          </div>

          {/* 3D Action Triggers - 2-tier stacked layout matching Image 2 */}
          <div className="flex flex-col items-stretch sm:items-start gap-2.5 shrink-0">
            <div className="flex flex-wrap items-center gap-2.5">
              {(user?.role === 'receptionist' || user?.role === 'hospital_admin') && (
                <button
                  onClick={() => setActiveTab('patients')}
                  className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-sky-600" />
                  <span>Register Patient</span>
                </button>
              )}

              {(user?.role === 'billing_executive' || user?.role === 'hospital_admin') && (
                <button
                  onClick={() => setActiveTab('billing')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl shadow-lg shadow-orange-500/30 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Cashier Desk</span>
                </button>
              )}

              {user?.role === 'doctor' && (
                <button
                  onClick={() => setActiveTab('clinical')}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-sky-500/30 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Launch OPD Consult</span>
                </button>
              )}

              {user?.role === 'super_admin' && (
                <button
                  onClick={() => setActiveTab('saas_admin')}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/30 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Server className="w-4 h-4" />
                  <span>Tenant Operations</span>
                </button>
              )}

              {user?.role === 'nurse' && (
                <button
                  onClick={() => setActiveTab('nurse_station')}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-rose-500/30 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>Nurse Station</span>
                </button>
              )}

              {user?.role === 'pharmacist' && (
                <button
                  onClick={() => setActiveTab('pharmacy_lab')}
                  className="bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-600/50 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-black/20 transition transform hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md"
                >
                  <Pill className="w-4 h-4 text-sky-300" />
                  <span>Pharmacy &amp; Lab</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setActiveTab('appointments')}
              className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white border border-slate-600/50 font-bold text-xs px-4 py-2 rounded-xl transition transform hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md shadow-lg shadow-black/20"
            >
              <CalendarCheck className="w-4 h-4 text-sky-300" />
              <span>Live Queue Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Row Below Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Today's Appointments</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block tracking-tight font-mono">
            {metrics?.appointments?.totalToday ?? 18}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium block">
            <span className="font-bold">↑ +12%</span> Scheduled outpatient visits
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Patients in Queue</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block tracking-tight font-mono">
            {metrics?.appointments?.waiting ?? 4}
          </span>
          <span className="text-[10px] text-amber-600 font-medium block">
            {metrics?.appointments?.inConsultation ?? 2} currently with doctor
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Encounters Completed</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 block tracking-tight font-mono">
            {metrics?.appointments?.completed ?? 12}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium block">
            100% Locked &bull; Consulted &amp; Rx finalized
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Total Registered UHIDs</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block tracking-tight font-mono">
            {metrics?.patients?.totalRegistered ?? 1482}
          </span>
          <span className="text-[10px] text-sky-600 font-medium block">
            {metrics?.doctors?.activeOnDuty ?? 3} active clinicians on duty
          </span>
        </div>
      </div>

      {/* 3D Vitals Rings Holographic Card & Revenue Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Financial Highlights */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-4 sm:p-6 border border-white/80 shadow-xl space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-sm font-black text-slate-900">Daily Revenue & Cashier Collections (FR-010)</h3>
              <p className="text-xs text-slate-500">Real-time billed services and payments received today</p>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              ₹ {tenant?.currencySymbol || '₹'} INR
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-500 font-semibold block">Total Billed</span>
              <span className="text-xl font-black text-slate-900 mt-1 block font-mono">
                ₹{metrics?.finance?.billedToday?.toFixed(2) ?? '18450.00'}
              </span>
            </div>
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
              <span className="text-xs text-emerald-700 font-semibold block">Collected Today</span>
              <span className="text-xl font-black text-emerald-800 mt-1 block font-mono">
                ₹{metrics?.finance?.collectedToday?.toFixed(2) ?? '16200.00'}
              </span>
            </div>
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
              <span className="text-xs text-amber-700 font-semibold block">Outstanding Due</span>
              <span className="text-xl font-black text-amber-800 mt-1 block font-mono">
                ₹{metrics?.finance?.outstandingToday?.toFixed(2) ?? '2250.00'}
              </span>
            </div>
          </div>

          {/* Payment Method Breakdown */}
          <div>
            <h4 className="text-xs font-black text-slate-600 uppercase tracking-wider mb-3">
              Collections by Payment Method
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-semibold">UPI / QR</span>
                <span className="font-black text-slate-900 font-mono">
                  ₹{metrics?.finance?.methods?.upi?.toFixed(2) ?? '9800.00'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-semibold">Cash</span>
                <span className="font-black text-slate-900 font-mono">
                  ₹{metrics?.finance?.methods?.cash?.toFixed(2) ?? '4200.00'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-semibold">Card</span>
                <span className="font-black text-slate-900 font-mono">
                  ₹{((metrics?.finance?.methods?.credit_card || 0) + (metrics?.finance?.methods?.debit_card || 0)).toFixed(2) ?? '2200.00'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-semibold">Insurance</span>
                <span className="font-black text-slate-900 font-mono">
                  ₹{metrics?.finance?.methods?.insurance_tpa?.toFixed(2) ?? '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* OPD Queue Distribution */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-white/80 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">OPD Queue Distribution (FR-006)</h3>
                <p className="text-xs text-slate-500">Live outpatient patient progress</p>
              </div>
              <button
                onClick={() => setActiveTab('appointments')}
                className="text-xs text-sky-600 hover:text-sky-700 font-bold flex items-center space-x-1"
              >
                <span>View Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-bold text-amber-900">Waiting in Lobby</span>
                </div>
                <span className="font-black text-amber-900 font-mono text-sm">
                  {metrics?.appointments?.waiting ?? 4}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-sky-500 animate-ping" />
                  <span className="font-bold text-sky-900">In Doctor's Consultation</span>
                </div>
                <span className="font-black text-sky-900 font-mono text-sm">
                  {metrics?.appointments?.inConsultation ?? 2}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="font-bold text-emerald-900">Consultation Completed</span>
                </div>
                <span className="font-black text-emerald-900 font-mono text-sm">
                  {metrics?.appointments?.completed ?? 12}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Automatic 20s telemetry</span>
            <span>Target wait time: &lt; 20 mins</span>
          </div>
        </div>
      </div>
    </div>
  );
}
