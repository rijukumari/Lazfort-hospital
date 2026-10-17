import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  ShieldAlert,
  Search,
  Filter,
  Clock,
  User,
  Activity,
  FileCheck,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [actionFilter, setActionFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const url = `/audit/logs?limit=100${actionFilter ? `&action=${actionFilter}` : ''}`;
      const res = await api.get(url);
      if (res.success) {
        setLogs(res.logs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter]);

  const getActionColor = (action) => {
    if (action.includes('FINALIZED') || action.includes('PAID') || action.includes('RECORDED')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (action.includes('REFUNDED') || action.includes('VOID') || action.includes('CANCEL')) {
      return 'bg-rose-50 text-rose-800 border-rose-200';
    }
    if (action.includes('REGISTERED') || action.includes('BOOKED')) {
      return 'bg-sky-50 text-sky-800 border-sky-200';
    }
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand-600" />
            <span>Immutable System Audit Trail & Compliance Log (FR-013, BR-08)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Cryptographic tracing of all clinical finalizations, tariff modifications, invoice generations, and payments
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Action Filter */}
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-700"
          >
            <option value="">All Audited Actions</option>
            <option value="USER_LOGIN">USER_LOGIN</option>
            <option value="PATIENT_REGISTERED">PATIENT_REGISTERED</option>
            <option value="APPOINTMENT_BOOKED">APPOINTMENT_BOOKED</option>
            <option value="APPOINTMENT_CHECKED_IN">APPOINTMENT_CHECKED_IN</option>
            <option value="ENCOUNTER_FINALIZED">ENCOUNTER_FINALIZED</option>
            <option value="INVOICE_GENERATED">INVOICE_GENERATED</option>
            <option value="PAYMENT_RECORDED">PAYMENT_RECORDED</option>
            <option value="PAYMENT_REFUNDED">PAYMENT_REFUNDED</option>
            <option value="TARIFF_MODIFIED">TARIFF_MODIFIED</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Entity Type & ID</th>
                <th className="py-3 px-4">Details & Compliance Summary</th>
                <th className="py-3 px-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">Loading audit records...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">No audit records logged for this filter.</td>
                </tr>
              ) : (
                logs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 text-slate-600 font-mono whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{log.actorName}</span>
                      <span className="text-[10px] text-slate-400 capitalize">{log.actorRole}</span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className="text-slate-800 font-medium">{log.entityType}: </span>
                      <strong className="text-brand-700">{log.entityId}</strong>
                    </td>
                    <td className="py-3 px-4 text-slate-700 max-w-md">
                      <p>{log.details}</p>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400 text-[11px]">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
