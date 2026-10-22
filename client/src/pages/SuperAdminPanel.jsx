import React, { useState } from 'react';
import { 
  Building2, 
  Server, 
  ShieldCheck, 
  Users, 
  Activity, 
  Database, 
  Lock, 
  Key, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  RefreshCw, 
  Plus, 
  FileText,
  Sliders,
  Eye
} from 'lucide-react';

export default function SuperAdminPanel() {
  const [activeSubTab, setActiveSubTab] = useState('tenants');
  const [tenants, setTenants] = useState([
    {
      id: 'TEN-LAZFORT-001',
      name: 'Lazfort Memorial Hospital & Research Centre',
      code: 'LZF-HQ',
      plan: 'Enterprise Tier',
      status: 'Active',
      branches: 2,
      users: 48,
      storageUsed: '412 GB / 2 TB',
      apiUsage: '842k req / month',
      region: 'ap-south-1 (Mumbai)',
      lastAudit: '2026-10-21 18:30 IST'
    },
    {
      id: 'TEN-APOLLO-002',
      name: 'Apex Super Specialty Hospital Group',
      code: 'APX-GRP',
      plan: 'Enterprise Plus',
      status: 'Active',
      branches: 5,
      users: 142,
      storageUsed: '1.2 TB / 5 TB',
      apiUsage: '2.4M req / month',
      region: 'ap-south-1 (Mumbai)',
      lastAudit: '2026-10-21 17:15 IST'
    },
    {
      id: 'TEN-MEDILIFE-003',
      name: 'MediLife Daycare Clinics & Diagnostics',
      code: 'MLF-DAY',
      plan: 'Standard Clinic',
      status: 'Active',
      branches: 1,
      users: 18,
      storageUsed: '68 GB / 500 GB',
      apiUsage: '128k req / month',
      region: 'ap-south-1 (Mumbai)',
      lastAudit: '2026-10-20 09:40 IST'
    },
    {
      id: 'TEN-CARING-004',
      name: 'Caring Hands Community Health Network',
      code: 'CH-NET',
      plan: 'Non-Profit Health',
      status: 'Trial Active',
      branches: 1,
      users: 9,
      storageUsed: '14 GB / 250 GB',
      apiUsage: '34k req / month',
      region: 'ap-south-1 (Mumbai)',
      lastAudit: '2026-10-19 14:12 IST'
    }
  ]);

  const [supportLogs, setSupportLogs] = useState([
    {
      id: 'SUP-9901',
      operator: 'superadmin@lazfort.com',
      tenant: 'TEN-LAZFORT-001',
      action: 'Emergency Read-Only Support Token Issued',
      reason: 'NABH Audit Compliance Verification',
      timestamp: '2026-10-21 16:45:10 IST',
      status: 'Approved & Signed'
    },
    {
      id: 'SUP-9902',
      operator: 'security-ops@lazfort.com',
      tenant: 'TEN-APOLLO-002',
      action: 'HL7 / FHIR Gateway Resync',
      reason: 'Diagnostic Equipment Bridge Healthcheck',
      timestamp: '2026-10-21 11:20:04 IST',
      status: 'Completed'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* SaaS Command Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Persona: SaaS Super Admin Workspace
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Global Multi-Tenant Mesh Active
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">SaaS Multi-Tenant Operations & Governance</h1>
            <p className="text-xs text-indigo-200/80 max-w-2xl">
              Primary Jobs: Manage tenants, plans, platform configuration and support access.
              <br />
              Key Needs: Tenant lifecycle, usage visibility, tightly controlled support access.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => alert('New Tenant Provisioning Wizard initiated')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Provision New Tenant</span>
            </button>
            <button 
              onClick={() => alert('Support Access Log exported to encrypted cloud storage')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-white/10 transition flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-300" />
              <span>Support Security Lock</span>
            </button>
          </div>
        </div>

        {/* Global Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-indigo-500/20">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] text-indigo-200/70 font-medium block">Active Cloud Tenants</span>
            <span className="text-2xl font-black text-white">{tenants.length}</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">100% SLA uptime</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] text-indigo-200/70 font-medium block">Total Healthcare Users</span>
            <span className="text-2xl font-black text-white">217</span>
            <span className="text-[10px] text-indigo-300 block mt-0.5">Across 9 hospitals & clinics</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] text-indigo-200/70 font-medium block">Multi-Tenant Storage</span>
            <span className="text-2xl font-black text-white">1.69 TB</span>
            <span className="text-[10px] text-sky-300 block mt-0.5">Encrypted at rest (AES-256)</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] text-indigo-200/70 font-medium block">Support Access Audits</span>
            <span className="text-2xl font-black text-white">2 Signed</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">Zero unauthorized intrusions</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab('tenants')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
            activeSubTab === 'tenants'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Tenant Lifecycle & Subscription Plans</span>
        </button>
        <button
          onClick={() => setActiveSubTab('support')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
            activeSubTab === 'support'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Controlled Support Access & Impersonation Logs</span>
        </button>
        <button
          onClick={() => setActiveSubTab('platform')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
            activeSubTab === 'platform'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Platform Config & Compliance Enforcements</span>
        </button>
      </div>

      {/* Tab 1: Tenant Lifecycle */}
      {activeSubTab === 'tenants' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Active Hospital & Clinic Tenants</h3>
                <p className="text-xs text-slate-500">Full lifecycle state, tier quotas, and tenant isolation status.</p>
              </div>
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                Multi-Tenant DB Engine: Shared-DB / Partition-Key
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {tenants.map((t) => (
                <div key={t.id} className="p-4 hover:bg-slate-50/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                        {t.code}
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                        {t.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      ID: <span className="font-mono text-slate-700">{t.id}</span> &bull; Plan: <strong className="text-indigo-700">{t.plan}</strong> &bull; Region: {t.region}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Branches & Users</span>
                      <span className="font-bold text-slate-800">{t.branches} Branches &bull; {t.users} Users</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Storage Quota</span>
                      <span className="font-mono font-semibold text-slate-800">{t.storageUsed}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">API Consumption</span>
                      <span className="font-mono font-semibold text-slate-800">{t.apiUsage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => alert(`Opening configuration for tenant ${t.id}`)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg font-bold text-xs transition"
                      >
                        Configure
                      </button>
                      <button 
                        onClick={() => alert(`Issued temporary read-only support token for ${t.id}`)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-bold text-xs transition flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Support View</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tightly Controlled Support Access */}
      {activeSubTab === 'support' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Privileged Support Access & Impersonation Audit</h3>
              <p className="text-xs text-slate-500">
                All platform support sessions require cryptographic authorization, 2FA challenge, and immutable audit logging.
              </p>
            </div>
            <button 
              onClick={() => alert('New Controlled Support Request created. Awaiting hospital admin approval.')}
              className="bg-indigo-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-indigo-700 transition"
            >
              Request Access Grant
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3">Audit ID</th>
                  <th className="p-3">Platform Operator</th>
                  <th className="p-3">Target Tenant</th>
                  <th className="p-3">Action Granted</th>
                  <th className="p-3">Justification</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Cryptographic State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {supportLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-indigo-600">{log.id}</td>
                    <td className="p-3 font-medium">{log.operator}</td>
                    <td className="p-3 font-mono">{log.tenant}</td>
                    <td className="p-3 font-semibold text-slate-800">{log.action}</td>
                    <td className="p-3">{log.reason}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">{log.timestamp}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Platform Configuration */}
      {activeSubTab === 'platform' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Security & Compliance Enforcements</h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">NABH Digital Health Audit Mandatory Mode</span>
                  <span className="text-slate-500 text-[11px]">Enforces immutable SOAP notes and bill lock</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">ENABLED</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">ABHA & NDHM Sandbox Integration</span>
                  <span className="text-slate-500 text-[11px]">Gateway for digital health ID lookup</span>
                </div>
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">CONNECTED</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Automated Database Snapshot Policy</span>
                  <span className="text-slate-500 text-[11px]">Daily geo-redundant backups every 6 hours</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Global Storage & Cluster Health</h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>MongoDB Atlas Clustered Throughput</span>
                  <span className="font-bold text-slate-900">4,120 IOPS</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Cluster Storage Capacity</span>
                  <span className="font-bold text-slate-900">1.69 TB / 10 TB (17%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Active WebSocket Concurrency</span>
                  <span className="font-bold text-slate-900">1,280 Concurrent OPD Terminals</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
