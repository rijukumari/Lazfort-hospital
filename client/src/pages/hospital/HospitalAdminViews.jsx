import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import HospitalAdminProfile from './HospitalAdminProfile';
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Receipt,
  CreditCard,
  Building2,
  GitFork,
  Activity,
  SlidersHorizontal,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Search,
  PlusCircle,
  ArrowRight,
  ArrowLeft,
  Pill,
  FlaskConical,
  Package,
  Truck,
  HeartPulse,
  ClipboardList,
  ArrowLeftRight,
  Bell,
  Calendar,
  Printer,
  BookOpen,
  DollarSign,
  Download,
  Filter,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
  Stethoscope,
  Eye,
  UserPlus,
  Lock,
  Sparkles
} from 'lucide-react';

// ==========================================
// 1. ACCOUNT & PROFILE
// ==========================================
export function MyProfileView() {
  return <HospitalAdminProfile />;
}

// ==========================================
// 2. CLINICAL & DOCTOR VIEWS
// ==========================================
export function ClinicalRecordsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const records = [
    {
      id: 'CR-8921',
      uhid: 'LZF-2026-0001',
      patient: 'Ramesh Kumar',
      ageGender: '48 Y / Male',
      vitals: { bp: '130/85 mmHg', pulse: '76 bpm', temp: '98.4 °F', spo2: '99%' },
      doctor: 'Dr. Rajesh Sharma, MD',
      dept: 'General Medicine',
      license: 'MCI-18942',
      date: '2026-10-24',
      diagnosis: 'Type 2 Diabetes Mellitus, Essential HTN',
      clinicalNotes: 'Patient presents for routine follow-up. Fasting blood sugar slightly elevated at 142 mg/dL. HbA1c 7.1%. Blood pressure stable with current regimen. Advised dietary modifications, regular walking for 30 minutes daily.',
      medicines: [
        { name: 'Tab Metformin 500mg', dosage: '1 Tab Twice Daily (After meals)', duration: '30 Days', instructions: 'Take with breakfast and dinner' },
        { name: 'Tab Telmisartan 40mg', dosage: '1 Tab Once Daily (Morning)', duration: '30 Days', instructions: 'Take post breakfast' },
        { name: 'Tab Atorvastatin 10mg', dosage: '1 Tab Once Daily (Bedtime)', duration: '30 Days', instructions: 'Take before sleep' }
      ],
      investigations: 'Fasting Lipid Profile, Serum Creatinine, Urine Microalbumin',
      followUp: 'After 1 month with fresh lab reports',
      status: 'Finalized'
    },
    {
      id: 'CR-8920',
      uhid: 'LZF-2026-0014',
      patient: 'Sunita Mehra',
      ageGender: '29 Y / Female',
      vitals: { bp: '118/76 mmHg', pulse: '82 bpm', temp: '98.6 °F', spo2: '98%' },
      doctor: 'Dr. Ananya Roy, MS',
      dept: 'Gynecology & Obstetrics',
      license: 'MCI-22415',
      date: '2026-10-24',
      diagnosis: 'Antenatal Checkup - 28 Weeks',
      clinicalNotes: 'Routine third trimester antenatal visit. Fundal height corresponds to gestational age (28w). Fetal heart rate regular at 144 bpm. No complaints of pedal edema or headaches. Normal anomaly scan verified.',
      medicines: [
        { name: 'Tab Iron & Folic Acid (Autrin)', dosage: '1 Tab Once Daily (After lunch)', duration: '60 Days', instructions: 'Do not take with tea or milk' },
        { name: 'Tab Calcium Carbonate 500mg', dosage: '1 Tab Once Daily (After dinner)', duration: '60 Days', instructions: 'Ensure adequate water intake' }
      ],
      investigations: 'Repeat CBC, OGTT (75g Glucose), Ultrasound Growth Scan at 32 weeks',
      followUp: '2 weeks for routine antenatal review',
      status: 'Finalized'
    },
    {
      id: 'CR-8919',
      uhid: 'LZF-2026-0032',
      patient: 'Deepak Varma',
      ageGender: '56 Y / Male',
      vitals: { bp: '124/80 mmHg', pulse: '74 bpm', temp: '98.2 °F', spo2: '99%' },
      doctor: 'Dr. Vikram Malhotra, DNB',
      dept: 'Orthopedics',
      license: 'MCI-19803',
      date: '2026-10-23',
      diagnosis: 'Left Knee Osteoarthritis Grade II',
      clinicalNotes: 'Left knee medial joint line tenderness. Crepitus present on passive flexion. Plain radiograph shows mild joint space narrowing. No joint effusion or ligamentous instability.',
      medicines: [
        { name: 'Tab Aceclofenac + Paracetamol (100/325)', dosage: '1 Tab SOS (After food)', duration: '7 Days', instructions: 'Use only when pain is severe' },
        { name: 'Tab Glucosamine + Chondroitin', dosage: '1 Tab Daily', duration: '60 Days', instructions: 'Nutritional cartilage support' },
        { name: 'Topical Diclofenac Gel 1%', dosage: 'Apply locally 3 times daily', duration: '14 Days', instructions: 'Gentle massage over medial knee' }
      ],
      investigations: 'X-Ray Left Knee AP & Lateral Weight-bearing',
      followUp: 'Physiotherapy quadriceps strengthening, review in 3 weeks',
      status: 'Finalized'
    },
    {
      id: 'CR-8918',
      uhid: 'LZF-2026-0045',
      patient: 'Ayesha Khan',
      ageGender: '6 Y / Female',
      vitals: { bp: '95/60 mmHg', pulse: '98 bpm', temp: '100.2 °F', spo2: '98%' },
      doctor: 'Dr. Priya Desai, MD',
      dept: 'Pediatrics',
      license: 'MCI-31209',
      date: '2026-10-23',
      diagnosis: 'Acute Bronchitis & Viral Fever',
      clinicalNotes: 'Cough, mild wheeze on auscultation, low-grade intermittent fever for 3 days. Throat mildly congested, bilateral chest clear of consolidations. Child alert and well-hydrated.',
      medicines: [
        { name: 'Syp Paracetamol 250mg/5ml', dosage: '5 ml SOS (Max 4 times/day)', duration: '3 Days', instructions: 'For fever > 100°F' },
        { name: 'Syp Levocetirizine + Montelukast', dosage: '2.5 ml at bedtime', duration: '5 Days', instructions: 'Anti-allergic for night cough' },
        { name: 'Saline Nasal Drops', dosage: '2 drops in each nostril TID', duration: '5 Days', instructions: 'Relieve nasal congestion' }
      ],
      investigations: 'None required currently unless fever persists beyond 5 days',
      followUp: 'SOS if breathing difficulty, or routine review in 4 days',
      status: 'Finalized'
    }
  ];

  const filtered = records.filter(r => 
    r.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.uhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrintRx = (item) => {
    setSelectedRecord(item);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-sky-950 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-sky-400" />
            <span className="text-xs uppercase tracking-widest text-sky-300 font-bold">EMR Repository</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Clinical Records & E-Prescriptions</h2>
          <p className="text-xs text-sky-100/70 mt-1">NABH Compliant digital outpatient consultation archive</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by UHID, patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 text-white placeholder-sky-200/50 pl-9 pr-4 py-2 rounded-xl text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Record ID</th>
                <th className="p-4">Patient / UHID</th>
                <th className="p-4">Attending Doctor</th>
                <th className="p-4">Clinical Diagnosis</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-mono font-bold text-sky-600">{item.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{item.patient}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.uhid}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{item.doctor}</div>
                    <div className="text-[11px] text-slate-400">{item.dept}</div>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{item.diagnosis}</td>
                  <td className="p-4 text-slate-500">{item.date}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Check className="w-3 h-3" />
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center justify-end gap-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedRecord(item)}
                        className="px-3 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold rounded-xl transition inline-flex items-center gap-1.5 border border-sky-200/60 shadow-xs hover:shadow-sm"
                        title="View Prescription Details"
                      >
                        <Eye className="w-3.5 h-3.5 text-sky-600" />
                        <span>View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePrintRx(item)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold rounded-xl transition inline-flex items-center gap-1.5 border border-slate-200/80 shadow-xs hover:shadow-sm"
                        title="Print Prescription (Rx)"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" />
                        <span>Print Rx</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DIGITAL E-PRESCRIPTION MODAL / DEDICATED VIEW ── */}
      {selectedRecord && (
        <div className="fixed top-0 bottom-0 right-0 left-0 lg:left-[var(--sidebar-width,18rem)] z-50 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
            {/* Header with Back and Print Button */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center justify-between no-print">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                  title="Back to Clinical Records"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Clinical Record & E-Prescription
                  </h1>
                  <span className="text-xs text-slate-500 font-mono font-medium">
                    {selectedRecord.id} &bull; {selectedRecord.patient} &bull; UHID: {selectedRecord.uhid}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-600/25 transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Prescription</span>
                </button>
              </div>
            </div>

            {/* Printable Prescription Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6 text-slate-800">
              {/* Hospital Header Banner */}
              <div className="flex items-start justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-md shadow-sky-600/30">
                    LZ
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-xl tracking-tight">LAZFORT MEMORIAL HOSPITAL</h2>
                    <p className="text-xs text-slate-500 font-medium">Outpatient Department &bull; NABH Accredited Healthcare Center</p>
                    <p className="text-[11px] text-slate-400">Indiranagar, Bengaluru &bull; Phone: +91 80 4920 1100 &bull; E-Prescription</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    {selectedRecord.id}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1 font-mono">Date: {selectedRecord.date}</span>
                </div>
              </div>

              {/* Patient & Doctor Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-xs">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Patient Details</span>
                  <div className="text-sm font-extrabold text-slate-900">{selectedRecord.patient}</div>
                  <div className="text-slate-600 font-medium">
                    <span className="font-mono text-slate-700">UHID: {selectedRecord.uhid}</span> &bull; Age/Sex: {selectedRecord.ageGender}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    Vitals: BP: <strong className="text-slate-800">{selectedRecord.vitals.bp}</strong> | Pulse: <strong className="text-slate-800">{selectedRecord.vitals.pulse}</strong> | SpO2: <strong className="text-slate-800">{selectedRecord.vitals.spo2}</strong>
                  </div>
                </div>

                <div className="sm:text-right space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Attending Consultant</span>
                  <div className="text-sm font-extrabold text-slate-900">{selectedRecord.doctor}</div>
                  <div className="text-slate-600 font-medium">{selectedRecord.dept} &bull; Reg: {selectedRecord.license}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold pt-1">Status: Consultation Finalized & Signed</div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Provisional / Clinical Diagnosis</span>
                <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200/70 font-bold text-sky-950 text-sm">
                  {selectedRecord.diagnosis}
                </div>
              </div>

              {/* Clinical Notes */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Doctor's Clinical Examination & Notes</span>
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                  {selectedRecord.clinicalNotes}
                </p>
              </div>

              {/* Rx Medication Table */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                    Rx
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Prescription Medication (Digital OPD Rx)</h3>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Medicine & Strength</th>
                        <th className="p-3">Dosage & Frequency</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedRecord.medicines.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="p-3 font-mono font-bold text-slate-400">{idx + 1}</td>
                          <td className="p-3 font-bold text-slate-900">{m.name}</td>
                          <td className="p-3 font-medium text-slate-700">{m.dosage}</td>
                          <td className="p-3 font-medium text-slate-600">{m.duration}</td>
                          <td className="p-3 text-slate-500">{m.instructions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Investigations & Follow-Up */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Investigations & Tests Ordered</span>
                  <p className="font-medium text-slate-800">{selectedRecord.investigations}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Diet / Lifestyle & Next Review</span>
                  <p className="font-medium text-slate-800">{selectedRecord.followUp}</p>
                </div>
              </div>

              {/* Digital Signature & Footer */}
              <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-700">Electronically verified via Lazfort Hospital EMR</p>
                  <p className="text-[11px] text-slate-400">NABH Standard OPD Form &bull; Valid with registered digital practitioner signature</p>
                </div>
                <div className="text-center sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
                  <div className="font-serif italic font-bold text-base text-slate-800">{selectedRecord.doctor}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Digitally Signed on {selectedRecord.date}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function MyPatientsView({ onStartConsultation }) {
  const patients = [
    { token: 'T-04', uhid: 'LZF-2026-0001', name: 'Ramesh Kumar', age: 48, gender: 'Male', complaint: 'Diabetes routine checkup & fasting glucose review', bp: '130/85', pulse: '76', waitTime: '12 min', status: 'Ready' },
    { token: 'T-07', uhid: 'LZF-2026-0018', name: 'Priya Sharma', age: 34, gender: 'Female', complaint: 'Persistent dry cough for 2 weeks & fatigue', bp: '118/76', pulse: '82', waitTime: '5 min', status: 'In Triage' },
    { token: 'T-09', uhid: 'LZF-2026-0027', name: 'Mohammed Farooq', age: 62, gender: 'Male', complaint: 'Hypertension follow-up & chest tightness on exertion', bp: '148/92', pulse: '88', waitTime: 'Just Arrived', status: 'Checked In' }
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-6 text-white shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="absolute inset-0 flex items-center opacity-10 pointer-events-none overflow-hidden">
          <svg className="w-full h-24 stroke-sky-400 fill-none" preserveAspectRatio="none" viewBox="0 0 1200 100">
            <path d="M0,50 L200,50 L220,20 L230,80 L240,10 L250,90 L260,50 L500,50 L520,20 L530,80 L540,10 L550,90 L560,50 L800,50 L820,20 L830,80 L840,10 L850,90 L860,50 L1200,50" strokeWidth="2" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full font-bold">Doctor OPD Workspace</span>
          <h2 className="text-2xl font-black mt-2 text-white">My Waiting OPD Patients</h2>
          <p className="text-xs text-sky-200/70 mt-1">Live queue assigned to your consultation chamber today</p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="px-5 py-2.5 bg-slate-900/70 rounded-2xl border border-sky-500/30 text-center shadow-inner">
            <span className="text-[10px] uppercase text-sky-300 font-bold block">Queue Length</span>
            <span className="text-xl font-black text-white">{patients.length} Waiting</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {patients.map((p) => (
          <div key={p.token} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-mono font-black text-xs rounded-full">
                  Token #{p.token}
                </span>
                <span className="text-xs font-semibold text-slate-400">{p.waitTime}</span>
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">{p.name}</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{p.uhid} &bull; {p.age}y / {p.gender}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">Chief Complaint:</div>
                <div className="text-slate-600 leading-relaxed">{p.complaint}</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 bg-sky-50 text-sky-700 font-bold rounded-lg border border-sky-100">
                  BP: {p.bp}
                </span>
                <span className="px-2.5 py-1 bg-rose-50 text-rose-700 font-bold rounded-lg border border-rose-100">
                  Pulse: {p.pulse} bpm
                </span>
              </div>
            </div>

            <button
              onClick={() => onStartConsultation && onStartConsultation(p)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Start Consultation</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DoctorProfileTimingsView() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-800 to-indigo-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Doctor Profile & OPD Chamber Timings</h2>
        <p className="text-xs text-sky-200/80 mt-1">Configure your weekly clinic hours, consultation room, and appointment slot duration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-600" />
            <span>Weekly OPD Consultation Schedule</span>
          </h3>
          <div className="space-y-3 text-xs">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div key={day} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800">{day}</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  09:00 AM – 01:30 PM &bull; 04:30 PM – 07:30 PM
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-sky-600" />
            <span>Clinic & Tariff Configuration</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-slate-600">Assigned Chamber / Room</span>
              <span className="font-bold text-slate-900">OPD Chamber #204 (First Floor)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-slate-600">Standard OPD Consultation Fee</span>
              <span className="font-bold text-emerald-700 font-mono">₹600.00</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-slate-600">Average Consultation Duration</span>
              <span className="font-bold text-slate-900">15 minutes / patient</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-slate-600">Max OPD Tokens / Session</span>
              <span className="font-bold text-slate-900">25 patients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DoctorLeaveAvailabilityView() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-700 to-orange-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Doctor Leave & On-Call Availability</h2>
        <p className="text-xs text-amber-100/80 mt-1">Manage scheduled leaves, emergency on-call swaps, and locum coverage</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-black text-slate-900 text-sm">Upcoming Planned Leaves</h3>
            <p className="text-xs text-slate-400">Tokens are automatically blocked during approved leave periods</p>
          </div>
          <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4" />
            Apply For Leave
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900">Annual Medical Conference (CardioPulse 2026)</span>
              <p className="text-slate-500 mt-0.5">Nov 12, 2026 – Nov 15, 2026 &bull; Locum Cover: Dr. Ananya Roy</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[11px] self-start sm:self-auto">
              Approved by Admin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DoctorNotificationsView() {
  const notifs = [
    { id: 1, title: 'Urgent STAT Lab Report Ready', desc: 'HbA1c & Fasting Glucose results for Ramesh Kumar (LZF-2026-0001) released by Central Lab.', time: '10 min ago', unread: true },
    { id: 2, title: 'New OPD Patient Checked In', desc: 'Token #T-07 has arrived at nursing triage station.', time: '25 min ago', unread: true },
    { id: 3, title: 'Department Monthly Audit Meeting', desc: 'Clinical Governance review scheduled tomorrow at 08:30 AM in Conference Room A.', time: '2 hours ago', unread: false }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black">Doctor Operational Alerts & Notifications</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time alerts for critical lab values, patient check-ins and hospital memos</p>
        </div>
        <span className="px-3 py-1 bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold text-xs rounded-full">
          2 Unread Alerts
        </span>
      </div>

      <div className="space-y-3">
        {notifs.map(n => (
          <div key={n.id} className={`p-4 rounded-2xl border transition flex items-start gap-3 ${n.unread ? 'bg-sky-50/50 border-sky-200' : 'bg-white border-slate-200'}`}>
            <Bell className={`w-5 h-5 shrink-0 mt-0.5 ${n.unread ? 'text-sky-600' : 'text-slate-400'}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs">{n.title}</h4>
                <span className="text-[11px] text-slate-400">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. FRONT DESK & RECEPTION VIEWS
// ==========================================
export function PatientSearchView({ setActiveTab }) {
  const [query, setQuery] = useState('');
  const patients = [
    { uhid: 'LZF-2026-0001', name: 'Ramesh Kumar', phone: '+91 98450 11223', age: 48, gender: 'Male', city: 'Indiranagar, Bengaluru', regDate: '2026-01-10' },
    { uhid: 'LZF-2026-0002', name: 'Sunita Mehra', phone: '+91 98450 44556', age: 34, gender: 'Female', city: 'Koramangala, Bengaluru', regDate: '2026-02-14' },
    { uhid: 'LZF-2026-0003', name: 'Deepak Varma', phone: '+91 98450 77889', age: 52, gender: 'Male', city: 'Whitefield, Bengaluru', regDate: '2026-03-01' }
  ];

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.uhid.toLowerCase().includes(query.toLowerCase()) ||
    p.phone.includes(query)
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">Front Desk Operations</span>
          <h2 className="text-2xl font-black mt-1">Patient Master Search & Duplicate Check</h2>
          <p className="text-xs text-sky-200/70 mt-1">Lookup existing registered UHIDs by phone number, name, or national ID</p>
        </div>
        <button
          onClick={() => setActiveTab && setActiveTab('patients')}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>New Patient Registration</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Type patient name, UHID (e.g. LZF-2026-0001), or mobile number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
          />
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {filtered.map(p => (
            <div key={p.uhid} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 p-3 rounded-2xl transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-sm">{p.name}</span>
                  <span className="font-mono text-[11px] px-2 py-0.5 bg-sky-50 text-sky-700 font-bold rounded-md border border-sky-100">
                    {p.uhid}
                  </span>
                </div>
                <div className="text-slate-500 flex flex-wrap items-center gap-3 text-[11px]">
                  <span>Phone: <b className="text-slate-700">{p.phone}</b></span>
                  <span>Age: <b className="text-slate-700">{p.age}y / {p.gender}</b></span>
                  <span>Address: <b className="text-slate-700">{p.city}</b></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab && setActiveTab('appointments')}
                  className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition shadow-sm text-xs"
                >
                  Book OPD Visit
                </button>
                <button
                  onClick={() => setActiveTab && setActiveTab('billing')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs"
                >
                  Create Bill
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PaymentsReceiptsView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-6 text-white shadow-2xl">
        <span className="text-[10px] uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full font-bold">Billing Desk</span>
        <h2 className="text-2xl font-black mt-2 text-white">Payments & Money Receipts</h2>
        <p className="text-xs text-sky-200/70 mt-1">Issue official computer-generated receipts for OPD consultations & registrations</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-black text-slate-900 text-sm">Today's Front Desk Receipts</h3>
        <div className="space-y-3 text-xs">
          {[
            { id: 'RCP-2026-901', patient: 'Ramesh Kumar', amount: '₹600.00', mode: 'UPI / PhonePe', time: '09:42 AM', head: 'Doctor Consultation' },
            { id: 'RCP-2026-902', patient: 'Sunita Mehra', amount: '₹850.00', mode: 'Cash', time: '10:15 AM', head: 'OPD Consult + Blood Sugar' },
            { id: 'RCP-2026-903', patient: 'Deepak Varma', amount: '₹1,200.00', mode: 'Credit Card', time: '10:50 AM', head: 'Ortho Consultation + Knee X-Ray' }
          ].map((r) => (
            <div key={r.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">{r.patient} &bull; <span className="font-mono text-sky-600">{r.id}</span></div>
                <div className="text-slate-500 text-[11px] mt-0.5">{r.head} &bull; Mode: {r.mode} &bull; {r.time}</div>
              </div>
              <div className="text-right">
                <span className="font-black text-emerald-700 text-sm font-mono block">{r.amount}</span>
                <button className="text-[11px] text-sky-600 font-bold hover:underline inline-flex items-center gap-1 mt-0.5">
                  <Printer className="w-3 h-3" />
                  Print Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. NURSING & TRIAGE VIEWS
// ==========================================
export function NurseDashboardView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-5 sm:p-6 lg:p-7 text-white shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 font-extrabold px-3 py-1 rounded-full">
              OPD Nursing Station
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
              Nurse Triage &amp; Clinical Vitals Dashboard
            </h2>
            <p className="text-xs text-sky-200/80 leading-relaxed">
              Rapid vitals acquisition, patient triage routing, and doctor handoffs
            </p>
          </div>
          <button
            onClick={() => setActiveTab && setActiveTab('nurse_station')}
            className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0"
          >
            <HeartPulse className="w-4 h-4 text-sky-600" />
            <span>Launch Triage Station</span>
          </button>
        </div>
      </div>

      {/* 3 Stat Cards Row Below Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Waiting For Vitals</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 block tracking-tight font-mono">5 Patients</span>
          <span className="text-[10px] text-amber-600 font-medium block">Lobby triage queue</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Triaged &amp; Sent to Doctor</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 block tracking-tight font-mono">14 Completed</span>
          <span className="text-[10px] text-emerald-600 font-medium block">100% Vitals captured</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">High Priority / Urgent</span>
          <span className="text-2xl sm:text-3xl font-black text-rose-600 block tracking-tight font-mono">1 Patient</span>
          <span className="text-[10px] text-rose-600 font-medium block">Immediate doctor alert</span>
        </div>
      </div>
    </div>
  );
}

export function AssignedPatientsView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-rose-950 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Patients Assigned to Nursing Care</h2>
        <p className="text-xs text-slate-300 mt-1">Monitor vital signs stabilization, nebulization, and ECG recordings</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">All patients in active observation are documented with immutable timestamps.</p>
      </div>
    </div>
  );
}

export function CareTasksView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-rose-800 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Nursing Care Tasks & Orders</h2>
        <p className="text-xs text-rose-100/70 mt-1">Pending injections, wound dressings, and blood draws ordered by OPD doctors</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3 text-xs">
        {[
          { task: 'Administer Tetanus Toxoid (TT) 0.5ml IM', patient: 'Deepak Varma (LZF-2026-0032)', doctor: 'Dr. Vikram Malhotra', status: 'Pending' },
          { task: 'Random Blood Glucose (Fingerstick)', patient: 'Ramesh Kumar (LZF-2026-0001)', doctor: 'Dr. Rajesh Sharma', status: 'Done' }
        ].map((t, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">{t.task}</span>
              <p className="text-slate-500 mt-0.5">{t.patient} &bull; Ordered by: {t.doctor}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${t.status === 'Done' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShiftHandoverView() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Nursing Shift Handover Log</h2>
        <p className="text-xs text-slate-400 mt-1">Formal shift sign-off and critical patient handoff notes</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Shift handoff active. Morning Shift: Sister Marykutty Joseph &bull; Relieving Nurse: Sister Sunita Rao</p>
      </div>
    </div>
  );
}

export function NurseNotificationsView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Nursing Triage Alerts</h2>
        <p className="text-xs text-slate-400 mt-1">Real-time alerts from reception desk and consultation chambers</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">All nursing notifications are up to date.</p>
      </div>
    </div>
  );
}

// ==========================================
// 5. BILLING & FINANCE VIEWS
// ==========================================
export function BillingDashboardView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-5 sm:p-6 lg:p-7 text-white shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 font-extrabold px-3 py-1 rounded-full">
              Billing &amp; Cashier Operations
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
              Hospital Revenue &amp; Invoicing Command
            </h2>
            <p className="text-xs text-sky-200/80 leading-relaxed">
              Real-time settlement, digital receipts, tariffs &amp; cashier reconciliation
            </p>
          </div>
          <button
            onClick={() => setActiveTab && setActiveTab('billing')}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/30 transition transform hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Receipt className="w-4 h-4" />
            <span>Open Invoicing Desk</span>
          </button>
        </div>
      </div>

      {/* 3 Stat Cards Row Below Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Billed Today</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block tracking-tight font-mono">₹18,450.00</span>
          <span className="text-[10px] text-sky-600 font-medium block">Official tariff total</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Collected Cash / UPI</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 block tracking-tight font-mono">₹16,200.00</span>
          <span className="text-[10px] text-emerald-600 font-medium block">100% Settled</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Balance Outstanding</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 block tracking-tight font-mono">₹2,250.00</span>
          <span className="text-[10px] text-amber-600 font-medium block">Pending clearance</span>
        </div>
      </div>
    </div>
  );
}

export function PaymentsRefundsView() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-amber-950 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Payments & Authorized Refunds</h2>
        <p className="text-xs text-amber-200/70 mt-1">Strict double-entry audit trail for all cancellations and refunds</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">No pending refund requests. All cashier transactions reconciled with bank terminal.</p>
      </div>
    </div>
  );
}

export function RevenueCollectionsView() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-6 text-white shadow-2xl">
        <span className="text-[10px] uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full font-bold">Revenue Analytics</span>
        <h2 className="text-2xl font-black mt-2 text-white">Departmental Revenue & Collections</h2>
        <p className="text-xs text-sky-200/70 mt-1">Daily revenue distribution by OPD, Pharmacy, and Diagnostics</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase block">OPD Consultations</span>
          <span className="text-xl font-black text-slate-900 mt-2 block font-mono">₹10,800.00</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase block">Pharmacy Sales</span>
          <span className="text-xl font-black text-slate-900 mt-2 block font-mono">₹5,400.00</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs text-slate-500 font-bold uppercase block">Diagnostic Tests</span>
          <span className="text-xl font-black text-slate-900 mt-2 block font-mono">₹2,250.00</span>
        </div>
      </div>
    </div>
  );
}

export function InvoiceLedgerView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black">Invoice Master Ledger</h2>
          <p className="text-xs text-slate-400 mt-1">Complete chronological listing of all issued hospital bills</p>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Ledger entries are locked against modification to ensure full compliance with financial audit rules.</p>
      </div>
    </div>
  );
}

export function ReceiptsReportsView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Cashier Day-End Settlement Reports</h2>
        <p className="text-xs text-slate-400 mt-1">Daily shift reconciliation, cash count handover, and digital batch settlement</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Day-end report generator ready. All transactions balanced for current cashier session.</p>
      </div>
    </div>
  );
}

export function BillingNotificationsView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Billing & TPA Insurance Alerts</h2>
        <p className="text-xs text-slate-400 mt-1">Real-time alerts for pre-authorization approvals and pending balances</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">No pending billing alerts at this time.</p>
      </div>
    </div>
  );
}

// ==========================================
// 6. PHARMACY & DIAGNOSTIC LAB VIEWS
// ==========================================
export function PharmacyDashboardView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-5 sm:p-6 lg:p-7 text-white shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 font-extrabold px-3 py-1 rounded-full">
              Hospital Pharmacy &amp; Lab
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
              Pharmacy &amp; Diagnostic Operations Panel
            </h2>
            <p className="text-xs text-sky-200/80 leading-relaxed">
              Doctor e-prescription dispensation, lab sample intake &amp; test release
            </p>
          </div>
          <button
            onClick={() => setActiveTab && setActiveTab('pharmacy_lab')}
            className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Pill className="w-4 h-4 text-sky-600" />
            <span>Launch Dispensation Desk</span>
          </button>
        </div>
      </div>

      {/* 3 Stat Cards Row Below Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Prescriptions Awaiting Dispensation</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 block tracking-tight font-mono">4 Pending</span>
          <span className="text-[10px] text-amber-600 font-medium block">Pharmacy work queue</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Lab Tests in Progress</span>
          <span className="text-2xl sm:text-3xl font-black text-sky-600 block tracking-tight font-mono">7 Samples</span>
          <span className="text-[10px] text-sky-600 font-medium block">In analyzer run</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Stock Items Below Reorder</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 block tracking-tight font-mono">2 Drugs</span>
          <span className="text-[10px] text-amber-600 font-medium block">Reorder threshold</span>
        </div>
      </div>
    </div>
  );
}

export function PrescriptionQueueView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-6 text-white shadow-2xl">
        <span className="text-[10px] uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full font-bold">Pharmacy Dispensation</span>
        <h2 className="text-2xl font-black mt-2 text-white">Live Prescription Dispensation Queue</h2>
        <p className="text-xs text-sky-200/70 mt-1">Direct digital transmission from doctor consultation rooms</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Queue active. Automatic stock deduction occurs upon barcode confirmation.</p>
      </div>
    </div>
  );
}

export function LabOrdersView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Clinical Laboratory Orders & Sample Barcodes</h2>
        <p className="text-xs text-sky-200/70 mt-1">Sample collection tracking, analyzer interface & specimen verification</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Central lab operational. All samples processed with double barcoded identifiers.</p>
      </div>
    </div>
  );
}

export function StockInventoryView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Pharmacy Stock & Batch Expiry Management</h2>
        <p className="text-xs text-slate-400 mt-1">FEFO (First Expired First Out) stock management and reorder triggers</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Stock audit current. Zero near-expiry medications in active dispensary.</p>
      </div>
    </div>
  );
}

export function TestResultsReleaseView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Diagnostic Results Verification & Release</h2>
        <p className="text-xs text-slate-400 mt-1">Pathologist verification and digital release to patient health portal</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Reports verified by Chief Pathologist are instantly accessible via patient UHID.</p>
      </div>
    </div>
  );
}

export function PurchaseSuppliersView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Pharmaceutical Suppliers & Purchase Orders</h2>
        <p className="text-xs text-slate-400 mt-1">Vendor directories, purchase orders, and goods receipt notes (GRN)</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Supplier master active with certified pharmaceutical distributors.</p>
      </div>
    </div>
  );
}

export function PharmacyNotificationsView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Pharmacy & Lab Urgent Alerts</h2>
        <p className="text-xs text-slate-400 mt-1">Critical threshold alerts, STAT requests, and cold-chain temperature logs</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Cold chain refrigeration operating at 4.2°C (Optimal).</p>
      </div>
    </div>
  );
}

// ==========================================
// 7. HOSPITAL ADMINISTRATION & CONFIG
// ==========================================
export function DepartmentsView() {
  const depts = [
    { name: 'General Medicine', code: 'MED', hod: 'Dr. Rajesh Sharma, MD', rooms: '201 - 204', activeDoctors: 4 },
    { name: 'Pediatrics & Neonatology', code: 'PED', hod: 'Dr. Priya Desai, MD', rooms: '105 - 108', activeDoctors: 2 },
    { name: 'Orthopedics & Joint Replacement', code: 'ORT', hod: 'Dr. Vikram Malhotra, DNB', rooms: '208 - 210', activeDoctors: 3 },
    { name: 'Obstetrics & Gynecology', code: 'OBG', hod: 'Dr. Ananya Roy, MS', rooms: '301 - 304', activeDoctors: 3 },
    { name: 'Cardiology & Echo Lab', code: 'CAR', hod: 'Dr. Sanjay Rao, DM', rooms: '112 - 114', activeDoctors: 2 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black">Hospital Clinical Departments</h2>
          <p className="text-xs text-purple-200/70 mt-1">Specialties, assigned consultation chambers, and Head of Departments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {depts.map((d) => (
          <div key={d.code} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs px-2.5 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg border border-purple-100">
                {d.code}
              </span>
              <span className="text-xs text-slate-500 font-semibold">{d.activeDoctors} Active Clinicians</span>
            </div>
            <h3 className="font-black text-slate-900 text-base">{d.name}</h3>
            <div className="text-xs text-slate-500 space-y-1">
              <div>Head of Department: <b className="text-slate-800">{d.hod}</b></div>
              <div>Consultation Chambers: <b className="text-slate-800">{d.rooms}</b></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BranchesView() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Hospital Branches & Locations</h2>
        <p className="text-xs text-indigo-200/70 mt-1">Multi-branch configuration under unified Lazfort tenant ID</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-base">Main Hospital & Research Centre</span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
              HQ Campus
            </span>
          </div>
          <p className="text-xs text-slate-500">12th Main, HAL 2nd Stage, Indiranagar, Bengaluru - 560038</p>
          <div className="text-xs text-slate-700 pt-2 border-t border-slate-100">
            <span>Beds: <b>120</b> &bull; OPD Chambers: <b>14</b> &bull; Status: <b className="text-emerald-700">Online</b></span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-base">Whitefield Specialty Outpatient Clinic</span>
            <span className="px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-[10px] font-bold">
              Satellite Branch
            </span>
          </div>
          <p className="text-xs text-slate-500">ITPB Main Road, Whitefield, Bengaluru - 560066</p>
          <div className="text-xs text-slate-700 pt-2 border-t border-slate-100">
            <span>Beds: <b>Daycare</b> &bull; OPD Chambers: <b>6</b> &bull; Status: <b className="text-emerald-700">Online</b></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HospitalServicesView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Hospital Services & Clinical Facilities</h2>
        <p className="text-xs text-slate-400 mt-1">Outpatient specialties, clinical diagnostic procedures, and emergency desk</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Full service tariff and clinical scheduling catalog is synchronized across branches.</p>
      </div>
    </div>
  );
}

export function HospitalSettingsView() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Hospital Administration Settings</h2>
        <p className="text-xs text-slate-400 mt-1">Operating timings, token numbering rules, and NABH accreditation data</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 text-xs">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
          <span className="font-semibold text-slate-700">Digital Token Generation Mode</span>
          <span className="font-bold text-emerald-700">Automated Sequential (Daily Reset 00:00)</span>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
          <span className="font-semibold text-slate-700">Clinical Note Finalization Window</span>
          <span className="font-bold text-slate-900">Immediate Locking on Doctor Sign-off</span>
        </div>
      </div>
    </div>
  );
}

export function OperationalReportsView() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-sky-950 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Operational & Quality Analytics Reports</h2>
        <p className="text-xs text-sky-200/70 mt-1">Average patient wait times, doctor consult volumes, and bed occupancy</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">Average OPD Wait Time Today: <b>14.2 minutes</b> &bull; Doctor Consult Time: <b>12.8 minutes</b> &bull; Target KPI Met: <b>98.4%</b></p>
      </div>
    </div>
  );
}

export function UsersRolesView() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-black">Hospital Users, Roles & Permissions (RBAC)</h2>
        <p className="text-xs text-slate-400 mt-1">Strict role-based segregation of duties enforced across the platform</p>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <p className="text-xs text-slate-600">All 8 roles (Super Admin, Hospital Admin, Doctor, Nurse, Receptionist, Billing, Pharmacist, Patient) have server-enforced security boundaries.</p>
      </div>
    </div>
  );
}