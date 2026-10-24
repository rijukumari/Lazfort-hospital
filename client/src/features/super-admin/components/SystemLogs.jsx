import React, { useState } from 'react';
import { Terminal, Search } from 'lucide-react';

const initialLogs = [
  { id: 'LOG-4415', level: 'INFO', service: 'AUTH-GATEWAY', message: 'FIDO2 WebAuthn token verified for operator USR-SAAS-001', time: '18:45:22 IST' },
  { id: 'LOG-4414', level: 'INFO', service: 'TENANT-CLUSTER', message: 'MongoDB Atlas primary election healthy on shard-00-01 Mumbai', time: '18:38:10 IST' },
  { id: 'LOG-4412', level: 'INFO', service: 'AUTH-GATEWAY', message: 'OAuth2 bearer token refresh executed for USR-SAAS-001', time: '18:30:12 IST' },
  { id: 'LOG-4411', level: 'WARN', service: 'QUEUE-TELEMETRY', message: 'High socket polling volume on tenant TEN-APX-002 (320 req/sec)', time: '18:15:04 IST' },
  { id: 'LOG-4410', level: 'INFO', service: 'BILLING-SYNC', message: 'Monthly invoicing batch completed: 24 tenant invoices generated', time: '17:45:00 IST' },
  { id: 'LOG-4409', level: 'ERROR', service: 'SMS-GATEWAY', message: 'DLT Route Provider 429 RateLimit on OTP gateway — failover to secondary SMS bridge active', time: '16:20:19 IST' }
];

export default function SystemLogs() {
  const [logFilter, setLogFilter] = useState('ALL');
  const [logSearch, setLogSearch] = useState('');
  const [logs] = useState(initialLogs);

  const filteredLogs = logs.filter(l => {
    const matchesFilter = logFilter === 'ALL' || l.level === logFilter;
    const matchesSearch = !logSearch ||
      l.message.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.service.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.id.toLowerCase().includes(logSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
            <Terminal className="w-4 h-4" />
            <span>Live Event Stream</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">System Telemetry &amp; Microservice Logs</h1>
          <p className="text-xs text-slate-500 mt-1">Direct stdout stream from platform API microservices and auth gateways.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'INFO', 'WARN', 'ERROR'].map(lvl => (
            <button
              key={lvl}
              type="button"
              onClick={() => setLogFilter(lvl)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition active:scale-95 ${
                logFilter === lvl
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 text-slate-300 rounded-3xl p-5 sm:p-7 font-mono text-xs space-y-3 border border-slate-800 shadow-xl overflow-x-auto custom-scrollbar-dark">
        <div className="flex flex-wrap items-center justify-between text-slate-500 pb-3 border-b border-slate-900 gap-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>STREAM: STDOUT / VAR / LOG / LAZFORT-CORE</span>
          </span>
          <span>TLS 1.3 ENCRYPTED</span>
        </div>

        {filteredLogs.map(l => (
          <div key={l.id} className="flex flex-wrap sm:flex-nowrap items-baseline gap-2.5 py-1.5 border-b border-slate-900/80 hover:bg-slate-900/40 transition">
            <span className="text-slate-500 shrink-0 text-[11px]">{l.time}</span>
            <span className={`px-2 py-0.2 rounded text-[10px] font-bold shrink-0 ${
              l.level === 'ERROR'
                ? 'bg-rose-900/60 text-rose-300 border border-rose-800'
                : l.level === 'WARN'
                ? 'bg-amber-900/60 text-amber-300 border border-amber-800'
                : 'bg-sky-900/60 text-sky-300 border border-sky-800'
            }`}>
              {l.level}
            </span>
            <span className="text-sky-400 font-bold shrink-0">[{l.service}]</span>
            <span className="text-slate-200 break-words flex-1">{l.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
