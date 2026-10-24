import React from 'react';
import { Gauge } from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

export default function UsageLimits() {
  const { tenants = [] } = useSaaS();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">
            <Gauge className="w-4 h-4" />
            <span>Resource Metering</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Tenant Resource Quotas &amp; Limits</h1>
          <p className="text-xs text-slate-500 mt-1">Resource metering across hospital storage, API throughput, and registered staff seats.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {tenants.map(t => {
          const userPercent = Math.min(100, Math.round(((t.totalUsers || 1) / (t.userLimit || 50)) * 100));
          return (
            <div key={t.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <span className="text-[11px] font-mono text-slate-400">{t.id}</span>
                </div>
                <span className="font-mono text-purple-700 bg-purple-50 border border-purple-200 font-bold px-2.5 py-0.5 rounded-full text-xs">
                  {t.plan} Plan
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-slate-600 mb-1 font-semibold">
                    <span>Staff Seat Allocation: {t.totalUsers || 1} / {t.userLimit || 50} Users</span>
                    <span>{userPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-2 rounded-full transition-all duration-300" style={{ width: `${userPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-1 font-semibold">
                    <span>Cloud Storage: {t.storageUsed || '24 GB'} / {t.storageLimit || '250 GB'}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '22%' }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
