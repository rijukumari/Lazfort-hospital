import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  UserCog,
  Stethoscope,
  ShieldCheck,
  CreditCard,
  ClipboardList,
  Phone,
  Mail,
  Award
} from 'lucide-react';

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await api.get('/auth/staff');
      if (res.success) {
        setStaff(res.staff);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'doctor': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'hospital_admin': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'billing_executive': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'receptionist': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'nurse': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <UserCog className="w-5 h-5 text-brand-600" />
          <span>Hospital Staff, Clinicians & RBAC Directory (FR-003)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Staff roles, department allocations, professional medical licenses and consultation tariffs
        </p>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="col-span-3 text-center text-slate-400 py-12 text-xs">Loading staff records...</p>
        ) : (
          staff.map((member) => (
            <div key={member.userId} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow transition text-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{member.fullName}</h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${getRoleBadge(member.role)}`}>
                    {member.role.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                  {member.fullName.charAt(0)}
                </div>
              </div>

              <div className="space-y-1 text-slate-600 pt-2 border-t border-slate-100">
                <p className="font-medium text-slate-800">{member.department || 'General Administration'}</p>
                {member.specialization && (
                  <p className="text-[11px] text-slate-500">{member.specialization}</p>
                )}
                {member.licenseNumber && member.licenseNumber !== 'N/A' && (
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 font-mono pt-1">
                    <Award className="w-3.5 h-3.5 text-brand-600" />
                    <span>Lic: {member.licenseNumber}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-slate-500 text-[11px]">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{member.email}</span>
                </span>
                {member.role === 'doctor' && (
                  <span className="font-bold text-slate-900 font-mono">
                    Fee: ₹{member.consultationFee}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
