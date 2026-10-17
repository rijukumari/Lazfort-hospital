import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Stethoscope,
  Receipt,
  FileSpreadsheet,
  UserCog,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user } = useAuth();
  const role = user?.role || 'receptionist';

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['super_admin', 'hospital_admin', 'doctor', 'receptionist', 'nurse', 'billing_executive']
    },
    {
      id: 'patients',
      label: 'Patients & UHID',
      icon: Users,
      roles: ['super_admin', 'hospital_admin', 'receptionist', 'nurse', 'doctor', 'billing_executive']
    },
    {
      id: 'appointments',
      label: 'Appointments & Queue',
      icon: CalendarClock,
      roles: ['super_admin', 'hospital_admin', 'receptionist', 'doctor', 'nurse', 'billing_executive']
    },
    {
      id: 'clinical',
      label: 'Doctor OPD Consult',
      icon: Stethoscope,
      roles: ['super_admin', 'hospital_admin', 'doctor', 'nurse'],
      doctorFocus: true
    },
    {
      id: 'billing',
      label: 'Billing & Cashier',
      icon: Receipt,
      roles: ['super_admin', 'hospital_admin', 'billing_executive', 'receptionist']
    },
    {
      id: 'tariffs',
      label: 'Service Tariffs',
      icon: FileSpreadsheet,
      roles: ['super_admin', 'hospital_admin', 'billing_executive']
    },
    {
      id: 'staff',
      label: 'Hospital Staff',
      icon: UserCog,
      roles: ['super_admin', 'hospital_admin']
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: ShieldAlert,
      roles: ['super_admin', 'hospital_admin', 'billing_executive']
    }
  ];

  const permittedItems = navItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800 no-print">
      <div className="py-5 px-3">
        <div className="px-3 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Workspaces & Modules
          </p>
        </div>

        <nav className="space-y-1">
          {permittedItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.doctorFocus && role === 'doctor' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info: PRD Pilot Badge */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-400">Tenant Isolation</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-1.5 py-0.5 rounded font-mono">
            Active
          </span>
        </div>
        <div className="text-[11px] leading-relaxed text-slate-400">
          Lazfort Hospital ERP Outpatient MVP &bull; Compliant with PRD v1.0 specifications.
        </div>
      </div>
    </aside>
  );
}
