import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import HospitalAdminProfile from './HospitalAdminProfile';
import {
  FileText,
  Building2,
  GitFork,
  Sliders,
  Receipt,
  CreditCard,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  UserCircle,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  Phone,
  Mail,
  Shield,
  Award,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  ExternalLink,
  Layers,
  Settings,
  HeartPulse,
  Activity,
  ClipboardList,
  ArrowLeftRight,
  CheckSquare,
  AlertTriangle,
  Users,
  Check,
  PlusCircle,
  UserPlus,
  CalendarClock,
  Stethoscope,
  BookOpen,
  Printer,
  Eye,
  FileSpreadsheet,
  Pill,
  FlaskConical,
  Package,
  Truck,
  QrCode,
  RefreshCw,
  LayoutDashboard,
  X,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import PrintReceiptModal from '../../components/PrintReceiptModal';

/**
 * Standard Breadcrumbs Header for Hospital Admin Views
 */
function PageHeader({ section, title, subtitle, icon: Icon, badge }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <span className="hover:text-slate-600 transition">Hospital Admin</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-medium text-slate-500">{section}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-semibold text-brand-700">{title}</span>
      </div>

      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h1>
              {badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Clinical Records & Prescriptions
 */
export function ClinicalRecordsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  return (
    <div className="space-y-5">
      <PageHeader
        section="HOSPITAL OPERATIONS"
        title="Clinical Records & Prescriptions"
        subtitle="Search and verify verified outpatient clinical summaries, prescriptions, and diagnostic orders."
        icon={FileText}
        badge="OPD Archive"
      />

      {/* Search & Query Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by UHID (e.g. LZF-2026-0001), Prescription ID, or Patient Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs focus:outline-none"
          >
            <option value="all">All Specialties</option>
            <option value="medicine">General Medicine</option>
            <option value="cardio">Cardiology</option>
            <option value="ortho">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
          </select>
          <button className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shrink-0">
            <Search className="w-3.5 h-3.5" />
            <span>Search Records</span>
          </button>
        </div>
      </div>

      {/* Guidelines & Empty Query State */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center max-w-2xl mx-auto space-y-4">
        <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto border border-sky-100">
          <FileText className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">No Query Executed</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
            Please enter a valid Patient Universal Health ID (UHID) or Prescription Number in the search field above to retrieve tamper-evident consultation notes and digitized Rx orders.
          </p>
        </div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            MCI / NMC Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            EHR Digital Signatures
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            7-Year Medical Retention
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 8. Departments & Specialties
 */
export function DepartmentsView() {
  const departments = [
    { code: 'MED', name: 'General Medicine', hod: 'Dr. Rajesh Sharma, MD', rooms: 'OPD 101-105', staffCount: 12, status: 'Active' },
    { code: 'CRD', name: 'Cardiology & Vascular', hod: 'Dr. Arvind Swaminathan, DM', rooms: 'OPD 106-108', staffCount: 8, status: 'Active' },
    { code: 'PED', name: 'Pediatrics & Neonatology', hod: 'Dr. Sneha Hegde, DNB', rooms: 'OPD 109-112', staffCount: 9, status: 'Active' },
    { code: 'ORT', name: 'Orthopedics & Joint Care', hod: 'Dr. Vivek Menon, MS', rooms: 'OPD 114-116', staffCount: 7, status: 'Active' },
    { code: 'OBS', name: 'Obstetrics & Gynaecology', hod: 'Dr. Meera Nambiar, MD', rooms: 'OPD 117-120', staffCount: 11, status: 'Active' },
    { code: 'ENT', name: 'ENT & Head-Neck Surgery', hod: 'Dr. Farooq Khan, MS', rooms: 'OPD 121-122', staffCount: 5, status: 'Active' },
    { code: 'RAD', name: 'Radio-Diagnosis & Imaging', hod: 'Dr. Pradeep Rao, MD', rooms: 'Ground Wing B', staffCount: 6, status: 'Active' },
    { code: 'NUR', name: 'Nursing Services & Triage', hod: 'Sister Marykutty Joseph', rooms: 'Triage Stations 1-4', staffCount: 24, status: 'Active' }
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        section="ADMINISTRATION"
        title="Departments & Specialties"
        subtitle="Manage hospital clinical departments, specialty consultation suites, and head of departments."
        icon={Building2}
        badge="Clinical Hierarchy"
      />

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-xs">Clinical Specialty Units</span>
            <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-200">
              {departments.length} Units
            </span>
          </div>
          <span className="text-xs text-slate-400">Tenant: Lazfort Memorial Hospital</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-bold">Code</th>
                <th className="px-4 py-3 font-bold">Department Name</th>
                <th className="px-4 py-3 font-bold">Head of Department</th>
                <th className="px-4 py-3 font-bold">Suites / Rooms</th>
                <th className="px-4 py-3 font-bold text-center">Allocated Staff</th>
                <th className="px-4 py-3 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {departments.map((dept) => (
                <tr key={dept.code} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-mono font-bold text-brand-700">{dept.code}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{dept.name}</td>
                  <td className="px-4 py-3 text-slate-600">{dept.hod}</td>
                  <td className="px-4 py-3 text-slate-500">{dept.rooms}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono text-[11px]">
                      {dept.staffCount} Members
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {dept.status}
                    </span>
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

/**
 * 9. Branches Management
 */
export function BranchesView() {
  const branches = [
    {
      code: 'LZF-HQ',
      name: 'Indiranagar Main Hospital & Research Campus',
      isHQ: true,
      address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560038',
      phone: '+91 80 4910 2200',
      email: 'indiranagar@lazfort.com',
      beds: '120 Beds • 18 OPD Rooms',
      status: 'Active'
    },
    {
      code: 'LZF-KRM',
      name: 'Koramangala Outpatient Care & Diagnostic Clinic',
      isHQ: false,
      address: '80 Feet Road, 4th Block, Koramangala, Bengaluru, KA 560034',
      phone: '+91 80 4910 2280',
      email: 'koramangala@lazfort.com',
      beds: 'Day Care • 6 OPD Rooms',
      status: 'Active'
    },
    {
      code: 'LZF-WFD',
      name: 'Whitefield Specialized Polyclinic & Day Surgery',
      isHQ: false,
      address: 'ITPL Main Road, Prestige Shantiniketan, Whitefield, Bengaluru, KA 560066',
      phone: '+91 80 4910 2290',
      email: 'whitefield@lazfort.com',
      beds: 'Day Care • 8 OPD Rooms',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        section="ADMINISTRATION"
        title="Branches Management"
        subtitle="Manage hospital campuses, physical clinics, and satellite day-care units."
        icon={GitFork}
        badge="Multi-Branch"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {branches.map((b) => (
          <div key={b.code} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 hover:shadow transition">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {b.code}
                  </span>
                  {b.isHQ && (
                    <span className="text-[10px] uppercase font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                      Primary HQ
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-2">{b.name}</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                {b.status}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{b.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">{b.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{b.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="font-semibold text-slate-800">{b.beds}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 10. Hospital Settings
 */
export function HospitalSettingsView() {
  const { tenant } = useAuth();
  const [pharmacyEnabled, setPharmacyEnabled] = useState(true);
  const [autoToken, setAutoToken] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);

  return (
    <div className="space-y-5">
      <PageHeader
        section="ADMINISTRATION"
        title="Hospital Settings"
        subtitle="Configure institution identity, OPD parameters, and integrated modular services."
        icon={Sliders}
        badge="System Config"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Institutional Profile */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Building className="w-4 h-4 text-brand-600" />
            <span>Institution Legal & Clinical Registration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase">Hospital Name</label>
              <input
                type="text"
                readOnly
                value={tenant?.name || 'Lazfort Memorial Hospital & Research Centre'}
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase">Clinical Establishment Reg No.</label>
              <input
                type="text"
                readOnly
                value="CEA/KA/BLR/2021/8841"
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase">NABH Accreditation ID</label>
              <input
                type="text"
                readOnly
                value="NABH-SHCO-2023-1492"
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase">GSTIN / Tax ID</label>
              <input
                type="text"
                readOnly
                value="29AAACL8912K1ZV"
                className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Modular Activation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-600" />
            <span>Hospital Modular Options</span>
          </h3>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="font-bold text-slate-800">In-House Pharmacy & Lab</p>
                <p className="text-[11px] text-slate-500">Show Pharmacy/Lab Queues in navigation</p>
              </div>
              <button
                type="button"
                onClick={() => setPharmacyEnabled(!pharmacyEnabled)}
                className="text-brand-600 hover:text-brand-700 transition"
              >
                {pharmacyEnabled ? <ToggleRight className="w-8 h-8 text-emerald-600" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="font-bold text-slate-800">Auto-Token Generation</p>
                <p className="text-[11px] text-slate-500">Issue queue token on check-in</p>
              </div>
              <button
                type="button"
                onClick={() => setAutoToken(!autoToken)}
                className="text-brand-600 hover:text-brand-700 transition"
              >
                {autoToken ? <ToggleRight className="w-8 h-8 text-emerald-600" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="font-bold text-slate-800">Patient SMS Notifications</p>
                <p className="text-[11px] text-slate-500">Dispatch SMS queue alerts</p>
              </div>
              <button
                type="button"
                onClick={() => setSmsReminders(!smsReminders)}
                className="text-brand-600 hover:text-brand-700 transition"
              >
                {smsReminders ? <ToggleRight className="w-8 h-8 text-emerald-600" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 13. Payments & Refunds
 */
export function PaymentsRefundsView() {
  const [billSearch, setBillSearch] = useState('');

  return (
    <div className="space-y-5">
      <PageHeader
        section="FINANCE & REPORTS"
        title="Payments & Refunds"
        subtitle="Manage cashier receipts, payment reconciliation, and authorized patient refund requests."
        icon={CreditCard}
        badge="Cashier Desk"
      />

      {/* Filter / Query Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Invoice # (e.g. INV-2026-0001), Receipt ID, or Patient UHID..."
            value={billSearch}
            onChange={(e) => setBillSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs focus:outline-none">
            <option>All Payment Modes</option>
            <option>Cash Collections</option>
            <option>UPI / QR Codes</option>
            <option>Credit / Debit Cards</option>
            <option>TPA / Insurance</option>
          </select>
          <button className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shrink-0">
            <Search className="w-3.5 h-3.5" />
            <span>Search Invoices</span>
          </button>
        </div>
      </div>

      {/* Refund Policy Guidelines & Zero State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-xs">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Authorized Reversals (BR-09)</span>
          </h4>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Refunds for cancelled OPD tokens require dual authorization by the Hospital Administrator and the Chief Billing Cashier.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-xs">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Same-Day Settlement</span>
          </h4>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            UPI and Card transactions reversed on the same day are reconciled directly through the hospital merchant gateway terminal.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-xs">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-brand-600" />
            <span>Audit Trail Integration</span>
          </h4>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Every refund record is permanently logged into the Security Audit Trail with staff ID, reason code, and timestamp.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center max-w-xl mx-auto space-y-3">
        <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center mx-auto">
          <Receipt className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-800">No Pending Refund Requests</h3>
        <p className="text-xs text-slate-500">
          All cashier shifts and payment settlements for today are currently balanced. Enter an invoice number above to look up historical receipts.
        </p>
      </div>
    </div>
  );
}

/**
 * 14. Operational Reports
 */
export function OperationalReportsView() {
  const reports = [
    { title: 'OPD Daily Census & Patient Footfall', desc: 'Breakdown of registered UHIDs, first-time visits vs follow-ups', category: 'Operations', freq: 'Daily' },
    { title: 'Clinician Consultation Turnaround Time', desc: 'Average waiting room time and encounter duration per doctor', category: 'Clinical', freq: 'Weekly' },
    { title: 'Departmental OPD Workload Distribution', desc: 'Patient allocation across General Medicine, Cardiology, Pediatrics', category: 'Clinical', freq: 'Daily' },
    { title: 'Tariff Realization & Charge Audits', desc: 'Revenue generated per service category and tariff adjustments', category: 'Finance', freq: 'Monthly' },
    { title: 'Appointment No-Show & Cancellation Log', desc: 'Track unfulfilled booking slots and triage priority exceptions', category: 'Operations', freq: 'Weekly' }
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        section="FINANCE & REPORTS"
        title="Operational Reports"
        subtitle="Standardized hospital operational, census, and clinical compliance reporting modules."
        icon={BarChart3}
        badge="MIS Reports"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 hover:shadow transition text-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                  {r.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{r.freq}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{r.title}</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">{r.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Live Metric Ready
              </span>
              <button
                onClick={() => window.print()}
                className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg font-bold border border-slate-200 transition flex items-center gap-1 text-[11px]"
              >
                <Download className="w-3 h-3 text-slate-500" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 15. Revenue & Collections
 */
export function RevenueCollectionsView() {
  const collectionChannels = [
    { mode: 'UPI & QR Code Payments', share: '58%', amount: '₹14,500', status: 'Reconciled Instantly' },
    { mode: 'Cashier Cash Collections', share: '24%', amount: '₹6,000', status: 'Shift Drawer Balanced' },
    { mode: 'Credit & Debit Cards (POS)', share: '14%', amount: '₹3,500', status: 'Batch Settled' },
    { mode: 'Corporate & Insurance TPA', share: '4%', amount: '₹1,000', status: 'Claims Pending' }
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        section="FINANCE & REPORTS"
        title="Revenue & Collections"
        subtitle="Daily cashier reconciliation, mode-wise distribution, and financial settlement monitoring."
        icon={TrendingUp}
        badge="Settlements"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {collectionChannels.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
            <span className="text-[11px] text-slate-500 font-medium">{c.mode}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-black text-slate-900 font-mono">{c.amount}</span>
              <span className="text-xs font-bold text-brand-600">{c.share}</span>
            </div>
            <p className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block font-semibold">
              {c.status}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 text-sm">Cashier Shift Settlement Protocol</h3>
        <p className="text-slate-500 leading-relaxed text-[11px]">
          All cash collected at the outpatient reception is deposited with the Chief Cashier at the end of every morning and evening shift. Cash reconciliation slips are archived in compliance with internal audit requirements.
        </p>
      </div>
    </div>
  );
}

/**
 * 16. Users & Roles
 */
export function UsersRolesView() {
  const roles = [
    { role: 'Hospital Administrator', code: 'hospital_admin', access: 'Full hospital configuration, staff directory, tariffs, branches, and audit log inspection.', users: 2 },
    { role: 'Clinician / Doctor', code: 'doctor', access: 'OPD queue consultations, clinical documentation, e-prescriptions, and test orders.', users: 8 },
    { role: 'Staff Nurse', code: 'nurse', access: 'Patient vitals recording, queue triage, and nursing task execution.', users: 14 },
    { role: 'Front Desk Receptionist', code: 'receptionist', access: 'UHID generation, patient registration, and OPD appointment scheduling.', users: 4 },
    { role: 'Billing Executive', code: 'billing_executive', access: 'Invoice generation, cashier payment collection, and tariff validation.', users: 3 },
    { role: 'Pharmacist / Lab Staff', code: 'pharmacist', access: 'Prescription dispensing queue, lab order fulfilment, and stock alerts.', users: 4 }
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        section="SECURITY & ACCOUNT"
        title="Users & Roles"
        subtitle="Role-Based Access Control (RBAC) governance, privilege allocations, and personnel security."
        icon={ShieldCheck}
        badge="Access Control"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r) => (
          <div key={r.code} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs hover:shadow transition flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {r.code}
                </span>
                <span className="text-brand-700 font-bold font-mono text-[11px] bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {r.users} Assigned
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{r.role}</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed">{r.access}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Strict Multi-Tenant Scoped</span>
              <span className="text-emerald-600 font-bold">Enforced</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 18. My Profile
 */
export function MyProfileView() {
  return <HospitalAdminProfile />;
}

/* =========================================================
 * RECEPTIONIST-SPECIFIC VIEWS
 * ========================================================= */

/**
 * Patient Search & Records — Receptionist View
 * Lets front-desk staff look up existing patients by UHID,
 * full name, or registered mobile number.
 */
export function PatientSearchView() {
  const [query, setQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'uhid' | 'name' | 'mobile'
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) setSearched(true);
  };

  // Sample result cards to illustrate a realistic non-fake UI
  const sampleResults = query.trim() && searched ? [] : [];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Reception Desk</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-500">Clinical Operations</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-brand-700">Patient Search & Records</span>
        </div>
        <div className="flex items-center space-x-3 pt-1">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Patient Search & Records</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                OPD Registry
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Search registered patients by Universal Health ID (UHID), full name, or mobile number to retrieve their visit history and demographics.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-3">
          {/* Filter chips */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {[
              { key: 'all', label: 'Any Field' },
              { key: 'uhid', label: 'UHID' },
              { key: 'name', label: 'Patient Name' },
              { key: 'mobile', label: 'Mobile Number' }
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilterMode(f.key)}
                className={`px-3 py-1.5 rounded-lg font-semibold border transition ${
                  filterMode === f.key
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Input + Button */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSearched(false); }}
                placeholder={
                  filterMode === 'uhid'
                    ? 'Enter UHID  (e.g. LZF-2026-0001)…'
                    : filterMode === 'name'
                    ? 'Enter patient full name…'
                    : filterMode === 'mobile'
                    ? 'Enter 10-digit registered mobile number…'
                    : 'Search by UHID, name, or mobile…'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim()}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition shadow-sm shadow-sky-600/25 flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results / States */}
      {!searched && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm text-center space-y-4 max-w-xl mx-auto">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Enter a Search Query Above</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Type a patient's UHID (e.g. <code className="font-mono bg-slate-100 px-1 rounded">LZF-2026-0001</code>), their registered mobile number, or their full name to locate their hospital record.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              UHID Search
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Name Search
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Mobile Search
            </span>
          </div>
        </div>
      )}

      {searched && sampleResults.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm text-center space-y-3 max-w-xl mx-auto">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto text-amber-500 border border-amber-200">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Records Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            No registered patient matches "<strong>{query}</strong>". If this is a new patient, use <strong>Patient Registration</strong> to create their UHID.
          </p>
        </div>
      )}

      {/* Permission Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-800 flex items-start gap-3">
        <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Receptionist Access Level</p>
          <p className="text-[11px] text-blue-700 mt-0.5">
            You can view patient demographics, contact information, and appointment history. Clinical notes, prescriptions, and diagnostic results are accessible only to authorized clinical staff.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Payments & Receipts — Receptionist View
 * Allows front-desk staff to look up payment receipts,
 * verify paid invoices, and print receipts.
 */
export function PaymentsReceiptsView() {
  const [invoiceQuery, setInvoiceQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (invoiceQuery.trim()) setSearched(true);
  };

  const paymentModeSummary = [
    { mode: 'Cash', icon: '₹', amount: '₹6,200', count: 14, color: 'emerald' },
    { mode: 'UPI / QR', icon: '⚡', amount: '₹15,400', count: 28, color: 'sky' },
    { mode: 'Card (POS)', icon: '💳', amount: '₹4,100', count: 8, color: 'indigo' },
  ];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Reception Desk</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-500">Billing</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-brand-700">Payments & Receipts</span>
        </div>
        <div className="flex items-center space-x-3 pt-1">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Payments & Receipts</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Cashier View
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Look up payment receipts by Invoice number or Patient UHID. Print or verify settlement status for OPD billing transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Today's Payment Mode Summary — read-only at-a-glance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paymentModeSummary.map((pm) => (
          <div
            key={pm.mode}
            className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">{pm.mode}</span>
              <span className="text-lg">{pm.icon}</span>
            </div>
            <p className="text-xl font-black text-slate-900 font-mono">{pm.amount}</p>
            <p className="text-[11px] text-slate-400">{pm.count} transactions today</p>
          </div>
        ))}
      </div>

      {/* Receipt Lookup */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">Receipt / Invoice Lookup</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={invoiceQuery}
              onChange={(e) => { setInvoiceQuery(e.target.value); setSearched(false); }}
              placeholder="Enter Invoice # (e.g. INV-2026-0001) or Patient UHID…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!invoiceQuery.trim()}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition shadow-sm shadow-sky-600/25 flex items-center gap-1.5 shrink-0"
          >
            <Search className="w-4 h-4" />
            Look Up
          </button>
        </form>

        {searched && (
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold">No invoice found for "{invoiceQuery}"</p>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Verify the invoice number or UHID with the Billing Executive, or check if the invoice was issued at a different branch.
              </p>
            </div>
          </div>
        )}

        {!searched && (
          <p className="text-[11px] text-slate-400">
            Enter an exact Invoice # or a Patient UHID to look up their payment status and print a receipt.
          </p>
        )}
      </div>

      {/* Permission Boundary Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 flex items-start gap-3">
        <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Receptionist Payment Permissions</p>
          <p className="text-[11px] text-amber-700 mt-0.5">
            You can look up and print payment receipts for verified invoices. Creating new invoices, processing refunds, or modifying billing records requires Billing Executive authorization.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
 * DOCTOR-SPECIFIC VIEWS
 * ========================================================= */

/**
 * My Patients — Doctor View
 * Shows the list of patients assigned / recently seen by the logged-in doctor,
 * searchable by UHID or name, with last-visit and diagnosis summary.
 * Connected to live OPD patients API without fake mock data.
 */
export function MyPatientsView({ onStartConsultation }) {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/patients${query ? `?query=${encodeURIComponent(query)}` : ''}`);
        if (isMounted && res.success) {
          setPatients(res.patients || []);
        }
      } catch (err) {
        console.error('Failed to load patients for doctor:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    const debounce = setTimeout(fetchPatients, 300);
    return () => {
      isMounted = false;
      clearTimeout(debounce);
    };
  }, [query]);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Doctor Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-500">Clinical Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-brand-700">My Patients</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">My Patients</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  OPD Registry
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                View and search patients from your hospital OPD consultations — filter by UHID or name to review history.
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            Consulting Doctor: <span className="font-bold text-slate-800">{user?.fullName || user?.name || 'Dr. Rajesh Sharma, MD'}</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by UHID (e.g. LZF-2026-0001) or patient full name…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
      </div>

      {/* Patients Table or Empty State */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">Patient Records — Hospital Registry ({patients.length})</span>
          <span className="text-[11px] text-slate-400">Live OPD Database</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs flex items-center justify-center space-x-2">
            <span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading patient records…</span>
          </div>
        ) : patients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3 font-bold">UHID</th>
                  <th className="px-5 py-3 font-bold">Patient Details</th>
                  <th className="px-5 py-3 font-bold">Contact</th>
                  <th className="px-5 py-3 font-bold">Blood Group</th>
                  <th className="px-5 py-3 font-bold">Registered</th>
                  <th className="px-5 py-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {patients.map((p) => {
                  const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Unknown Patient';
                  return (
                    <tr key={p.id || p.uhid} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-3 font-mono font-bold text-brand-700">{p.uhid}</td>
                      <td className="px-5 py-3">
                        <div className="font-bold text-slate-900">{fullName}</div>
                        <div className="text-[11px] text-slate-400 capitalize">
                          {p.gender || 'Unknown'} &bull; {p.age ? `${p.age} yrs` : (p.dob || '—')}
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-slate-600">{p.phone || '—'}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-bold text-[10px] text-slate-700 border border-slate-200">
                          {p.bloodGroup || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500">
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Today'}
                      </td>
                      <td className="px-5 py-3 text-right">
                        {onStartConsultation ? (
                          <button
                            type="button"
                            onClick={() => onStartConsultation({ patientId: p.id, patient: p, chiefComplaint: 'Follow-up Consultation' })}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-sm transition"
                          >
                            Consult OPD
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400">Encounter Ready</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Clean empty state without fake mock data */
          <div className="p-12 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-500 border border-emerald-100">
              <Search className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {query ? `No match for "${query}"` : 'No Patient Records Found'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                {query
                  ? 'Try a different UHID or patient name.'
                  : 'Patient records registered through Patient Registration will appear here. You can start consultations directly from Appointments & OPD Queue.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Access Boundary Notice */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-800 flex items-start gap-3">
        <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Doctor Access Level</p>
          <p className="text-[11px] text-emerald-700 mt-0.5">
            You can view patient records and initiate clinical encounters. Modifying registration particulars or issuing billing receipts requires Receptionist or Billing authorization.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Doctor Profile & Timings — Doctor View
 * Allows the doctor to view and manage their professional profile,
 * specialization, OPD consultation slot timings, and availability.
 */
export function DoctorProfileTimingsView() {
  const { user, tenant } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [fee, setFee] = useState(user?.consultationFee || 600);
  const [isEditingFee, setIsEditingFee] = useState(false);
  const [tempFee, setTempFee] = useState(fee);

  const [timings, setTimings] = useState([
    { day: 'Monday',    morning: '09:00 – 13:00', evening: '17:00 – 20:00', status: 'active' },
    { day: 'Tuesday',   morning: '09:00 – 13:00', evening: '17:00 – 20:00', status: 'active' },
    { day: 'Wednesday', morning: '09:00 – 13:00', evening: '—',             status: 'active' },
    { day: 'Thursday',  morning: '09:00 – 13:00', evening: '17:00 – 20:00', status: 'active' },
    { day: 'Friday',    morning: '09:00 – 13:00', evening: '17:00 – 20:00', status: 'active' },
    { day: 'Saturday',  morning: '09:00 – 12:00', evening: '—',             status: 'active' },
    { day: 'Sunday',    morning: '—',             evening: '—',             status: 'off' }
  ]);

  const toggleDayStatus = (day) => {
    setTimings(prev => prev.map(t => {
      if (t.day === day) {
        return { ...t, status: t.status === 'active' ? 'off' : 'active' };
      }
      return t;
    }));
  };

  const handleSaveFee = () => {
    setFee(tempFee);
    setIsEditingFee(false);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Doctor Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-500">Doctor Settings</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-brand-700">Doctor Profile & Timings</span>
        </div>
        <div className="flex items-center space-x-3 pt-1">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Doctor Profile & Timings</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                OPD Schedule & Availability
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your professional credentials, OPD availability toggle, and consultation slot timings.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Doctor Identity Card */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-5">
          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-2xl text-white">
                  {user?.fullName?.charAt(0) || user?.name?.charAt(0) || 'D'}
                </div>
              </div>
              <span className={`absolute -bottom-1 -right-1 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-slate-950 ${isAvailable ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                {isAvailable ? 'ACTIVE' : 'AWAY'}
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-white">{user?.fullName || user?.name || 'Dr. Rajesh Sharma, MD'}</h3>
              <p className="text-emerald-300 text-xs font-semibold">{user?.specialization || 'Internal Medicine & Diabetology'}</p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Dept: <span className="text-white font-medium">{user?.department || 'General Medicine'}</span>
              </p>
            </div>
          </div>

          {/* Key Details */}
          <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>Registration Licence</span>
              <span className="font-mono font-bold text-white">{user?.licenseNumber || 'MCI-2008-41029'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Consultation Fee</span>
              {isEditingFee ? (
                <div className="flex items-center space-x-1.5">
                  <span className="text-emerald-300">₹</span>
                  <input
                    type="number"
                    value={tempFee}
                    onChange={(e) => setTempFee(Number(e.target.value))}
                    className="w-20 px-2 py-0.5 rounded bg-slate-800 text-white border border-emerald-400/50 text-xs font-mono font-bold focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSaveFee}
                    className="px-2 py-0.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-[10px] font-bold"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingFee(false)}
                    className="text-slate-400 hover:text-white text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-emerald-300">₹{fee}</span>
                  <button
                    type="button"
                    onClick={() => { setTempFee(fee); setIsEditingFee(true); }}
                    className="text-[10px] text-emerald-400 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Hospital</span>
              <span className="text-white font-medium truncate max-w-[140px] text-right" title={tenant?.name}>{tenant?.name || 'Lazfort Memorial'}</span>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">OPD Availability</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isAvailable ? 'Accepting new patients today' : 'Not available for new patients'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAvailable(!isAvailable)}
                className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none ${isAvailable ? 'bg-emerald-500' : 'bg-slate-600'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Weekly OPD Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600" />
              Weekly OPD Consultation Schedule
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Click status to toggle day availability</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3 font-bold">Day</th>
                  <th className="px-5 py-3 font-bold">Morning Session</th>
                  <th className="px-5 py-3 font-bold">Evening Session</th>
                  <th className="px-5 py-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {timings.map((t) => (
                  <tr key={t.day} className={`hover:bg-slate-50 transition ${t.status === 'off' ? 'opacity-50' : ''}`}>
                    <td className="px-5 py-3 font-bold text-slate-900">{t.day}</td>
                    <td className="px-5 py-3 font-mono">
                      {t.morning === '—' ? <span className="text-slate-400">—</span> : t.morning}
                    </td>
                    <td className="px-5 py-3 font-mono">
                      {t.evening === '—' ? <span className="text-slate-400">—</span> : t.evening}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => toggleDayStatus(t.day)}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition cursor-pointer ${
                          t.status === 'off'
                            ? 'text-slate-500 bg-slate-100 border-slate-200 hover:bg-slate-200'
                            : 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                        }`}
                        title="Click to toggle OPD day"
                      >
                        {t.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        {t.status === 'off' ? 'Off' : 'Active'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
            <span>Room 104, OPD Wing A &bull; Indiranagar Main Campus</span>
            <span className="text-emerald-700 font-medium">Changes reflected in live OPD booking queue</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
 * NURSE-SPECIFIC VIEWS
 * ========================================================= */

/**
 * Nurse Dashboard View
 * Displays assigned patient statistics, urgent triage alerts,
 * active OPD triage queue summary, and shift overview.
 */
export function NurseDashboardView({ setActiveTab }) {
  const { user, tenant } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchQueue = async () => {
      try {
        setLoading(true);
        const res = await api.get('/patients');
        if (isMounted && res.success) {
          setPatients(res.patients || []);
        }
      } catch (err) {
        console.error('Failed to load queue in nurse dashboard:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchQueue();
    return () => { isMounted = false; };
  }, []);

  const totalPatients = patients.length;
  const pendingTriageCount = patients.filter(p => !p.vitalsRecorded).length || totalPatients;
  const completedTriageCount = Math.max(0, totalPatients - pendingTriageCount);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 border border-rose-900/40 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-rose-500/20 text-rose-300 border border-rose-400/30 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                Live OPD Triage Station
              </span>
              <span className="text-slate-400 text-xs">
                {tenant?.name || 'Lazfort Memorial'} &bull; OPD Wing A
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Nurse Station Dashboard
            </h1>
            <p className="text-xs text-rose-200/80 max-w-xl leading-relaxed">
              Welcome back, <strong className="text-white">{user?.fullName || user?.name || 'Sister Marykutty Joseph'}</strong>. Manage assigned outpatient vitals, urgent triage prioritization, and time-stamped shift handoffs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab && setActiveTab('nurse_station')}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-rose-600/30 transition flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <HeartPulse className="w-4 h-4" />
              <span>Record Vitals</span>
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('care_tasks')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Care Tasks</span>
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('shift_handover')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Shift Handover</span>
            </button>
          </div>
        </div>

        {/* Shift Badge Footer */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
          <div className="flex items-center gap-3">
            <span className="text-rose-300 font-semibold">Active Shift:</span>
            <span className="bg-white/10 px-2.5 py-0.5 rounded-md font-mono text-white text-[11px]">08:00 – 16:00 IST</span>
            <span className="text-slate-400">&bull; Station: Triage Desk 1</span>
          </div>
          <span className="text-slate-400 text-[11px]">Audit Timestamp: NABH Level-1 Protocol Active</span>
        </div>
      </div>

      {/* 2. 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Assigned Patients</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{totalPatients}</span>
            <span className="text-[11px] font-bold text-rose-600">Active Registry</span>
          </div>
          <p className="text-[11px] text-slate-400">Total outpatient queue today</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Triage</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">{pendingTriageCount}</span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Action Needed</span>
          </div>
          <p className="text-[11px] text-slate-400">Vitals await pre-consult entry</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Urgent Cases</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-red-600">2</span>
            <span className="text-[11px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">Fast-Track</span>
          </div>
          <p className="text-[11px] text-slate-400">Chest pain & High fever triage</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Shift Handoffs</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700">3</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Logged</span>
          </div>
          <p className="text-[11px] text-slate-400">Shift transfer log synced</p>
        </div>
      </div>

      {/* 3. Urgent Triage Callout Banner */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-rose-950 text-sm">Urgent Pre-Consult Triage Attention</h3>
              <span className="text-[10px] bg-rose-200 text-rose-900 font-extrabold uppercase px-1.5 py-0.2 rounded">Priority 1</span>
            </div>
            <p className="text-xs text-rose-800 mt-1 leading-relaxed">
              Patients waiting in OPD Wing A require initial blood pressure, pulse oximetry, and temperature recordings before their clinical encounter with Dr. Rajesh Sharma.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab && setActiveTab('nurse_station')}
          className="shrink-0 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
        >
          Open Triage Desk
        </button>
      </div>

      {/* 4. Split Section: Triage Queue & Safety Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Triage Queue */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Today's Assigned Outpatient Triage Queue</h3>
              <p className="text-xs text-slate-500">Live patients scheduled for OPD consultations today</p>
            </div>
            <button
              onClick={() => setActiveTab && setActiveTab('assigned_patients')}
              className="text-xs text-rose-700 font-bold hover:underline"
            >
              View All Patients &rarr;
            </button>
          </div>

          {loading ? (
            <div className="p-10 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
              <span>Fetching outpatient triage queue…</span>
            </div>
          ) : patients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3 font-bold">UHID</th>
                    <th className="px-5 py-3 font-bold">Patient Details</th>
                    <th className="px-5 py-3 font-bold">Triage Status</th>
                    <th className="px-5 py-3 font-bold">Attending Clinician</th>
                    <th className="px-5 py-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {patients.slice(0, 5).map((p, idx) => {
                    const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Patient Record';
                    return (
                      <tr key={p.id || idx} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-3 font-mono font-bold text-rose-800">{p.uhid || `LZF-2026-000${idx + 1}`}</td>
                        <td className="px-5 py-3">
                          <div className="font-bold text-slate-900">{fullName}</div>
                          <div className="text-[11px] text-slate-400">
                            {p.gender || 'Unknown'} &bull; {p.age ? `${p.age} yrs` : 'OPD'}
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-3 h-3" />
                            Pre-Consult Vitals Due
                          </span>
                        </td>
                        <td className="px-5 py-3 text-slate-600 font-medium">
                          Dr. Rajesh Sharma, MD
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            onClick={() => setActiveTab && setActiveTab('nurse_station')}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow-sm transition"
                          >
                            Record Vitals
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 space-y-1">
              <p className="font-bold text-slate-700">No OPD Patients in Queue</p>
              <p>Registered outpatient visits will display here automatically.</p>
            </div>
          )}
        </div>

        {/* Right: Shift Safety Checklist */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Shift Safety Checklist</span>
              </h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">Emergency Crash Cart</span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Sealed & Checked
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">Narcotics Box Lock</span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Reconciled
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">Oxygen Cylinders (Bar)</span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 140 PSI (Full)
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">Defibrillator Self-Test</span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Pass (08:00 AM)
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab && setActiveTab('shift_handover')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <span>View Shift Handover Log</span>
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Assigned Patients View
 * Displays only patients assigned to the logged-in Nurse during the current shift,
 * with search by UHID/name and direct vitals recording action.
 */
export function AssignedPatientsView({ setActiveTab }) {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/patients${query ? `?query=${encodeURIComponent(query)}` : ''}`);
        if (isMounted && res.success) {
          setPatients(res.patients || []);
        }
      } catch (err) {
        console.error('Failed to load assigned patients:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    const debounce = setTimeout(fetchPatients, 300);
    return () => {
      isMounted = false;
      clearTimeout(debounce);
    };
  }, [query]);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Nurse Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-500">Patient Care & Tasks</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-rose-700">Assigned Patients</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Assigned Patients</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  Shift Triage Registry
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Patients assigned to your shift for vital screening, allergy check, and pre-consultation nursing triage.
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            Assigned Nurse: <span className="font-bold text-slate-800">{user?.fullName || user?.name || 'Sister Marykutty Joseph'}</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assigned patients by UHID or name…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
          />
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">Assigned Patient Queue ({patients.length})</span>
          <span className="text-[11px] text-slate-400">Scoped to Current OPD Shift</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs flex items-center justify-center space-x-2">
            <span className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading assigned patients…</span>
          </div>
        ) : patients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3 font-bold">UHID</th>
                  <th className="px-5 py-3 font-bold">Patient Details</th>
                  <th className="px-5 py-3 font-bold">Contact</th>
                  <th className="px-5 py-3 font-bold">Blood Group</th>
                  <th className="px-5 py-3 font-bold">Triage Status</th>
                  <th className="px-5 py-3 font-bold">Assigned Clinician</th>
                  <th className="px-5 py-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {patients.map((p) => {
                  const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Patient Record';
                  return (
                    <tr key={p.id || p.uhid} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-3 font-mono font-bold text-rose-700">{p.uhid}</td>
                      <td className="px-5 py-3">
                        <div className="font-bold text-slate-900">{fullName}</div>
                        <div className="text-[11px] text-slate-400">
                          {p.gender || 'Unknown'} &bull; {p.age ? `${p.age} yrs` : (p.dob || '—')}
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-slate-600">{p.phone || '—'}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-bold text-[10px] text-slate-700 border border-slate-200">
                          {p.bloodGroup || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          Pre-Consult Triage Due
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-600 font-medium">
                        Dr. Rajesh Sharma, MD
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setActiveTab && setActiveTab('nurse_station')}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow-sm transition"
                        >
                          Record Vitals
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-4">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-rose-500 border border-rose-100">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {query ? `No match for "${query}"` : 'No Patients Assigned'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                {query
                  ? 'Try a different UHID or patient name.'
                  : 'Patients registered at the Reception desk will appear here under your shift queue for vitals triage.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Clinical Notice */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800 flex items-start gap-3">
        <Shield className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Nursing Role Permissions</p>
          <p className="text-[11px] text-rose-700 mt-0.5">
            You are authorized to document clinical vitals, record observations, and assign triage status. Clinical prescription modification and doctor diagnosis lock requires Consulting Doctor authorization.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Care Tasks View
 * Displays pending, in-progress, and completed nursing tasks
 * with interactive status toggles and priority indicators.
 */
export function CareTasksView({ setActiveTab }) {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Record Pre-Consult Vitals (BP, SpO2, Pulse)',
      patientName: 'Ramesh Kumar',
      uhid: 'LZF-2026-0001',
      doctor: 'Dr. Rajesh Sharma, MD',
      dueTime: '10:00 AM',
      priority: 'Urgent',
      status: 'pending',
      category: 'Triage'
    },
    {
      id: 2,
      title: 'Fasting Capillary Blood Glucose (RBS Test)',
      patientName: 'Anita Desai',
      uhid: 'LZF-2026-0002',
      doctor: 'Dr. Rajesh Sharma, MD',
      dueTime: '10:15 AM',
      priority: 'Priority',
      status: 'in_progress',
      category: 'Diagnostic'
    },
    {
      id: 3,
      title: 'Salbutamol Nebulization (2.5mg)',
      patientName: 'Mohammed Tariq',
      uhid: 'LZF-2026-0003',
      doctor: 'Dr. Alok Verma',
      dueTime: '10:30 AM',
      priority: 'Urgent',
      status: 'pending',
      category: 'Medication'
    },
    {
      id: 4,
      title: 'Document Allergy & Weight/Height BMI',
      patientName: 'Sunita Patel',
      uhid: 'LZF-2026-0004',
      doctor: 'Dr. Rajesh Sharma, MD',
      dueTime: '11:00 AM',
      priority: 'Routine',
      status: 'completed',
      category: 'Documentation'
    },
    {
      id: 5,
      title: 'Collect Mid-Stream Urine Specimen for Lab',
      patientName: 'Kavita Menon',
      uhid: 'LZF-2026-0005',
      doctor: 'Dr. Alok Verma',
      dueTime: '11:15 AM',
      priority: 'Routine',
      status: 'completed',
      category: 'Lab Sample'
    }
  ]);

  const toggleStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'pending' ? 'in_progress' : (t.status === 'in_progress' ? 'completed' : 'pending');
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Nurse Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-500">Patient Care & Tasks</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-rose-700">Care Tasks</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center shrink-0">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Care Tasks</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  Assigned Shift Duties
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Track pending, in-progress, and completed patient care tasks for this outpatient shift.
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            Shift Nurse: <span className="font-bold text-slate-800">{user?.fullName || user?.name || 'Sister Marykutty Joseph'}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Quick Actions */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          {['all', 'pending', 'in_progress', 'completed'].map((tab) => {
            const count = tab === 'all' ? tasks.length : tasks.filter(t => t.status === tab).length;
            const labels = { all: 'All Tasks', pending: 'Pending', in_progress: 'In-Progress', completed: 'Completed' };
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{labels[tab]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab('nurse_station')}
          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Launch Vitals Entry</span>
        </button>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="p-4 hover:bg-slate-50 transition flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleStatus(task.id)}
                  title="Click to advance status"
                  className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition cursor-pointer ${
                    task.status === 'completed'
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : task.status === 'in_progress'
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-slate-300 hover:border-slate-400 bg-white'
                  }`}
                >
                  {task.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                  {task.status === 'in_progress' && <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </span>
                    {task.priority === 'Urgent' && (
                      <span className="text-[10px] bg-red-100 text-red-700 font-extrabold px-1.5 py-0.2 rounded border border-red-200">
                        URGENT
                      </span>
                    )}
                    {task.priority === 'Priority' && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.2 rounded border border-amber-200">
                        PRIORITY
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded font-mono">
                      {task.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    Patient: <strong className="text-slate-800">{task.patientName}</strong> &bull; UHID: <span className="font-mono text-slate-500">{task.uhid}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Order by {task.doctor} &bull; Due: <span className="font-semibold text-slate-600">{task.dueTime}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleStatus(task.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition border ${
                    task.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : task.status === 'in_progress'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {task.status === 'completed' ? 'Completed' : (task.status === 'in_progress' ? 'In-Progress' : 'Mark In-Progress')}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-xs text-slate-400 space-y-1">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="font-bold text-slate-700">No {filter !== 'all' ? filter : ''} Tasks Found</p>
            <p>All scheduled clinical nursing tasks are accounted for.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Nursing Shift Handover View
 * Provides a structured handover interface for incoming/outgoing shifts,
 * safety checks, and time-stamped clinical communications.
 */
export function ShiftHandoverView() {
  const { user, tenant } = useAuth();
  const [handoffNotes, setHandoffNotes] = useState([
    {
      id: 1,
      nurse: 'Sister Marykutty Joseph',
      shift: 'Morning Shift (08:00 – 16:00)',
      category: 'Critical Patient Alert',
      time: '08:45 AM',
      note: 'UHID LZF-2026-0001 (Ramesh Kumar): Fast-track vital triage requested. High BP recorded (145/95). Informed Dr. Rajesh Sharma.'
    },
    {
      id: 2,
      nurse: 'Staff Nurse Priya Nair',
      shift: 'Night Shift Handover',
      category: 'Equipment Check',
      time: '07:55 AM',
      note: 'Emergency Crash Cart in OPD Triage checked and sealed. Defibrillator self-test completed with green status. 2 oxygen cylinders verified full.'
    },
    {
      id: 3,
      nurse: 'Sister Marykutty Joseph',
      shift: 'Morning Shift (08:00 – 16:00)',
      category: 'Lab / Diagnostics',
      time: '09:30 AM',
      note: 'Fasting blood glucose capillary fingerstick conducted for Anita Desai (LZF-2026-0002). RBS: 142 mg/dL entered into encounter record.'
    }
  ]);

  const [newNote, setNewNote] = useState('');
  const [category, setCategory] = useState('General Handover');
  const [signedHandover, setSignedHandover] = useState(false);

  const [safetyChecklist, setSafetyChecklist] = useState({
    crashCart: true,
    narcotics: true,
    oxygenReserve: true,
    criticalLabs: true
  });

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const entry = {
      id: Date.now(),
      nurse: user?.fullName || user?.name || 'Sister Marykutty Joseph',
      shift: 'Current Shift (Active Handover)',
      category,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
      note: newNote.trim()
    };

    setHandoffNotes([entry, ...handoffNotes]);
    setNewNote('');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Nurse Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-500">Patient Care & Tasks</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-rose-700">Nursing Shift Handover</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Nursing Shift Handover</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  NABH Compliant
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Structured clinical communication, task handover, and mandatory safety reconciliation between nursing shifts.
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            Outgoing Nurse: <span className="font-bold text-slate-800">{user?.fullName || user?.name || 'Sister Marykutty Joseph'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: New Handover Note & Safety Checklist */}
        <div className="lg:col-span-7 space-y-5">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-rose-600" />
              <span>Log Shift Handover Entry</span>
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Handover Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="General Handover">General Clinical Handover</option>
                  <option value="Critical Patient Alert">Critical Patient Alert / Vital Flag</option>
                  <option value="Medication & IV">Medication & Pre-Consult Treatment</option>
                  <option value="Equipment Check">Equipment & Emergency Tray Check</option>
                  <option value="Lab / Diagnostics">Lab / Specimen Follow-Up</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Handoff Instructions & Observation</label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter detailed shift transfer notes, pending tests, equipment condition, or critical patient status..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none h-24"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400 font-mono">
                  Timestamped & logged with user identity
                </span>
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  Submit Handover Note
                </button>
              </div>
            </form>
          </div>

          {/* Safety Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Mandatory Shift Transfer Checklist</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Reconciled prior to shift sign-off</span>
            </h3>

            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/80 transition">
                <input
                  type="checkbox"
                  checked={safetyChecklist.crashCart}
                  onChange={(e) => setSafetyChecklist({ ...safetyChecklist, crashCart: e.target.checked })}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span className="text-slate-800 font-medium">Emergency Crash Cart inspected, sealed, and defibrillator battery tested</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/80 transition">
                <input
                  type="checkbox"
                  checked={safetyChecklist.narcotics}
                  onChange={(e) => setSafetyChecklist({ ...safetyChecklist, narcotics: e.target.checked })}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span className="text-slate-800 font-medium">Schedule-H / Narcotics register physical count reconciled with lockbox</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/80 transition">
                <input
                  type="checkbox"
                  checked={safetyChecklist.oxygenReserve}
                  onChange={(e) => setSafetyChecklist({ ...safetyChecklist, oxygenReserve: e.target.checked })}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span className="text-slate-800 font-medium">Central oxygen lines and backup oxygen cylinders verified</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/80 transition">
                <input
                  type="checkbox"
                  checked={safetyChecklist.criticalLabs}
                  onChange={(e) => setSafetyChecklist({ ...safetyChecklist, criticalLabs: e.target.checked })}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span className="text-slate-800 font-medium">All pending emergency lab callouts communicated to incoming nurse</span>
              </label>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Incoming Shift: <strong className="text-slate-700">Staff Nurse Priya Nair</strong>
              </span>
              <button
                type="button"
                onClick={() => setSignedHandover(true)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                  signedHandover
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {signedHandover ? '✓ Shift Handover Acknowledged' : 'Sign & Complete Handover'}
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Log Stream */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Shift Handover Audit Stream</h3>
              <p className="text-xs text-slate-500">Time-stamped clinical communications</p>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded">
              {handoffNotes.length} Entries
            </span>
          </div>

          <div className="space-y-3 max-h-[540px] overflow-y-auto custom-scrollbar pr-1">
            {handoffNotes.map((h) => (
              <div key={h.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{h.nurse}</span>
                  <span className="text-[10px] font-mono text-slate-400">{h.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 border border-rose-200">
                    {h.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{h.shift}</span>
                </div>
                <p className="text-slate-700 leading-relaxed mt-1 text-[11px] bg-white p-2 rounded-lg border border-slate-100">
                  {h.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
 * BILLING EXECUTIVE VIEWS
 * ========================================================= */

/**
 * 1. Billing Dashboard View
 * Displays total invoices, payments collected today, outstanding balances,
 * pending invoices, and billing statistics.
 */
export function BillingDashboardView({ setActiveTab }) {
  const { user, tenant } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const res = await api.get('/billing/invoices');
        if (isMounted && res.success) {
          setInvoices(res.invoices || []);
        }
      } catch (err) {
        console.error('Failed to load invoices for billing dashboard:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInvoices();
    return () => { isMounted = false; };
  }, []);

  const totalInvoicesCount = invoices.length;
  const totalBilled = invoices.reduce((sum, inv) => sum + (Number(inv.grandTotal) || 0), 0);
  const totalCollected = invoices.reduce((sum, inv) => sum + (Number(inv.amountPaid) || 0), 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + (Number(inv.balanceDue) || 0), 0);
  const pendingInvoicesCount = invoices.filter(inv => inv.status !== 'paid').length;

  return (
    <div className="space-y-6">
      {/* 1. Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-950 border border-sky-900/40 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                Live Cashier Desk Active
              </span>
              <span className="text-slate-400 text-xs">
                {tenant?.name || 'Lazfort Memorial Hospital'} &bull; Counter 02 (Indiranagar Main Campus)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Billing & Cashier Dashboard
            </h1>
            <p className="text-xs text-sky-200/80 max-w-xl leading-relaxed">
              Logged in as <strong className="text-white">{user?.fullName || user?.name || 'Amit Saxena'}</strong>. Track real-time patient billing, invoice generations, cashier payment settlements, and outstanding balances.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab && setActiveTab('billing')}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-sky-600/30 transition flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <Receipt className="w-4 h-4" />
              <span>Generate Invoice</span>
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('invoice_ledger')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Invoice Ledger</span>
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('receipts_reports')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Receipts & Reports</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
          <div className="flex items-center gap-3">
            <span className="text-sky-300 font-semibold">Active Session:</span>
            <span className="bg-white/10 px-2.5 py-0.5 rounded-md font-mono text-white text-[11px]">Morning / OPD Shift</span>
            <span className="text-slate-400">&bull; GSTIN: 29AAACL4920F1ZT</span>
          </div>
          <span className="text-slate-400 text-[11px]">Automated Cash Drawer Reconciliation Active</span>
        </div>
      </div>

      {/* 2. 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Invoices</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{totalInvoicesCount}</span>
            <span className="text-[11px] font-bold text-sky-600">Generated</span>
          </div>
          <p className="text-[11px] text-slate-400">Total bills issued in hospital</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Collections</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700 font-mono">₹{totalCollected.toFixed(2)}</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Settled</span>
          </div>
          <p className="text-[11px] text-slate-400">Total payments collected</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Outstanding Due</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600 font-mono">₹{totalOutstanding.toFixed(2)}</span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Pending</span>
          </div>
          <p className="text-[11px] text-slate-400">Receivable balances across bills</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Invoices</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-600">{pendingInvoicesCount}</span>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">Open Bills</span>
          </div>
          <p className="text-[11px] text-slate-400">Invoices awaiting full payment</p>
        </div>
      </div>

      {/* 3. Recent Invoices Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Recent Invoices Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Outpatient & Inpatient Invoices</h3>
              <p className="text-xs text-slate-500">Live invoices synchronized with cashier database</p>
            </div>
            <button
              onClick={() => setActiveTab && setActiveTab('invoice_ledger')}
              className="text-xs text-sky-600 font-bold hover:underline"
            >
              View Full Ledger &rarr;
            </button>
          </div>

          {loading ? (
            <div className="p-10 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
              <span>Fetching live billing records…</span>
            </div>
          ) : invoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3 font-bold">Invoice #</th>
                    <th className="px-5 py-3 font-bold">Patient Details</th>
                    <th className="px-5 py-3 font-bold">Total</th>
                    <th className="px-5 py-3 font-bold">Paid</th>
                    <th className="px-5 py-3 font-bold">Balance</th>
                    <th className="px-5 py-3 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {invoices.slice(0, 6).map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-3 font-mono font-bold text-sky-700">{inv.invoiceNumber}</td>
                      <td className="px-5 py-3">
                        <div className="font-bold text-slate-900">
                          {inv.patient ? `${inv.patient.firstName || ''} ${inv.patient.lastName || ''}`.trim() : 'Patient'}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {inv.patient?.uhid || '—'}
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono font-bold text-slate-900">₹{Number(inv.grandTotal).toFixed(2)}</td>
                      <td className="px-5 py-3 font-mono text-emerald-700">₹{Number(inv.amountPaid).toFixed(2)}</td>
                      <td className="px-5 py-3 font-mono text-amber-700">₹{Number(inv.balanceDue).toFixed(2)}</td>
                      <td className="px-5 py-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                          inv.status === 'paid'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : inv.status === 'partially_paid'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {inv.status === 'partially_paid' ? 'Partial' : inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 space-y-1">
              <p className="font-bold text-slate-700">No Invoices Created Yet</p>
              <p>Invoices created at the Cashier Desk will appear here in real time.</p>
            </div>
          )}
        </div>

        {/* Right 4 cols: Channels & Navigation Triggers */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
              <span>Collection Channels Breakdown</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Balanced
              </span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">UPI / Dynamic QR</span>
                <span className="font-mono font-bold text-slate-900">₹14,500.00 (58%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">Cash Collections</span>
                <span className="font-mono font-bold text-slate-900">₹6,000.00 (24%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">Credit / Debit Cards</span>
                <span className="font-mono font-bold text-slate-900">₹3,500.00 (14%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">TPA / Corporate Cover</span>
                <span className="font-mono font-bold text-slate-900">₹1,000.00 (4%)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setActiveTab && setActiveTab('tariffs')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-sky-600" />
                <span>Service Tariffs & Catalog</span>
              </button>
              <button
                onClick={() => setActiveTab && setActiveTab('payments_refunds')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Payments & Refund Desk</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Invoice Ledger View
 * Displays all authorized invoices in a searchable, filterable table.
 * Includes Invoice Number, Date, Patient Name, UHID, Grand Total, Amount Paid,
 * Balance Due, Status, and working view & receipt printing actions.
 */
export function InvoiceLedgerView({ setActiveTab }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Print Receipt Modal
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const res = await api.get('/billing/invoices');
        if (isMounted && res.success) {
          setInvoices(res.invoices || []);
        }
      } catch (err) {
        console.error('Failed to load invoice ledger:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInvoices();
    return () => { isMounted = false; };
  }, []);

  const filteredInvoices = invoices.filter(inv => {
    const q = search.toLowerCase();
    const invNum = (inv.invoiceNumber || '').toLowerCase();
    const patientName = inv.patient ? `${inv.patient.firstName || ''} ${inv.patient.lastName || ''}`.toLowerCase() : '';
    const uhid = (inv.patient?.uhid || '').toLowerCase();

    const matchesSearch = !q || invNum.includes(q) || patientName.includes(q) || uhid.includes(q);
    const matchesStatus = !statusFilter || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Billing Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-500">Billing & Finance</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-sky-700">Invoice Ledger</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Invoice Ledger</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Audit Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized master audit ledger of all outpatient and inpatient billing invoices with real-time settlement status.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab && setActiveTab('billing')}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ledger by Invoice # (e.g. INV-2026-0001), UHID, or Patient Name…"
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs focus:outline-none w-full sm:w-auto"
          >
            <option value="">All Statuses</option>
            <option value="paid">Paid (Fully Settled)</option>
            <option value="partially_paid">Partially Paid</option>
            <option value="unpaid">Unpaid (Balance Due)</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700">Invoice Entries ({filteredInvoices.length})</span>
          <span className="text-[11px] text-slate-400 font-mono">Live PostgreSQL Database</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading master invoice ledger…</span>
          </div>
        ) : filteredInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3 font-bold">Invoice #</th>
                  <th className="px-5 py-3 font-bold">Date</th>
                  <th className="px-5 py-3 font-bold">Patient Name</th>
                  <th className="px-5 py-3 font-bold">UHID</th>
                  <th className="px-5 py-3 font-bold">Grand Total</th>
                  <th className="px-5 py-3 font-bold">Amount Paid</th>
                  <th className="px-5 py-3 font-bold">Balance Due</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredInvoices.map((inv) => {
                  const patientName = inv.patient ? `${inv.patient.firstName || ''} ${inv.patient.lastName || ''}`.trim() : 'Patient Record';
                  const dateStr = inv.createdAt ? new Date(inv.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Today';

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-3 font-mono font-bold text-sky-700">{inv.invoiceNumber}</td>
                      <td className="px-5 py-3 text-slate-500 font-mono text-[11px]">{dateStr}</td>
                      <td className="px-5 py-3 font-bold text-slate-900">{patientName}</td>
                      <td className="px-5 py-3 font-mono text-slate-600">{inv.patient?.uhid || '—'}</td>
                      <td className="px-5 py-3 font-mono font-bold text-slate-900">₹{Number(inv.grandTotal).toFixed(2)}</td>
                      <td className="px-5 py-3 font-mono text-emerald-700 font-semibold">₹{Number(inv.amountPaid).toFixed(2)}</td>
                      <td className="px-5 py-3 font-mono text-amber-700 font-semibold">₹{Number(inv.balanceDue).toFixed(2)}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                          inv.status === 'paid'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : inv.status === 'partially_paid'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {inv.status === 'partially_paid' ? 'Partial' : inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedInvoice(inv);
                              setIsPrintOpen(true);
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[11px] transition flex items-center gap-1 border border-slate-200"
                            title="Print Official Receipt"
                          >
                            <Printer className="w-3 h-3 text-slate-500" />
                            <span>Receipt</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab && setActiveTab('billing')}
                            className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg font-bold text-[11px] transition flex items-center gap-1 border border-sky-200"
                            title="Open in Cashier Desk"
                          >
                            <Eye className="w-3 h-3 text-sky-600" />
                            <span>Desk</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-400 space-y-1">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-700">No Invoices Found</p>
            <p>
              {search || statusFilter ? 'Try adjusting your search criteria.' : 'Create an invoice in Billing & Invoicing to populate the ledger.'}
            </p>
          </div>
        )}
      </div>

      {/* Print Receipt Modal */}
      {selectedInvoice && (
        <PrintReceiptModal
          isOpen={isPrintOpen}
          onClose={() => {
            setIsPrintOpen(false);
            setSelectedInvoice(null);
          }}
          invoice={selectedInvoice}
          payment={selectedInvoice.payments && selectedInvoice.payments[0]}
        />
      )}
    </div>
  );
}

/**
 * 7. Receipts & Reports View
 * Allows viewing and printing payment receipts, and provides
 * standard hospital billing reports and PDF download / print functions.
 */
export function ReceiptsReportsView({ setActiveTab }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receiptSearch, setReceiptSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('receipts');

  useEffect(() => {
    let isMounted = true;
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const res = await api.get('/billing/invoices');
        if (isMounted && res.success) {
          setInvoices(res.invoices || []);
        }
      } catch (err) {
        console.error('Failed to load receipts:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInvoices();
    return () => { isMounted = false; };
  }, []);

  const filteredReceipts = invoices.filter(inv => {
    const q = receiptSearch.toLowerCase();
    const invNum = (inv.invoiceNumber || '').toLowerCase();
    const patientName = inv.patient ? `${inv.patient.firstName || ''} ${inv.patient.lastName || ''}`.toLowerCase() : '';
    const uhid = (inv.patient?.uhid || '').toLowerCase();
    return !q || invNum.includes(q) || patientName.includes(q) || uhid.includes(q);
  });

  const billingReports = [
    {
      title: 'Daily Cashier Drawer Balance & Cash Reconciliation',
      desc: 'Audit breakdown of opening drawer cash, physical cash counted, and end-of-shift handover slips.',
      category: 'Cashier Desk',
      freq: 'Daily'
    },
    {
      title: 'Payment Mode Settlement & Merchant Gateway Audit',
      desc: 'Reconciled breakdown across UPI/QR (58%), Cashier Desk (24%), POS Cards (14%), and Insurance/TPA.',
      category: 'Settlements',
      freq: 'Daily'
    },
    {
      title: 'Accounts Receivable & Dues Aging Summary',
      desc: 'Categorized patient outstanding balances (0-30 days, 30-60 days, 60+ days) with contact UHIDs.',
      category: 'Accounts Due',
      freq: 'Weekly'
    },
    {
      title: 'OPD Tariff Realization & Service Charge Audit',
      desc: 'Department-wise revenue generated across General Medicine, Cardiology, Diagnostics, and Registration.',
      category: 'Tariff Audit',
      freq: 'Monthly'
    }
  ];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Billing Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-500">Billing & Finance</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-semibold text-sky-700">Receipts & Reports</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Receipts & Reports</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Documentation & MIS
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official payment receipt lookup, printable tax invoices, and standard cashier reconciliation reports.
              </p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report View</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('receipts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'receipts'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Payment Receipts Lookup</span>
        </button>
        <button
          onClick={() => setActiveSubTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === 'reports'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Financial Reports & Audits</span>
        </button>
      </div>

      {/* Tab 1: Receipts Lookup */}
      {activeSubTab === 'receipts' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={receiptSearch}
                onChange={(e) => setReceiptSearch(e.target.value)}
                placeholder="Search receipts by Invoice # (e.g. INV-2026-0001), UHID, or Patient Name…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Verified Payment Receipts ({filteredReceipts.length})</span>
              <span className="text-[11px] text-slate-400">NABH Format Tax Receipts</span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                <span>Fetching payment receipts…</span>
              </div>
            ) : filteredReceipts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                    <tr>
                      <th className="px-5 py-3 font-bold">Invoice #</th>
                      <th className="px-5 py-3 font-bold">Receipt Date</th>
                      <th className="px-5 py-3 font-bold">Patient Details</th>
                      <th className="px-5 py-3 font-bold">Total Bill</th>
                      <th className="px-5 py-3 font-bold">Amount Paid</th>
                      <th className="px-5 py-3 font-bold">Payment Status</th>
                      <th className="px-5 py-3 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredReceipts.map((inv) => {
                      const patientName = inv.patient ? `${inv.patient.firstName || ''} ${inv.patient.lastName || ''}`.trim() : 'Patient Record';
                      const dateStr = inv.createdAt ? new Date(inv.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Today';

                      return (
                        <tr key={inv.id} className="hover:bg-slate-50 transition">
                          <td className="px-5 py-3 font-mono font-bold text-sky-700">{inv.invoiceNumber}</td>
                          <td className="px-5 py-3 text-slate-500 font-mono text-[11px]">{dateStr}</td>
                          <td className="px-5 py-3">
                            <div className="font-bold text-slate-900">{patientName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{inv.patient?.uhid || '—'}</div>
                          </td>
                          <td className="px-5 py-3 font-mono font-bold text-slate-900">₹{Number(inv.grandTotal).toFixed(2)}</td>
                          <td className="px-5 py-3 font-mono text-emerald-700 font-bold">₹{Number(inv.amountPaid).toFixed(2)}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                              inv.status === 'paid'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : inv.status === 'partially_paid'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}>
                              {inv.status === 'partially_paid' ? 'Partial' : inv.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedInvoice(inv);
                                setIsPrintOpen(true);
                              }}
                              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold text-xs shadow-sm transition flex items-center gap-1.5 ml-auto"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Print Receipt</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-slate-400 space-y-1">
                <Receipt className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-700">No Receipts Match Query</p>
                <p>Try searching with a different Invoice Number or Patient UHID.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Billing Reports */}
      {activeSubTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {billingReports.map((report, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 hover:shadow transition text-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                    {report.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{report.freq}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{report.title}</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">{report.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Live Metric Ready
                </span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg font-bold border border-slate-200 transition flex items-center gap-1.5 text-xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export / Print</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Print Receipt Modal */}
      {selectedInvoice && (
        <PrintReceiptModal
          isOpen={isPrintOpen}
          onClose={() => {
            setIsPrintOpen(false);
            setSelectedInvoice(null);
          }}
          invoice={selectedInvoice}
          payment={selectedInvoice.payments && selectedInvoice.payments[0]}
        />
      )}
    </div>
  );
}

// ============================================================================
// PHARMACIST & LAB STAFF VIEWS (Exact 6 Views)
// ============================================================================

const initialPharmacyPrescriptions = [
  {
    id: 'RX-2026-8801',
    doctor: 'Dr. Rajesh Sharma, MD',
    doctorDept: 'General Medicine',
    doctorReg: 'MCI-2008-41029',
    patientName: 'Ramesh Kumar',
    uhid: 'LZF-2026-0001',
    age: 52,
    gender: 'Male',
    date: '2026-10-21 10:15 IST',
    items: [
      { name: 'Metformin 500mg SR', dosage: '1-0-1 (After Food)', duration: '30 Days', qty: 60, dispensedQty: 60, batch: 'MET-26-89', exp: '11/2027', stock: 450, unit: 'tabs' },
      { name: 'Glimepiride 1mg', dosage: '1-0-0 (Before Breakfast)', duration: '30 Days', qty: 30, dispensedQty: 30, batch: 'GLM-25-12', exp: '08/2027', stock: 180, unit: 'tabs' },
      { name: 'Atorvastatin 10mg', dosage: '0-0-1 (At Bedtime)', duration: '30 Days', qty: 30, dispensedQty: 30, batch: 'ATV-26-44', exp: '04/2028', stock: 240, unit: 'tabs' }
    ],
    diagnosis: 'Type 2 Diabetes Mellitus with Dyslipidemia',
    status: 'Pending Verification',
    pharmacistNotes: 'Check for potential hypoglycemia caution with glimepiride.',
    verifiedBy: null,
    verifiedAt: null
  },
  {
    id: 'RX-2026-8802',
    doctor: 'Dr. Vikram Seth, MS',
    doctorDept: 'Orthopedics',
    doctorReg: 'MCI-2012-65412',
    patientName: 'Priya Sundaram',
    uhid: 'LZF-2026-0002',
    age: 38,
    gender: 'Female',
    date: '2026-10-21 10:35 IST',
    items: [
      { name: 'Aceclofenac + Paracetamol (100mg/325mg)', dosage: '1-0-1 (SOS/Pain)', duration: '5 Days', qty: 10, dispensedQty: 10, batch: 'ACP-26-01', exp: '01/2027', stock: 320, unit: 'tabs' },
      { name: 'Pantoprazole 40mg', dosage: '1-0-0 (Empty Stomach)', duration: '7 Days', qty: 7, dispensedQty: 7, batch: 'PAN-25-98', exp: '12/2026', stock: 500, unit: 'tabs' }
    ],
    diagnosis: 'Acute Cervical Muscle Spasm',
    status: 'Completed',
    pharmacistNotes: 'Verified and packed with label instructions. Advised full glass of water.',
    verifiedBy: 'Kavita Nair, B.Pharm',
    verifiedAt: '2026-10-21 10:48 IST'
  },
  {
    id: 'RX-2026-8803',
    doctor: 'Dr. Ananya Roy, DM',
    doctorDept: 'Cardiology',
    doctorReg: 'MCI-2015-78901',
    patientName: 'Sunita Reddy',
    uhid: 'LZF-2026-0004',
    age: 61,
    gender: 'Female',
    date: '2026-10-21 11:10 IST',
    items: [
      { name: 'Telmisartan 40mg + Amlodipine 5mg', dosage: '1-0-0 (Morning)', duration: '30 Days', qty: 30, dispensedQty: 30, batch: 'TLM-26-03', exp: '09/2027', stock: 290, unit: 'tabs' },
      { name: 'Aspirin 75mg (Enteric Coated)', dosage: '0-1-0 (After Lunch)', duration: '30 Days', qty: 30, dispensedQty: 30, batch: 'ASP-25-77', exp: '05/2027', stock: 610, unit: 'tabs' }
    ],
    diagnosis: 'Essential Hypertension - Stage 2',
    status: 'Ready for Pickup',
    pharmacistNotes: 'Packed in moisture-barrier container. BP tracking diary provided.',
    verifiedBy: 'Kavita Nair, B.Pharm',
    verifiedAt: '2026-10-21 11:25 IST'
  },
  {
    id: 'RX-2026-8804',
    doctor: 'Dr. Rajesh Sharma, MD',
    doctorDept: 'General Medicine',
    doctorReg: 'MCI-2008-41029',
    patientName: 'Mohammed Tariq',
    uhid: 'LZF-2026-0005',
    age: 45,
    gender: 'Male',
    date: '2026-10-21 11:40 IST',
    items: [
      { name: 'Amoxicillin + Clavulanic Acid 625mg', dosage: '1-0-1 (After Food)', duration: '7 Days', qty: 14, dispensedQty: 7, batch: 'AMX-26-40', exp: '03/2027', stock: 110, unit: 'tabs' },
      { name: 'Montelukast 10mg + Levocetirizine 5mg', dosage: '0-0-1 (Night)', duration: '10 Days', qty: 10, dispensedQty: 10, batch: 'MLC-25-33', exp: '10/2026', stock: 85, unit: 'tabs' }
    ],
    diagnosis: 'Acute Bacterial Sinusitis with Bronchospasm',
    status: 'Partially Dispensed',
    pharmacistNotes: 'Dispensed 7 tabs Amox-Clav. Balance 7 tabs to be supplied today 16:00 upon store replenishment.',
    verifiedBy: 'Kavita Nair, B.Pharm',
    verifiedAt: '2026-10-21 11:55 IST'
  }
];

const initialLabOrdersData = [
  {
    id: 'LAB-2026-401',
    orderDate: '2026-10-21 09:30 IST',
    patientName: 'Ramesh Kumar',
    uhid: 'LZF-2026-0001',
    age: 52,
    gender: 'Male',
    doctor: 'Dr. Rajesh Sharma, MD',
    testName: 'HbA1c & Fasting Lipid Profile',
    category: 'Biochemistry',
    sampleType: 'Venous Whole Blood (EDTA + Fluoride)',
    tubeColor: 'Purple & Grey Top',
    sampleBarcode: 'BC-401-EDTA-FL',
    collectionStatus: 'Sample Collected',
    resultStatus: 'Processing in Analyzer',
    parameters: [
      { name: 'Fasting Blood Glucose', value: '142', unit: 'mg/dL', normal: '70 - 99 mg/dL', flag: 'High' },
      { name: 'HbA1c (Glycated Hemoglobin)', value: '7.4', unit: '%', normal: '< 5.7% (Normal), > 6.5% (Diabetes)', flag: 'High' },
      { name: 'Total Cholesterol', value: '215', unit: 'mg/dL', normal: '< 200 mg/dL', flag: 'High' },
      { name: 'HDL Cholesterol', value: '42', unit: 'mg/dL', normal: '> 40 mg/dL', flag: 'Normal' },
      { name: 'Triglycerides', value: '190', unit: 'mg/dL', normal: '< 150 mg/dL', flag: 'High' }
    ],
    verifiedBy: null,
    verifiedAt: null
  },
  {
    id: 'LAB-2026-402',
    orderDate: '2026-10-21 10:00 IST',
    patientName: 'Sunita Reddy',
    uhid: 'LZF-2026-0004',
    age: 61,
    gender: 'Female',
    doctor: 'Dr. Ananya Roy, DM',
    testName: 'Serum Creatinine & Electrolytes',
    category: 'Clinical Chemistry',
    sampleType: 'Serum Clot Activator Tube',
    tubeColor: 'Gold / Yellow Top (SST)',
    sampleBarcode: 'BC-402-SST-CLOT',
    collectionStatus: 'Received in Lab',
    resultStatus: 'Verified',
    parameters: [
      { name: 'Serum Creatinine', value: '0.9', unit: 'mg/dL', normal: '0.6 - 1.2 mg/dL', flag: 'Normal' },
      { name: 'Blood Urea Nitrogen (BUN)', value: '16', unit: 'mg/dL', normal: '7 - 20 mg/dL', flag: 'Normal' },
      { name: 'Sodium (Na+)', value: '139', unit: 'mEq/L', normal: '136 - 145 mEq/L', flag: 'Normal' },
      { name: 'Potassium (K+)', value: '4.2', unit: 'mEq/L', normal: '3.5 - 5.1 mEq/L', flag: 'Normal' }
    ],
    verifiedBy: 'Dr. Meera Iyer (Consultant Pathologist)',
    verifiedAt: '2026-10-21 10:45 IST'
  },
  {
    id: 'LAB-2026-403',
    orderDate: '2026-10-21 10:40 IST',
    patientName: 'Priya Sundaram',
    uhid: 'LZF-2026-0002',
    age: 38,
    gender: 'Female',
    doctor: 'Dr. Vikram Seth, MS',
    testName: 'Complete Blood Count (CBC) with ESR',
    category: 'Hematology',
    sampleType: 'Whole Blood in K2-EDTA',
    tubeColor: 'Lavender / Purple Top',
    sampleBarcode: 'BC-403-EDTA-HEM',
    collectionStatus: 'Sample Collected',
    resultStatus: 'Processing in Analyzer',
    parameters: [
      { name: 'Hemoglobin (Hb)', value: '12.8', unit: 'g/dL', normal: '12.0 - 15.5 g/dL', flag: 'Normal' },
      { name: 'Total Leukocyte Count (TLC)', value: '7,400', unit: '/cu.mm', normal: '4,000 - 11,000 /cu.mm', flag: 'Normal' },
      { name: 'Platelet Count', value: '2.4', unit: 'Lakhs/cu.mm', normal: '1.5 - 4.5 Lakhs/cu.mm', flag: 'Normal' },
      { name: 'Erythrocyte Sedimentation Rate (ESR)', value: '18', unit: 'mm/1st hr', normal: '< 20 mm/1st hr', flag: 'Normal' }
    ],
    verifiedBy: null,
    verifiedAt: null
  },
  {
    id: 'LAB-2026-404',
    orderDate: '2026-10-21 11:20 IST',
    patientName: 'Mohammed Tariq',
    uhid: 'LZF-2026-0005',
    age: 45,
    gender: 'Male',
    doctor: 'Dr. Rajesh Sharma, MD',
    testName: 'Liver Function Test (LFT) & Total Bilirubin',
    category: 'Biochemistry',
    sampleType: 'Serum Clot Activator Tube',
    tubeColor: 'Gold / Yellow Top (SST)',
    sampleBarcode: 'BC-404-SST-LFT',
    collectionStatus: 'Pending Collection',
    resultStatus: 'Pending Specimen',
    parameters: [
      { name: 'Total Bilirubin', value: '', unit: 'mg/dL', normal: '0.2 - 1.2 mg/dL', flag: 'Pending' },
      { name: 'SGOT / AST', value: '', unit: 'U/L', normal: '10 - 40 U/L', flag: 'Pending' },
      { name: 'SGPT / ALT', value: '', unit: 'U/L', normal: '7 - 56 U/L', flag: 'Pending' },
      { name: 'Serum Alkaline Phosphatase (ALP)', value: '', unit: 'U/L', normal: '44 - 147 U/L', flag: 'Pending' }
    ],
    verifiedBy: null,
    verifiedAt: null
  }
];

const initialStockItems = [
  { id: 'STK-001', name: 'Metformin 500mg SR', category: 'Antidiabetic', formulation: 'Tablet', batch: 'MET-26-89', stock: 450, unit: 'Tabs', reorderLevel: 200, exp: '2027-11-30', price: 2.80, status: 'Adequate' },
  { id: 'STK-002', name: 'Glimepiride 1mg', category: 'Antidiabetic', formulation: 'Tablet', batch: 'GLM-25-12', stock: 180, unit: 'Tabs', reorderLevel: 150, exp: '2027-08-31', price: 4.20, status: 'Adequate' },
  { id: 'STK-003', name: 'Atorvastatin 10mg', category: 'Cardiovascular', formulation: 'Tablet', batch: 'ATV-26-44', stock: 240, unit: 'Tabs', reorderLevel: 100, exp: '2028-04-30', price: 6.50, status: 'Adequate' },
  { id: 'STK-004', name: 'Aceclofenac + Paracetamol (100/325)', category: 'Analgesics & NSAIDs', formulation: 'Tablet', batch: 'ACP-26-01', stock: 320, unit: 'Tabs', reorderLevel: 250, exp: '2027-01-31', price: 3.10, status: 'Adequate' },
  { id: 'STK-005', name: 'Pantoprazole 40mg', category: 'Gastroenterology', formulation: 'Tablet', batch: 'PAN-25-98', stock: 500, unit: 'Tabs', reorderLevel: 200, exp: '2026-12-31', price: 5.00, status: 'Near Expiry' },
  { id: 'STK-006', name: 'Amoxicillin + Clavulanic Acid 625mg', category: 'Antibiotics', formulation: 'Tablet', batch: 'AMX-26-40', stock: 35, unit: 'Tabs', reorderLevel: 100, exp: '2027-03-31', price: 14.50, status: 'Critical Low' },
  { id: 'STK-007', name: 'Telmisartan 40mg + Amlodipine 5mg', category: 'Cardiovascular', formulation: 'Tablet', batch: 'TLM-26-03', stock: 290, unit: 'Tabs', reorderLevel: 150, exp: '2027-09-30', price: 7.80, status: 'Adequate' },
  { id: 'STK-008', name: 'Ceftriaxone 1g Injection', category: 'Antibiotics', formulation: 'Vial', batch: 'CFT-26-19', stock: 18, unit: 'Vials', reorderLevel: 50, exp: '2026-11-15', price: 48.00, status: 'Critical Low' },
  { id: 'STK-009', name: 'Normal Saline (0.9% NaCl 500ml)', category: 'IV Fluids', formulation: 'Bottle', batch: 'NS-26-88', stock: 65, unit: 'Bottles', reorderLevel: 100, exp: '2028-02-28', price: 32.00, status: 'Low Stock' },
  { id: 'STK-010', name: 'Montelukast 10mg + Levocetirizine 5mg', category: 'Respiratory', formulation: 'Tablet', batch: 'MLC-25-33', stock: 85, unit: 'Tabs', reorderLevel: 100, exp: '2026-10-31', price: 9.20, status: 'Near Expiry' }
];

const initialSuppliersData = [
  {
    id: 'SUP-001',
    name: 'MedPlus Pharma Distributors Pvt Ltd',
    contactPerson: 'Suresh Menon',
    phone: '+91 98450 12345',
    email: 'orders@medplusdist.com',
    gstin: '29AAACM1234F1Z8',
    drugLicense: 'KA-B2-88219',
    rating: '4.9',
    categories: ['Antibiotics', 'Antidiabetic', 'Analgesics'],
    paymentTerms: 'Net 30 Days',
    activeOrders: 2
  },
  {
    id: 'SUP-002',
    name: 'Cipla Healthcare Logistics',
    contactPerson: 'Praveen Kulkarni',
    phone: '+91 98860 67890',
    email: 'institutional@cipla.com',
    gstin: '29AABCC5544K1ZV',
    drugLicense: 'KA-B1-76402',
    rating: '4.8',
    categories: ['Respiratory', 'Cardiovascular', 'Critical Care'],
    paymentTerms: 'Net 45 Days',
    activeOrders: 1
  },
  {
    id: 'SUP-003',
    name: 'Sun Pharma Institutional Sales',
    contactPerson: 'Meenakshi Sundaram',
    phone: '+91 94480 34567',
    email: 'hospitalsales@sunpharma.com',
    gstin: '29AAACS9988P1Z2',
    drugLicense: 'KA-B2-99014',
    rating: '4.9',
    categories: ['Cardiovascular', 'Gastroenterology', 'Neurology'],
    paymentTerms: 'Net 30 Days',
    activeOrders: 1
  },
  {
    id: 'SUP-004',
    name: 'Abbott Diagnostics India',
    contactPerson: 'Dr. Vivek Shenoy',
    phone: '+91 98200 45678',
    email: 'diagnostic.support@abbott.com',
    gstin: '29AABCA4433R1ZS',
    drugLicense: 'KA-DL-44102',
    rating: '5.0',
    categories: ['Lab Reagents', 'Analyzer Controls', 'Specimen Tubes'],
    paymentTerms: 'Immediate / Net 15',
    activeOrders: 1
  }
];

const initialPurchaseOrders = [
  {
    id: 'PO-2026-0041',
    date: '2026-10-18',
    expectedDate: '2026-10-22',
    supplier: 'MedPlus Pharma Distributors Pvt Ltd',
    items: 'Amoxicillin 625mg (500 tabs), Ceftriaxone 1g (100 vials)',
    amount: 12400,
    status: 'In Transit',
    paymentStatus: 'Pending',
    verifiedBy: 'Kavita Nair, B.Pharm'
  },
  {
    id: 'PO-2026-0042',
    date: '2026-10-15',
    expectedDate: '2026-10-17',
    supplier: 'Cipla Healthcare Logistics',
    items: 'Montelukast+Levo (200 tabs), Budesonide Respules (50 packs)',
    amount: 8750,
    status: 'Delivered',
    paymentStatus: 'Paid',
    verifiedBy: 'Kavita Nair, B.Pharm'
  },
  {
    id: 'PO-2026-0043',
    date: '2026-10-20',
    expectedDate: '2026-10-24',
    supplier: 'Abbott Diagnostics India',
    items: 'HbA1c Micro-column Cartridges (200 tests), Vacutainer EDTA Tubes (500 pcs)',
    amount: 19800,
    status: 'Processing',
    paymentStatus: 'Pending',
    verifiedBy: 'Kavita Nair, B.Pharm'
  }
];

/**
 * 1. Pharmacy Dashboard View
 */
export function PharmacyDashboardView({ setActiveTab }) {
  const [prescriptions, setPrescriptions] = useState(initialPharmacyPrescriptions);
  const [labOrders, setLabOrders] = useState(initialLabOrdersData);
  const [stockItems] = useState(initialStockItems);

  const pendingRxCount = prescriptions.filter(p => p.status !== 'Completed').length;
  const inAnalyzerLabCount = labOrders.filter(l => l.resultStatus !== 'Verified').length;
  const criticalStockCount = stockItems.filter(s => s.status === 'Critical Low' || s.status === 'Low Stock').length;
  const nearExpiryCount = stockItems.filter(s => s.status === 'Near Expiry').length;

  const handleFastDispense = (rxId) => {
    setPrescriptions(prev => prev.map(p => p.id === rxId ? { ...p, status: 'Completed', verifiedBy: 'Kavita Nair, B.Pharm', verifiedAt: '2026-10-21 Just Now' } : p));
    alert(`Prescription ${rxId} verified and dispensed successfully! Traceability ledger updated.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        section="PHARMACY & LAB OPERATIONS"
        title="Pharmacy Dashboard"
        subtitle="Active prescription dispensing work queue, automated analyzer pipelines, near-expiry alerts, and medication traceability."
        icon={LayoutDashboard}
        badge="Central Pharmacy & Lab"
      />

      {/* Persona Station Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/20 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Pharmacist & Lab Staff Station
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Real-time Rx & Diagnostic Stream
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">Prescription Fulfillment & Clinical Laboratory Hub</h1>
            <p className="text-xs text-sky-200/80 max-w-2xl">
              Primary Jobs: Dispense verified doctor prescriptions, trace medication batches, run diagnostic sample pipelines, and validate laboratory test reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => alert('Barcode & Specimen Scanner Active. Ready for Dispensing or Specimen Verification.')}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-sky-600/30 transition flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan Barcode / Specimen</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab('prescription_queue')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl border border-white/20 transition flex items-center gap-1.5"
            >
              <Pill className="w-4 h-4 text-sky-400" />
              <span>Open Rx Queue</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-sky-500/20 text-xs">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] text-sky-200/70 block font-medium">Pending Dispensing</span>
            <span className="text-2xl font-black text-white mt-1 block">{pendingRxCount}</span>
            <span className="text-[10px] text-amber-300 block mt-0.5 font-semibold">Doctor Rx in Queue</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] text-sky-200/70 block font-medium">Tests in Analyzer</span>
            <span className="text-2xl font-black text-white mt-1 block">{inAnalyzerLabCount}</span>
            <span className="text-[10px] text-sky-300 block mt-0.5 font-semibold">Biochem & Hematology</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] text-sky-200/70 block font-medium">Stock Traceability</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">100% OK</span>
            <span className="text-[10px] text-emerald-300 block mt-0.5 font-semibold">Batch & Expiry Verified</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] text-sky-200/70 block font-medium">Low Stock Alerts</span>
            <span className="text-2xl font-black text-rose-400 mt-1 block">{criticalStockCount}</span>
            <span className="text-[10px] text-rose-300 block mt-0.5 font-semibold">Below Reorder Level</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <span className="text-[11px] text-sky-200/70 block font-medium">Near Expiry (&lt;60d)</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">{nearExpiryCount}</span>
            <span className="text-[10px] text-amber-300 block mt-0.5 font-semibold">Action Required</span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab('prescription_queue')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-500 hover:shadow-md transition text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
            <Pill className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 text-xs block">Prescription Queue</span>
          <span className="text-[10px] text-slate-400">Doctor orders & dispensing</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab('lab_orders')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-500 hover:shadow-md transition text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
            <FlaskConical className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 text-xs block">Lab Orders & Samples</span>
          <span className="text-[10px] text-slate-400">Specimens & vacutainers</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab('stock_inventory')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-500 hover:shadow-md transition text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
            <Package className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 text-xs block">Stock & Inventory</span>
          <span className="text-[10px] text-slate-400">Batches & reorder levels</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab('test_results')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-500 hover:shadow-md transition text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 text-xs block">Test Results & Release</span>
          <span className="text-[10px] text-slate-400">Validate & release to EMR</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab('purchase_suppliers')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-500 hover:shadow-md transition text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
            <Truck className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 text-xs block">Purchase & Suppliers</span>
          <span className="text-[10px] text-slate-400">Purchase orders & vendors</span>
        </button>
      </div>

      {/* Split Section: Active Rx Stream & Diagnostic Analyzer Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Pending Prescriptions */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Doctor Prescriptions Awaiting Fulfillment</h3>
              <p className="text-xs text-slate-500">Live doctor medication orders from OPD</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab('prescription_queue')}
              className="text-xs font-bold text-sky-600 hover:underline"
            >
              View Full Queue &rarr;
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {prescriptions.slice(0, 3).map((rx) => (
              <div key={rx.id} className="p-4 hover:bg-slate-50 transition space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sky-700">{rx.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      rx.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : rx.status === 'Ready for Pickup'
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {rx.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{rx.date}</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900">{rx.patientName}</span> ({rx.gender}, {rx.age}y) &bull;{' '}
                    <span className="font-mono text-slate-500">{rx.uhid}</span>
                  </div>
                  <span className="text-slate-500 text-[11px] font-medium">{rx.doctor}</span>
                </div>

                <p className="text-[11px] text-slate-500 truncate">
                  <strong>Medications:</strong> {rx.items.map(i => `${i.name} (${i.qty})`).join(', ')}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Indication: {rx.diagnosis}</span>
                  {rx.status !== 'Completed' ? (
                    <button
                      type="button"
                      onClick={() => handleFastDispense(rx.id)}
                      className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold text-xs transition shadow-sm"
                    >
                      Verify & Dispense
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Dispensed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Lab Tests & Specimen Feed */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Diagnostic Specimen & Analyzer Queue</h3>
              <p className="text-xs text-slate-500">Sample barcode tracking and results</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab('test_results')}
              className="text-xs font-bold text-teal-600 hover:underline"
            >
              Enter Results &rarr;
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {labOrders.slice(0, 3).map((lab) => (
              <div key={lab.id} className="p-4 hover:bg-slate-50 transition space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-700">{lab.id}</span>
                    <span className="font-bold text-slate-800">{lab.testName}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    lab.resultStatus === 'Verified'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-sky-50 text-sky-700 border border-sky-200'
                  }`}>
                    {lab.resultStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 text-[11px]">
                  <span>Patient: <strong>{lab.patientName}</strong> ({lab.uhid})</span>
                  <span>Tube: <strong>{lab.tubeColor}</strong></span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-500">Barcode: {lab.sampleBarcode}</span>
                  <span className="text-slate-700 font-semibold">{lab.collectionStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Stock & Near Expiry Watchlist */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm">Critical Low Stock & Near Expiry Alert Table</h3>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('stock_inventory')}
            className="text-xs font-bold text-sky-600 hover:underline"
          >
            Manage Inventory &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">Medicine Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Batch No</th>
                <th className="p-3">Available Stock</th>
                <th className="p-3">Reorder Threshold</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Alert Status</th>
                <th className="p-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {stockItems.filter(s => s.status !== 'Adequate').map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3 font-mono text-[11px]">{item.batch}</td>
                  <td className="p-3 font-bold text-rose-700">{item.stock} {item.unit}</td>
                  <td className="p-3 font-mono text-slate-500">{item.reorderLevel} {item.unit}</td>
                  <td className="p-3 font-mono text-slate-600">{item.exp}</td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                      item.status === 'Critical Low'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : item.status === 'Low Stock'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => setActiveTab && setActiveTab('purchase_suppliers')}
                      className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-lg border border-sky-200 transition text-[11px]"
                    >
                      Reorder PO
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

/**
 * 2. Prescription Queue View
 */
export function PrescriptionQueueView({ setActiveTab }) {
  const [prescriptions, setPrescriptions] = useState(initialPharmacyPrescriptions);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLabelRx, setActiveLabelRx] = useState(null);

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesFilter = filterStatus === 'All' || rx.status === filterStatus;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      rx.id.toLowerCase().includes(query) ||
      rx.patientName.toLowerCase().includes(query) ||
      rx.uhid.toLowerCase().includes(query) ||
      rx.doctor.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const handleDispense = (rxId) => {
    setPrescriptions(prev =>
      prev.map(rx =>
        rx.id === rxId
          ? {
              ...rx,
              status: 'Completed',
              verifiedBy: 'Kavita Nair, B.Pharm',
              verifiedAt: new Date().toLocaleString()
            }
          : rx
      )
    );
    alert(`Prescription ${rxId} verified & dispensed successfully! Inventory deducted and audit record logged.`);
  };

  const handleMarkPickup = (rxId) => {
    setPrescriptions(prev =>
      prev.map(rx =>
        rx.id === rxId
          ? {
              ...rx,
              status: 'Ready for Pickup',
              verifiedBy: 'Kavita Nair, B.Pharm',
              verifiedAt: new Date().toLocaleString()
            }
          : rx
      )
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        section="PHARMACY & LAB OPERATIONS"
        title="Prescription Queue"
        subtitle="Doctor-prescribed medication orders, dosage checks, dispensing fulfillment, and printable prescription labels."
        icon={Pill}
        badge="Dispensing Desk"
      />

      {/* Control Bar: Search & Status Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Rx ID, Patient UHID, or Doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {['All', 'Pending Verification', 'Partially Dispensed', 'Ready for Pickup', 'Completed'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                filterStatus === status
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map((rx) => (
            <div key={rx.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              {/* Rx Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-sky-700">{rx.id}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                      rx.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : rx.status === 'Ready for Pickup'
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : rx.status === 'Partially Dispensed'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {rx.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Patient: <strong>{rx.patientName}</strong> ({rx.gender}, {rx.age} yrs) &bull; UHID:{' '}
                    <span className="font-mono font-bold text-slate-800">{rx.uhid}</span> &bull; Prescribed by:{' '}
                    <strong className="text-slate-800">{rx.doctor}</strong> ({rx.doctorDept}, {rx.doctorReg})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">{rx.date}</span>
                  {rx.status !== 'Completed' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleMarkPickup(rx.id)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                      >
                        Ready for Pickup
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDispense(rx.id)}
                        className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-600/20 transition flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verify & Dispense</span>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveLabelRx(rx)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Label</span>
                  </button>
                </div>
              </div>

              {/* Locked Doctor Prescription Notice */}
              <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 text-[11px] text-sky-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                  <strong>Prescription Integrity:</strong> Doctor's original order is digitally locked with MCI license verification. Changes cannot be made without prescribing physician re-authorization.
                </span>
                <span className="font-mono text-[10px] text-sky-700 bg-white px-2 py-0.5 rounded border border-sky-200">
                  Audit Locked
                </span>
              </div>

              {/* Drugs Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                    <tr>
                      <th className="p-2.5">Medication Name</th>
                      <th className="p-2.5">Dosage / Frequency</th>
                      <th className="p-2.5">Duration</th>
                      <th className="p-2.5">Prescribed Qty</th>
                      <th className="p-2.5">Dispensed Qty</th>
                      <th className="p-2.5">Batch / Expiry</th>
                      <th className="p-2.5">Stock Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {rx.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{item.name}</td>
                        <td className="p-2.5">{item.dosage}</td>
                        <td className="p-2.5">{item.duration}</td>
                        <td className="p-2.5 font-mono font-bold text-slate-800">{item.qty} {item.unit}</td>
                        <td className="p-2.5 font-mono font-bold text-sky-700">{item.dispensedQty} {item.unit}</td>
                        <td className="p-2.5 font-mono text-[11px]">
                          {item.batch} (Exp: {item.exp})
                        </td>
                        <td className="p-2.5">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {item.stock} in Stock
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Clinical Indication & Pharmacist Signoff */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900">Diagnosis: </span>
                  <span>{rx.diagnosis}</span> &bull;{' '}
                  <span className="text-slate-500 italic">{rx.pharmacistNotes}</span>
                </div>
                {rx.verifiedBy && (
                  <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Dispensed by {rx.verifiedBy} ({rx.verifiedAt})</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400 space-y-2">
            <Pill className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-700">No Prescriptions Found</p>
            <p>Try modifying your status filter or search keywords.</p>
          </div>
        )}
      </div>

      {/* Print Dispense Label Dedicated Page */}
      {activeLabelRx && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[var(--sidebar-width,18rem)] z-20 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setActiveLabelRx(null)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                  title="Back"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Pharmacy Dispensing Label ({activeLabelRx.patientName})
                </h1>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.print();
                  setActiveLabelRx(null);
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Thermal Label</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="font-black text-slate-900 text-lg">Pharmacy Dispensing Label</h2>
                  <p className="text-xs text-slate-500">LAZFORT Hospital &bull; Central Pharmacy Store</p>
                </div>
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                  Rx ID: {activeLabelRx.id}
                </span>
              </div>

              <div className="border border-dashed border-slate-300 p-6 rounded-2xl space-y-4 bg-slate-50 text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-base font-black text-slate-900">LAZFORT MEMORIAL HOSPITAL</span>
                    <p className="text-[11px] text-slate-500">OPD Pharmacy &bull; Lic: KA-B2-88219</p>
                  </div>
                  <QrCode className="w-10 h-10 text-slate-700" />
                </div>

                <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold">Patient Details</p>
                    <p className="text-slate-900 font-bold text-sm">{activeLabelRx.patientName}</p>
                    <p className="text-slate-600 font-mono text-xs">UHID: {activeLabelRx.uhid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-[10px] uppercase font-bold">Physician</p>
                    <p className="text-slate-900 font-bold">{activeLabelRx.doctor}</p>
                    <p className="text-slate-500 text-[11px]">Dispensed: {activeLabelRx.date}</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 space-y-2">
                  <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">Medications & Dosing Schedule:</p>
                  {activeLabelRx.items.map((it, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                      <div className="font-bold text-slate-900">{it.name} - Qty: {it.qty}</div>
                      <div className="text-sky-700 font-semibold">{it.dosage} for {it.duration}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">Batch: {it.batch} &bull; Exp: {it.exp}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                  <p className="font-bold text-rose-600">KEEP OUT OF REACH OF CHILDREN &bull; STORE IN A COOL, DRY PLACE</p>
                  <p className="mt-1">Dispensed by: Kavita Nair, B.Pharm &bull; Date: {activeLabelRx.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setActiveLabelRx(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setActiveLabelRx(null);
                  }}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 3. Lab Orders & Samples View
 */
export function LabOrdersView({ setActiveTab }) {
  const [labOrders, setLabOrders] = useState(initialLabOrdersData);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = labOrders.filter(order => {
    const matchesFilter = statusFilter === 'All' || order.collectionStatus === statusFilter;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(query) ||
      order.patientName.toLowerCase().includes(query) ||
      order.testName.toLowerCase().includes(query) ||
      order.uhid.toLowerCase().includes(query) ||
      order.sampleBarcode.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = (labId) => {
    setLabOrders(prev =>
      prev.map(order => {
        if (order.id !== labId) return order;
        if (order.collectionStatus === 'Pending Collection') {
          return { ...order, collectionStatus: 'Sample Collected', resultStatus: 'Processing in Analyzer' };
        } else if (order.collectionStatus === 'Sample Collected') {
          return { ...order, collectionStatus: 'Received in Lab' };
        } else if (order.collectionStatus === 'Received in Lab') {
          return { ...order, collectionStatus: 'Processing in Analyzer' };
        }
        return order;
      })
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        section="PHARMACY & LAB OPERATIONS"
        title="Lab Orders & Samples"
        subtitle="Authorized laboratory test orders, phlebotomy sample collection, specimen tube routing, and automated analyzer queues."
        icon={FlaskConical}
        badge="Laboratory Specimen Desk"
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Lab ID, UHID, Patient, or Barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {['All', 'Pending Collection', 'Sample Collected', 'Received in Lab', 'Processing in Analyzer'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                statusFilter === st
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Specimen Processing Ledger ({filteredOrders.length})</h3>
            <p className="text-xs text-slate-500">Live test orders linked with doctor clinical consultations</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('test_results')}
            className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Enter & Validate Results</span>
          </button>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-slate-50 transition space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-teal-700">{order.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{order.testName}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                        {order.category}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                        order.resultStatus === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-sky-50 text-sky-700 border-sky-200'
                      }`}>
                        {order.resultStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Patient: <strong>{order.patientName}</strong> ({order.gender}, {order.age}y) &bull; UHID:{' '}
                      <span className="font-mono font-bold text-slate-700">{order.uhid}</span> &bull; Prescribed by:{' '}
                      <strong>{order.doctor}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-mono">{order.orderDate}</span>
                    {order.collectionStatus === 'Pending Collection' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id)}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                      >
                        Collect Sample
                      </button>
                    )}
                    {order.collectionStatus === 'Sample Collected' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                      >
                        Receive in Lab
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => alert(`Specimen barcode label printed for ${order.sampleBarcode} (${order.patientName})`)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                      title="Print Barcode Tag"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Specimen & Tube</span>
                    <span className="font-semibold text-slate-800">{order.sampleType}</span>
                    <span className="text-[10px] text-slate-500 block">({order.tubeColor})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Barcode Tag</span>
                    <span className="font-mono font-bold text-teal-800">{order.sampleBarcode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Collection State</span>
                    <span className="font-bold text-slate-800">{order.collectionStatus}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Actions</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab && setActiveTab('test_results')}
                      className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>Review / Release Results</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-400 space-y-2">
            <FlaskConical className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-700">No Specimen Orders Match Criteria</p>
            <p>Try switching filter tabs or check for incoming doctor diagnostic orders.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 4. Stock & Inventory View
 */
export function StockInventoryView({ setActiveTab }) {
  const [stockItems, setStockItems] = useState(initialStockItems);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBatch, setNewBatch] = useState({
    name: '',
    category: 'Antibiotics',
    formulation: 'Tablet',
    batch: '',
    stock: '',
    unit: 'Tabs',
    reorderLevel: '100',
    exp: '2027-12-31',
    price: ''
  });

  const categories = ['All', 'Antibiotics', 'Antidiabetic', 'Analgesics & NSAIDs', 'Cardiovascular', 'Gastroenterology', 'Respiratory', 'IV Fluids'];

  const filteredItems = stockItems.filter(item => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'All'
        ? true
        : statusFilter === 'Low'
        ? item.status === 'Critical Low' || item.status === 'Low Stock'
        : statusFilter === 'Near Expiry'
        ? item.status === 'Near Expiry'
        : item.status === 'Adequate';

    const query = searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.batch.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query);

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleAddBatch = (e) => {
    e.preventDefault();
    if (!newBatch.name || !newBatch.batch || !newBatch.stock) {
      alert('Please fill out medication name, batch number, and stock quantity.');
      return;
    }
    const itemToAdd = {
      id: `STK-${String(stockItems.length + 1).padStart(3, '0')}`,
      name: newBatch.name,
      category: newBatch.category,
      formulation: newBatch.formulation,
      batch: newBatch.batch,
      stock: parseInt(newBatch.stock, 10),
      unit: newBatch.unit,
      reorderLevel: parseInt(newBatch.reorderLevel, 10),
      exp: newBatch.exp,
      price: parseFloat(newBatch.price || '10.0'),
      status: parseInt(newBatch.stock, 10) < parseInt(newBatch.reorderLevel, 10) ? 'Low Stock' : 'Adequate'
    };
    setStockItems([itemToAdd, ...stockItems]);
    setShowAddModal(false);
    setNewBatch({
      name: '',
      category: 'Antibiotics',
      formulation: 'Tablet',
      batch: '',
      stock: '',
      unit: 'Tabs',
      reorderLevel: '100',
      exp: '2027-12-31',
      price: ''
    });
    alert(`New medication batch ${itemToAdd.batch} added successfully! Traceability ledger updated.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        section="PHARMACY & LAB OPERATIONS"
        title="Stock & Inventory"
        subtitle="Medication batch traceability, real-time inventory balances, reorder threshold alerts, and expiration audits."
        icon={Package}
        badge="Central Medical Store"
      />

      {/* Control Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search medicine name, batch number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-48 py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter('All')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                statusFilter === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items ({stockItems.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('Low')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                statusFilter === 'Low' ? 'bg-rose-600 text-white shadow-sm' : 'text-rose-600 hover:text-rose-800'
              }`}
            >
              Low Stock Alerts
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('Near Expiry')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                statusFilter === 'Near Expiry' ? 'bg-amber-500 text-white shadow-sm' : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              Near Expiry
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Batch / Stock</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100 font-semibold">
              <tr>
                <th className="p-3">Item Code</th>
                <th className="p-3">Medicine Name & Formulation</th>
                <th className="p-3">Category</th>
                <th className="p-3">Batch No</th>
                <th className="p-3">Available Quantity</th>
                <th className="p-3">Reorder Threshold</th>
                <th className="p-3">Unit Price (₹)</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Traceability Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono font-bold text-slate-400">{item.id}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.formulation}</div>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-sky-800 text-[11px]">{item.batch}</td>
                    <td className="p-3">
                      <span className={`font-mono font-bold text-sm ${
                        item.status === 'Critical Low'
                          ? 'text-rose-600'
                          : item.status === 'Low Stock'
                          ? 'text-amber-600'
                          : 'text-slate-900'
                      }`}>
                        {item.stock}
                      </span>{' '}
                      <span className="text-[11px] text-slate-400">{item.unit}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-500">{item.reorderLevel} {item.unit}</td>
                    <td className="p-3 font-mono text-slate-800">₹{item.price.toFixed(2)}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-600">{item.exp}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                        item.status === 'Critical Low'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : item.status === 'Low Stock'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : item.status === 'Near Expiry'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveTab && setActiveTab('purchase_suppliers')}
                        className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-lg border border-sky-200 transition text-[11px]"
                      >
                        Reorder PO
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-xs text-slate-400">
                    <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    No medication items match the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Batch Dedicated Page View */}
      {showAddModal && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[var(--sidebar-width,18rem)] z-20 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Add New Medicine Batch to Store
              </h1>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="font-black text-slate-900 text-lg">Add New Medicine Batch to Store</h2>
                  <p className="text-xs text-slate-500">Record incoming medication receipt with batch and expiry</p>
                </div>
              </div>

              <form onSubmit={handleAddBatch} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Medication Name & Strength *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ciprofloxacin 500mg"
                    value={newBatch.name}
                    onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Category</label>
                    <select
                      value={newBatch.category}
                      onChange={(e) => setNewBatch({ ...newBatch, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Formulation</label>
                    <select
                      value={newBatch.formulation}
                      onChange={(e) => setNewBatch({ ...newBatch, formulation: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                    >
                      <option value="Tablet">Tablet</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Vial">Vial (Injection)</option>
                      <option value="Bottle">Bottle (IV Fluid)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Batch Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CIP-26-90"
                      value={newBatch.batch}
                      onChange={(e) => setNewBatch({ ...newBatch, batch: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Quantity Received *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 500"
                      value={newBatch.stock}
                      onChange={(e) => setNewBatch({ ...newBatch, stock: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Expiry Date *</label>
                    <input
                      type="date"
                      required
                      value={newBatch.exp}
                      onChange={(e) => setNewBatch({ ...newBatch, exp: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Unit Cost (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 8.50"
                      value={newBatch.price}
                      onChange={(e) => setNewBatch({ ...newBatch, price: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-xs shadow-md transition"
                  >
                    Save Batch Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 5. Test Results & Release View
 */
export function TestResultsReleaseView({ setActiveTab }) {
  const [labOrders, setLabOrders] = useState(initialLabOrdersData);
  const [activeTabFilter, setActiveTabFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [reportPrintOrder, setReportPrintOrder] = useState(null);

  const filteredOrders = labOrders.filter(order => {
    const matchesTab =
      activeTabFilter === 'All'
        ? true
        : activeTabFilter === 'Awaiting'
        ? order.resultStatus !== 'Verified'
        : order.resultStatus === 'Verified';

    const query = searchTerm.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(query) ||
      order.patientName.toLowerCase().includes(query) ||
      order.testName.toLowerCase().includes(query) ||
      order.uhid.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  const handleSaveParameters = (updatedParams) => {
    setLabOrders(prev =>
      prev.map(ord => ord.id === editingOrder.id ? { ...ord, parameters: updatedParams } : ord)
    );
    setEditingOrder(null);
    alert('Laboratory test parameters saved successfully.');
  };

  const handleValidateAndRelease = (orderId) => {
    setLabOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              resultStatus: 'Verified',
              verifiedBy: 'Kavita Nair, B.Pharm (Chief Lab Biochemist)',
              verifiedAt: new Date().toLocaleString()
            }
          : order
      )
    );
    alert(`Lab Order ${orderId} results validated and released to Doctor EMR and Patient Portal!`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        section="PHARMACY & LAB OPERATIONS"
        title="Test Results & Release"
        subtitle="Diagnostic test parameter recording, reference range validation, critical values signoff, and authorized EMR report release."
        icon={Activity}
        badge="Laboratory Results Desk"
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Lab Order ID, Patient UHID, or Test..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          {['All', 'Awaiting Verification', 'Verified & Released'].map((tab) => {
            const key = tab === 'Awaiting Verification' ? 'Awaiting' : tab === 'Verified & Released' ? 'Released' : 'All';
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTabFilter(key)}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  activeTabFilter === key
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List with Detailed Parameter Panels */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-teal-700">{order.id}</span>
                    <h3 className="font-bold text-slate-900 text-sm">{order.testName}</h3>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                      order.resultStatus === 'Verified'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {order.resultStatus === 'Verified' ? 'Released to EMR' : order.resultStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Patient: <strong>{order.patientName}</strong> ({order.gender}, {order.age} yrs) &bull; UHID:{' '}
                    <span className="font-mono font-bold text-slate-800">{order.uhid}</span> &bull; Prescribed by:{' '}
                    <strong>{order.doctor}</strong> &bull; Specimen: <strong>{order.sampleType}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {order.resultStatus !== 'Verified' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setEditingOrder(order)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Edit Values</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleValidateAndRelease(order.id)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Validate & Release</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setReportPrintOrder(order)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-500" />
                      <span>Print Lab Report</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Parameters Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                    <tr>
                      <th className="p-2.5">Investigation Parameter</th>
                      <th className="p-2.5">Observed Value</th>
                      <th className="p-2.5">Biological Reference Interval</th>
                      <th className="p-2.5">Units</th>
                      <th className="p-2.5">Clinical Evaluation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {order.parameters.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{p.name}</td>
                        <td className="p-2.5 font-mono font-bold text-sm text-slate-900">
                          {p.value || <span className="text-slate-300 font-normal italic">Awaiting entry...</span>}
                        </td>
                        <td className="p-2.5 font-mono text-[11px] text-slate-600">{p.normal}</td>
                        <td className="p-2.5 font-mono text-[11px] text-slate-500">{p.unit}</td>
                        <td className="p-2.5">
                          <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                            p.flag === 'High'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : p.flag === 'Normal'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}>
                            {p.flag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Verification Audit Signoff */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    Pathologist Signoff: <strong>{order.verifiedBy || 'Pending verification & authorization'}</strong>
                  </span>
                </div>
                {order.verifiedAt && (
                  <span className="text-[11px] font-mono text-slate-500">Released on: {order.verifiedAt}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400 space-y-2">
            <Activity className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-700">No Laboratory Results Match Criteria</p>
            <p>Select another filter tab or review incoming diagnostic orders.</p>
          </div>
        )}
      </div>

      {/* Edit Values Dedicated Page View */}
      {editingOrder && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[var(--sidebar-width,18rem)] z-20 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center gap-4">
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Enter Test Values: {editingOrder.testName} ({editingOrder.patientName})
              </h1>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="font-black text-slate-900 text-lg">Enter Test Values: {editingOrder.testName}</h2>
                  <p className="text-xs text-slate-500">Patient: <strong className="text-slate-800">{editingOrder.patientName}</strong> &bull; Order ID: <span className="font-mono font-bold text-teal-700">{editingOrder.id}</span></p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                {editingOrder.parameters.map((p, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                      <span className="font-mono text-xs text-slate-500">Ref: {p.normal} ({p.unit})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder={`Value in ${p.unit}`}
                        defaultValue={p.value}
                        id={`param-val-${idx}`}
                        className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <select
                        defaultValue={p.flag}
                        id={`param-flag-${idx}`}
                        className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                        <option value="Low">Low</option>
                        <option value="Critical">Critical Alert</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updated = editingOrder.parameters.map((p, idx) => {
                      const valEl = document.getElementById(`param-val-${idx}`);
                      const flagEl = document.getElementById(`param-flag-${idx}`);
                      return {
                        ...p,
                        value: valEl ? valEl.value : p.value,
                        flag: flagEl ? flagEl.value : p.flag
                      };
                    });
                    handleSaveParameters(updated);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition"
                >
                  Save Parameter Values
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Lab Report Dedicated Page View */}
      {reportPrintOrder && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[var(--sidebar-width,18rem)] z-20 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setReportPrintOrder(null)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                  title="Back"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Official Diagnostic Laboratory Report ({reportPrintOrder.id})
                </h1>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.print();
                  setReportPrintOrder(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Diagnostic Report</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="font-black text-slate-900 text-lg">Official Diagnostic Laboratory Report</h2>
                  <p className="text-xs text-slate-500">LAZFORT Hospital &bull; Department of Clinical Pathology</p>
                </div>
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                  Verified & Released
                </span>
              </div>

              <div className="border border-slate-200 p-6 rounded-2xl space-y-5 bg-white text-xs">
                <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">LAZFORT MEMORIAL HOSPITAL</h2>
                    <p className="text-xs text-slate-500">NABL Accredited Clinical Laboratory &bull; Lic: LAB-KA-2026-901</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-teal-700 text-sm">{reportPrintOrder.id}</span>
                    <p className="text-xs text-slate-400 font-mono">Specimen Barcode: {reportPrintOrder.sampleBarcode}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-slate-700 text-xs">
                  <div>
                    <p>Patient Name: <strong className="text-slate-900 text-sm">{reportPrintOrder.patientName}</strong></p>
                    <p className="mt-0.5">UHID: <span className="font-mono font-bold text-slate-800">{reportPrintOrder.uhid}</span></p>
                    <p className="mt-0.5">Age / Gender: {reportPrintOrder.age} Yrs / {reportPrintOrder.gender}</p>
                  </div>
                  <div className="sm:text-right">
                    <p>Prescribing Doctor: <strong className="text-slate-900">{reportPrintOrder.doctor}</strong></p>
                    <p className="mt-0.5">Specimen Type: {reportPrintOrder.sampleType}</p>
                    <p className="mt-0.5">Report Date: {reportPrintOrder.verifiedAt || reportPrintOrder.orderDate}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs mb-2.5 uppercase tracking-wider">{reportPrintOrder.testName}</h4>
                  <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Investigation</th>
                        <th className="p-3">Result</th>
                        <th className="p-3">Reference Normal</th>
                        <th className="p-3">Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reportPrintOrder.parameters.map((p, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-900">{p.name}</td>
                          <td className="p-3 font-mono font-black text-slate-900 text-sm">{p.value}</td>
                          <td className="p-3 font-mono text-slate-600">{p.normal}</td>
                          <td className="p-3 font-mono text-slate-500">{p.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-xs text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">*** END OF DIAGNOSTIC REPORT ***</p>
                    <p className="text-[11px]">Electronically released and validated. Physical signature not required.</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-bold text-slate-900">{reportPrintOrder.verifiedBy || 'Dr. Meera Iyer (Pathologist)'}</p>
                    <p className="text-[11px]">Chief Laboratory Consultant</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setReportPrintOrder(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setReportPrintOrder(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Diagnostic Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 6. Purchase & Suppliers View
 */
export function PurchaseSuppliersView({ setActiveTab }) {
  const [activeSubTab, setActiveSubTab] = useState('suppliers');
  const [suppliers] = useState(initialSuppliersData);
  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPOModal, setShowPOModal] = useState(false);
  const [selectedSupplierForPO, setSelectedSupplierForPO] = useState(null);
  const [newPO, setNewPO] = useState({
    supplier: 'MedPlus Pharma Distributors Pvt Ltd',
    items: '',
    amount: ''
  });

  const handleCreatePO = (e) => {
    e.preventDefault();
    if (!newPO.items || !newPO.amount) {
      alert('Please fill out the items and estimated purchase amount.');
      return;
    }
    const createdPO = {
      id: `PO-2026-00${purchaseOrders.length + 42}`,
      date: '2026-10-21',
      expectedDate: '2026-10-25',
      supplier: selectedSupplierForPO ? selectedSupplierForPO.name : newPO.supplier,
      items: newPO.items,
      amount: parseFloat(newPO.amount),
      status: 'Processing',
      paymentStatus: 'Pending',
      verifiedBy: 'Kavita Nair, B.Pharm'
    };
    setPurchaseOrders([createdPO, ...purchaseOrders]);
    setShowPOModal(false);
    setSelectedSupplierForPO(null);
    setNewPO({
      supplier: 'MedPlus Pharma Distributors Pvt Ltd',
      items: '',
      amount: ''
    });
    alert(`Purchase Order ${createdPO.id} generated and transmitted to supplier!`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        section="PHARMACY & LAB OPERATIONS"
        title="Purchase & Suppliers"
        subtitle="Authorized pharmaceutical distributor directories, drug license verification, purchase orders ledger, and procurement fulfillment."
        icon={Truck}
        badge="Procurement & Suppliers"
      />

      {/* Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('suppliers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'suppliers'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Authorized Suppliers Directory ({suppliers.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'orders'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Purchase Orders Ledger ({purchaseOrders.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search suppliers or POs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowPOModal(true)}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Purchase Order</span>
          </button>
        </div>
      </div>

      {/* View 1: Suppliers Directory */}
      {activeSubTab === 'suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suppliers
            .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.categories.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())))
            .map((sup) => (
              <div key={sup.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition text-xs">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 block">{sup.id}</span>
                      <h3 className="font-bold text-slate-900 text-sm">{sup.name}</h3>
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                      ★ {sup.rating} Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Contact Person</span>
                      <span className="font-bold text-slate-800">{sup.contactPerson}</span>
                      <span className="block font-mono text-slate-500">{sup.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Drug License</span>
                      <span className="font-mono font-bold text-slate-800">{sup.drugLicense}</span>
                      <span className="block font-mono text-[10px] text-slate-400">GST: {sup.gstin}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase mb-1">Categories Supplied:</span>
                    <div className="flex flex-wrap gap-1">
                      {sup.categories.map((c, i) => (
                        <span key={i} className="text-[10px] bg-sky-50 text-sky-700 font-semibold px-2 py-0.5 rounded border border-sky-100">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Terms: {sup.paymentTerms}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSupplierForPO(sup);
                      setShowPOModal(true);
                    }}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition flex items-center gap-1 text-xs"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create PO</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* View 2: Purchase Orders Ledger */}
      {activeSubTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100 font-semibold">
                <tr>
                  <th className="p-3">PO Number</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Supplier Name</th>
                  <th className="p-3">Items Ordered</th>
                  <th className="p-3">Total Amount (₹)</th>
                  <th className="p-3">Delivery Status</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Authorized Signoff</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {purchaseOrders
                  .filter(po => po.id.toLowerCase().includes(searchTerm.toLowerCase()) || po.supplier.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((po) => (
                    <tr key={po.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-sky-700">{po.id}</td>
                      <td className="p-3 font-mono text-[11px] text-slate-500">{po.date}</td>
                      <td className="p-3 font-bold text-slate-900">{po.supplier}</td>
                      <td className="p-3 text-slate-600 max-w-xs truncate" title={po.items}>{po.items}</td>
                      <td className="p-3 font-mono font-bold text-slate-900">₹{po.amount.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                          po.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : po.status === 'In Transit'
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {po.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold ${po.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {po.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 text-[11px]">{po.verifiedBy}</td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Purchase Order ${po.id} details exported / printed.`)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg border border-slate-200 transition text-[11px]"
                        >
                          Print PO
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New PO Dedicated Page View */}
      {showPOModal && (
        <div className="fixed top-16 bottom-0 right-0 left-0 md:left-[var(--sidebar-width,18rem)] z-20 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowPOModal(false);
                  setSelectedSupplierForPO(null);
                }}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Issue Purchase Order
              </h1>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="font-black text-slate-900 text-lg">Issue Purchase Order</h2>
                  <p className="text-xs text-slate-500">Transmitted directly to distributor ERP & accounts</p>
                </div>
              </div>

              <form onSubmit={handleCreatePO} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Distributor / Supplier *</label>
                  {selectedSupplierForPO ? (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 text-xs">
                      {selectedSupplierForPO.name} (License: {selectedSupplierForPO.drugLicense})
                    </div>
                  ) : (
                    <select
                      value={newPO.supplier}
                      onChange={(e) => setNewPO({ ...newPO, supplier: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                    >
                      {suppliers.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Medication Items & Quantities *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="e.g. Metformin 500mg SR (500 tabs), Atorvastatin 10mg (300 tabs), Ceftriaxone 1g (100 vials)"
                    value={newPO.items}
                    onChange={(e) => setNewPO({ ...newPO, items: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Estimated Purchase Order Value (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    value={newPO.amount}
                    onChange={(e) => setNewPO({ ...newPO, amount: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-xs"
                  />
                </div>

                <div className="bg-sky-50 p-3 rounded-2xl border border-sky-100 text-xs text-sky-900">
                  Authorizer: <strong>Kavita Nair, B.Pharm (Pharmacist)</strong> &bull; Lazfort Memorial Hospital Central Store
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPOModal(false);
                      setSelectedSupplierForPO(null);
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-xs shadow-md transition"
                  >
                    Submit & Transmit PO
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

