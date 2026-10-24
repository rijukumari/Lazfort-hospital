import React from 'react';
import { useSaaS } from '../../context/SaaSContext';
import {
  ShieldAlert,
  Check,
  X,
  Info,
  Lock,
  RotateCcw
} from 'lucide-react';

export default function SaaSRolesPermissions() {
  const { rolePermissions, updatePermission, showToast } = useSaaS();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 px-3 py-0.5 rounded-full">
              Access Control & RBAC
            </span>
            <span className="text-xs text-slate-500 font-medium">
              &bull; 9 System Personas
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Roles & Permissions Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Role-Based Access Control matrix configuring CRUD & Export capabilities across operational hospital domains.
          </p>
        </div>

        <button
          onClick={() => showToast('Permission schema validated and cached in frontend state.')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition"
        >
          Validate Policy Schema
        </button>
      </div>

      {/* Mandatory Security Prototype Disclaimer */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-amber-900 block">
            Frontend Policy Matrix Prototype
          </span>
          <p className="text-amber-800 mt-0.5 leading-relaxed">
            This interactive matrix represents the visual permission configuration for all 9 hospital and platform roles. 
            <strong>Note:</strong> Modifying toggles in this frontend prototype illustrates client-side policy mapping; production authorization enforcement is strictly governed by server-side cryptographic JWT claims and database tenant partition keys.
          </p>
        </div>
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Resource Capability Matrix</h3>
            <p className="text-xs text-slate-500">Click checkboxes to test capability granting per persona.</p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
            Policy Version: RBAC-v2.1
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50/75 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Role / Persona</th>
                <th className="p-4">Operational Domain Scope</th>
                <th className="p-4 text-center">View (Read)</th>
                <th className="p-4 text-center">Create (Write)</th>
                <th className="p-4 text-center">Edit (Update)</th>
                <th className="p-4 text-center">Delete (Purge)</th>
                <th className="p-4 text-center">Export (Report)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rolePermissions.map((rp) => (
                <tr key={rp.role} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{rp.role}</span>
                      {rp.role === 'SaaS Super Admin' && (
                        <span className="text-[9px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.2 rounded font-mono font-bold">
                          ROOT
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-500">{rp.scope}</td>

                  {/* View */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => updatePermission(rp.role, 'view')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition ${
                        rp.view ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {rp.view ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Create */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => updatePermission(rp.role, 'create')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition ${
                        rp.create ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {rp.create ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Edit */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => updatePermission(rp.role, 'edit')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition ${
                        rp.edit ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {rp.edit ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Delete */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => updatePermission(rp.role, 'delete')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition ${
                        rp.delete ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {rp.delete ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Export */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => updatePermission(rp.role, 'export')}
                      className={`w-6 h-6 rounded-lg inline-flex items-center justify-center transition ${
                        rp.export ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {rp.export ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
