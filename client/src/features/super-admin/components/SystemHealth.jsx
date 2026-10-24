import React, { useState } from 'react';
import {
  Activity,
  Layers,
  Server,
  Shield,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  CheckCheck,
  X
} from 'lucide-react';

export default function SystemHealth() {
  const [healthTimeRange, setHealthTimeRange] = useState('realtime');
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [isRefreshingTelemetry, setIsRefreshingTelemetry] = useState(false);
  const [lastRefreshedText, setLastRefreshedText] = useState('Just now');

  const handleRunDiagnostic = () => {
    setDiagnosticModalOpen(true);
    setIsDiagnosticRunning(true);
    setDiagnosticStep(1);

    setTimeout(() => setDiagnosticStep(2), 500);
    setTimeout(() => setDiagnosticStep(3), 1000);
    setTimeout(() => setDiagnosticStep(4), 1600);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
      setDiagnosticStep(5);
    }, 2200);
  };

  const handleRefreshTelemetry = () => {
    setIsRefreshingTelemetry(true);
    setTimeout(() => {
      setIsRefreshingTelemetry(false);
      setLastRefreshedText('Just now');
    }, 450);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Hero Command Center Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-5 sm:p-7 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 top-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[10px] tracking-wide uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Zero Downtime Architecture
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold text-[10px] tracking-wide uppercase">
                24 Hospital Mesh Active
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              System Health &amp; Infrastructure Telemetry
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time observability mesh monitoring compute clusters, MongoDB replica sets, WebSocket event brokers, and edge ingress gateways.
            </p>
          </div>

          {/* Action Controls & Live SLA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Time Range Selector */}
            <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700 flex items-center text-xs">
              {['realtime', '1h', '6h', '24h'].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setHealthTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-[11px] capitalize transition ${
                    healthTimeRange === range
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range === 'realtime' ? 'Live' : range}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRefreshTelemetry}
                disabled={isRefreshingTelemetry}
                className="p-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
                title="Refresh live telemetry stream"
                aria-label="Refresh telemetry stream"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshingTelemetry ? 'animate-spin text-sky-400' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleRunDiagnostic}
                disabled={isDiagnosticRunning}
                className="px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl font-bold text-xs shadow-md shadow-sky-500/25 transition active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run Deep Diagnostic</span>
              </button>
            </div>
          </div>
        </div>

        {/* SLA Sub-bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              All 8 Core Microservices Operational
            </span>
            <span className="text-slate-500 hidden sm:inline">&bull;</span>
            <span className="text-slate-300">
              Target SLA: <strong className="text-white">99.99%</strong> (Achieved: <strong className="text-emerald-400">99.992%</strong>)
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Telemetry Clock: <span className="font-mono text-slate-300 font-semibold">{lastRefreshedText}</span>
          </div>
        </div>
      </div>

      {/* 4 Real-time Hardware & Metric Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. CPU Cluster Load */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cluster CPU Load</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              Normal
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900 font-mono">24.8%</span>
              <span className="text-[11px] text-slate-500">of 16 vCPUs</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '24.8%' }}></div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Peak: 42.1%</span>
            <span>Idle: 75.2%</span>
          </div>
        </div>

        {/* 2. RAM & Redis In-Memory */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">RAM &amp; Cache Store</span>
            <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[10px] font-bold border border-sky-200">
              Optimal
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900 font-mono">6.4 GB</span>
              <span className="text-[11px] text-slate-500">/ 32 GB (20%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
              <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: '20%' }}></div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Redis: 12% Used</span>
            <span>Hit Ratio: 99.4%</span>
          </div>
        </div>

        {/* 3. API Gateway Throughput */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">API Throughput</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
              99.998% Success
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900 font-mono">1,840</span>
              <span className="text-[11px] text-slate-500">req / sec</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: '38%' }}></div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>P95: 42 ms</span>
            <span>Sockets: 342 Nodes</span>
          </div>
        </div>

        {/* 4. MongoDB Shard Lag */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Replica Sync Lag</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              100% In-Sync
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900 font-mono">0.00 ms</span>
              <span className="text-[11px] text-slate-500">Point-in-Time</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>3 Replicas Active</span>
            <span>WORM: Encrypted</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Microservice Cluster Matrix + Latency Telemetry Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Col 1 (7 cols): Microservices Cluster Telemetry Matrix */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Microservices Cluster Mesh Status</span>
              </h3>
              <p className="text-xs text-slate-500">Direct latency probes across decoupled backend microservices</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              8/8 Healthy
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              { name: 'API Gateway & OAuth2 Proxy', desc: 'Ingress routing, rate limiting & tenant auth validation', latency: '12 ms', pods: '4 Pods', status: 'Operational' },
              { name: 'OPD Real-time Queue & WebSocket Engine', desc: 'Live token push, waiting room broadcast & doctor sync', latency: '8 ms', pods: '3 Pods', status: 'Operational' },
              { name: 'Clinical EMR Consultation Core', desc: 'Chief complaints, diagnoses, vitals & SOAP encounters', latency: '32 ms', pods: '4 Pods', status: 'Operational' },
              { name: 'Billing, Tariffs & Payment Gateway Bridge', desc: 'GST invoices, Razorpay webhooks & cashier ledgers', latency: '22 ms', pods: '2 Pods', status: 'Operational' },
              { name: 'Pharmacy Dispensary & Stock Stream', desc: 'Medication inventory decrementing & expiry validation', latency: '18 ms', pods: '2 Pods', status: 'Operational' },
              { name: 'Pathology & Diagnostic Bridge', desc: 'Lab test ordering, sample accessioning & report release', latency: '26 ms', pods: '2 Pods', status: 'Operational' },
              { name: 'Notification & DLT SMS/WhatsApp Engine', desc: 'Patient appointment reminders & OTP distribution queue', latency: '45 ms', pods: '2 Pods', status: 'Operational' },
              { name: 'Automated Immutable WORM Backup Vault', desc: '256-bit encrypted snapshot store & disaster recovery', latency: '84 ms', pods: '2 Pods', status: 'Operational' }
            ].map((svc) => (
              <div key={svc.name} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 px-2 rounded-xl transition">
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="font-bold text-slate-900 truncate">{svc.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">&bull; {svc.pods}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate ml-4 mt-0.5">{svc.desc}</p>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                  <span className="font-mono font-bold text-slate-700 text-xs bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                    {svc.latency}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {svc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2 (5 cols): Latency Distribution & Live SVG Graph */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Real-time Latency Distribution</span>
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                P50 vs P95
              </span>
            </div>
            <p className="text-xs text-slate-500">Rolling 60-minute percentile telemetry curve vs SLA threshold</p>
          </div>

          {/* High-Tech Telemetry SVG Wave Graph */}
          <div className="bg-slate-950 rounded-2xl p-4 text-white relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between text-[11px] mb-2 font-mono text-slate-400 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-0.5 bg-emerald-400 rounded-full inline-block"></span>
                  P50 (Median)
                </span>
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2.5 h-0.5 bg-sky-400 rounded-full inline-block"></span>
                  P95 (Tail)
                </span>
              </div>
              <span className="text-rose-400 flex items-center gap-1">
                <span className="w-2 h-0.5 bg-rose-400 inline-block border-dashed"></span>
                SLA Max (200ms)
              </span>
            </div>

            {/* SVG Curve */}
            <div className="h-44 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="p50Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="p95Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
                <line x1="0" y1="140" x2="400" y2="140" stroke="#1e293b" strokeWidth="1" />

                {/* SLA Target Limit Line (Red 200ms marker) */}
                <line x1="0" y1="15" x2="400" y2="15" stroke="#f43f5e" strokeDasharray="4 4" strokeWidth="1.2" opacity="0.6" />

                {/* P95 Area & Line */}
                <path
                  d="M 0 110 Q 50 95, 100 102 T 200 88 T 300 96 T 380 92 L 400 90 L 400 150 L 0 150 Z"
                  fill="url(#p95Grad)"
                />
                <path
                  d="M 0 110 Q 50 95, 100 102 T 200 88 T 300 96 T 380 92 L 400 90"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />

                {/* P50 Area & Line */}
                <path
                  d="M 0 135 Q 50 128, 100 132 T 200 124 T 300 130 T 380 127 L 400 126 L 400 150 L 0 150 Z"
                  fill="url(#p50Grad)"
                />
                <path
                  d="M 0 135 Q 50 128, 100 132 T 200 124 T 300 130 T 380 127 L 400 126"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                />

                {/* Current Live Pulse Dots */}
                <circle cx="400" cy="90" r="4" fill="#38bdf8" />
                <circle cx="400" cy="126" r="4" fill="#34d399" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800">
              <span>-60 min</span>
              <span>-45 min</span>
              <span>-30 min</span>
              <span>-15 min</span>
              <span className="text-emerald-400 font-bold">Live Stream</span>
            </div>
          </div>

          {/* Latency Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">P50 Avg</span>
              <span className="font-mono font-bold text-slate-900 text-sm">32 ms</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">P95 Peak</span>
              <span className="font-mono font-bold text-slate-900 text-sm">64 ms</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Error Rate</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">0.001%</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">TLS 1.3</span>
              <span className="font-mono font-bold text-indigo-600 text-sm">18 ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Database Shard Topology & Live Security Audit Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Shard Cluster Topology (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Server className="w-4 h-4 text-sky-600" />
                <span>Database &amp; Multi-Region Shard Topology</span>
              </h3>
              <p className="text-xs text-slate-500">MongoDB Atlas multi-tenant isolation with hot-failover standby</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Atlas M30 Mesh
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Node 1: Primary Mumbai */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">MongoDB Atlas Replica Set (Primary Leader)</span>
                  <span className="px-1.5 py-0.2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-[9px] font-bold">AWS ap-south-1</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono block mt-0.5">shard-00-00.lbgeemm.mongodb.net</span>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                HEALTHY (42ms)
              </span>
            </div>

            {/* Node 2: Secondary Hyderabad */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">Atlas Secondary Replicas (Sync Active)</span>
                  <span className="px-1.5 py-0.2 bg-purple-50 text-purple-700 border border-purple-200 rounded text-[9px] font-bold">AWS ap-south-2</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">Lag: 0.00s &bull; Point-in-time restore ready &bull; Failover ready &lt; 3s</span>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                100% IN-SYNC
              </span>
            </div>

            {/* Node 3: Redis In-Memory */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">Redis In-Memory Session &amp; Socket Cache</span>
                  <span className="px-1.5 py-0.2 bg-sky-50 text-sky-700 border border-sky-200 rounded text-[9px] font-bold">IDC Zone-A</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">Memory: 12% Used &bull; 0 Evictions &bull; Latency: 8ms</span>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                ONLINE (8ms)
              </span>
            </div>

            {/* Node 4: WORM Backup */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">Automated Database Snapshot (WORM Storage)</span>
                  <span className="px-1.5 py-0.2 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-bold">S3 Vault</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">256-bit encrypted snapshot backup &bull; Immutable 7-year retention</span>
              </div>
              <span className="font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto font-mono">
                Completed (04:00 IST)
              </span>
            </div>
          </div>
        </div>

        {/* Live Security & Health Audit Feed (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Live Infrastructure Telemetry &amp; Audit Stream</span>
              </h3>
              <p className="text-xs text-slate-500">Automated microservice probes and security audits</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Feed
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { time: '14:05:12', tag: 'SECURITY', tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', title: 'Automated SSL/TLS 1.3 cert validation passed', desc: 'Valid for 284 days across all tenant wildcard subdomains (*.lazfort.com).' },
              { time: '13:58:30', tag: 'CACHE', tagColor: 'bg-sky-50 text-sky-700 border-sky-200', title: 'Redis in-memory session compaction completed', desc: 'Active memory usage at 12%, 0 keys evicted, LRU cleanup successful.' },
              { time: '13:45:00', tag: 'SHARDING', tagColor: 'bg-purple-50 text-purple-700 border-purple-200', title: 'MongoDB multi-tenant shard rebalancing verified', desc: '24/24 Hospital tenant databases balanced across 3 shards without orphans.' },
              { time: '13:30:15', tag: 'HEARTBEAT', tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', title: 'End-to-end synthetic API heartbeat passed', desc: 'Probed all 24 regional hospital clusters with 100% SLA verification.' },
              { time: '04:00:00', tag: 'BACKUP', tagColor: 'bg-amber-50 text-amber-700 border-amber-200', title: 'Automated immutable WORM snapshot archived', desc: 'AES-256 encrypted database dump mirrored to offsite cloud vault.' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-slate-200/80 transition flex items-start gap-3">
                <span className="font-mono text-[10px] text-slate-400 mt-0.5 shrink-0">{item.time}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="font-bold text-slate-800 text-xs truncate">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnostic Modal */}
      {diagnosticModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-5 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Deep Cluster Health Diagnostic</h3>
                  <p className="text-[11px] text-slate-500">Live synthetic end-to-end latency &amp; integrity probe</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDiagnosticModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close diagnostic modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Diagnostic Steps List */}
            <div className="space-y-3 text-xs">
              {[
                { step: 1, title: 'Edge Ingress & WAF Gateway Probe', desc: 'Validating SSL/TLS handshakes and Cloudflare edge routes' },
                { step: 2, title: 'MongoDB Multi-Tenant Replica Set Quorum', desc: 'Probing read/write write-concern across Mumbai & Hyderabad shards' },
                { step: 3, title: 'Redis Cache & WebSocket Broadcast Mesh', desc: 'Testing real-time pub/sub latency for hospital token queues' },
                { step: 4, title: 'WORM Vault & Encrypted Document Store', desc: 'Verifying AES-256 S3 backup snapshots and data hashes' }
              ].map((s) => {
                const isDone = diagnosticStep > s.step;
                const isCurrent = diagnosticStep === s.step;
                return (
                  <div
                    key={s.step}
                    className={`p-3 rounded-xl border transition ${
                      isDone
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                        : isCurrent
                        ? 'bg-sky-50/60 border-sky-300 text-slate-900'
                        : 'bg-slate-50 border-slate-200/70 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{s.title}</span>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {isCurrent && <RefreshCw className="w-4 h-4 text-sky-600 animate-spin shrink-0" />}
                      {!isDone && !isCurrent && <span className="text-[10px] text-slate-400 font-mono">Pending</span>}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Diagnostic Footer */}
            {diagnosticStep === 5 ? (
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  All 24 Regional Hospital Clusters 100% Healthy!
                </span>
                <button
                  type="button"
                  onClick={() => setDiagnosticModalOpen(false)}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="text-center text-xs text-slate-500 font-medium">
                Probing cluster mesh... Please wait
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
