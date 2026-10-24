import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

const initialAlerts = [
  { id: 'ALT-1092', level: 'HIGH', title: 'DLT SMS Route 429 RateLimit Failover', desc: 'Primary transactional route hit provider rate limit; traffic seamlessly failed over to secondary bridge.', time: '16:20 IST', status: 'Mitigated' },
  { id: 'ALT-1091', level: 'MEDIUM', title: 'High WebSocket Polling Concurrency on TEN-APX-002', desc: 'Over 320 requests/sec observed from 5 OPD terminal kiosks in Sector 62 campus.', time: '18:15 IST', status: 'Monitored' },
  { id: 'ALT-1090', level: 'LOW', title: 'Non-matching TLS SNI Attempt Blocked at Cloudflare Edge', desc: 'Automated port scan dropped by WAF rate limiter; zero internal breach.', time: '12:04 IST', status: 'Resolved' }
];

export default function SecurityAlerts() {
  const { showToast } = useSaaS();
  const [alerts, setAlerts] = useState(initialAlerts);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-600 font-bold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Incident Guard</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Security Alerts &amp; Incidents</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time alerts for WAF violations, rate limit anomalies, and auth lockouts.</p>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map(a => (
          <div key={a.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {a.id}
                </span>
                <span className="text-xs font-semibold text-slate-400">&bull;</span>
                <span className="font-bold text-slate-900 text-sm">{a.title}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {a.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
            <div className="text-[11px] font-mono text-slate-400 pt-1">
              Detected at: {a.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
