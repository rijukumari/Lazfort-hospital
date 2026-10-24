import React from 'react';
import {
  BarChart3,
  Download,
  DollarSign,
  TrendingUp,
  Building2,
  Users,
  HardDrive
} from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

export default function PlatformAnalytics() {
  const { showToast } = useSaaS();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Executive Cloud Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Platform Analytics &amp; Throughput</h1>
          <p className="text-xs text-slate-500 mt-1">Multi-tenant ARR trajectory, concurrent operational throughput, and cluster capacity.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
            Cycle: FY 2026-27 (Q3)
          </span>
          <button
            type="button"
            onClick={() => showToast && showToast('Analytics BI report exported to Excel / CSV.', 'info')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export BI Dossier</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Monthly Run-Rate (MRR)</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">₹14,25,000</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold pt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% YoY Platform Growth</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Managed Tenants</span>
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">24 Hospitals</div>
          <div className="text-xs text-indigo-700 font-semibold pt-1">100% On-Time Subscription Renewals</div>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Active OPD Terminals</span>
            <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">1,280 Live</div>
          <div className="text-xs text-sky-600 font-bold pt-1">Concurrent doctor &amp; triage desks</div>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Cloud Storage Allocated</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">1.69 TB / 10 TB</div>
          <div className="text-xs text-purple-600 font-bold pt-1">17% cluster capacity utilized</div>
        </div>
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Tenant Tier Distribution &amp; Cloud Allocation</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-600 mb-1 font-semibold">
                <span>Enterprise Tier (₹75k/mo &bull; Multi-Branch)</span>
                <span className="font-mono text-purple-700">14 Tenants (58%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1 font-semibold">
                <span>Professional Tier (₹35k/mo &bull; Up to 50 Users)</span>
                <span className="font-mono text-sky-700">8 Tenants (33%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1 font-semibold">
                <span>Basic OPD Clinic Tier (₹15k/mo &bull; 20 Users)</span>
                <span className="font-mono text-emerald-700">2 Tenants (9%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '9%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Regional Cluster Telemetry &amp; Latency</h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">AWS ap-south-1 (Mumbai Primary)</span>
                <span className="text-[11px] text-slate-500 block">Primary API Gateways &amp; Core EMR Mesh</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">42 ms</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Azure South India (Hyderabad Shard)</span>
                <span className="text-[11px] text-slate-500 block">Encrypted Document Archive &amp; DICOM Vault</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">54 ms</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">GCP Delhi-NCR (Disaster Recovery)</span>
                <span className="text-[11px] text-slate-500 block">Automated Cold-Standby Replica Set</span>
              </div>
              <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-xl">68 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
