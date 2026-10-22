import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSaaS } from '../../context/SaaSContext';
import SaaSSuperAdminProfile from './SaaSSuperAdminProfile';
import SaaSSuperAdminPassword from './SaaSSuperAdminPassword';
import {
  BarChart3,
  Activity,
  UserPlus,
  GitFork,
  Receipt,
  ArrowLeftRight,
  Gauge,
  Boxes,
  Sliders,
  Globe2,
  KeyRound,
  Terminal,
  AlertTriangle,
  Wrench,
  Download,
  Building2,
  Clock,
  Search,
  HardDrive,
  Shield,
  Check,
  Power,
  Server,
  Cpu,
  Database,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  Filter,
  Layers,
  Radio,
  ArrowUpRight,
  Calendar,
  Lock,
  RefreshCw,
  Laptop
} from 'lucide-react';

export default function SaaSOtherViews({ viewType, setActiveTab }) {
  const { user } = useAuth();
  const {
    tenants,
    addTenant,
    branches,
    invoices,
    showToast
  } = useSaaS();

  // Onboarding Wizard Form state
  const [onboardStep, setOnboardStep] = useState(1);
  const [onboardForm, setOnboardForm] = useState({
    name: '',
    regNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    plan: 'Professional',
    userLimit: 50,
    branchLimit: 2,
    storageLimit: '250 GB'
  });

  // Active Sessions state
  const [sessions, setSessions] = useState([
    { id: 'SES-01', user: 'superadmin@lazfort.com', device: 'Chrome on macOS (Apple M3 Max)', ip: '103.22.18.44', location: 'Bengaluru, India (IDC Zone-A)', activeSince: 'Today 09:30 IST', current: true },
    { id: 'SES-02', user: 'support.lead@lazfort.com', device: 'Firefox on Windows 11 Enterprise', ip: '103.22.18.52', location: 'Mumbai, India (Disaster Recovery)', activeSince: 'Today 11:00 IST', current: false },
    { id: 'SES-03', user: 'admin@apexhealth.in', device: 'Edge on Windows 10 Pro', ip: '115.240.89.12', location: 'Navi Mumbai, India', activeSince: 'Yesterday 14:15 IST', current: false },
    { id: 'SES-04', user: 'audit.officer@nabh.gov.in', device: 'Safari on macOS Sequoia', ip: '14.139.112.5', location: 'New Delhi, India', activeSince: '20-Oct-2026 16:45 IST', current: false }
  ]);

  // System Logs state
  const [logs] = useState([
    { id: 'LOG-4415', level: 'INFO', service: 'AUTH-GATEWAY', message: 'FIDO2 WebAuthn token verified for operator USR-SAAS-001', time: '18:45:22 IST' },
    { id: 'LOG-4414', level: 'INFO', service: 'TENANT-CLUSTER', message: 'MongoDB Atlas primary election healthy on shard-00-01 Mumbai', time: '18:38:10 IST' },
    { id: 'LOG-4412', level: 'INFO', service: 'AUTH-GATEWAY', message: 'OAuth2 bearer token refresh executed for USR-SAAS-001', time: '18:30:12 IST' },
    { id: 'LOG-4411', level: 'WARN', service: 'QUEUE-TELEMETRY', message: 'High socket polling volume on tenant TEN-APX-002 (320 req/sec)', time: '18:15:04 IST' },
    { id: 'LOG-4410', level: 'INFO', service: 'BILLING-SYNC', message: 'Monthly invoicing batch completed: 24 tenant invoices generated', time: '17:45:00 IST' },
    { id: 'LOG-4409', level: 'ERROR', service: 'SMS-GATEWAY', message: 'DLT Route Provider 429 RateLimit on OTP gateway — failover to secondary SMS bridge active', time: '16:20:19 IST' }
  ]);

  // Filter logs state
  const [logFilter, setLogFilter] = useState('ALL');
  const [logSearch, setLogSearch] = useState('');

  // Module catalog state
  const [modules, setModules] = useState([
    { id: 'MOD-OPD', name: 'Outpatient Clinical Consultation & EMR', desc: 'Clinical notes, vitals, chronic disease tracking, and e-Prescriptions', status: 'Enabled', tier: 'All Plans', icon: Activity },
    { id: 'MOD-TRIAGE', name: 'Nurse Vitals & Triage Station', desc: 'Direct patient vitals entry, NEWS2 scoring, and care assignment', status: 'Enabled', tier: 'Professional & Enterprise', icon: Layers },
    { id: 'MOD-PHARM', name: 'Central Pharmacy Dispensary & Barcode', desc: 'Drug inventory, batch expiry alerts, and dispensation verification', status: 'Enabled', tier: 'Professional & Enterprise', icon: Boxes },
    { id: 'MOD-LAB', name: 'Diagnostic Laboratory Analyzer Bridge', desc: 'HL7/ASTM bi-directional automated analyzer bridge and releases', status: 'Enabled', tier: 'Professional & Enterprise', icon: Radio },
    { id: 'MOD-BILL', name: 'Hospital Invoicing & Cashier Desk', desc: 'TPA insurance reconciliation, CGHS/NABH tariffs, and receipts', status: 'Enabled', tier: 'All Plans', icon: Receipt },
    { id: 'MOD-NABH', name: 'NABH Digital Audit Trail & Locks', desc: 'WORM immutable record locking and clinical sign-off trails', status: 'Enabled', tier: 'Enterprise Tier', icon: Shield },
    { id: 'MOD-TELE', name: 'Telemedicine Video Consult Gateway', desc: 'Encrypted WebRTC high-definition patient audio/video consultations', status: 'Beta Enabled', tier: 'Enterprise Tier', icon: Globe2 }
  ]);

  // Platform Settings state
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    sessionTimeoutMins: 60,
    enforceMfa: true,
    dataRetentionYears: 7,
    autoBackupHours: 6,
    strictIpLock: true,
    hl7FhirBridge: true
  });

  // Search states for branches & invoices
  const [branchSearch, setBranchSearch] = useState('');
  const [invoiceSearch, setInvoiceSearch] = useState('');

  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    if (!onboardForm.name.trim() || !onboardForm.email.trim()) {
      showToast('Please fill in required fields.', 'error');
      return;
    }
    const code = onboardForm.name.slice(0, 3).toUpperCase();
    addTenant({
      name: onboardForm.name,
      code,
      email: onboardForm.email,
      phone: onboardForm.phone,
      city: onboardForm.city || 'Bengaluru',
      plan: onboardForm.plan,
      userLimit: onboardForm.plan === 'Enterprise' ? 150 : onboardForm.plan === 'Professional' ? 50 : 20,
      branchLimit: onboardForm.plan === 'Enterprise' ? 5 : onboardForm.plan === 'Professional' ? 2 : 1,
      storageLimit: onboardForm.plan === 'Enterprise' ? '500 GB' : onboardForm.plan === 'Professional' ? '250 GB' : '100 GB'
    });
    showToast(`Hospital Tenant "${onboardForm.name}" successfully provisioned!`, 'success');
    setActiveTab('saas_tenants');
  };

  const terminateSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
    showToast(`Session ${id} successfully revoked!`, 'info');
  };

  const toggleModule = (id) => {
    setModules(modules.map(m => m.id === id ? { ...m, status: m.status === 'Enabled' ? 'Disabled' : 'Enabled' } : m));
    showToast(`Module ${id} updated.`);
  };

  return (
    <div className="w-full space-y-6 pb-16 animate-fadeIn">
      {/* ================= 1. PLATFORM ANALYTICS ================= */}
      {viewType === 'saas_analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
                <BarChart3 className="w-4 h-4" />
                <span>Executive Cloud Intelligence</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Platform Analytics &amp; Throughput</h1>
              <p className="text-xs text-slate-500 mt-1">Multi-tenant ARR trajectory, concurrent operational throughput, and cluster capacity.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                Cycle: FY 2026-27 (Q3)
              </span>
              <button
                onClick={() => showToast('Analytics BI report exported to Excel / CSV.', 'info')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export BI Dossier</span>
              </button>
            </div>
          </div>

          {/* 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
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

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Managed Tenants</span>
                <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">24 Hospitals</div>
              <div className="text-xs text-indigo-700 font-semibold pt-1">100% On-Time Subscription Renewals</div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Active OPD Terminals</span>
                <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">1,280 Live</div>
              <div className="text-xs text-sky-600 font-bold pt-1">Concurrent doctor &amp; triage desks</div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
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
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
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

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
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
      )}

      {/* ================= 2. SYSTEM HEALTH ================= */}
      {viewType === 'saas_health' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">
                <Activity className="w-4 h-4" />
                <span>Zero Downtime Architecture</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">System Health &amp; Infrastructure Telemetry</h1>
              <p className="text-xs text-slate-500 mt-1">Real-time status of compute clusters, database replicas, and API gateways.</p>
            </div>
            <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-2 self-start md:self-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All Microservices Operational &bull; 99.992% SLA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Server className="w-4 h-4 text-sky-600" />
                <span>Database &amp; Shard Cluster Status</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">MongoDB Atlas Replica Set (Primary)</span>
                    <span className="text-[11px] text-slate-500">Node: shard-00-00.lbgeemm.mongodb.net</span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">HEALTHY (42ms)</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Atlas Secondary Replicas (Sync Active)</span>
                    <span className="text-[11px] text-slate-500">Lag: 0.00s &bull; Point-in-time restore ready</span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">100% IN-SYNC</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Redis In-Memory Session Cache</span>
                    <span className="text-[11px] text-slate-500">Memory Used: 12% &bull; 0 Evictions</span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">ONLINE</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-600" />
                <span>Latency &amp; Throughput Metrics</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">REST API P95 Response Latency</span>
                    <span className="text-[11px] text-slate-500">Target SLA: &lt; 200 ms</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">64 ms</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">WebSocket Queue Push Latency</span>
                    <span className="text-[11px] text-slate-500">Real-time OPD queue broadcast</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">18 ms</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Automated Database Snapshot (WORM)</span>
                    <span className="text-[11px] text-slate-500">256-bit encrypted snapshot backup</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">Completed (04:00 IST)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. TENANT ONBOARDING WIZARD ================= */}
      {viewType === 'saas_onboarding' && (
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
              <UserPlus className="w-4 h-4" />
              <span>Multi-Tenant Cloud Provisioning</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Hospital Tenant Onboarding Wizard</h1>
            <p className="text-xs text-slate-500 mt-1">Configure institutional registration, subscription plan, and cloud database isolation.</p>
          </div>

          <form onSubmit={handleOnboardSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6 text-xs">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-800 border-b pb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-600" />
                <span>1. Hospital Institutional Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hospital Name *</label>
                  <input
                    type="text"
                    required
                    value={onboardForm.name}
                    onChange={(e) => setOnboardForm({ ...onboardForm, name: e.target.value })}
                    placeholder="e.g. Fortis Memorial Health Hub"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinical Registration / License No. *</label>
                  <input
                    type="text"
                    required
                    value={onboardForm.regNumber}
                    onChange={(e) => setOnboardForm({ ...onboardForm, regNumber: e.target.value })}
                    placeholder="e.g. HOSP-KA-2026-8801"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Administrative Email *</label>
                  <input
                    type="email"
                    required
                    value={onboardForm.email}
                    onChange={(e) => setOnboardForm({ ...onboardForm, email: e.target.value })}
                    placeholder="admin@fortishealth.in"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Hotline Phone *</label>
                  <input
                    type="text"
                    required
                    value={onboardForm.phone}
                    onChange={(e) => setOnboardForm({ ...onboardForm, phone: e.target.value })}
                    placeholder="+91 80 4000 1100"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={onboardForm.city}
                    onChange={(e) => setOnboardForm({ ...onboardForm, city: e.target.value })}
                    placeholder="Bengaluru"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={onboardForm.state}
                    onChange={(e) => setOnboardForm({ ...onboardForm, state: e.target.value })}
                    placeholder="Karnataka"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={onboardForm.country}
                    onChange={(e) => setOnboardForm({ ...onboardForm, country: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-sm text-slate-800 border-b pb-2 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-purple-600" />
                <span>2. Subscription Plan &amp; Quotas</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Basic', price: '₹15,000/mo', users: '20 Staff Seats', storage: '100 GB', badge: 'Clinic Tier' },
                  { name: 'Professional', price: '₹35,000/mo', users: '50 Staff Seats', storage: '250 GB', badge: 'Hospital Tier' },
                  { name: 'Enterprise', price: '₹75,000/mo', users: '150+ Staff Seats', storage: '500 GB', badge: 'Multi-Campus' }
                ].map(pl => (
                  <button
                    key={pl.name}
                    type="button"
                    onClick={() => setOnboardForm({ ...onboardForm, plan: pl.name })}
                    className={`p-5 rounded-2xl border text-left transition ${
                      onboardForm.plan === pl.name
                        ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-purple-700 uppercase">{pl.badge}</span>
                    <span className="font-black text-slate-900 text-base block mt-0.5">{pl.name} Plan</span>
                    <span className="text-xs font-bold text-sky-700 block mt-1">{pl.price}</span>
                    <span className="text-[11px] text-slate-500 block mt-2">{pl.users} &bull; {pl.storage}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg transition shadow-sky-600/30 text-xs sm:text-sm"
              >
                Launch &amp; Provision Hospital Tenant
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= 4. BRANCH MANAGEMENT ================= */}
      {viewType === 'saas_branches' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
                <GitFork className="w-4 h-4" />
                <span>Multi-Campus Topology</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Multi-Branch Campus Management</h1>
              <p className="text-xs text-slate-500 mt-1">Campuses and satellite clinics mapped under enterprise hospital tenants.</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search campus or hospital..."
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-600 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Branch ID</th>
                  <th className="p-4">Hospital Group</th>
                  <th className="p-4">Campus Name</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Bed Capacity</th>
                  <th className="p-4">Campus Type</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {branches
                  .filter(b => !branchSearch || b.name.toLowerCase().includes(branchSearch.toLowerCase()) || b.hospital.toLowerCase().includes(branchSearch.toLowerCase()))
                  .map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 font-mono font-bold text-sky-700">{b.id}</td>
                      <td className="p-4 font-bold text-slate-900">{b.hospital}</td>
                      <td className="p-4 font-medium text-slate-800">{b.name}</td>
                      <td className="p-4 text-slate-600">{b.city}</td>
                      <td className="p-4 font-mono font-semibold">{b.beds} Beds</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${b.isMain ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-600'}`}>
                          {b.isMain ? 'Main Campus' : 'Satellite OPD'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 5. PLATFORM INVOICES ================= */}
      {viewType === 'saas_invoices' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">
                <Receipt className="w-4 h-4" />
                <span>Commercial Ledger</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Platform B2B Invoices</h1>
              <p className="text-xs text-slate-500 mt-1">Commercial SaaS subscription invoices issued to hospital tenants.</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search invoice or tenant..."
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-600 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Invoice ID</th>
                  <th className="p-4">Hospital Tenant</th>
                  <th className="p-4">Plan Tier</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Billing Period</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Tax Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {invoices
                  .filter(inv => !invoiceSearch || inv.hospital.toLowerCase().includes(invoiceSearch.toLowerCase()) || inv.id.toLowerCase().includes(invoiceSearch.toLowerCase()))
                  .map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 font-mono font-bold text-sky-700">{inv.id}</td>
                      <td className="p-4 font-bold text-slate-900">{inv.hospital}</td>
                      <td className="p-4 font-medium">{inv.plan}</td>
                      <td className="p-4 font-mono font-bold text-slate-900">₹{inv.amount.toLocaleString('en-IN')}</td>
                      <td className="p-4 font-mono text-[11px] text-slate-500">{inv.billingPeriod}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => showToast(`Downloaded verified tax invoice ${inv.id}`, 'info')}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold flex items-center gap-1.5 ml-auto transition"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 6. PAYMENTS & TRANSACTIONS ================= */}
      {viewType === 'saas_transactions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
                <ArrowLeftRight className="w-4 h-4" />
                <span>Financial Settlement Gateway</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Payments &amp; Settlement Mesh</h1>
              <p className="text-xs text-slate-500 mt-1">Automated payment gateway reconciliations and institutional settlements.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">T+1 Settlement Bridge</span>
              <div className="text-xl font-black text-slate-900">Razorpay Enterprise</div>
              <span className="text-xs text-emerald-600 font-bold">&bull; Real-time webhook active</span>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Escrow Custody Bank</span>
              <div className="text-xl font-black text-slate-900">HDFC Corporate Bank</div>
              <span className="text-xs text-slate-500">IFSC: HDFC0000128 &bull; Verified</span>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Dispute &amp; Chargeback Rate</span>
              <div className="text-xl font-black text-emerald-600">0.00%</div>
              <span className="text-xs text-slate-500">Zero unsettled chargebacks</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= 7. USAGE & LIMITS ================= */}
      {viewType === 'saas_usage' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">
                <Gauge className="w-4 h-4" />
                <span>Resource Metering</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Tenant Resource Quotas &amp; Limits</h1>
              <p className="text-xs text-slate-500 mt-1">Resource metering across hospital storage, API throughput, and registered staff seats.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tenants.map(t => (
              <div key={t.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 text-xs">
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
                      <span>Staff Seat Allocation: {t.totalUsers} / {t.userLimit} Users</span>
                      <span>{Math.round((t.totalUsers / t.userLimit) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-2 rounded-full" style={{ width: `${Math.min(100, (t.totalUsers / t.userLimit) * 100)}%` }} />
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
            ))}
          </div>
        </div>
      )}

      {/* ================= 8. MODULE MANAGEMENT ================= */}
      {viewType === 'saas_modules' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
                <Boxes className="w-4 h-4" />
                <span>Functional Capabilities</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Platform Clinical Module Gating</h1>
              <p className="text-xs text-slate-500 mt-1">Enable or disable operational clinical modules across subscription tiers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map(mod => {
              const Icon = mod.icon || Boxes;
              const isEnabled = mod.status === 'Enabled' || mod.status === 'Beta Enabled';
              return (
                <div key={mod.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className={`px-3 py-1 rounded-full font-bold text-xs transition ${
                          isEnabled
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {mod.status}
                      </button>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{mod.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono">{mod.id}</span>
                    <span className="font-semibold text-slate-600">{mod.tier}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= 9. PLATFORM SETTINGS & GLOBAL CONFIG ================= */}
      {(viewType === 'saas_settings' || viewType === 'saas_config') && (
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4" />
              <span>Platform Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {viewType === 'saas_settings' ? 'Global Platform Settings' : 'Platform Architecture & Cloud Config'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">Security policies, tenant isolation parameters, and regulatory compliance rules.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 text-xs">
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Global Maintenance Mode</span>
                <span className="text-slate-500 text-[11px]">Temporarily pauses non-critical API write endpoints</span>
              </div>
              <button
                onClick={() => {
                  setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode });
                  showToast(`Maintenance mode ${!settings.maintenanceMode ? 'ENABLED' : 'DISABLED'}.`, 'info');
                }}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
                  settings.maintenanceMode ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {settings.maintenanceMode ? 'ACTIVE' : 'OFF'}
              </button>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Hardware MFA (FIDO2 / YubiKey) Enforcement</span>
                <span className="text-slate-500 text-[11px]">Mandates cryptographic physical keys for all Super Admin actions</span>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold">
                ENFORCED
              </span>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">NABH Immutable Audit Trail Retention</span>
                <span className="text-slate-500 text-[11px]">Statutory requirement for healthcare electronic records in India</span>
              </div>
              <span className="font-mono font-bold text-slate-800 bg-white px-3 py-1 rounded-xl border border-slate-200">
                {settings.dataRetentionYears} Years (WORM Locked)
              </span>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Automated Database Snapshot Interval</span>
                <span className="text-slate-500 text-[11px]">Frequency of point-in-time cross-region replica backups</span>
              </div>
              <span className="font-mono font-bold text-slate-800 bg-white px-3 py-1 rounded-xl border border-slate-200">
                Every {settings.autoBackupHours} Hours
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= 10. LOGIN & SESSIONS ================= */}
      {viewType === 'saas_sessions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
                <KeyRound className="w-4 h-4" />
                <span>Session Security</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Active Platform Sessions</h1>
              <p className="text-xs text-slate-500 mt-1">Currently valid cryptographic session tokens across operator devices.</p>
            </div>
            {sessions.length > 1 && (
              <button
                onClick={() => {
                  setSessions(sessions.filter(s => s.current));
                  showToast('All other remote sessions terminated.', 'info');
                }}
                className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl font-bold text-xs transition"
              >
                Revoke All Other Sessions
              </button>
            )}
          </div>

          <div className="space-y-4">
            {sessions.map(s => (
              <div
                key={s.id}
                className={`p-5 rounded-3xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  s.current ? 'bg-sky-50/40 border-sky-200/80' : 'bg-white border-slate-200/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    s.current ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Laptop className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
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
                    onClick={() => terminateSession(s.id)}
                    className="px-3.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-xl font-bold text-xs transition"
                  >
                    Revoke Token
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 11. SYSTEM LOGS & ALERTS ================= */}
      {(viewType === 'saas_logs' || viewType === 'saas_alerts') && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
                <Terminal className="w-4 h-4" />
                <span>Live Event Stream</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {viewType === 'saas_logs' ? 'System Telemetry & Microservice Logs' : 'Security Alerts & Rate Limit Breaches'}
              </h1>
              <p className="text-xs text-slate-500 mt-1">Direct stdout stream from platform API microservices and auth gateways.</p>
            </div>
            <div className="flex items-center gap-2">
              {['ALL', 'INFO', 'WARN', 'ERROR'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setLogFilter(lvl)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
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

          <div className="bg-slate-950 text-slate-300 rounded-3xl p-6 sm:p-8 font-mono text-xs space-y-3 border border-slate-800 shadow-xl overflow-x-auto">
            <div className="flex items-center justify-between text-slate-500 pb-3 border-b border-slate-900">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>STREAM: STDOUT / VAR / LOG / LAZFORT-CORE</span>
              </span>
              <span>TLS 1.3 ENCRYPTED</span>
            </div>

            {logs
              .filter(l => logFilter === 'ALL' || l.level === logFilter)
              .map(l => (
                <div key={l.id} className="flex items-center gap-3 py-1.5 border-b border-slate-900/80 hover:bg-slate-900/40 transition">
                  <span className="text-slate-500 shrink-0">{l.time}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    l.level === 'ERROR'
                      ? 'bg-rose-900/60 text-rose-300 border border-rose-800'
                      : l.level === 'WARN'
                      ? 'bg-amber-900/60 text-amber-300 border border-amber-800'
                      : 'bg-sky-900/60 text-sky-300 border border-sky-800'
                  }`}>
                    {l.level}
                  </span>
                  <span className="text-sky-400 font-bold shrink-0">[{l.service}]</span>
                  <span className="text-slate-200">{l.message}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ================= 12. MAINTENANCE MANAGEMENT ================= */}
      {viewType === 'saas_maintenance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-600 font-bold uppercase tracking-wider mb-1">
                <Wrench className="w-4 h-4" />
                <span>Planned Operations</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Scheduled Maintenance Windows</h1>
              <p className="text-xs text-slate-500 mt-1">Plan cloud patching, database upgrades, and publish automated tenant warning banners.</p>
            </div>
            <button
              onClick={() => showToast('New maintenance window scheduled for 26-Oct-2026.', 'success')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Schedule New Window
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 text-xs">
            <div className="p-5 bg-sky-50 rounded-2xl border border-sky-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-950 text-sm">Next Window: 26-Oct-2026 (02:00 AM - 02:30 AM IST)</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-600 text-white">PLANNED</span>
              </div>
              <p className="text-sky-900 leading-relaxed">
                MongoDB Atlas Multi-Region Replica Failover Drill &amp; Operating System Patching. Automated tenant notification banner is active on all hospital portals. Zero clinical data loss guaranteed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 13. MY PROFILE ================= */}
      {viewType === 'saas_profile' && (
        <SaaSSuperAdminProfile initialTab="overview" setActiveTab={setActiveTab} />
      )}

      {/* ================= 14. CHANGE PASSWORD ================= */}
      {viewType === 'saas_password' && (
        <SaaSSuperAdminPassword setActiveTab={setActiveTab} />
      )}
    </div>
  );
}
