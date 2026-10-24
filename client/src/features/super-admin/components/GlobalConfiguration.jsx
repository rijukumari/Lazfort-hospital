import React, { useState } from 'react';
import {
  Globe,
  Server,
  Shield,
  ShieldCheck,
  Database,
  HardDrive,
  Cpu,
  History,
  Download,
  CheckCircle2,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

export default function GlobalConfiguration() {
  const { showToast } = useSaaS();
  const [configSubPage, setConfigSubPage] = useState('main'); // 'main' | 'history' | 'backup_wizard'

  const [policyHistory] = useState([
    {
      id: 'POL-CHG-9842',
      actor: 'Vikramaditya Singhania (Root)',
      policy: 'Hardware MFA (FIDO2 / YubiKey)',
      change: 'OPTIONAL → STRICT_ENFORCED',
      date: '2026-10-22 17:30:15 IST',
      ref: 'CR-8921',
      status: 'Applied & WORM Signed'
    },
    {
      id: 'POL-CHG-9841',
      actor: 'DevOps Lead (Automated IaC)',
      policy: 'Automated Snapshot Interval',
      change: 'Every 12 Hours → Every 6 Hours',
      date: '2026-10-18 16:45:00 IST',
      ref: 'CR-8890',
      status: 'Applied & WORM Signed'
    },
    {
      id: 'POL-CHG-9840',
      actor: 'Compliance Officer',
      policy: 'NABH Audit Trail Retention',
      change: '5 Years → 7 Years (WORM Locked)',
      date: '2026-10-15 09:20:44 IST',
      ref: 'CR-8742',
      status: 'Applied & WORM Signed'
    }
  ]);

  if (configSubPage === 'history') {
    return (
      <div className="space-y-6 animate-in fade-in duration-150">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setConfigSubPage('main')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Global Configuration</span>
          </button>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Cryptographically Signed Governance Trail
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full custom-scrollbar">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-slate-50/80 text-slate-600 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Change ID &amp; Ref</th>
                  <th className="p-4">Target Policy</th>
                  <th className="p-4">Transition Diff</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4 text-right">Integrity Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {policyHistory.map(h => (
                  <tr key={h.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 font-mono font-bold text-sky-700">{h.id}</td>
                    <td className="p-4 font-bold text-slate-900">{h.policy}</td>
                    <td className="p-4 font-mono text-slate-800">{h.change}</td>
                    <td className="p-4 text-slate-600">{h.actor}</td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{h.date}</td>
                    <td className="p-4 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {h.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-400 font-bold uppercase tracking-wider mb-2">
            <Globe className="w-4 h-4" />
            <span>Infrastructure Mesh Architecture</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">Global Platform Configuration</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Multi-region cluster isolation, automated immutable snapshots, and compliance policy configuration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setConfigSubPage('history')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition flex items-center gap-2"
          >
            <History className="w-4 h-4 text-sky-300" />
            <span>Revision History</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-sky-600" />
              <span>Multi-Region Database Cluster (MongoDB Atlas M30)</span>
            </h3>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              Active
            </span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span>Primary Node:</span>
              <strong className="font-mono text-slate-900">AWS ap-south-1 (Mumbai)</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span>Secondary Standby:</span>
              <strong className="font-mono text-slate-900">AWS ap-south-2 (Hyderabad)</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Replication SLA:</span>
              <strong className="font-mono text-emerald-600 font-bold">&lt; 3ms Lag (Synchronous)</strong>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NABH &amp; ABDM Healthcare Governance</span>
            </h3>
            <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
              Enforced
            </span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span>EHR Retention Policy:</span>
              <strong className="font-mono text-slate-900">7 Years (Immutable WORM)</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span>ABDM FHIR R4 Bridge:</span>
              <strong className="font-mono text-emerald-600 font-bold">Connected &bull; Sandbox v2.1</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>PII Telemetry Masking:</span>
              <strong className="font-mono text-slate-900">SHA-256 Pseudonymized</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
