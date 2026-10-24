import React, { useState } from 'react';
import { KeyRound, Laptop } from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

const initialSessions = [
  { id: 'SES-01', user: 'superadmin@lazfort.com', device: 'Chrome on macOS (Apple M3 Max)', ip: '103.22.18.44', location: 'Bengaluru, India (IDC Zone-A)', activeSince: 'Today 09:30 IST', current: true },
  { id: 'SES-02', user: 'support.lead@lazfort.com', device: 'Firefox on Windows 11 Enterprise', ip: '103.22.18.52', location: 'Mumbai, India (Disaster Recovery)', activeSince: 'Today 11:00 IST', current: false },
  { id: 'SES-03', user: 'admin@apexhealth.in', device: 'Edge on Windows 10 Pro', ip: '115.240.89.12', location: 'Navi Mumbai, India', activeSince: 'Yesterday 14:15 IST', current: false },
  { id: 'SES-04', user: 'audit.officer@nabh.gov.in', device: 'Safari on macOS Sequoia', ip: '14.139.112.5', location: 'New Delhi, India', activeSince: '20-Oct-2026 16:45 IST', current: false }
];

export default function LoginSessions() {
  const { showToast } = useSaaS();
  const [sessions, setSessions] = useState(initialSessions);

  const terminateSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
    showToast(`Session ${id} successfully revoked!`, 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
            <KeyRound className="w-4 h-4" />
            <span>Session Security</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Active Platform Sessions</h1>
          <p className="text-xs text-slate-500 mt-1">Currently valid cryptographic session tokens across operator devices.</p>
        </div>
        {sessions.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setSessions(sessions.filter(s => s.current));
              showToast('All other remote sessions terminated.', 'info');
            }}
            className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl font-bold text-xs transition active:scale-95"
          >
            Revoke All Other Sessions
          </button>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {sessions.map(s => (
          <div
            key={s.id}
            className={`p-4 sm:p-5 rounded-3xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              s.current ? 'bg-sky-50/40 border-sky-200/80' : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                s.current ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'
              }`}>
                <Laptop className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{s.user}</span>
                  {s.current && (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded text-[10px]">
                      Current Master Session
                    </span>
                  )}
                </div>
                <div className="text-slate-500 text-[11px] flex flex-wrap items-center gap-2">
                  <span>{s.device}</span>
                  <span>&bull;</span>
                  <span className="font-mono font-semibold text-slate-700">{s.ip}</span>
                  <span>&bull;</span>
                  <span>{s.location}</span>
                </div>
                <span className="text-[10px] text-slate-400 block pt-0.5">Active since: {s.activeSince}</span>
              </div>
            </div>

            {!s.current && (
              <button
                type="button"
                onClick={() => terminateSession(s.id)}
                className="px-3.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-xl font-bold text-xs transition active:scale-95 self-end sm:self-center"
              >
                Revoke Token
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
