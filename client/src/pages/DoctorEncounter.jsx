import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Stethoscope,
  Clock,
  Heart,
  Thermometer,
  Activity,
  FileText,
  Pill,
  Plus,
  Trash2,
  CheckCircle,
  Lock,
  AlertTriangle,
  User,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function DoctorEncounter({ initialAppointment }) {
  const { user } = useAuth();
  const [activeQueue, setActiveQueue] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(initialAppointment || null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Clinical Form Fields
  const [vitals, setVitals] = useState({
    bpSystolic: 120,
    bpDiastolic: 80,
    pulseRate: 72,
    temperatureF: 98.6,
    spO2: 99,
    weightKg: 70,
    heightCm: 170,
    bmi: 24.2
  });

  const [chiefComplaint, setChiefComplaint] = useState('');
  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState('');
  const [pastMedicalHistory, setPastMedicalHistory] = useState('');
  const [systemicExamination, setSystemicExamination] = useState('');
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState('');
  const [icd10Code, setIcd10Code] = useState('');
  const [assessmentPlan, setAssessmentPlan] = useState('');
  const [disposition, setDisposition] = useState('discharge_home');
  const [followUpDate, setFollowUpDate] = useState('');

  // Prescription Items
  const [medicines, setMedicines] = useState([
    {
      medicineName: 'Tab. Paracetamol 650 mg',
      dosage: '650 mg',
      route: 'Oral',
      frequency: '1-0-1 (Twice daily)',
      durationDays: 5,
      instructions: 'Take after food if fever or headache persists'
    }
  ]);

  const [labOrders, setLabOrders] = useState([
    { testName: 'Complete Blood Count (CBC with Automated Differential)', clinicalNotes: 'Baseline hemogram', urgent: false }
  ]);

  const [generalAdvice, setGeneralAdvice] = useState('Drink adequate warm fluids and take rest for 48 hours.');
  const [isFinalized, setIsFinalized] = useState(false);
  const [finalizedMeta, setFinalizedMeta] = useState(null);

  // Auto-calculate BMI
  const handleWeightHeightChange = (weight, height) => {
    const w = Number(weight);
    const h = Number(height);
    let bmiVal = 0;
    if (w > 0 && h > 0) {
      const hMeters = h / 100;
      bmiVal = Number((w / (hMeters * hMeters)).toFixed(1));
    }
    setVitals(prev => ({ ...prev, weightKg: w, heightCm: h, bmi: bmiVal }));
  };

  // Fetch Doctor's Active Queue
  const fetchDoctorQueue = async () => {
    try {
      const res = await api.get('/appointments/queue');
      if (res.success) {
        // Collect checked_in and in_consultation
        const combined = [
          ...(res.queue?.inConsultation || []),
          ...(res.queue?.waiting || [])
        ];
        setActiveQueue(combined);
        if (!selectedAppointment && combined.length > 0) {
          selectPatient(combined[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctorQueue();
  }, []);

  const selectPatient = async (apt) => {
    setSelectedAppointment(apt);
    setMessage('');
    setError('');
    try {
      setLoading(true);
      // Load patient details & prior encounter if exists
      const [patRes, encRes] = await Promise.all([
        api.get(`/patients/${apt.patientId}`),
        api.get(`/encounters/${apt.appointmentId}`).catch(() => ({ success: false }))
      ]);

      if (patRes.success) {
        setPatientDetails(patRes.patient);
      }

      if (encRes.success && encRes.encounter) {
        const e = encRes.encounter;
        setVitals(e.vitals || vitals);
        setChiefComplaint(e.chiefComplaint || apt.reasonForVisit || '');
        setHistoryOfPresentIllness(e.historyOfPresentIllness || '');
        setPastMedicalHistory(e.pastMedicalHistory || '');
        setSystemicExamination(e.systemicExamination || '');
        setProvisionalDiagnosis(e.provisionalDiagnosis || '');
        setIcd10Code(e.icd10Code || '');
        setAssessmentPlan(e.assessmentPlan || '');
        setDisposition(e.disposition || 'discharge_home');
        setIsFinalized(e.status === 'finalized');
        setFinalizedMeta({
          finalizedAt: e.finalizedAt,
          finalizedBy: e.finalizedBy
        });

        if (encRes.prescription) {
          setMedicines(encRes.prescription.medicines || []);
          setLabOrders(encRes.prescription.labOrders || []);
          setGeneralAdvice(encRes.prescription.generalAdvice || '');
        }
      } else {
        // Fresh draft
        setChiefComplaint(apt.reasonForVisit || '');
        setIsFinalized(false);
        setFinalizedMeta(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      {
        medicineName: '',
        dosage: '1 Tab',
        route: 'Oral',
        frequency: '1-0-1 (Twice daily)',
        durationDays: 5,
        instructions: 'After food'
      }
    ]);
  };

  const handleRemoveMedicine = (idx) => {
    setMedicines(medicines.filter((_, i) => i !== idx));
  };

  const handleAddLabOrder = () => {
    setLabOrders([...labOrders, { testName: '', clinicalNotes: '', urgent: false }]);
  };

  const handleRemoveLabOrder = (idx) => {
    setLabOrders(labOrders.filter((_, i) => i !== idx));
  };

  const handleSaveDraft = async () => {
    if (!selectedAppointment) return;
    setError('');
    setMessage('');
    setSaving(true);

    try {
      const payload = {
        appointmentId: selectedAppointment.appointmentId,
        patientId: selectedAppointment.patientId,
        patientName: selectedAppointment.patientName,
        vitals,
        chiefComplaint: chiefComplaint || selectedAppointment.reasonForVisit || 'OPD Consultation',
        historyOfPresentIllness,
        pastMedicalHistory,
        systemicExamination,
        provisionalDiagnosis,
        icd10Code,
        assessmentPlan,
        disposition,
        followUpDate
      };

      const res = await api.post('/encounters/draft', payload);
      if (res.success) {
        setMessage('Clinical draft notes saved successfully');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFinalize = async () => {
    if (!selectedAppointment) return;
    if (!chiefComplaint || !provisionalDiagnosis || !assessmentPlan) {
      setError('Required for finalization: Chief Complaint, Provisional Diagnosis, and Assessment Plan must be completed.');
      return;
    }

    if (!window.confirm('Are you sure you want to finalize this clinical consultation? Once finalized, the medical record and prescription will be locked per hospital compliance policy.')) {
      return;
    }

    setError('');
    setMessage('');
    setSaving(true);

    try {
      // Ensure draft is saved first
      await api.post('/encounters/draft', {
        appointmentId: selectedAppointment.appointmentId,
        patientId: selectedAppointment.patientId,
        patientName: selectedAppointment.patientName,
        vitals,
        chiefComplaint,
        historyOfPresentIllness,
        pastMedicalHistory,
        systemicExamination,
        provisionalDiagnosis,
        icd10Code,
        assessmentPlan,
        disposition,
        followUpDate
      });

      // Fetch encounter id
      const encLookup = await api.get(`/encounters/${selectedAppointment.appointmentId}`);
      if (!encLookup.success || !encLookup.encounter) {
        throw new Error('Unable to resolve encounter ID');
      }

      const res = await api.post(`/encounters/${encLookup.encounter.encounterId}/finalize`, {
        medicines: medicines.filter(m => m.medicineName.trim().length > 0),
        labOrders: labOrders.filter(l => l.testName.trim().length > 0),
        generalAdvice
      });

      if (res.success) {
        setIsFinalized(true);
        setFinalizedMeta({
          finalizedAt: new Date(),
          finalizedBy: user?.fullName
        });
        setMessage('Encounter successfully finalized and locked with Doctor Digital Signature!');
        fetchDoctorQueue();
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Waiting Queue Drawer */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col h-[calc(100vh-7rem)] overflow-hidden">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Assigned OPD Queue
            </h3>
          </div>
          <span className="text-[11px] font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full border border-brand-200">
            {activeQueue.length} Ready
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 mt-3 pr-1">
          {activeQueue.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8 italic">No waiting patients in your queue.</p>
          ) : (
            activeQueue.map(apt => (
              <button
                key={apt.appointmentId}
                onClick={() => selectPatient(apt)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  selectedAppointment?.appointmentId === apt.appointmentId
                    ? 'border-brand-500 bg-brand-50/70 shadow-sm ring-1 ring-brand-500'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-brand-800">{apt.tokenNumber}</span>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    apt.status === 'in_consultation' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {apt.status === 'in_consultation' ? 'In Room' : 'Waiting'}
                  </span>
                </div>
                <p className="font-bold text-slate-900 mt-1">{apt.patientName}</p>
                <p className="text-slate-500 text-[11px]">
                  UHID: <span className="font-mono">{apt.patientId}</span>
                </p>
                {apt.reasonForVisit && (
                  <p className="text-slate-600 text-[11px] truncate mt-1 italic">
                    "{apt.reasonForVisit}"
                  </p>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Column: Clinician Consultation Workspace */}
      <div className="lg:col-span-9 space-y-5">
        {selectedAppointment ? (
          <>
            {/* Patient Header Banner */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600 to-sky-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {selectedAppointment.patientName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <h2 className="text-lg font-bold text-slate-900">{selectedAppointment.patientName}</h2>
                    <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-300">
                      UHID: {selectedAppointment.patientId}
                    </span>
                    <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      Token: {selectedAppointment.tokenNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedAppointment.patientGender || patientDetails?.gender}, {selectedAppointment.patientAge || patientDetails?.age} yrs &bull; Phone: {selectedAppointment.patientPhone || patientDetails?.phone} &bull; Blood: <strong className="text-rose-600">{patientDetails?.bloodGroup || 'O+'}</strong>
                  </p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center space-x-2">
                {isFinalized ? (
                  <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Encounter Finalized & Locked</span>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleSaveDraft}
                      disabled={saving}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition"
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={handleFinalize}
                      disabled={saving}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-md shadow-emerald-500/20 transition flex items-center space-x-1.5"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{saving ? 'Processing...' : 'Finalize & Issue Rx'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Notification messages */}
            {message && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Patient Clinical Alerts Banner */}
            {patientDetails?.allergies?.length > 0 && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  <strong>CLINICAL WARNING - DRUG ALLERGIES:</strong> {patientDetails.allergies.join(', ')}
                </span>
              </div>
            )}

            {/* 1. Vital Signs Panel */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Vital Signs Capture</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
                <div>
                  <label className="text-slate-500 block mb-1">BP Sys (mmHg)</label>
                  <input
                    type="number"
                    disabled={isFinalized}
                    value={vitals.bpSystolic}
                    onChange={e => setVitals({ ...vitals, bpSystolic: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">BP Dia (mmHg)</label>
                  <input
                    type="number"
                    disabled={isFinalized}
                    value={vitals.bpDiastolic}
                    onChange={e => setVitals({ ...vitals, bpDiastolic: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Pulse (bpm)</label>
                  <input
                    type="number"
                    disabled={isFinalized}
                    value={vitals.pulseRate}
                    onChange={e => setVitals({ ...vitals, pulseRate: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Temp (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    disabled={isFinalized}
                    value={vitals.temperatureF}
                    onChange={e => setVitals({ ...vitals, temperatureF: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">SpO2 (%)</label>
                  <input
                    type="number"
                    disabled={isFinalized}
                    value={vitals.spO2}
                    onChange={e => setVitals({ ...vitals, spO2: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    disabled={isFinalized}
                    value={vitals.weightKg}
                    onChange={e => handleWeightHeightChange(e.target.value, vitals.heightCm)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    disabled={isFinalized}
                    value={vitals.heightCm}
                    onChange={e => handleWeightHeightChange(vitals.weightKg, e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">BMI</label>
                  <div className="px-2.5 py-1.5 bg-brand-50 border border-brand-200 rounded-lg text-brand-800 font-mono font-bold text-center">
                    {vitals.bmi || '24.2'}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SOAP Clinical Consultation Notes */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brand-600" />
                <span>Clinical Notes & Assessment (SOAP Framework)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Chief Complaint & Duration *
                  </label>
                  <textarea
                    rows={2}
                    disabled={isFinalized}
                    value={chiefComplaint}
                    onChange={e => setChiefComplaint(e.target.value)}
                    placeholder="e.g. Uncontrolled fasting sugars and fatigue for 3 weeks"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    History of Present Illness (HPI)
                  </label>
                  <textarea
                    rows={2}
                    disabled={isFinalized}
                    value={historyOfPresentIllness}
                    onChange={e => setHistoryOfPresentIllness(e.target.value)}
                    placeholder="Course, aggravating/relieving factors, previous episodes"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Systemic Clinical Examination
                  </label>
                  <textarea
                    rows={2}
                    disabled={isFinalized}
                    value={systemicExamination}
                    onChange={e => setSystemicExamination(e.target.value)}
                    placeholder="CVS, Respiratory, Abdominal, CNS findings"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Provisional Clinical Diagnosis *
                    </label>
                    <input
                      type="text"
                      disabled={isFinalized}
                      value={provisionalDiagnosis}
                      onChange={e => setProvisionalDiagnosis(e.target.value)}
                      placeholder="e.g. Type 2 Diabetes Mellitus with Peripheral Neuropathy"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white font-medium"
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <label className="block font-semibold text-slate-700 mb-1">ICD-10 Code</label>
                      <input
                        type="text"
                        disabled={isFinalized}
                        value={icd10Code}
                        onChange={e => setIcd10Code(e.target.value)}
                        placeholder="e.g. E11.42"
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white font-mono"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block font-semibold text-slate-700 mb-1">Disposition *</label>
                      <select
                        disabled={isFinalized}
                        value={disposition}
                        onChange={e => setDisposition(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      >
                        <option value="discharge_home">Discharge Home</option>
                        <option value="follow_up_scheduled">Follow-up Scheduled</option>
                        <option value="admit_ipd">Admit to IPD Ward</option>
                        <option value="refer_specialist">Refer to Specialist</option>
                        <option value="emergency_transfer">Emergency Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Management Plan & Clinical Assessment *
                </label>
                <textarea
                  rows={2}
                  disabled={isFinalized}
                  value={assessmentPlan}
                  onChange={e => setAssessmentPlan(e.target.value)}
                  placeholder="Treatment strategy, dosage titration, dietary changes, patient education"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>
            </div>

            {/* 3. Prescription & Diagnostic Orders */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-emerald-600" />
                  <span>Prescription & Orders (FR-008)</span>
                </h3>
                {!isFinalized && (
                  <button
                    onClick={handleAddMedicine}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Medicine</span>
                  </button>
                )}
              </div>

              {/* Medicine Regimen Table */}
              <div className="space-y-2">
                {medicines.map((med, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200 items-center">
                    <div className="col-span-4">
                      <input
                        type="text"
                        disabled={isFinalized}
                        placeholder="Medicine Name (e.g. Tab Metformin 500mg)"
                        value={med.medicineName}
                        onChange={e => {
                          const updated = [...medicines];
                          updated[idx].medicineName = e.target.value;
                          setMedicines(updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-medium"
                      />
                    </div>
                    <div className="col-span-2">
                      <select
                        disabled={isFinalized}
                        value={med.route}
                        onChange={e => {
                          const updated = [...medicines];
                          updated[idx].route = e.target.value;
                          setMedicines(updated);
                        }}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg"
                      >
                        <option value="Oral">Oral</option>
                        <option value="IV">IV</option>
                        <option value="IM">IM</option>
                        <option value="Sublingual">Sublingual</option>
                        <option value="Topical">Topical</option>
                        <option value="Inhalation">Inhalation</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        disabled={isFinalized}
                        placeholder="Frequency (1-0-1)"
                        value={med.frequency}
                        onChange={e => {
                          const updated = [...medicines];
                          updated[idx].frequency = e.target.value;
                          setMedicines(updated);
                        }}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-center"
                      />
                    </div>
                    <div className="col-span-1">
                      <input
                        type="number"
                        disabled={isFinalized}
                        placeholder="Days"
                        value={med.durationDays}
                        onChange={e => {
                          const updated = [...medicines];
                          updated[idx].durationDays = Number(e.target.value);
                          setMedicines(updated);
                        }}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-center"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        disabled={isFinalized}
                        placeholder="Instructions"
                        value={med.instructions}
                        onChange={e => {
                          const updated = [...medicines];
                          updated[idx].instructions = e.target.value;
                          setMedicines(updated);
                        }}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      {!isFinalized && (
                        <button
                          onClick={() => handleRemoveMedicine(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Lab Orders */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-700">Laboratory & Diagnostic Test Orders:</span>
                  {!isFinalized && (
                    <button
                      onClick={handleAddLabOrder}
                      className="text-xs text-brand-600 hover:text-brand-800 font-semibold flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Test Order</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {labOrders.map((lab, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <input
                        type="text"
                        disabled={isFinalized}
                        placeholder="Test Name (e.g. Lipid Profile, Chest X-Ray)"
                        value={lab.testName}
                        onChange={e => {
                          const updated = [...labOrders];
                          updated[idx].testName = e.target.value;
                          setLabOrders(updated);
                        }}
                        className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                      <input
                        type="text"
                        disabled={isFinalized}
                        placeholder="Clinical Notes / Indications"
                        value={lab.clinicalNotes}
                        onChange={e => {
                          const updated = [...labOrders];
                          updated[idx].clinicalNotes = e.target.value;
                          setLabOrders(updated);
                        }}
                        className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                      {!isFinalized && (
                        <button
                          onClick={() => handleRemoveLabOrder(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">General Lifestyle Advice & Dietary Instructions</label>
                <input
                  type="text"
                  disabled={isFinalized}
                  value={generalAdvice}
                  onChange={e => setGeneralAdvice(e.target.value)}
                  placeholder="e.g. Low sodium diet, 30 min morning walk, avoid smoking"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>

              {/* Digital Signature Audit Stamp */}
              {isFinalized && finalizedMeta && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold">Cryptographically Verified Clinical Record</p>
                      <p className="text-[11px] text-emerald-800">
                        Finalized by {finalizedMeta.finalizedBy} on {new Date(finalizedMeta.finalizedAt).toLocaleString('en-IN')}.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-1 rounded border border-emerald-300 text-emerald-700">
                    STATUS: LOCKED (BR-04)
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            <Stethoscope className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h3 className="text-sm font-bold text-slate-700">No Patient Selected</h3>
            <p className="text-xs text-slate-500 mt-1">
              Select an arriving patient from your queue on the left to start the clinical consultation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
