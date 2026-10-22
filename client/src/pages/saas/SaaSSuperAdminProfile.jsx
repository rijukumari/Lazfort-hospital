import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSaaS } from '../../context/SaaSContext';
import Modal from '../../components/Modal';
import {
  User,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Key,
  Lock,
  Copy,
  Check,
  Globe,
  Building2,
  Server,
  HardDrive,
  Terminal,
  Activity,
  Clock,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit3,
  RefreshCw,
  FileText,
  Fingerprint,
  Laptop,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Zap,
  Database,
  Eye,
  EyeOff,
  Download,
  Sliders,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function SaaSSuperAdminProfile({ initialTab = 'overview', setActiveTab }) {
  const { user, updateUser } = useAuth();
  const { showToast, auditRecords } = useSaaS();

  // Active sub-tab
  const [activeSubTab, setActiveSubTab] = useState(initialTab === 'password' ? 'security' : 'overview');

  // Copy state
  const [copiedField, setCopiedField] = useState(null);

  // Edit Profile Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || 'Vikramaditya Singhania',
    email: user?.email || 'superadmin@lazfort.com',
    department: user?.department || 'Global Cloud Platform Operations',
    phone: user?.phone || '+91 98450 11234',
    location: user?.location || 'Bengaluru Cloud IDC • Zone-A',
    timezone: user?.timezone || 'Asia/Kolkata (IST • UTC+05:30)',
    bio: user?.bio || 'Chief Infrastructure Architect & Root Platform Administrator for Lazfort Multi-Tenant Healthcare Cloud. Enforcing zero-trust security and NABH/HIPAA compliance across all tenant nodes.'
  });

  // Change Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  // Active Sessions
  const [sessions, setSessions] = useState([
    {
      id: 'SES-ROOT-001',
      device: 'MacBook Pro 16" (M3 Max)',
      browser: 'Chrome 130.0 Enterprise',
      ip: '103.22.18.44',
      location: 'Bengaluru, India (Corporate VPN)',
      activeSince: 'Today, 08:30 IST',
      lastActive: 'Just now',
      isCurrent: true,
      authMethod: 'Hardware YubiKey 5C NFC'
    },
    {
      id: 'SES-MOB-002',
      device: 'iPhone 15 Pro (iOS 18.1)',
      browser: 'Lazfort Admin Mobile Secure Client',
      ip: '103.22.18.91',
      location: 'Bengaluru, India',
      activeSince: 'Yesterday, 19:12 IST',
      lastActive: '2 hours ago',
      isCurrent: false,
      authMethod: 'Biometric FaceID + TOTP'
    },
    {
      id: 'SES-OPS-003',
      device: 'ThinkPad X1 Carbon (Linux Fedora 40)',
      browser: 'Firefox ESR 128.3',
      ip: '115.240.89.12',
      location: 'Mumbai Cloud Disaster Recovery IDC',
      activeSince: '20-Oct-2026 14:15 IST',
      lastActive: 'Yesterday',
      isCurrent: false,
      authMethod: 'Hardware YubiKey Nano'
    }
  ]);

  // Security WebAuthn test state
  const [yubiTestStatus, setYubiTestStatus] = useState(null);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`Copied ${fieldName} to clipboard!`, 'info');
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser(editForm);
    }
    showToast('Super Admin profile updated successfully!', 'success');
    setIsEditModalOpen(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordErrorMsg('');
    setPasswordSuccessMsg('');

    if (passwordForm.newPassword.length < 8) {
      setPasswordErrorMsg('New password must be at least 8 characters long.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordErrorMsg('New password and confirmation do not match.');
      return;
    }

    // Success simulation
    setPasswordSuccessMsg('Platform Master Password updated successfully! Next session will require FIDO2 re-handshake.');
    showToast('Platform master password updated securely.', 'success');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleTerminateSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    showToast(`Session ${id} revoked immediately. Cryptographic token invalidated.`, 'info');
  };

  const handleTestYubiKey = () => {
    setYubiTestStatus('testing');
    setTimeout(() => {
      setYubiTestStatus('verified');
      showToast('YubiKey 5C FIPS Challenge-Response Handshake: 100% OK', 'success');
      setTimeout(() => setYubiTestStatus(null), 4000);
    }, 1200);
  };

  const handleExportDossier = () => {
    const data = {
      operatorId: user?.userId || 'USR-SAAS-001',
      operatorName: user?.fullName || 'Vikramaditya Singhania',
      email: user?.email || 'superadmin@lazfort.com',
      department: user?.department || 'Global Cloud Platform Operations',
      jurisdiction: '24 Hospital Tenants • Cross-Tenant Root Scope',
      securityCompliance: 'NABH Digital Health Safety & HIPAA Level 4',
      generatedAt: new Date().toISOString(),
      activeSessions: sessions
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SuperAdmin_Dossier_${user?.userId || 'USR-SAAS-001'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Operator Dossier downloaded successfully.', 'info');
  };

  // Password Strength Calculator
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (score === 3) return { score: 55, label: 'Moderate', color: 'bg-amber-500' };
    if (score === 4) return { score: 80, label: 'Strong', color: 'bg-sky-500' };
    return { score: 100, label: 'Exceptional (Master Tier)', color: 'bg-emerald-500' };
  };

  const passStrength = getPasswordStrength(passwordForm.newPassword);

  // Privileges List
  const rootPrivileges = [
    {
      code: 'SYS_TENANT_LIFECYCLE',
      title: 'Tenant Lifecycle & Provisioning',
      scope: 'Global Cloud (24 Hospitals)',
      desc: 'Provision, configure database sharding, suspend, migrate or terminate hospital tenant clusters.',
      level: 'Root Clearance',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      code: 'SYS_MULTI_DB_FAILOVER',
      title: 'Database Cluster & Failover Control',
      scope: 'AWS ap-south-1 & Azure India',
      desc: 'Execute zero-downtime MongoDB Atlas replica failovers and automated point-in-time restores.',
      level: 'High Criticality',
      badge: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      code: 'SYS_BILLING_OVERRIDE',
      title: 'Platform Billing & Quota Master',
      scope: 'All Subscriptions & Tariffs',
      desc: 'Modify subscription quotas, override billing transactions, issue credit memos and configure tier pricing.',
      level: 'Financial Authority',
      badge: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      code: 'SYS_NABH_AUDIT_VERIFY',
      title: 'Immutable NABH Audit Trail Authority',
      scope: 'Platform Wide Audit Stream',
      desc: 'Review cryptographically signed access logs and certify regulatory compliance reports.',
      level: 'Compliance Root',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      code: 'SYS_SECURITY_KEY_MASTER',
      title: 'Cryptographic Keyring & Secrets Vault',
      scope: 'AWS KMS & HashiCorp Vault',
      desc: 'Rotate JWT signing keys, TLS 1.3 certificates, and database column-level encryption keys.',
      level: 'Cryptographic Root',
      badge: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      code: 'SYS_EMERGENCY_CIRCUIT_BREAKER',
      title: 'Emergency Global Circuit Breaker',
      scope: 'All Edge API Gateways',
      desc: 'Instantly lock tenant write APIs or quarantine suspect IP ranges during DDoS or intrusion alerts.',
      level: 'Emergency Override',
      badge: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  ];

  // Operator Actions Log
  const operatorActions = [
    {
      id: 'OP-9941',
      action: 'TENANT_TIER_UPGRADE',
      target: 'Apex Medicity (TEN-APX-002)',
      time: 'Today, 17:42 IST',
      status: 'Success',
      ip: '103.22.18.44',
      details: 'Upgraded tenant quota from Professional to Enterprise Tier (150 users, 500 GB)'
    },
    {
      id: 'OP-9940',
      action: 'SECURITY_KEY_ROTATION',
      target: 'Global Auth Gateway',
      time: 'Today, 14:15 IST',
      status: 'Success',
      ip: '103.22.18.44',
      details: 'Rotated RS256 token verification key pair across all edge clusters'
    },
    {
      id: 'OP-9939',
      action: 'MAINTENANCE_WINDOW_SCHEDULED',
      target: 'Atlas Primary Cluster Mumbai',
      time: 'Yesterday, 18:20 IST',
      status: 'Success',
      ip: '103.22.18.44',
      details: 'Scheduled 30-min failover drill for 26-Oct-2026 (02:00 AM IST)'
    },
    {
      id: 'OP-9938',
      action: 'TENANT_DATA_BACKUP_VERIFY',
      target: 'Fortis Healthcare (TEN-FOR-003)',
      time: 'Yesterday, 11:05 IST',
      status: 'Success',
      ip: '103.22.18.44',
      details: 'Automated checksum validation passed on 142 GB encrypted snapshot'
    },
    {
      id: 'OP-9937',
      action: 'RATE_LIMIT_POLICY_UPDATE',
      target: 'Public Patient Telemetry API',
      time: '20-Oct-2026 16:30 IST',
      status: 'Success',
      ip: '103.22.18.44',
      details: 'Enforced 300 req/min per IP threshold on auth endpoints'
    }
  ];

  return (
    <div className="w-full space-y-6 pb-12 animate-fadeIn">
      {/* ================= 1. BREADCRUMBS & CONTEXT BAR ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Platform Governance</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Identity & Access Control</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
            Super Admin Profile
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Root Session Validated &bull; FIDO2 Hardware Locked
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Node: AS-SOUTH-1A
          </span>
        </div>
      </div>

      {/* ================= 2. HERO COVER BANNER ================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-800 bg-slate-950 text-white">
        {/* Ambient Glows & Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-sky-950/20 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Cover Visual Strip */}
        <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800/80 px-6 sm:px-8 py-4 flex items-start justify-between relative">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-mono text-[11px] font-bold tracking-wider uppercase">
              Lazfort Cloud Platform v4.2 &bull; Multi-Tenant Core
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportDossier}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
              title="Export complete cryptographic profile dossier"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export Dossier</span>
            </button>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-sky-600/30"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Details Header Overlay */}
        <div className="relative px-6 sm:px-8 pb-8 pt-0 -mt-14 sm:-mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 p-1 shadow-2xl ring-4 ring-slate-950">
                <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-white font-black text-3xl sm:text-4xl shadow-inner">
                  {user?.fullName?.charAt(0) || 'V'}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 ring-4 ring-slate-950 flex items-center justify-center text-white" title="Root Session Active">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Title & Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {user?.fullName || 'Vikramaditya Singhania'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-purple-400" />
                  SaaS Super Admin &bull; Global Root
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Level 0 Clearance
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  {user?.email || 'superadmin@lazfort.com'}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  {user?.department || 'Global Cloud Platform Operations'}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {user?.location || 'Bengaluru Cloud IDC • Zone-A'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick ID & 2FA Pill */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Operator ID:</span>
              <button
                onClick={() => handleCopy(user?.userId || 'USR-SAAS-001', 'Operator ID')}
                className="font-mono font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 transition"
                title="Click to copy ID"
              >
                <span>{user?.userId || 'USR-SAAS-001'}</span>
                {copiedField === 'Operator ID' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-400">Primary 2FA:</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Hardware YubiKey Enforced
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. FOUR KPI METRIC TILES ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tile 1 */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Access Scope</span>
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900">Level 0 &bull; Root</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">Tenant Clusters</span>
            <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">All 24 Managed</span>
          </div>
        </div>

        {/* Tile 2 */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Authentication</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Fingerprint className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900">YubiKey 5C FIPS</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">WebAuthn Protocol</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Level-3 Enforced</span>
          </div>
        </div>

        {/* Tile 3 */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Sessions</span>
            <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Laptop className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900">{sessions.length} Devices</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">Corporate Subnet</span>
            <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">103.22.18.0/24</span>
          </div>
        </div>

        {/* Tile 4 */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance Status</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900">100% Locked</div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">NABH & HIPAA</span>
            <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Zero Exceptions</span>
          </div>
        </div>
      </div>

      {/* ================= 4. TAB NAVIGATION STRIP ================= */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-sm flex flex-wrap gap-1">
        {[
          { id: 'overview', label: 'Identity & Overview', icon: User },
          { id: 'security', label: 'Security & Master Credentials', icon: Lock },
          { id: 'privileges', label: 'Root Privileges Matrix', icon: Shield },
          { id: 'audit', label: 'Operator Audit Trail', icon: FileText },
          { id: 'sessions', label: 'Active Sessions & Devices', icon: Laptop }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= 5. TAB CONTENT PANELS ================= */}

      {/* TAB 1: IDENTITY & OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Main Dossier */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal & Operator Dossier */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Operator Dossier & Profile Details</h2>
                  <p className="text-xs text-slate-500">Verified identity parameters for platform root operations.</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Update Details</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Legal Full Name</span>
                  <div className="font-bold text-slate-900 text-sm">{user?.fullName || 'Vikramaditya Singhania'}</div>
                  <span className="text-[11px] text-slate-500">Government ID Verified &bull; AADHAAR/PAN</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Root Operator ID</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-sm">{user?.userId || 'USR-SAAS-001'}</span>
                    <button
                      onClick={() => handleCopy(user?.userId || 'USR-SAAS-001', 'Operator ID')}
                      className="text-slate-400 hover:text-sky-600 transition"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">Platform Master Keyholder</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Administrative Email</span>
                  <div className="font-bold text-slate-900 text-sm truncate">{user?.email || 'superadmin@lazfort.com'}</div>
                  <span className="text-[11px] text-slate-500">Direct Delivery for P1 Emergency Pages</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Emergency Telecom Hotline</span>
                  <div className="font-bold text-slate-900 text-sm">{user?.phone || '+91 98450 11234'}</div>
                  <span className="text-[11px] text-slate-500">Encrypted Signal / Automated Incident IVR</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Assigned Department</span>
                  <div className="font-bold text-slate-900 text-sm">{user?.department || 'Global Cloud Platform Operations'}</div>
                  <span className="text-[11px] text-slate-500">Division: Cloud Infrastructure & Cyber Defense</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Primary Datacenter Location</span>
                  <div className="font-bold text-slate-900 text-sm">{user?.location || 'Bengaluru Cloud IDC • Zone-A'}</div>
                  <span className="text-[11px] text-slate-500">Tier-IV Uptime Certified Facility</span>
                </div>
              </div>

              {/* Bio & Administrative Scope Statement */}
              <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                  <span className="font-bold text-sky-950">Administrative Mission & Scope Declaration</span>
                </div>
                <p className="text-sky-900/90 leading-relaxed">
                  {user?.bio || 'Chief Infrastructure Architect & Root Platform Administrator for Lazfort Multi-Tenant Healthcare Cloud. Enforcing zero-trust security and NABH/HIPAA compliance across all tenant nodes.'}
                </p>
              </div>

              {/* Cryptographic Key Fingerprint Strip */}
              <div className="p-4 bg-slate-900 text-slate-300 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-sky-400" />
                    Public Hardware GPG Signing Key Fingerprint
                  </span>
                  <button
                    onClick={() => handleCopy('E5F9 2A1B 94C3 87E0 DB31 4FA8 2B5E 7901 C683 E810', 'GPG Fingerprint')}
                    className="text-xs text-sky-400 hover:text-sky-300 font-mono font-bold flex items-center gap-1"
                  >
                    <span>{copiedField === 'GPG Fingerprint' ? 'Copied' : 'Copy Key'}</span>
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <div className="font-mono text-[11px] bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-sky-300 break-all select-all">
                  E5F9 2A1B 94C3 87E0 DB31 4FA8 2B5E 7901 C683 E810
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Algorithm: Ed25519 (FIDO2 Hardware Bound)</span>
                  <span>Expires: Never (Platform Master)</span>
                </div>
              </div>
            </div>

            {/* Managed Infrastructure Overview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Governed Multi-Tenant Architecture</h3>
                <span className="text-xs text-slate-500">Live Health: 100% Operational</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-400">Total Active Tenants</span>
                  <div className="text-xl font-black text-slate-900">24 Hospitals</div>
                  <span className="text-[10px] text-emerald-600 font-bold">&bull; 0 Degraded Clusters</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-400">Branch Nodes</span>
                  <div className="text-xl font-black text-slate-900">64 Clinics</div>
                  <span className="text-[10px] text-sky-600 font-bold">&bull; Real-time HL7/FHIR Sync</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-400">Storage & Audit Vault</span>
                  <div className="text-xl font-black text-slate-900">1.84 TB</div>
                  <span className="text-[10px] text-purple-600 font-bold">&bull; AES-256 GCM Immutable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Quick Actions & Security Status */}
          <div className="space-y-6">
            {/* Root Credential Quick Summary */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Cryptographic Root Status</h3>
                  <span className="text-[11px] text-sky-300 font-mono">ENFORCED & HEALTHY</span>
                </div>
              </div>

              <div className="space-y-3 text-xs pt-1">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-slate-400">Hardware 2FA:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Enforced
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-slate-400">Subnet Lock:</span>
                  <span className="text-sky-300 font-mono font-bold">103.22.18.0/24</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-slate-400">Master Password:</span>
                  <span className="text-slate-300">Updated 14 days ago</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-slate-400">Audit Compliance:</span>
                  <span className="text-purple-300 font-bold">NABH Digital Trail</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleTestYubiKey}
                  disabled={yubiTestStatus === 'testing'}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${yubiTestStatus === 'testing' ? 'animate-spin' : ''}`} />
                  <span>
                    {yubiTestStatus === 'testing'
                      ? 'Performing FIDO2 Handshake...'
                      : yubiTestStatus === 'verified'
                      ? 'Hardware Verified!'
                      : 'Test YubiKey Handshake'}
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Governance Links */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">Governance Fast Travel</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSubTab('security')}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 text-left flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-slate-500 group-hover:text-sky-600" />
                    <div>
                      <div className="font-bold text-slate-900">Change Master Password</div>
                      <div className="text-[11px] text-slate-500">Update root login password</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </button>

                <button
                  onClick={() => setActiveTab && setActiveTab('saas_audit')}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 text-left flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-slate-500 group-hover:text-sky-600" />
                    <div>
                      <div className="font-bold text-slate-900">Security Audit Logs</div>
                      <div className="text-[11px] text-slate-500">View live immutable system trail</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </button>

                <button
                  onClick={() => setActiveTab && setActiveTab('saas_tenants')}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 text-left flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-slate-500 group-hover:text-sky-600" />
                    <div>
                      <div className="font-bold text-slate-900">Manage Hospital Tenants</div>
                      <div className="text-[11px] text-slate-500">24 active multi-tenant instances</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECURITY & MASTER CREDENTIALS */}
      {activeSubTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Col: Master Password Management */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Change Super Admin Password</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Update the master administrator credentials. Strong password required (minimum 8 characters with symbol & number).
              </p>
            </div>

            {passwordSuccessMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{passwordSuccessMsg}</span>
              </div>
            )}

            {passwordErrorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{passwordErrorMsg}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Enter existing password"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Master Password</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Enter robust new password"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {passwordForm.newPassword && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-500">Password Strength:</span>
                      <span className="font-bold text-slate-700">{passStrength.label}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passStrength.color} transition-all duration-300`}
                        style={{ width: `${passStrength.score}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Repeat new password"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-700">Password Security Policy:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                  <li>Minimum 8 characters (12+ recommended for root clearance)</li>
                  <li>At least one capital letter &amp; one number</li>
                  <li>Special cryptographic character required (@, #, $, %, etc.)</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition shadow-sky-600/20 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Commit Master Password Change</span>
              </button>
            </form>
          </div>

          {/* Right Col: Hardware 2FA & Cryptographic Keys */}
          <div className="space-y-6">
            {/* Hardware Keys */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Multi-Factor Authentication (MFA)</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Hardware FIDO2 Security Keys and backup biometric passkeys.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {/* YubiKey Primary */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-950">YubiKey 5C NFC (Primary Hardware Key)</span>
                      <span className="px-2 py-0.2 bg-emerald-600 text-white font-bold rounded text-[10px]">ACTIVE</span>
                    </div>
                    <p className="text-emerald-800 text-[11px]">
                      Serial: #YK-98442-IND &bull; FIDO2 / WebAuthn Level 3 Token
                    </p>
                    <span className="text-[10px] text-emerald-700 block">Bound on: 12-Jan-2024 &bull; Physical Touch Enforced</span>
                  </div>
                  <button
                    onClick={handleTestYubiKey}
                    className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-xl font-bold hover:bg-emerald-100 transition shrink-0"
                  >
                    Verify
                  </button>
                </div>

                {/* Backup Authenticator App */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Google Authenticator (TOTP Fallback)</span>
                      <span className="px-2 py-0.2 bg-slate-200 text-slate-700 font-bold rounded text-[10px]">STANDBY</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      RFC 6238 6-Digit Time-based One Time Password generator
                    </p>
                    <span className="text-[10px] text-slate-400 block">Requires Super Admin PIN before generation</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 py-1.5">Configured</span>
                </div>

                {/* Offline Emergency Recovery Codes */}
                <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-950">Disaster Recovery Codes</span>
                      <span className="px-2 py-0.2 bg-amber-500 text-white font-bold rounded text-[10px]">10/10 UNUSED</span>
                    </div>
                    <p className="text-amber-800 text-[11px]">
                      Single-use cryptographic recovery strings stored in physical bank vault.
                    </p>
                  </div>
                  <button
                    onClick={() => showToast('Recovery codes can only be viewed inside physical HSM enclave.', 'info')}
                    className="px-3 py-1.5 bg-white border border-amber-300 text-amber-900 rounded-xl font-bold hover:bg-amber-100 transition shrink-0"
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* IP Range Access Whitelist */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-800">Authorized Operator IP Subnets</span>
                <div className="flex items-center justify-between font-mono bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-700 font-semibold">103.22.18.0/24 (Bengaluru IDC VPN)</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Whitelisted</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Access from external non-whitelisted IP addresses triggers automated geo-fenced root lock.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ROOT PRIVILEGES MATRIX */}
      {activeSubTab === 'privileges' && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Super Admin Root Privileges Matrix</h2>
              <p className="text-xs text-slate-500">Exhaustive authorization ledger for Operator USR-SAAS-001.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs self-start sm:self-auto">
              RBAC Clearance: Level 0 (Master)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rootPrivileges.map((priv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {priv.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${priv.badge}`}>
                      {priv.level}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{priv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{priv.desc}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Jurisdiction:</span>
                  <span className="font-semibold text-slate-700">{priv.scope}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance & NABH Statement */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-purple-700 mt-0.5 shrink-0" />
            <div className="text-xs text-purple-950 space-y-1">
              <span className="font-bold block">NABH Digital Health Safety &amp; HIPAA Audit Lock</span>
              <p className="text-purple-900/90 leading-relaxed">
                All actions executed under Level-0 Root clearance are cryptographically timestamped and replicated to an immutable write-once read-many (WORM) audit ledger. No operator (including Super Admin) can erase or modify the system audit history.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: OPERATOR AUDIT TRAIL */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Administrative Audit Activity</h2>
              <p className="text-xs text-slate-500">Real-time audit log of actions initiated by operator USR-SAAS-001.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportDossier}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Audit CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold">
                  <th className="py-3 px-4 rounded-l-xl">Log ID</th>
                  <th className="py-3 px-4">Action Event</th>
                  <th className="py-3 px-4">Target Resource</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">IP Address</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {operatorActions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{item.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {item.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.target}</td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">{item.time}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 text-[11px]">{item.ip}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full text-[10px] border border-emerald-200">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] max-w-xs truncate" title={item.details}>
                      {item.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ACTIVE SESSIONS & DEVICES */}
      {activeSubTab === 'sessions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Authorized Devices & Active Sessions</h2>
              <p className="text-xs text-slate-500">Currently valid cryptographic session tokens linked to this account.</p>
            </div>
            {sessions.length > 1 && (
              <button
                onClick={() => {
                  setSessions(prev => prev.filter(s => s.isCurrent));
                  showToast('All remote sessions terminated successfully.', 'info');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition"
              >
                Revoke All Other Sessions
              </button>
            )}
          </div>

          <div className="space-y-4">
            {sessions.map((ses) => (
              <div
                key={ses.id}
                className={`p-5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  ses.isCurrent
                    ? 'bg-sky-50/50 border-sky-200/80'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    ses.isCurrent ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {ses.device.includes('iPhone') ? <Smartphone className="w-6 h-6" /> : <Laptop className="w-6 h-6" />}
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{ses.device}</span>
                      {ses.isCurrent && (
                        <span className="px-2 py-0.5 bg-sky-600 text-white font-bold rounded-full text-[10px]">
                          This Current Device
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-[11px] flex flex-wrap items-center gap-2">
                      <span>{ses.browser}</span>
                      <span>&bull;</span>
                      <span className="font-mono text-slate-700 font-semibold">{ses.ip}</span>
                      <span>&bull;</span>
                      <span>{ses.location}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 pt-1">
                      <span>Logged in: {ses.activeSince}</span>
                      <span>&bull;</span>
                      <span className="text-emerald-700 font-medium">Auth: {ses.authMethod}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {ses.isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active Now
                    </span>
                  ) : (
                    <button
                      onClick={() => handleTerminateSession(ses.id)}
                      className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition"
                    >
                      Revoke Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= EDIT PROFILE MODAL ================= */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Super Admin Profile Dossier"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={editForm.fullName}
              onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Phone</label>
              <input
                type="text"
                required
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Department</label>
              <input
                type="text"
                required
                value={editForm.department}
                onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Datacenter / Office Location</label>
              <input
                type="text"
                required
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Standard Timezone</label>
              <input
                type="text"
                required
                value={editForm.timezone}
                onChange={(e) => setEditForm({ ...editForm, timezone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Platform Mission Bio &amp; Scope</label>
            <textarea
              rows={3}
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow-md transition shadow-sky-600/20"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
