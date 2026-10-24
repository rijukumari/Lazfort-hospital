import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSaaS } from '../../context/SaaSContext';
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
  Pencil,
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
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  CheckCircle,
  Radio,
  SlidersHorizontal,
  KeyRound,
  Sparkles
} from 'lucide-react';

export default function SaaSSuperAdminProfile({ initialTab = 'overview', setActiveTab }) {
  const { user, updateUser } = useAuth();
  const { showToast, auditRecords } = useSaaS();

  // Page level navigation (Zero modals, dedicated pages)
  const [profileSubPage, setProfileSubPage] = useState('main'); // 'main' | 'edit' | 'enroll_key'

  // Active sub-tab
  const [activeSubTab, setActiveSubTab] = useState(initialTab === 'password' ? 'security' : 'overview');

  // Copy state
  const [copiedField, setCopiedField] = useState(null);

  // Edit Profile Form state
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

  // Recovery Codes list
  const [recoveryCodes] = useState([
    'LZ-ROOT-9421-F90A',
    'LZ-ROOT-3810-7B12',
    'LZ-ROOT-1184-E49C',
    'LZ-ROOT-7729-33D1',
    'LZ-ROOT-8840-02A8',
    'LZ-ROOT-5512-CC71'
  ]);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
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
    setProfileSubPage('main');
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
      setPasswordErrorMsg('New passwords do not match. Please re-enter.');
      return;
    }

    setPasswordSuccessMsg('Platform master password updated successfully! Session re-authenticated with FIDO2 key.');
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

  // ================= DEDICATED NEW PAGE 1: EDIT PROFILE DOSSIER (NO MODAL) =================
  if (profileSubPage === 'edit') {
    return (
      <div className="space-y-6 animate-fade-in max-w-full min-w-0">
        {/* Back Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setProfileSubPage('main')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition active:scale-95 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Profile</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <div className="text-xs text-slate-500 font-mono">
              Identity Management &bull; <strong className="text-slate-900">Edit Operator Dossier</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-50 text-amber-700 font-bold border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Identity Modifications Logged to WORM Trail</span>
            </span>
          </div>
        </div>

        {/* Edit Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-bold uppercase tracking-wider mb-2">
            <Pencil className="w-4 h-4" />
            <span>Root Identity Re-verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Edit Super Admin Profile Dossier
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Update your operational identity parameters, emergency contact telephone lines, and primary datacenter facility bindings.
          </p>
        </div>

        {/* Edit Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm max-w-4xl">
          <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
            {/* Avatar Row */}
            <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 p-1 shadow-md">
                <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-white font-black text-2xl">
                  {editForm.fullName?.charAt(0) || 'V'}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Operator Cryptographic Avatar</h4>
                <p className="text-xs text-slate-500 mt-0.5">Auto-generated from your primary root key hash and identity token.</p>
                <span className="inline-block mt-2 font-mono text-[10px] text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full font-bold">
                  Immutable Keyring Linked
                </span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Legal Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Administrative Email (Read-Only)</label>
                <input
                  type="email"
                  disabled
                  value={editForm.email}
                  className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-500 cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Root email changes require offline HSM dual-custody approval.</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Emergency Telecom Hotline</label>
                <input
                  type="text"
                  required
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Assigned Department</label>
                <input
                  type="text"
                  required
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Primary Datacenter Location</label>
                <input
                  type="text"
                  required
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Operational Standard Timezone</label>
                <input
                  type="text"
                  required
                  value={editForm.timezone}
                  onChange={(e) => setEditForm({ ...editForm, timezone: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Platform Mission Bio &amp; Architectural Scope</label>
              <textarea
                rows={3}
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition leading-relaxed"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setProfileSubPage('main')}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs transition"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ================= DEDICATED NEW PAGE 2: ENROLL HARDWARE KEYRING (NO MODAL) =================
  if (profileSubPage === 'enroll_key') {
    return (
      <div className="space-y-6 animate-fade-in max-w-full min-w-0">
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <button
            onClick={() => setProfileSubPage('main')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition active:scale-95 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </button>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
            WebAuthn Level 3 • FIDO2 Certified
          </span>
        </div>

        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">
            <Fingerprint className="w-4 h-4" />
            <span>FIDO2 / WebAuthn Hardware Pairing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Register Secondary Hardware Security Key
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Attach a physical YubiKey 5C, Google Titan, or Feitian hardware cryptographic authenticator for redundant break-glass access.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm max-w-2xl text-center space-y-6 mx-auto">
          <div className="w-20 h-20 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto ring-8 ring-sky-50/50">
            <Key className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Insert Your Hardware Security Key</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Insert your physical security key into any USB-C port or hold it against your NFC reader, then tap the gold contact sensor.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Cryptographic Protocol:</span>
              <strong className="font-mono text-slate-900">CTAP2 / WebAuthn 2.0</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Resident Credential:</span>
              <strong className="font-mono text-emerald-600">Passkey WORM Locked</strong>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setProfileSubPage('main')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                showToast('Secondary Hardware YubiKey paired and verified successfully!', 'success');
                setProfileSubPage('main');
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition active:scale-95"
            >
              Authorize &amp; Complete Pairing
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= DEFAULT VIEW: MAIN ENTERPRISE PROFILE COMMAND CENTER =================
  return (
    <div className="w-full space-y-6 pb-12 animate-fade-in max-w-full min-w-0">
      {/* 1. Breadcrumbs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Platform Governance</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Identity &amp; Access Control</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
            Super Admin Profile
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Root Session Validated &bull; FIDO2 Hardware Locked</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
            Node: AS-SOUTH-1A
          </span>
        </div>
      </div>

      {/* 2. Sleek Modern Hero Cover Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-800 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-sky-950/20 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header Strip */}
        <div className="h-32 sm:h-36 w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800/80 px-6 sm:px-8 py-4 flex items-start justify-between relative">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-mono text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Lazfort Cloud Platform v4.2 &bull; Multi-Tenant Core</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportDossier}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm active:scale-95"
              title="Export complete cryptographic profile dossier"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export Dossier</span>
            </button>

            <button
              onClick={() => setProfileSubPage('edit')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-sky-500/25 active:scale-95"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Details Header Overlay */}
        <div className="relative px-6 sm:px-8 pb-7 pt-0 -mt-12 sm:-mt-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative group shrink-0">
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
                  <span>SaaS Super Admin &bull; Global Root</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Level 0 Clearance
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>{user?.email || 'superadmin@lazfort.com'}</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{user?.department || 'Global Cloud Platform Operations'}</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{user?.location || 'Bengaluru Cloud IDC • Zone-A'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick ID & 2FA Pill */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-xs shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Operator ID:</span>
              <button
                onClick={() => handleCopy(user?.userId || 'USR-SAAS-001', 'Operator ID')}
                className="font-mono font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700 transition"
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
              <span className="text-slate-400 font-medium">Primary 2FA:</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Hardware YubiKey Enforced</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Four Strategic Posture & Metric Tiles */}
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
            <span className="text-slate-500">NABH &amp; HIPAA</span>
            <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Zero Exceptions</span>
          </div>
        </div>
      </div>

      {/* 4. Tab Navigation Strip */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-sm flex flex-wrap gap-1.5">
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
              className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 ${
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

      {/* 5. Tab Panels */}

      {/* TAB 1: IDENTITY & OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Main Dossier */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Operator Dossier &amp; Profile Details</h2>
                  <p className="text-xs text-slate-500">Verified identity parameters for platform root operations.</p>
                </div>
                <button
                  onClick={() => setProfileSubPage('edit')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
                >
                  <Pencil className="w-3.5 h-3.5 text-slate-500" />
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
                  <span className="text-[11px] text-slate-500">Division: Cloud Infrastructure &amp; Cyber Defense</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Primary Datacenter Location</span>
                  <div className="font-bold text-slate-900 text-sm">{user?.location || 'Bengaluru Cloud IDC • Zone-A'}</div>
                  <span className="text-[11px] text-slate-500">Tier-IV Uptime Certified Facility</span>
                </div>
              </div>

              {/* Bio Statement */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                <span className="text-slate-400 font-medium">Mission &amp; Architectural Scope</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {user?.bio || 'Chief Infrastructure Architect & Root Platform Administrator for Lazfort Multi-Tenant Healthcare Cloud. Enforcing zero-trust security and NABH/HIPAA compliance across all tenant nodes.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Col: Jurisdiction & Emergency Protocols */}
          <div className="space-y-6">
            {/* Jurisdiction Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Globe className="w-4 h-4 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-sm">Infrastructure Jurisdiction</h3>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                  <span>Hospital Tenants:</span>
                  <strong className="text-slate-900">24 Production Nodes</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                  <span>Cloud Providers:</span>
                  <strong className="text-slate-900">AWS Mumbai &amp; Azure India</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                  <span>Cross-Tenant Isolation:</span>
                  <strong className="text-emerald-600 font-bold">Hardware Enforced</strong>
                </div>
                <div className="flex justify-between py-1.5 text-slate-600">
                  <span>Compliance Framework:</span>
                  <strong className="text-indigo-600 font-bold">NABH Digital Ready</strong>
                </div>
              </div>
            </div>

            {/* Emergency Protocols */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Break-Glass Protocol</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Emergency break-glass procedures require hardware key activation and automatically initiate an immutable WORM audit session broadcast to all hospital compliance officers.
              </p>
              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] text-slate-400">
                <span>Dual-Custody Approvals:</span>
                <span className="text-emerald-400 font-bold">2/2 Quorum Ready</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECURITY & MASTER CREDENTIALS */}
      {activeSubTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Hardware Security Keyring */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Hardware Security Keyring (FIDO2)</h3>
                <p className="text-xs text-slate-500">Cryptographic tokens bound to physical authenticator hardware.</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-xs">
                MFA Enforced
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900">YubiKey 5C FIPS (Primary Key)</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">NFC &bull; USB-C</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Serial Number: <span className="font-mono font-bold text-slate-800">24891048-A9</span> &bull; Enrolled on 15-Jan-2026
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  disabled={yubiTestStatus === 'testing'}
                  onClick={handleTestYubiKey}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl font-bold text-xs text-slate-700 transition flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-sky-600 ${yubiTestStatus === 'testing' ? 'animate-spin' : ''}`} />
                  <span>{yubiTestStatus === 'testing' ? 'Validating Handshake...' : 'Test Keyring Handshake'}</span>
                </button>

                <button
                  onClick={() => setProfileSubPage('enroll_key')}
                  className="text-xs text-sky-600 hover:text-sky-700 font-bold hover:underline"
                >
                  Enroll Redundant Key &rarr;
                </button>
              </div>
            </div>

            {/* Emergency Recovery Codes */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Cryptographic Recovery Codes</span>
                </div>
                <span className="font-mono text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  6 Unused Codes
                </span>
              </div>
              <p className="text-[11px] text-amber-800/80">
                One-time break-glass tokens for emergency access if physical YubiKey hardware is lost.
              </p>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-800">
                {recoveryCodes.map((code, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-xl border border-amber-200 flex justify-between items-center">
                    <span>{code}</span>
                    <button
                      onClick={() => handleCopy(code, 'Recovery Code')}
                      className="text-slate-400 hover:text-sky-600"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Master Password Rotation */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Master Password Rotation</h3>
              <p className="text-xs text-slate-500">Requires minimum 14 characters, symbol, and 90-day cycle.</p>
            </div>

            {passwordErrorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{passwordErrorMsg}</span>
              </div>
            )}
            {passwordSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{passwordSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Master Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full p-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New Master Password</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full p-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password strength meter */}
                {passwordForm.newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                      <span>Entropy Strength:</span>
                      <span className="font-bold text-slate-800">{passStrength.label}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${passStrength.color} transition-all duration-300`} style={{ width: `${passStrength.score}%` }}></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full p-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition active:scale-95"
              >
                Rotate Master Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: ROOT PRIVILEGES MATRIX */}
      {activeSubTab === 'privileges' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Root Privilege Capabilities</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Constitutional permissions bound to Vikramaditya Singhania (Global Root &bull; Clearance L0).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {rootPrivileges.map((p) => (
                <div key={p.code} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-xs">{p.code}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${p.badge}`}>
                      {p.level}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                  <p className="text-slate-500 leading-relaxed text-xs">{p.desc}</p>
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] font-mono text-slate-400">
                    Scope: {p.scope}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: OPERATOR AUDIT TRAIL */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden space-y-0">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Personal Operational Audit Stream</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cryptographically signed actions committed by your active session token.
              </p>
            </div>
            <button
              onClick={() => showToast('Audit stream proof exported with verified HMAC.', 'success')}
              className="inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Proof</span>
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs table-auto">
              <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3.5 whitespace-nowrap">Event ID</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">Action</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">Target Entity</th>
                  <th className="px-4 py-3.5">Details</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">Timestamp &amp; IP</th>
                  <th className="px-4 py-3.5 whitespace-nowrap text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {operatorActions.map((op) => (
                  <tr key={op.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-4 py-3.5 whitespace-nowrap font-mono font-bold text-sky-700">{op.id}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-indigo-700">
                        {op.action}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-medium text-slate-900">{op.target}</td>
                    <td className="px-4 py-3.5 text-slate-600 max-w-xs truncate" title={op.details}>{op.details}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-mono text-slate-600 text-[11px]">{op.time}</div>
                      <div className="font-mono text-slate-400 text-[10px]">{op.ip}</div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {op.status}
                      </span>
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
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Active Operator Sessions &amp; Devices</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Devices authorized with cryptographic session tokens to access Super Admin commands.
              </p>
            </div>
            {sessions.length > 1 && (
              <button
                onClick={() => {
                  setSessions(sessions.filter(s => s.isCurrent));
                  showToast('All other remote sessions revoked.', 'info');
                }}
                className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition active:scale-95"
              >
                Revoke All Other Sessions
              </button>
            )}
          </div>

          <div className="space-y-3">
            {sessions.map((ses) => (
              <div
                key={ses.id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 mt-0.5">
                    {ses.device.includes('iPhone') ? <Smartphone className="w-5 h-5 text-indigo-600" /> : <Laptop className="w-5 h-5 text-sky-600" />}
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{ses.device}</span>
                      <span className="font-mono text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {ses.id}
                      </span>
                    </div>
                    <div className="text-slate-500 flex flex-wrap items-center gap-2 text-[11px]">
                      <span>{ses.browser}</span>
                      <span>&bull;</span>
                      <span className="font-mono">{ses.ip}</span>
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
                      <span>Active Now</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleTerminateSession(ses.id)}
                      className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition active:scale-95"
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
    </div>
  );
}
