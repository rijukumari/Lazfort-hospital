import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import {
  UserCircle,
  Building2,
  Shield,
  ShieldCheck,
  Key,
  Lock,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Award,
  Edit3,
  Download,
  Laptop,
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Users,
  Activity,
  Layers,
  ChevronRight,
  RefreshCw,
  Stethoscope,
  HeartPulse
} from 'lucide-react';

export default function HospitalAdminProfile() {
  const { user, updateUser, tenant } = useAuth();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'security' | 'privileges' | 'activity'
  const [copiedField, setCopiedField] = useState(null);

  // Edit Profile Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || 'Dr. Alok Verma',
    email: user?.email || 'admin@lazfort.com',
    department: user?.department || 'Hospital Administration',
    phone: user?.phone || '+91 98450 99009',
    specialization: user?.specialization || 'Healthcare Administration & Clinical Governance',
    licenseNumber: user?.licenseNumber || 'KMC-1998-33412',
    officeSuite: 'Administrative Suite 101, Main Hospital Wing, 1st Floor',
    bio: 'Medical Superintendent and Chief Hospital Administrator for Lazfort Memorial Hospital & Research Centre. Directing institutional governance, NABH accreditation readiness, medical staff credentialing, and clinical excellence.'
  });

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [isSubmittingPass, setIsSubmittingPass] = useState(false);

  // Active Sessions
  const [sessions, setSessions] = useState([
    {
      id: 'SES-HSP-01',
      device: 'ThinkPad X1 Carbon (Windows 11 Pro)',
      browser: 'Chrome 130.0 Enterprise',
      ip: '103.22.18.44',
      location: 'Bengaluru, India (Indiranagar Campus Network)',
      activeSince: 'Today, 08:45 IST',
      current: true
    },
    {
      id: 'SES-HSP-02',
      device: 'iPad Pro 12.9" (iPadOS 18)',
      browser: 'Safari Mobile Hospital Terminal',
      ip: '103.22.18.92',
      location: 'Bengaluru, India (OPD Ward Wi-Fi)',
      activeSince: 'Yesterday, 16:30 IST',
      current: false
    }
  ]);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser(editForm);
    }
    setIsEditModalOpen(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirm password do not match.' });
      return;
    }

    setIsSubmittingPass(true);
    setTimeout(() => {
      setIsSubmittingPass(false);
      setPasswordMsg({ type: 'success', text: 'Hospital Administrator password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 600);
  };

  const handleTerminateSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const handleExportDossier = () => {
    const data = {
      hospitalCampus: tenant?.name || 'Lazfort Memorial Hospital & Research Centre',
      administratorName: user?.fullName || 'Dr. Alok Verma',
      employeeId: user?.userId || 'USR-HOSPITAL_ADMIN-001',
      role: 'Hospital Administrator (Medical Superintendent)',
      department: user?.department || 'Hospital Administration',
      license: user?.licenseNumber || 'KMC-1998-33412',
      email: user?.email || 'admin@lazfort.com',
      generatedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Administrator_Dossier_${user?.userId || 'USR-HOSP-001'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Hospital Admin RBAC Privileges
  const adminPrivileges = [
    {
      title: 'Clinical Practitioner RBAC & Staffing',
      scope: 'All Hospital Departments',
      desc: 'Approve medical staff registrations, allocate clinical specialties, and revoke institutional access.',
      level: 'Supervisory Master',
      badge: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'OPD & Procedure Tariffs Control',
      scope: 'Billing & Tariff Catalog',
      desc: 'Configure consultation charges, bed day rates, lab test tariffs, and corporate insurance discounts.',
      level: 'Financial Authority',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'NABH Electronic Audit & Sign-off',
      scope: 'Clinical & Billing Trails',
      desc: 'Access immutable event logs, verify prescription safety sign-offs, and export statutory audit files.',
      level: 'Compliance Lead',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      title: 'Multi-Branch Campus Delegations',
      scope: 'Indiranagar & Satellite Clinics',
      desc: 'Manage campus infrastructure, department beds allocation, and shift handovers across hospital wings.',
      level: 'Operations Lead',
      badge: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      title: 'Billing Corrections & TPA Overrides',
      scope: 'Inpatient & Outpatient Invoicing',
      desc: 'Authorize billing waiver requests, manage refund approvals, and oversee cashless insurance claims.',
      level: 'Executive Approval',
      badge: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Disaster Recovery & Operational Emergency',
      scope: 'Hospital Information System (HIS)',
      desc: 'Initiate emergency clinical downtime procedures and activate in-memory offline continuity modes.',
      level: 'Institutional Emergency',
      badge: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  ];

  // Recent Activity Ledger
  const recentActivities = [
    {
      id: 'ACT-8812',
      event: 'TARIFF_UPDATE_APPROVED',
      details: 'Approved revision of Cardiology OPD consultation tariff to ₹800',
      time: 'Today, 15:42 IST',
      status: 'Verified'
    },
    {
      id: 'ACT-8811',
      event: 'STAFF_PRIVILEGING',
      details: 'Allocated emergency triage privileges to Sister Priya Nair (ICU Ward)',
      time: 'Today, 11:20 IST',
      status: 'Active'
    },
    {
      id: 'ACT-8810',
      event: 'NABH_MONTHLY_AUDIT',
      details: 'Reviewed and certified monthly clinical safety audit dossier (0 non-conformities)',
      time: 'Yesterday, 17:00 IST',
      status: 'Certified'
    },
    {
      id: 'ACT-8809',
      event: 'TPA_CLAIM_AUTHORIZED',
      details: 'Authorized cashless pre-auth settlement for Star Health Insurance (UHID: LZF-2026-0001)',
      time: 'Yesterday, 12:35 IST',
      status: 'Approved'
    }
  ];

  return (
    <div className="w-full space-y-6 pb-16 animate-fadeIn">
      {/* ================= 1. BREADCRUMBS & CONTEXT ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Hospital Administration</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Security &amp; Account</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
            My Administrator Profile
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Active Session &bull; Institutional Master
          </span>
          <span className="font-mono text-[11px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
            Campus: {tenant?.code || 'LZF-HQ'}
          </span>
        </div>
      </div>

      {/* ================= 2. HERO COVER BANNER ================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white">
        {/* Ambient Glows */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Continuous ECG Neon Line */}
        <div className="absolute inset-0 opacity-20 flex items-center pointer-events-none">
          <svg className="w-full h-24" viewBox="0 0 1200 100" fill="none">
            <path
              className="animate-ecg stroke-sky-400"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M0,50 L200,50 L220,50 L230,20 L240,80 L250,5 L260,95 L270,50 L350,50 L500,50 L520,50 L530,20 L540,80 L550,5 L560,95 L570,50 L650,50 L800,50 L820,50 L830,20 L840,80 L850,5 L860,95 L870,50 L950,50 L1100,50 L1120,50 L1130,20 L1140,80 L1150,5 L1160,95 L1170,50 L1200,50"
            />
          </svg>
        </div>

        {/* Top Header Visual Strip */}
        <div className="h-32 sm:h-36 w-full px-6 sm:px-8 py-5 flex items-start justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {tenant?.name || 'Lazfort Memorial Hospital & Research Centre'} &bull; Indiranagar
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-white hover:bg-sky-50 text-slate-900 font-extrabold text-xs px-4 py-2 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5 text-sky-600" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-xs px-4 py-2 rounded-full shadow-lg shadow-amber-500/30 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Security Center</span>
            </button>
            <button
              onClick={handleExportDossier}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md transition transform hover:scale-105 active:scale-95 shadow-sm"
              title="Download Administrator Profile"
            >
              <Download className="w-3.5 h-3.5 text-sky-300" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>

        {/* Details Header Overlay */}
        <div className="relative px-6 sm:px-8 pb-8 pt-0 -mt-12 sm:-mt-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-3xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 p-1 shadow-2xl ring-4 ring-slate-950">
                <div className="w-full h-full rounded-[20px] bg-slate-900 flex items-center justify-center text-white font-black text-3xl shadow-inner">
                  {user?.fullName?.charAt(0) || 'D'}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 ring-4 ring-slate-950 flex items-center justify-center text-white" title="Active Administrator Session">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {user?.fullName || 'Dr. Alok Verma'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Award className="w-3 h-3 text-purple-400" />
                  Medical Superintendent
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Hospital Admin &bull; Level-1
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  {user?.email || 'admin@lazfort.com'}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  {user?.department || 'Hospital Administration'}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Reg: {user?.licenseNumber || 'KMC-1998-33412'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick ID Badge */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Employee ID:</span>
              <button
                onClick={() => handleCopy(user?.userId || 'USR-HOSPITAL_ADMIN-001', 'Employee ID')}
                className="font-mono font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 transition"
              >
                <span>{user?.userId || 'USR-HOSPITAL_ADMIN-001'}</span>
                {copiedField === 'Employee ID' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              </button>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-400">Institutional Role:</span>
              <span className="font-semibold text-emerald-400">Hospital Master RBAC</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. FOUR KPI TILES ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hospital Governance</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900">Institutional Master</div>
          <div className="text-[11px] text-indigo-700 font-semibold mt-1">Full Clinical &amp; Tariff Control</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Medical Staff</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900">18 Personnel</div>
          <div className="text-[11px] text-sky-700 font-semibold mt-1">Doctors, Nurses &amp; Allied Staff</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Session Security</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900">JWT Bearer 24h</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">Tenant-Isolated Claims</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quality Accreditation</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900">NABH Ready</div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">100% Immutable Audit Trail</div>
        </div>
      </div>

      {/* ================= 4. TAB NAVIGATION ================= */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-sm flex flex-wrap gap-1">
        {[
          { id: 'overview', label: 'Identity & Overview', icon: UserCircle },
          { id: 'security', label: 'Security & Password', icon: Lock },
          { id: 'privileges', label: 'Administrative Privileges', icon: Shield },
          { id: 'activity', label: 'Recent Activity Ledger', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

      {/* ================= 5. TAB PANELS ================= */}

      {/* TAB 1: OVERVIEW & IDENTITY */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Administrator Profile Dossier</h2>
                  <p className="text-xs text-slate-500">Official medical license, contact, and institutional portfolio.</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Update Info</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Practitioner Full Name</span>
                  <div className="font-bold text-slate-900 text-sm">{user?.fullName || 'Dr. Alok Verma'}</div>
                  <span className="text-[11px] text-slate-500">MBBS, MHA &bull; Medical Superintendent</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">State Medical Council Registration</span>
                  <div className="font-mono font-bold text-slate-900 text-sm">{user?.licenseNumber || 'KMC-1998-33412'}</div>
                  <span className="text-[11px] text-emerald-600 font-semibold">Active Licensed Practitioner</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Official Administrative Email</span>
                  <div className="font-bold text-slate-900 text-sm truncate">{user?.email || 'admin@lazfort.com'}</div>
                  <span className="text-[11px] text-slate-500">Primary delivery for clinical escalation</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Emergency Contact Hotline</span>
                  <div className="font-bold text-slate-900 text-sm">{user?.phone || '+91 98450 99009'}</div>
                  <span className="text-[11px] text-slate-500">24/7 Superintendent Hospital Pager</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Hospital Department</span>
                  <div className="font-bold text-slate-900 text-sm">{user?.department || 'Hospital Administration'}</div>
                  <span className="text-[11px] text-slate-500">Clinical Governance Suite</span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 font-medium">Office Suite Location</span>
                  <div className="font-bold text-slate-900 text-sm">Suite 101, Main Wing, 1st Floor</div>
                  <span className="text-[11px] text-slate-500">Indiranagar Campus Hospital HQ</span>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                  <span className="font-bold text-sky-950">Institutional Governance Statement</span>
                </div>
                <p className="text-sky-900/90 leading-relaxed">
                  Medical Superintendent and Chief Hospital Administrator for Lazfort Memorial Hospital &amp; Research Centre. Directing institutional governance, NABH accreditation readiness, medical staff credentialing, and clinical excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Hospital Institution Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">Hospital Institutional Scope</h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  ACTIVE HQ
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                  <span className="text-slate-400 text-[11px]">Governed Institution</span>
                  <div className="font-bold text-slate-900">{tenant?.name || 'Lazfort Memorial Hospital & Research Centre'}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <span className="text-slate-500">Tenant Code:</span>
                  <span className="font-mono font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {tenant?.code || 'LZF-HQ'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <span className="text-slate-500">Accreditation:</span>
                  <span className="font-bold text-purple-700">NABH Level 4 Compliant</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                  <span className="text-slate-500">Base Currency:</span>
                  <span className="font-bold text-slate-900">₹ INR (Indian Rupee)</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl shadow-xl space-y-3 text-xs">
              <span className="font-bold text-sky-300 block">Need assistance or escalation?</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Connect with the Lazfort SaaS Platform Operations team for cloud sharding or billing tariff tier upgrades.
              </p>
              <div className="pt-1">
                <span className="font-mono text-[11px] text-sky-200 block">support@lazfort.com &bull; 24/7 Hotline</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECURITY & PASSWORD */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Change Password Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 text-xs">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Change Administrator Password</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Update your hospital administrative password to maintain strong access control.
              </p>
            </div>

            {passwordMsg.text && (
              <div
                className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {passwordMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter existing password"
                    className="w-full p-3.5 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">New Administrator Password</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new robust password"
                    className="w-full p-3.5 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full p-3.5 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingPass}
                className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition shadow-sky-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmittingPass ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Commit Password Update</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Active Administrator Sessions</h3>
                <p className="text-xs text-slate-500">Devices currently authenticated under this account.</p>
              </div>
            </div>

            <div className="space-y-3">
              {sessions.map(s => (
                <div
                  key={s.id}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between gap-3 ${
                    s.current ? 'bg-sky-50/50 border-sky-200' : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      s.current ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{s.device}</span>
                        {s.current && (
                          <span className="px-2 py-0.2 bg-sky-600 text-white rounded font-bold text-[10px]">Current</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {s.browser} &bull; <span className="font-mono">{s.ip}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">{s.location} &bull; {s.activeSince}</span>
                    </div>
                  </div>

                  {!s.current && (
                    <button
                      onClick={() => handleTerminateSession(s.id)}
                      className="px-3 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg font-bold border border-rose-200 transition"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRIVILEGES MATRIX */}
      {activeTab === 'privileges' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Hospital Administrative Privileges Matrix</h2>
              <p className="text-xs text-slate-500">Institutional permissions granted to Medical Superintendent role.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold text-xs">
              Clearance: Hospital Master RBAC
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminPrivileges.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{p.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${p.badge}`}>
                      {p.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-400">
                  <span>Scope: <strong className="text-slate-700">{p.scope}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RECENT ACTIVITY LEDGER */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Administrator Activity &amp; Audit Log</h2>
              <p className="text-xs text-slate-500">Recent supervisory authorizations executed by Dr. Alok Verma.</p>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl font-bold border border-emerald-200">
              NABH Audit Compliant
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {recentActivities.map(act => (
              <div key={act.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 px-2 rounded-xl transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.2 rounded border border-sky-100">
                      {act.event}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{act.id}</span>
                  </div>
                  <p className="text-slate-800 font-medium">{act.details}</p>
                </div>
                <div className="text-right sm:self-center shrink-0">
                  <span className="text-slate-400 text-[11px] block">{act.time}</span>
                  <span className="text-emerald-600 font-bold text-[10px]">&bull; {act.status}</span>
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
        title="Edit Administrator Profile Dossier"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={editForm.fullName}
              onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">State Medical Council License No.</label>
              <input
                type="text"
                required
                value={editForm.licenseNumber}
                onChange={(e) => setEditForm({ ...editForm, licenseNumber: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                required
                value={editForm.department}
                onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Emergency Phone</label>
              <input
                type="text"
                required
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Office Suite</label>
              <input
                type="text"
                value={editForm.officeSuite}
                onChange={(e) => setEditForm({ ...editForm, officeSuite: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Institutional Governance Bio</label>
            <textarea
              rows={3}
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow-md shadow-sky-600/20"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
