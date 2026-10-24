import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Shield,
  ShieldCheck,
  Globe,
  Mail,
  OctagonAlert,
  Save,
  Clock,
  Activity,
  CheckCircle2,
  Lock,
  Radio,
  Server
} from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

export default function PlatformSettings() {
  const { showToast } = useSaaS();

  const [platformSettingsTab, setPlatformSettingsTab] = useState('security'); // 'security' | 'defaults' | 'gateways' | 'emergency'
  const [isSavingPlatformSettings, setIsSavingPlatformSettings] = useState(false);

  const [settings, setSettings] = useState({
    maintenanceMode: false,
    readOnlyLockdown: false,
    sessionTimeoutMins: 60,
    enforceMfa: true,
    fallbackTotp: true,
    dataRetentionYears: 7,
    autoBackupHours: 6,
    strictIpLock: true,
    rateLimitPerMin: 2500,
    maxFailedLogins: 5
  });

  const [platformDefaults, setPlatformDefaults] = useState({
    timezone: 'Asia/Kolkata (IST +5:30)',
    currency: 'INR (₹)',
    currencySymbol: '₹',
    dateFormat: 'DD/MM/YYYY',
    uhidPrefix: 'LZF',
    defaultLanguage: 'English (India)',
    smtpHost: 'smtp.lazfort.com',
    smtpPort: '587',
    smtpSender: 'noreply@lazfort.com',
    dltProvider: 'Karix Mobile Private Limited',
    dltSenderId: 'LZFORT',
    smsEnabled: true,
    whatsappGateway: true
  });

  const handleSave = () => {
    setIsSavingPlatformSettings(true);
    setTimeout(() => {
      setIsSavingPlatformSettings(false);
      showToast('Platform operational settings saved successfully!', 'success');
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-full min-w-0 animate-in fade-in duration-150">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Operational &amp; Security Baseline</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              Platform Settings
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Configure operator security policies, regional system defaults, communication gateways, and emergency platform overrides.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={isSavingPlatformSettings}
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition active:scale-95 disabled:opacity-50"
            >
              <Save className={`w-4 h-4 ${isSavingPlatformSettings ? 'animate-spin' : ''}`} />
              <span>{isSavingPlatformSettings ? 'Saving Settings...' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick KPI Posture Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Security</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">Zero-Trust FIDO2</div>
          <div className="text-[11px] text-emerald-600 font-medium">Hardware WebAuthn</div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Inactivity</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">{settings.sessionTimeoutMins} Min</div>
          <div className="text-[11px] text-sky-600 font-medium">Auto Revocation</div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Gateways</span>
            <Mail className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">DLT SMS &amp; SMTP</div>
          <div className="text-[11px] text-purple-600 font-medium">{platformDefaults.dltSenderId} &bull; 587</div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Platform</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            {settings.maintenanceMode ? 'Maintenance Window' : 'Operational'}
          </div>
          <div className="text-[11px] text-slate-500">Normal Production Traffic</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-2xl overflow-x-auto no-scrollbar">
        {[
          { id: 'security', label: 'Security & Access', icon: Shield },
          { id: 'defaults', label: 'System & Regional Defaults', icon: Globe },
          { id: 'gateways', label: 'SMS, Email & Webhooks', icon: Mail },
          { id: 'emergency', label: 'Maintenance & Lockdown', icon: OctagonAlert }
        ].map(tab => {
          const IconComponent = tab.icon;
          const isActive = platformSettingsTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPlatformSettingsTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition active:scale-95 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Security */}
      {platformSettingsTab === 'security' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-5 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Security &amp; Operator Authentication Policy</h3>
            <p className="text-slate-500 mt-0.5">Zero-trust identity verification, cryptographic physical keys, and administrative session protection.</p>
          </div>

          <div className="divide-y divide-slate-100 space-y-4 pt-1">
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-slate-900 text-sm">Hardware MFA (FIDO2 / YubiKey WebAuthn) Enforcement</div>
                <p className="text-slate-500 mt-0.5">Mandates cryptographic physical hardware tokens for Super Admin logins.</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings(prev => ({ ...prev, enforceMfa: !prev.enforceMfa }))}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                  settings.enforceMfa
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {settings.enforceMfa ? 'STRICTLY ENFORCED' : 'OPTIONAL'}
              </button>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-slate-900 text-sm">Session Inactivity Auto-Timeout</div>
                <p className="text-slate-500 mt-0.5">Revoke active OAuth2 bearer session tokens after period of idle inactivity.</p>
              </div>
              <select
                value={settings.sessionTimeoutMins}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeoutMins: Number(e.target.value) }))}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-xs"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={60}>60 Minutes (Standard)</option>
                <option value={120}>120 Minutes</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Defaults */}
      {platformSettingsTab === 'defaults' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-5 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">System &amp; Regional Defaults</h3>
            <p className="text-slate-500 mt-0.5">Configure default timezone, currency, date formatting, and UHID number prefixes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Default Platform Timezone</label>
              <input
                type="text"
                value={platformDefaults.timezone}
                onChange={(e) => setPlatformDefaults({ ...platformDefaults, timezone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Standard UHID Patient Prefix</label>
              <input
                type="text"
                value={platformDefaults.uhidPrefix}
                onChange={(e) => setPlatformDefaults({ ...platformDefaults, uhidPrefix: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Gateways */}
      {platformSettingsTab === 'gateways' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-5 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Communication Gateways (DLT SMS &amp; SMTP)</h3>
            <p className="text-slate-500 mt-0.5">High-volume transactional notification pipelines for patient OTPs and receipts.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">DLT Telemetry Entity Provider</label>
              <input
                type="text"
                value={platformDefaults.dltProvider}
                onChange={(e) => setPlatformDefaults({ ...platformDefaults, dltProvider: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">DLT Approved Sender ID</label>
              <input
                type="text"
                value={platformDefaults.dltSenderId}
                onChange={(e) => setPlatformDefaults({ ...platformDefaults, dltSenderId: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Emergency */}
      {platformSettingsTab === 'emergency' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-rose-200 shadow-sm space-y-5 text-xs">
          <div className="flex items-center gap-2 text-rose-600 font-bold">
            <OctagonAlert className="w-5 h-5" />
            <h3 className="text-slate-900 text-sm font-black">Emergency Platform Controls &amp; Disaster Freeze</h3>
          </div>
          <p className="text-slate-500">High-privilege kill-switches for platform security lockdowns and database maintenance windows.</p>

          <div className="p-4 bg-slate-50 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 text-sm block">Global Maintenance Mode Window</span>
              <span className="text-[11px] text-slate-500">Displays planned downtime banner across all tenant hospital portals</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
                showToast(`Platform Maintenance Mode set to ${!settings.maintenanceMode ? 'ENABLED' : 'DISABLED'}.`, 'warning');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                settings.maintenanceMode
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-200 text-slate-800'
              }`}
            >
              {settings.maintenanceMode ? 'MAINTENANCE ACTIVE' : 'DISARMED'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
