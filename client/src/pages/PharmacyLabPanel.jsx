import React, { useState } from 'react';
import { 
  Pill, 
  FlaskConical, 
  CheckCircle2, 
  AlertCircle, 
  Package, 
  Clock, 
  Search, 
  FileText, 
  QrCode, 
  Check, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Printer
} from 'lucide-react';

export default function PharmacyLabPanel() {
  const [activeTab, setActiveTab] = useState('pharmacy');
  const [searchTerm, setSearchTerm] = useState('');

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'RX-2026-8801',
      doctor: 'Dr. Rajesh Sharma, MD',
      patientName: 'Ramesh Kumar',
      uhid: 'LZF-2026-0001',
      date: '2026-10-21 10:15 IST',
      items: [
        { name: 'Metformin 500mg SR', dosage: '1-0-1 (After Food)', duration: '30 Days', qty: 60, batch: 'MET-26-89', exp: '11/2027', stock: 450 },
        { name: 'Glimepiride 1mg', dosage: '1-0-0 (Before Breakfast)', duration: '30 Days', qty: 30, batch: 'GLM-25-12', exp: '08/2027', stock: 180 },
        { name: 'Atorvastatin 10mg', dosage: '0-0-1 (At Bedtime)', duration: '30 Days', qty: 30, batch: 'ATV-26-44', exp: '04/2028', stock: 240 }
      ],
      diagnosis: 'Type 2 Diabetes Mellitus with Dyslipidemia',
      status: 'Pending Verification',
      pharmacistNotes: 'Check for potential hypoglycemia caution with glimepiride.'
    },
    {
      id: 'RX-2026-8802',
      doctor: 'Dr. Vikram Seth, MS',
      patientName: 'Priya Sundaram',
      uhid: 'LZF-2026-0002',
      date: '2026-10-21 10:35 IST',
      items: [
        { name: 'Aceclofenac + Paracetamol (100mg/325mg)', dosage: '1-0-1 (SOS/Pain)', duration: '5 Days', qty: 10, batch: 'ACP-26-01', exp: '01/2027', stock: 320 },
        { name: 'Pantoprazole 40mg', dosage: '1-0-0 (Empty Stomach)', duration: '7 Days', qty: 7, batch: 'PAN-25-98', exp: '12/2026', stock: 500 }
      ],
      diagnosis: 'Acute Cervical Muscle Spasm',
      status: 'Dispensed',
      pharmacistNotes: 'Verified and packed with label instructions.'
    }
  ]);

  const [labOrders, setLabOrders] = useState([
    {
      id: 'LAB-2026-401',
      orderDate: '2026-10-21 09:30 IST',
      patientName: 'Ramesh Kumar',
      uhid: 'LZF-2026-0001',
      doctor: 'Dr. Rajesh Sharma, MD',
      testName: 'HbA1c & Fasting Lipid Profile',
      sampleType: 'Venous Whole Blood (EDTA + Fluoride)',
      sampleStatus: 'Sample Collected',
      resultStatus: 'Processing in Analyzer',
      resultValue: '',
      normalRange: 'HbA1c < 5.7% (Normal), 5.7-6.4% (Prediabetes), >6.5% (Diabetes)',
      verifiedBy: 'Pending'
    },
    {
      id: 'LAB-2026-402',
      orderDate: '2026-10-21 10:00 IST',
      patientName: 'Sunita Reddy',
      uhid: 'LZF-2026-0004',
      doctor: 'Dr. Ananya Roy, DM',
      testName: 'Serum Creatinine & Electrolytes',
      sampleType: 'Serum Clot Activator Tube',
      sampleStatus: 'Received in Lab',
      resultStatus: 'Verified',
      resultValue: 'Creatinine: 0.9 mg/dL, Na+: 139 mEq/L, K+: 4.2 mEq/L',
      normalRange: 'Creatinine: 0.6 - 1.2 mg/dL',
      verifiedBy: 'Dr. Meera Iyer (Pathologist)'
    }
  ]);

  const handleDispense = (rxId) => {
    setPrescriptions(prescriptions.map(rx => rx.id === rxId ? { ...rx, status: 'Dispensed' } : rx));
    alert(`Prescription ${rxId} verified & dispensed successfully! Inventory records updated and barcode receipt printed.`);
  };

  const handleVerifyLab = (labId) => {
    setLabOrders(labOrders.map(lab => lab.id === labId ? { 
      ...lab, 
      resultStatus: 'Verified', 
      resultValue: 'HbA1c: 7.2% (Fair Control), Total Chol: 198 mg/dL', 
      verifiedBy: 'Kavita Nair (Chief Lab Biochemist)' 
    } : lab));
    alert(`Lab Order ${labId} results validated and released to Doctor & Patient Portal!`);
  };

  return (
    <div className="space-y-6">
      {/* Pharmacy Command Banner matching Navy / Sky 3D Theme */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1e36] to-[#082b47] border border-sky-500/25 p-5 sm:p-6 lg:p-7 text-white shadow-2xl">
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

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                Persona: Pharmacist / Lab Staff Workspace
              </span>
              <span className="text-[11px] text-slate-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Real-time Rx &amp; Sample Stream
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
              Prescription Fulfillment &amp; Clinical Laboratory Station
            </h1>
            <p className="text-xs text-sky-200/80 max-w-2xl leading-relaxed">
              Primary Jobs: Process prescriptions or orders and record fulfilment/results.
              <br />
              Key Needs: Work queues, traceability, verification and stock/sample status.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <button 
              onClick={() => alert('Barcode Scanner Active & Ready for Dispense / Specimen Verification')}
              className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs px-4 sm:px-5 py-2.5 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 min-h-[44px] sm:min-h-0 w-full sm:w-auto"
            >
              <QrCode className="w-4 h-4 text-sky-600" />
              <span>Scan Barcode / Specimen</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Row Below Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Rx Pending Verification</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 block tracking-tight font-mono">
            {prescriptions.filter(p => p.status !== 'Dispensed').length}
          </span>
          <span className="text-[10px] text-amber-600 font-medium block">
            Awaiting pharmacy dispense
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Lab Tests in Analyzer</span>
          <span className="text-2xl sm:text-3xl font-black text-sky-600 block tracking-tight font-mono">
            {labOrders.filter(l => l.resultStatus !== 'Verified').length}
          </span>
          <span className="text-[10px] text-sky-600 font-medium block">
            Biochemistry &amp; Hematology
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Stock Traceability Check</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 block tracking-tight font-mono">
            100% OK
          </span>
          <span className="text-[10px] text-emerald-600 font-medium block">
            Batch and expiry verified
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Fulfilled Today</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block tracking-tight font-mono">
            42 Orders
          </span>
          <span className="text-[10px] text-slate-500 font-medium block">
            Digitally locked audit log
          </span>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('pharmacy')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 min-h-[44px] ${
            activeTab === 'pharmacy'
              ? 'border-sky-600 text-sky-700 bg-sky-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Pill className="w-4 h-4 text-sky-600" />
          <span>Pharmacy Prescription Work Queue ({prescriptions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('lab')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 min-h-[44px] ${
            activeTab === 'lab'
              ? 'border-sky-600 text-sky-700 bg-sky-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-sky-600" />
          <span>Laboratory Test &amp; Specimen Queue ({labOrders.length})</span>
        </button>
      </div>

      {/* Tab 1: Pharmacy Prescription Queue */}
      {activeTab === 'pharmacy' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by UHID, Patient, or Rx ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[44px] sm:min-h-0"
              />
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Traceability Engine: Central Pharmacy Store IND-01
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {prescriptions.map((rx) => (
              <div key={rx.id} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-sm text-teal-700">{rx.id}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        rx.status === 'Dispensed' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {rx.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Patient: <strong>{rx.patientName}</strong> &bull; UHID: <span className="font-mono">{rx.uhid}</span> &bull; {rx.doctor}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-mono">{rx.date}</span>
                    {rx.status !== 'Dispensed' ? (
                      <button
                        onClick={() => handleDispense(rx.id)}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 transition flex items-center justify-center gap-1.5 min-h-[38px] sm:min-h-0"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verify & Dispense</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Reprinting dispense label for ${rx.id}`)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1 min-h-[38px] sm:min-h-0"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Label</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Drugs Items List */}
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs whitespace-nowrap min-w-[650px]">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-2.5">Medication Name</th>
                        <th className="p-2.5">Dosage / Frequency</th>
                        <th className="p-2.5">Duration</th>
                        <th className="p-2.5">Dispense Qty</th>
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
                          <td className="p-2.5 font-mono font-bold text-teal-800">{item.qty} tabs</td>
                          <td className="p-2.5 font-mono text-[11px]">
                            {item.batch} (Exp: {item.exp})
                          </td>
                          <td className="p-2.5">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {item.stock} in Stock
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-100 text-xs text-teal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold">Clinical Indication: </span>
                    <span>{rx.diagnosis}</span> &bull; 
                    <span className="ml-2 text-slate-600">{rx.pharmacistNotes}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-white px-2 py-0.5 rounded border border-teal-200 shrink-0 self-start sm:self-auto">
                    Pharmacist Traceability Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Laboratory Test Queue */}
      {activeTab === 'lab' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Diagnostic Lab Test Orders & Specimen Status</h3>
                <p className="text-xs text-slate-500">Sample collection, machine analyzer interface, and report validation.</p>
              </div>
              <button 
                onClick={() => alert('New test order manually created')}
                className="bg-teal-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-teal-700 transition min-h-[44px] sm:min-h-0 w-full sm:w-auto shrink-0 flex items-center justify-center"
              >
                + New Lab Order
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {labOrders.map((lab) => (
                <div key={lab.id} className="p-4 hover:bg-slate-50 transition space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-xs text-teal-700">{lab.id}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{lab.testName}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          lab.resultStatus === 'Verified'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-sky-50 text-sky-700 border border-sky-200'
                        }`}>
                          {lab.resultStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Patient: <strong>{lab.patientName}</strong> &bull; UHID: <span className="font-mono">{lab.uhid}</span> &bull; {lab.doctor}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {lab.resultStatus !== 'Verified' ? (
                        <button
                          onClick={() => handleVerifyLab(lab.id)}
                          className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5 min-h-[38px] sm:min-h-0"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Enter & Validate Results</span>
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Released to Doctor</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Specimen & Tube</span>
                      <span className="font-medium text-slate-800">{lab.sampleType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Results / Values</span>
                      <span className="font-mono font-bold text-teal-800">
                        {lab.resultValue || 'Awaiting analyzer run...'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Pathologist Signoff</span>
                      <span className="text-slate-600 font-medium">{lab.verifiedBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
