import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Modal from '../components/Modal';
import {
  UserCog,
  Stethoscope,
  ShieldCheck,
  CreditCard,
  ClipboardList,
  Phone,
  Mail,
  Award,
  Search,
  Filter,
  Plus,
  LayoutGrid,
  Table as TableIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Users,
  Shield,
  Edit2,
  ChevronRight,
  MoreVertical,
  Check
} from 'lucide-react';

const defaultStaffList = [
  {
    userId: 'USR-DOC-001',
    fullName: 'Dr. Rajesh Sharma, MD',
    role: 'doctor',
    department: 'General Medicine',
    specialization: 'Internal Medicine & Diabetology',
    phone: '+91 98450 11201',
    email: 'dr.rajesh@lazfort.com',
    licenseNumber: 'MCI-2008-41029',
    consultationFee: 600,
    active: true,
    timing: '09:00 AM - 02:00 PM (OPD Wing A)'
  },
  {
    userId: 'USR-DOC-002',
    fullName: 'Dr. Ananya Roy, DM',
    role: 'doctor',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology & Echo',
    phone: '+91 98450 22302',
    email: 'dr.ananya@lazfort.com',
    licenseNumber: 'MCI-2012-58190',
    consultationFee: 800,
    active: true,
    timing: '10:00 AM - 04:00 PM (Heart Wing)'
  },
  {
    userId: 'USR-DOC-003',
    fullName: 'Dr. Vikram Seth, MS',
    role: 'doctor',
    department: 'Orthopedics & Joint Care',
    specialization: 'Joint Replacement & Arthroscopy',
    phone: '+91 98450 33403',
    email: 'dr.vikram@lazfort.com',
    licenseNumber: 'MCI-2015-77210',
    consultationFee: 750,
    active: true,
    timing: '11:00 AM - 05:00 PM (OPD Wing B)'
  },
  {
    userId: 'USR-DOC-004',
    fullName: 'Dr. Sneha Kulkarni, MD',
    role: 'doctor',
    department: 'Paediatrics & Neonatology',
    specialization: 'Paediatric Intensive Care & Vaccines',
    phone: '+91 98450 44504',
    email: 'dr.sneha@lazfort.com',
    licenseNumber: 'MCI-2016-90124',
    consultationFee: 650,
    active: true,
    timing: '09:30 AM - 01:30 PM (Child Health)'
  },
  {
    userId: 'USR-NUR-001',
    fullName: 'Sister Marykutty Joseph',
    role: 'nurse',
    department: 'OPD Nursing Triage',
    specialization: 'Vitals, ECG & Clinical Triage',
    phone: '+91 98450 77007',
    email: 'nurse@lazfort.com',
    licenseNumber: 'INC-2010-87612',
    consultationFee: 0,
    active: true,
    timing: 'Shift A: 08:00 AM - 04:00 PM'
  },
  {
    userId: 'USR-NUR-002',
    fullName: 'Sister Priya Nair',
    role: 'nurse',
    department: 'Emergency & Critical Care',
    specialization: 'ICU Monitoring & Infusion Therapy',
    phone: '+91 98450 77018',
    email: 'priya.nurse@lazfort.com',
    licenseNumber: 'INC-2014-99120',
    consultationFee: 0,
    active: true,
    timing: 'Shift B: 02:00 PM - 10:00 PM'
  },
  {
    userId: 'USR-REC-001',
    fullName: 'Pooja Verma',
    role: 'receptionist',
    department: 'Front Desk & Patient Services',
    specialization: 'OPD Registration & Token Dispatch',
    phone: '+91 98450 55605',
    email: 'reception@lazfort.com',
    licenseNumber: 'LZF-REC-001',
    consultationFee: 0,
    active: true,
    timing: '08:00 AM - 06:00 PM (Central Desk)'
  },
  {
    userId: 'USR-BIL-001',
    fullName: 'Amit Saxena',
    role: 'billing_executive',
    department: 'Patient Accounts & Invoicing',
    specialization: 'TPA Insurance Pre-Auth & Cashier',
    phone: '+91 98450 66706',
    email: 'billing@lazfort.com',
    licenseNumber: 'LZF-BIL-001',
    consultationFee: 0,
    active: true,
    timing: '09:00 AM - 07:00 PM (Billing Counter 2)'
  },
  {
    userId: 'USR-PHM-001',
    fullName: 'Kavita Nair, B.Pharm',
    role: 'pharmacist',
    department: 'Central Pharmacy & Dispensary',
    specialization: 'Drug Dispensation & Cold Chain Mgmt',
    phone: '+91 98450 88008',
    email: 'pharmacy@lazfort.com',
    licenseNumber: 'KSPC-PHARM-2918',
    consultationFee: 0,
    active: true,
    timing: '24/7 Dispensary (Rotational)'
  },
  {
    userId: 'USR-ADM-001',
    fullName: 'Dr. Alok Verma',
    role: 'hospital_admin',
    department: 'Hospital Administration',
    specialization: 'Healthcare Governance & Operations',
    phone: '+91 98450 99009',
    email: 'admin@lazfort.com',
    licenseNumber: 'KMC-1998-33412',
    consultationFee: 0,
    active: true,
    timing: 'Medical Superintendent Suite'
  }
];

export default function StaffManagement() {
  const [staff, setStaff] = useState(defaultStaffList);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [staffForm, setStaffForm] = useState({
    fullName: '',
    role: 'doctor',
    department: 'General Medicine',
    specialization: '',
    phone: '',
    email: '',
    licenseNumber: '',
    consultationFee: 600,
    active: true
  });

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await api.get('/auth/staff');
      if (res.success && Array.isArray(res.staff) && res.staff.length > 0) {
        setStaff(res.staff);
      } else {
        // Resilient fallback so page is never empty
        setStaff(defaultStaffList);
      }
    } catch (err) {
      console.warn('Backend staff API fallback activated:', err.message);
      setStaff(defaultStaffList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Filtered staff list
  const filteredStaff = staff.filter(member => {
    const matchesSearch =
      !searchTerm ||
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.specialization && member.specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.licenseNumber && member.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'All' || member.role === roleFilter;
    const matchesDept = departmentFilter === 'All' || member.department === departmentFilter;

    return matchesSearch && matchesRole && matchesDept;
  });

  // Unique departments for filter
  const departments = ['All', ...Array.from(new Set(staff.map(s => s.department)))];

  const getRoleBadge = (role) => {
    switch (role) {
      case 'doctor':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'hospital_admin':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'billing_executive':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'receptionist':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'nurse':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'pharmacist':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setStaffForm({
      fullName: '',
      role: 'doctor',
      department: 'General Medicine',
      specialization: '',
      phone: '',
      email: '',
      licenseNumber: '',
      consultationFee: 600,
      active: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setEditingStaff(member);
    setStaffForm({
      fullName: member.fullName,
      role: member.role,
      department: member.department,
      specialization: member.specialization || '',
      phone: member.phone || '',
      email: member.email || '',
      licenseNumber: member.licenseNumber || '',
      consultationFee: member.consultationFee || 0,
      active: member.active !== false
    });
    setIsModalOpen(true);
  };

  const handleSaveStaff = (e) => {
    e.preventDefault();
    if (!staffForm.fullName.trim() || !staffForm.email.trim()) {
      alert('Please fill in required fields.');
      return;
    }

    if (editingStaff) {
      // Update existing
      setStaff(prev =>
        prev.map(s => (s.userId === editingStaff.userId ? { ...s, ...staffForm } : s))
      );
    } else {
      // Add new
      const newId = `USR-${staffForm.role.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      const newMember = {
        ...staffForm,
        userId: newId,
        timing: staffForm.role === 'doctor' ? '09:00 AM - 03:00 PM (OPD)' : 'General Duty'
      };
      setStaff(prev => [newMember, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleToggleStatus = (userId) => {
    setStaff(prev =>
      prev.map(s => (s.userId === userId ? { ...s, active: !s.active } : s))
    );
  };

  // KPI Calculations
  const totalCount = staff.length;
  const doctorCount = staff.filter(s => s.role === 'doctor').length;
  const nurseCount = staff.filter(s => s.role === 'nurse').length;
  const opsCount = staff.filter(s => ['receptionist', 'billing_executive', 'pharmacist', 'hospital_admin'].includes(s.role)).length;

  return (
    <div className="w-full space-y-6 pb-16 animate-fadeIn">
      {/* ================= 1. PAGE HEADER ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
            <UserCog className="w-4 h-4" />
            <span>Clinical Governance &amp; Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hospital Staff, Clinicians &amp; RBAC Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage clinical privileges, practitioner licenses, department allocations, and consultation tariffs.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition ${
                viewMode === 'grid'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl transition ${
                viewMode === 'table'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Add Staff Button */}
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition shadow-sky-600/20 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>
      </div>

      {/* ================= 2. FOUR KPI TILES ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Personnel</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{totalCount} Staff</div>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">&bull; Active Hospital Roster</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinicians &amp; Specialists</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{doctorCount} Doctors</div>
          <span className="text-[11px] text-slate-500 block mt-1">OPD &amp; Inpatient Care</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nursing Care Staff</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{nurseCount} Nurses</div>
          <span className="text-[11px] text-slate-500 block mt-1">Triage &amp; Critical Care</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operations &amp; Billing</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{opsCount} Executives</div>
          <span className="text-[11px] text-slate-500 block mt-1">Admin, Cashier &amp; Pharmacy</span>
        </div>
      </div>

      {/* ================= 3. SEARCH & FILTERS BAR ================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, license, specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:bg-white shrink-0"
          >
            <option value="All">All Roles</option>
            <option value="doctor">Doctors Only</option>
            <option value="nurse">Nurses Only</option>
            <option value="receptionist">Receptionists Only</option>
            <option value="billing_executive">Billing Staff Only</option>
            <option value="pharmacist">Pharmacists Only</option>
            <option value="hospital_admin">Admins Only</option>
          </select>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:bg-white shrink-0"
          >
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept === 'All' ? 'All Departments' : dept}
              </option>
            ))}
          </select>

          <span className="text-slate-400 font-medium px-2 hidden sm:inline">
            Showing {filteredStaff.length} results
          </span>
        </div>
      </div>

      {/* ================= 4. STAFF ROSTER VIEW ================= */}
      {filteredStaff.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No staff members found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search query or filter criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStaff.map((member) => (
            <div
              key={member.userId}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition space-y-4 text-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header: Avatar, Name & Role */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                        {member.fullName.charAt(0) === 'D' && member.fullName.includes('Dr.')
                          ? member.fullName.replace('Dr. ', '').charAt(0)
                          : member.fullName.charAt(0)}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                          member.active !== false ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                        title={member.active !== false ? 'Active Duty' : 'Inactive / Leave'}
                      ></span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-tight">
                        {member.fullName}
                      </h3>
                      <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                        ID: {member.userId}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${getRoleBadge(
                      member.role
                    )}`}
                  >
                    {member.role.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Department & Specialization */}
                <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{member.department}</span>
                  </div>
                  {member.specialization && (
                    <p className="text-[11px] text-slate-500 pl-5">
                      {member.specialization}
                    </p>
                  )}
                </div>

                {/* License & Timing Details */}
                <div className="space-y-1.5 text-[11px] text-slate-600">
                  {member.licenseNumber && member.licenseNumber !== 'N/A' && (
                    <div className="flex items-center gap-1.5 font-mono text-slate-700">
                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Lic: {member.licenseNumber}</span>
                    </div>
                  )}

                  {member.timing && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{member.timing}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact & Footer Action */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1.5 truncate max-w-[160px]" title={member.email}>
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </span>

                  {member.role === 'doctor' && (
                    <span className="font-bold text-slate-900 font-mono bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md border border-sky-100">
                      ₹{member.consultationFee}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenEditModal(member)}
                    className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    onClick={() => handleToggleStatus(member.userId)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition border ${
                      member.active !== false
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                    }`}
                    title="Toggle active status"
                  >
                    {member.active !== false ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-600 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Practitioner / Staff Name</th>
                  <th className="p-4">Staff Role</th>
                  <th className="p-4">Department &amp; Specialization</th>
                  <th className="p-4">Council License</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Tariff / Fee</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredStaff.map((member) => (
                  <tr key={member.userId} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{member.fullName}</div>
                      <span className="font-mono text-[10px] text-slate-400">ID: {member.userId}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadge(member.role)}`}>
                        {member.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{member.department}</div>
                      <span className="text-[11px] text-slate-500">{member.specialization || 'Clinical Operations'}</span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-600">
                      {member.licenseNumber || 'N/A'}
                    </td>
                    <td className="p-4 text-slate-600">
                      <div>{member.phone || 'N/A'}</div>
                      <span className="text-[11px] text-slate-400">{member.email}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900">
                      {member.role === 'doctor' ? `₹${member.consultationFee}` : 'Salaried'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          member.active !== false
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {member.active !== false ? 'Active Duty' : 'On Leave'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenEditModal(member)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT STAFF ================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStaff ? 'Edit Hospital Staff Profile' : 'Add New Hospital Practitioner / Staff'}
      >
        <form onSubmit={handleSaveStaff} className="space-y-5 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Full Legal Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={staffForm.fullName}
                onChange={(e) => setStaffForm({ ...staffForm, fullName: e.target.value })}
                placeholder="e.g. Dr. Rajesh Sharma, MD"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Hospital Role <span className="text-rose-500">*</span>
              </label>
              <select
                value={staffForm.role}
                onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 font-semibold"
              >
                <option value="doctor">Doctor / Clinician</option>
                <option value="nurse">Nurse / Triage Staff</option>
                <option value="receptionist">Receptionist / Front Desk</option>
                <option value="billing_executive">Billing Executive / Cashier</option>
                <option value="pharmacist">Pharmacist / Lab Staff</option>
                <option value="hospital_admin">Hospital Administrator</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Clinical Department <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={staffForm.department}
                onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                placeholder="e.g. General Medicine, Cardiology, Nursing Triage"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Specialization / Designation</label>
              <input
                type="text"
                value={staffForm.specialization}
                onChange={(e) => setStaffForm({ ...staffForm, specialization: e.target.value })}
                placeholder="e.g. Diabetology & Internal Medicine"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Medical Council License No.</label>
              <input
                type="text"
                value={staffForm.licenseNumber}
                onChange={(e) => setStaffForm({ ...staffForm, licenseNumber: e.target.value })}
                placeholder="e.g. MCI-2008-41029"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Official Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={staffForm.email}
                onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                placeholder="doctor@lazfort.com"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Phone Number</label>
              <input
                type="text"
                value={staffForm.phone}
                onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                placeholder="+91 98450 11201"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          {staffForm.role === 'doctor' && (
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">OPD Consultation Tariff (₹)</span>
                <span className="text-slate-500 text-[11px]">Default patient consultation charge</span>
              </div>
              <input
                type="number"
                min="0"
                step="50"
                value={staffForm.consultationFee}
                onChange={(e) => setStaffForm({ ...staffForm, consultationFee: Number(e.target.value) })}
                className="w-32 p-2.5 bg-white border border-slate-300 rounded-xl font-mono font-bold text-right"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow-md transition shadow-sky-600/20"
            >
              {editingStaff ? 'Save Changes' : 'Register Staff Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
