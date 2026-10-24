import React, { useState } from 'react';
import { UserPlus, Building2, Receipt } from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

export default function TenantOnboarding({ setActiveTab }) {
  const { addTenant, showToast } = useSaaS();

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
    if (setActiveTab) {
      setActiveTab('saas_tenants');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
          <UserPlus className="w-4 h-4" />
          <span>Multi-Tenant Cloud Provisioning</span>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Hospital Tenant Onboarding Wizard</h1>
        <p className="text-xs text-slate-500 mt-1">Configure institutional registration, subscription plan, and cloud database isolation.</p>
      </div>

      <form onSubmit={handleOnboardSubmit} className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 text-xs">
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
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm"
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
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm"
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
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm"
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
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm"
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
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm"
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
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Country</label>
              <input
                type="text"
                value={onboardForm.country}
                onChange={(e) => setOnboardForm({ ...onboardForm, country: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm"
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
            className="w-full sm:w-auto px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg transition shadow-sky-600/30 text-xs sm:text-sm active:scale-95"
          >
            Launch &amp; Provision Hospital Tenant
          </button>
        </div>
      </form>
    </div>
  );
}
