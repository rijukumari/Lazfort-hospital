import React, { useState } from 'react';
import {
  Boxes,
  Activity,
  Layers,
  Radio,
  Receipt,
  Shield,
  Globe
} from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

const initialModules = [
  { id: 'MOD-OPD', name: 'Outpatient Clinical Consultation & EMR', desc: 'Clinical notes, vitals, chronic disease tracking, and e-Prescriptions', status: 'Enabled', tier: 'All Plans', icon: Activity },
  { id: 'MOD-TRIAGE', name: 'Nurse Vitals & Triage Station', desc: 'Direct patient vitals entry, NEWS2 scoring, and care assignment', status: 'Enabled', tier: 'Professional & Enterprise', icon: Layers },
  { id: 'MOD-PHARM', name: 'Central Pharmacy Dispensary & Barcode', desc: 'Drug inventory, batch expiry alerts, and dispensation verification', status: 'Enabled', tier: 'Professional & Enterprise', icon: Boxes },
  { id: 'MOD-LAB', name: 'Diagnostic Laboratory Analyzer Bridge', desc: 'HL7/ASTM bi-directional automated analyzer bridge and releases', status: 'Enabled', tier: 'Professional & Enterprise', icon: Radio },
  { id: 'MOD-BILL', name: 'Hospital Invoicing & Cashier Desk', desc: 'TPA insurance reconciliation, CGHS/NABH tariffs, and receipts', status: 'Enabled', tier: 'All Plans', icon: Receipt },
  { id: 'MOD-NABH', name: 'NABH Digital Audit Trail & Locks', desc: 'WORM immutable record locking and clinical sign-off trails', status: 'Enabled', tier: 'Enterprise Tier', icon: Shield },
  { id: 'MOD-TELE', name: 'Telemedicine Video Consult Gateway', desc: 'Encrypted WebRTC high-definition patient audio/video consultations', status: 'Beta Enabled', tier: 'Enterprise Tier', icon: Globe }
];

export default function ModuleManagement() {
  const { showToast } = useSaaS();
  const [modules, setModules] = useState(initialModules);

  const toggleModule = (id) => {
    setModules(modules.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Enabled' || m.status === 'Beta Enabled' ? 'Disabled' : 'Enabled';
        showToast(`Module ${m.name} is now ${nextStatus}.`);
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
            <Boxes className="w-4 h-4" />
            <span>Functional Capabilities</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Platform Clinical Module Gating</h1>
          <p className="text-xs text-slate-500 mt-1">Enable or disable operational clinical modules across subscription tiers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map(mod => {
          const Icon = mod.icon || Boxes;
          const isEnabled = mod.status === 'Enabled' || mod.status === 'Beta Enabled';
          return (
            <div key={mod.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className={`px-3 py-1 rounded-full font-bold text-xs transition active:scale-95 ${
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
  );
}
