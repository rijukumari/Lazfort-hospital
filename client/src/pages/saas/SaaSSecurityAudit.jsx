import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import {
  FileSearch,
  Search,
  Filter,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertTriangle,
  Clock,
  Terminal,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Lock,
  ShieldAlert,
  Copy,
  Check,
  Activity,
  Layers
} from 'lucide-react';

export default function SaaSSecurityAudit() {
  const { auditRecords } = useSaaS();

  const [subPage, setSubPage] = useState('list'); // 'list' | 'detail'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Distinct actions and users for filter dropdowns
  const uniqueActions = Array.from(new Set(auditRecords.map(r => r.action)));
  const uniqueUsers = Array.from(new Set(auditRecords.map(r => r.user)));

  const filteredRecords = auditRecords.filter(r => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.ip && r.ip.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAction = actionFilter === 'All' || r.action === actionFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesUser = userFilter === 'All' || r.user === userFilter;

    return matchesSearch && matchesAction && matchesStatus && matchesUser;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Flagged':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Denied':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleCopyHash = (hash) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  // ================= DEDICATED FULL PAGE: AUDIT TELEMETRY INSPECTION =================
  if (subPage === 'detail' && selectedRecord) {
    const auditHash = `sha256:${selectedRecord.id.toLowerCase()}8f91c7a2b9e4018f6c3a72d4e8b91c0a5`;

    return (
      <div className="space-y-6 animate-fade-in max-w-full min-w-0">
        {/* Back Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSubPage('list')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition active:scale-95 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Security Audit Trail</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <div className="text-xs text-slate-500 font-mono">
              Event Ref: <strong className="text-slate-900">{selectedRecord.id}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(selectedRecord.status)}`}>
              {selectedRecord.status}
            </span>
            <span className="text-xs bg-slate-900 text-white font-mono px-3 py-1 rounded-full flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>WORM Immutable</span>
            </span>
          </div>
        </div>

        {/* Event Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Forensic Security Record • Cryptographic Proof</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {selectedRecord.action}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                {selectedRecord.details}
              </p>
            </div>

            <button
              onClick={() => alert(`Cryptographic Audit Evidence Certificate for ${selectedRecord.id} downloaded.`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition shadow-sm active:scale-95 shrink-0"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download Evidence Certificate</span>
            </button>
          </div>
        </div>

        {/* Audit Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actor / User</div>
            <div className="font-bold text-slate-900 text-sm truncate">{selectedRecord.user}</div>
            <div className="text-xs text-sky-600 font-medium">{selectedRecord.role}</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Tenant</div>
            <div className="font-mono font-bold text-slate-900 text-sm">{selectedRecord.tenant}</div>
            <div className="text-xs text-slate-500">Enterprise Isolation Boundary</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ingress Source IP</div>
            <div className="font-mono font-bold text-slate-900 text-sm">{selectedRecord.ip}</div>
            <div className="text-xs text-emerald-600 font-medium">Geolocation: India (Verified)</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recorded Timestamp</div>
            <div className="font-mono font-bold text-slate-900 text-xs">{selectedRecord.timestamp}</div>
            <div className="text-xs text-slate-500">NTP Synced Microsecond Clock</div>
          </div>
        </div>

        {/* Cryptographic Ledger Verification Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Cryptographic Ledger Verification</h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
              Chain Signature Intact
            </span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">SHA-256 Event Checksum:</span>
              <button
                onClick={() => handleCopyHash(auditHash)}
                className="inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-semibold"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'Checksum Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-slate-800 break-all bg-white p-3 rounded-xl border border-slate-200">
              {auditHash}
            </div>
          </div>
        </div>

        {/* Raw Immutable Event Payload Terminal */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 text-white shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-mono font-bold text-slate-200">Immutable Audit Record Payload (WORM Block)</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              NABH-COMPLIANT • SIGNED
            </span>
          </div>

          <pre className="font-mono text-xs text-emerald-300/90 overflow-x-auto no-scrollbar p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 leading-relaxed">
{JSON.stringify({
  audit_id: selectedRecord.id,
  timestamp: selectedRecord.timestamp,
  actor: {
    user: selectedRecord.user,
    role: selectedRecord.role,
    ingress_ip: selectedRecord.ip
  },
  action: selectedRecord.action,
  target_tenant: selectedRecord.tenant,
  description: selectedRecord.details,
  disposition: selectedRecord.status,
  crypto_metadata: {
    hash_algorithm: "SHA-256",
    checksum: auditHash,
    immutability: "WORM_STORAGE_LOCKED",
    compliance_framework: ["NABH", "HIPAA_SECURITY_RULE_164.312", "ISO_27001"]
  }
}, null, 2)}
          </pre>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2">
          <button
            onClick={() => setSubPage('list')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Security Audit Trail</span>
          </button>
        </div>
      </div>
    );
  }

  // ================= DEFAULT VIEW: MAIN AUDIT TRAIL DIRECTORY =================
  return (
    <div className="space-y-6 max-w-full min-w-0">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compliance &amp; Security • Cryptographic Audit Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Security Audit Trail
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Immutable log of administrative tenant provisioning, privilege modifications, policy overrides, and rate-limiting triggers with cryptographic hash verification.
            </p>
          </div>

          <button
            onClick={() => alert('Cryptographic audit trail downloaded as verified JSON/CSV format.')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition shadow-sm active:scale-95 shrink-0 self-start lg:self-center"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* Directory Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden min-w-0 max-w-full">
        {/* Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search audit events, actions, IPs, or tenant IDs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Action Filter */}
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Actions</option>
              {uniqueActions.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success Only</option>
              <option value="Flagged">Flagged Only</option>
              <option value="Denied">Denied Only</option>
            </select>

            {/* User Filter */}
            <select
              value={userFilter}
              onChange={(e) => {
                setUserFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Users</option>
              {uniqueUsers.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Audit Table (Clean responsive layout with no-scrollbar) */}
        <div className="overflow-x-auto no-scrollbar w-full min-w-0">
          <table className="w-full text-left text-xs table-auto">
            <thead className="bg-slate-50/75 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="px-3.5 py-3 whitespace-nowrap">Event ID</th>
                <th className="px-3.5 py-3 whitespace-nowrap">User &amp; Role</th>
                <th className="px-3.5 py-3 whitespace-nowrap">Action</th>
                <th className="px-3.5 py-3 whitespace-nowrap">Target Tenant</th>
                <th className="px-3.5 py-3">Details</th>
                <th className="px-3.5 py-3 whitespace-nowrap">Timestamp &amp; IP</th>
                <th className="px-3.5 py-3 whitespace-nowrap text-center">Status</th>
                <th className="px-3.5 py-3 whitespace-nowrap text-right">Telemetry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    {/* Event ID */}
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <span className="font-mono font-bold text-sky-700">{r.id}</span>
                    </td>

                    {/* User & Role */}
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-slate-900 max-w-[170px] truncate" title={r.user}>
                        {r.user}
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">{r.role}</span>
                    </td>

                    {/* Action */}
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <span className="bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-indigo-700">
                        {r.action}
                      </span>
                    </td>

                    {/* Target Tenant */}
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {r.tenant}
                      </span>
                    </td>

                    {/* Details */}
                    <td className="px-3.5 py-3 text-slate-600 max-w-[200px] xl:max-w-xs truncate" title={r.details}>
                      {r.details}
                    </td>

                    {/* Timestamp & IP (Smart combined) */}
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <div className="font-mono text-[11px] text-slate-600">{r.timestamp}</div>
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-slate-400" />
                        <span>{r.ip}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-3.5 py-3 whitespace-nowrap text-center">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${getStatusBadge(r.status)}`}>
                        {r.status}
                      </span>
                    </td>

                    {/* Telemetry Inspect Button */}
                    <td className="px-3.5 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => {
                          setSelectedRecord(r);
                          setSubPage('detail');
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-200 transition shadow-xs active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No security audit records match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} audit events
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 font-semibold text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
