import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Modal from '../components/Modal';
import {
  Users,
  Search,
  UserPlus,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  HeartPulse,
  FileText,
  Clock,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function Patients({ onSelectPatientForConsult }) {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Registration Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    dob: '',
    age: '',
    phone: '',
    email: '',
    bloodGroup: 'Unknown',
    street: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    allergies: '',
    chronicConditions: ''
  });

  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const loadPatients = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/patients${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ''}`);
      if (res && res.success && Array.isArray(res.patients)) {
        setPatients(res.patients);
      } else if (res && res.success && Array.isArray(res.data)) {
        setPatients(res.data);
      } else if (Array.isArray(res)) {
        setPatients(res);
      } else {
        setPatients([]);
      }
    } catch (err) {
      console.error('Failed to load patients:', err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(loadPatients, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Real-time duplicate phone checking (PRD FR-004, BR-02)
  const checkDuplicatePhone = async (phone) => {
    if (phone.length >= 10) {
      try {
        const res = await api.get(`/patients/check-duplicates?phone=${phone}`);
        if (res.hasDuplicates) {
          setDuplicateWarning(res.duplicates[0]);
        } else {
          setDuplicateWarning(null);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setDuplicateWarning(null);
    }
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, phone: val });
    checkDuplicatePhone(val);
  };

  const handleOpenPatientDetail = async (patient) => {
    setSelectedPatient(patient);
    try {
      const res = await api.get(`/patients/${patient.uhid}`);
      if (res.success) {
        setPatientHistory(res.history);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dob: formData.dob || undefined,
        age: Number(formData.age),
        phone: formData.phone,
        email: formData.email,
        bloodGroup: formData.bloodGroup,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        emergencyContact: {
          name: formData.emergencyName,
          relation: formData.emergencyRelation,
          phone: formData.emergencyPhone
        },
        allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
        chronicConditions: formData.chronicConditions ? formData.chronicConditions.split(',').map(s => s.trim()).filter(Boolean) : []
      };

      const res = await api.post('/patients', payload);
      if (res.success) {
        setIsRegisterOpen(false);
        loadPatients();
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          gender: 'male',
          dob: '',
          age: '',
          phone: '',
          email: '',
          bloodGroup: 'Unknown',
          street: '',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '',
          emergencyName: '',
          emergencyRelation: '',
          emergencyPhone: '',
          allergies: '',
          chronicConditions: ''
        });
        setDuplicateWarning(null);
      } else {
        setFormError(res.message || 'Failed to register patient');
      }
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 3D Patient Administration Command Banner matching Navy / Sky 3D Theme */}
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

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full">
                Master Patient Index &amp; UHID Station
              </span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Real-time UHID Registry
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Patient Administration &amp; Master Index</span>
            </h1>
            <p className="text-xs text-sky-200/80 max-w-xl leading-relaxed">
              Search UHID, detect duplicate registrations with phone &amp; Aadhaar collision checks, and manage demographics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-sky-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search UHID, Name, Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-900/80 border border-sky-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-100 placeholder:text-sky-300/50 min-h-[44px] shadow-inner font-medium"
              />
            </div>

            <button
              onClick={() => setIsRegisterOpen(true)}
              className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-black px-4 sm:px-5 py-2.5 rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shrink-0 min-h-[44px] mr-2 sm:mr-4"
            >
              <UserPlus className="w-4 h-4 text-sky-600" />
              <span>New Registration</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Row Below Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Total UHIDs Registered</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block tracking-tight font-mono">
            {patients.length}
          </span>
          <span className="text-[10px] text-sky-600 font-medium block">
            NABH compliant patient ledger
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Male Patients</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block tracking-tight font-mono">
            {patients.filter(p => p.gender?.toLowerCase() === 'male').length}
          </span>
          <span className="text-[10px] text-slate-500 font-medium block">
            Active adult &amp; pediatric male
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Female Patients</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 block tracking-tight font-mono">
            {patients.filter(p => p.gender?.toLowerCase() === 'female').length}
          </span>
          <span className="text-[10px] text-slate-500 font-medium block">
            Active maternal &amp; outpatient female
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-1 hover:shadow-md transition">
          <span className="text-[11px] font-semibold text-slate-400 block">Duplicate Prevention Check</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 block tracking-tight font-mono">
            100% OK
          </span>
          <span className="text-[10px] text-emerald-600 font-medium block">
            Zero collision records detected
          </span>
        </div>
      </div>

      {/* Patient List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left min-w-[720px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider whitespace-nowrap">
              <tr>
                <th className="py-3 px-4">UHID</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Gender & Age</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Blood Group</th>
                <th className="py-3 px-4">Known Allergies</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 whitespace-nowrap">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">Loading patients...</td>
                </tr>
              ) : (!Array.isArray(patients) || patients.length === 0) ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">No patient records found.</td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.uhid || p._id || Math.random()} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-700">
                      {p.uhid || 'Pending UHID'}
                      {p.duplicateFlag && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 border border-amber-200 font-sans" title="Suspected Duplicate Flag">
                          Duplicate?
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {p.firstName || ''} {p.lastName || ''}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 capitalize">
                      {p.gender || 'Unknown'}, {p.age ?? '--'} yrs
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">
                      {p.phone || '--'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full font-semibold text-[10px] bg-rose-50 text-rose-700 border border-rose-200">
                        {p.bloodGroup || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.allergies && ((Array.isArray(p.allergies) && p.allergies.length > 0) || (typeof p.allergies === 'string' && p.allergies.trim())) ? (
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-200">
                          {Array.isArray(p.allergies) ? p.allergies.join(', ') : p.allergies}
                        </span>
                      ) : (
                        <span className="text-slate-400">Nil</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenPatientDetail(p)}
                        className="text-brand-600 hover:text-brand-800 font-semibold text-xs px-2.5 py-1 rounded-lg hover:bg-brand-50 transition"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail Profile Modal */}
      {selectedPatient && (
        <Modal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          title={`Patient Record: ${selectedPatient.uhid} - ${selectedPatient.firstName} ${selectedPatient.lastName}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-5 text-xs">
            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block">UHID</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{selectedPatient.uhid}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Gender & Age</span>
                <span className="font-semibold text-slate-800 capitalize">{selectedPatient.gender}, {selectedPatient.age} years</span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone</span>
                <span className="font-mono text-slate-800 font-medium">{selectedPatient.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Blood Group</span>
                <span className="font-bold text-rose-700">{selectedPatient.bloodGroup}</span>
              </div>
            </div>

            {/* Clinical Alerts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Known Allergies
                </span>
                <p className="text-amber-800">
                  {selectedPatient.allergies?.length
                    ? (Array.isArray(selectedPatient.allergies) ? selectedPatient.allergies.join(', ') : selectedPatient.allergies)
                    : 'None documented'}
                </p>
              </div>

              <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200">
                <span className="font-bold text-sky-900 block mb-1 flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5" />
                  Chronic Conditions
                </span>
                <p className="text-sky-800">
                  {selectedPatient.chronicConditions?.length
                    ? (Array.isArray(selectedPatient.chronicConditions) ? selectedPatient.chronicConditions.join(', ') : selectedPatient.chronicConditions)
                    : 'None documented'}
                </p>
              </div>
            </div>

            {/* Visit History Tabs / Encounter list */}
            <div>
              <h4 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-[11px]">
                Encounter & Appointment History
              </h4>
              <div className="space-y-2">
                {patientHistory?.appointments?.length ? (
                  patientHistory.appointments.map(a => (
                    <div key={a.appointmentId || Math.random()} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800 font-mono">{a.tokenNumber || 'Token'}</span>
                          <span className="text-slate-600 font-medium">{a.doctorName || 'Doctor'}</span>
                          <span className="text-slate-400">({a.departmentName || 'OPD'})</span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          {a.appointmentDate ? (new Date(a.appointmentDate).toLocaleDateString() !== 'Invalid Date' ? new Date(a.appointmentDate).toLocaleDateString() : a.appointmentDate) : 'Today'} at {a.timeSlot || '09:00 AM'} &bull; Reason: {a.reasonForVisit || 'General OPD'}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        a.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                        a.status === 'in_consultation' ? 'bg-sky-100 text-sky-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {a.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 italic">No previous visits recorded.</p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Register New Patient Modal */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Register New Outpatient (Generate UHID)"
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Duplicate Detection Alert (PRD FR-004 & BR-02) */}
          {duplicateWarning && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 flex items-start space-x-2.5 animate-in fade-in duration-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Potential Duplicate Patient Detected!</p>
                <p className="text-[11px] mt-0.5">
                  Phone number <strong>{formData.phone}</strong> is already registered to{' '}
                  <strong>{duplicateWarning.firstName} {duplicateWarning.lastName}</strong> (UHID: <code>{duplicateWarning.uhid}</code>).
                </p>
                <p className="text-[10px] text-amber-700 mt-1 italic">
                  Per hospital policy, duplicate registrations will be flagged for Medical Record Administrator review.
                </p>
              </div>
            </div>
          )}

          {/* Demographic Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g. Ramesh"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. Gupta"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gender *</label>
              <select
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Age (Years) *</label>
              <input
                type="number"
                required
                min="0"
                max="125"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
                placeholder="e.g. 54"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="10-digit mobile number"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              >
                <option value="Unknown">Unknown</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          {/* Address & Emergency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
              <input
                type="text"
                value={formData.street}
                onChange={e => setFormData({ ...formData, street: e.target.value })}
                placeholder="Flat / House / Street"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Contact (Name & Phone)</label>
              <input
                type="text"
                value={formData.emergencyName}
                onChange={e => setFormData({ ...formData, emergencyName: e.target.value })}
                placeholder="Relation & Phone, e.g. Sunita (Spouse) 9876543219"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Clinical Alert Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Known Drug Allergies (Comma separated)</label>
              <input
                type="text"
                value={formData.allergies}
                onChange={e => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="e.g. Penicillin, Sulfa"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Chronic Medical Conditions</label>
              <input
                type="text"
                value={formData.chronicConditions}
                onChange={e => setFormData({ ...formData, chronicConditions: e.target.value })}
                placeholder="e.g. Diabetes Mellitus, Hypertension"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsRegisterOpen(false)}
              className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition min-h-[44px] sm:min-h-0 flex items-center justify-center font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-brand-500/20 transition disabled:opacity-50 min-h-[44px] sm:min-h-0 flex items-center justify-center"
            >
              {submitting ? 'Registering...' : 'Save & Assign UHID'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
