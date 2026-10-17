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
      if (res.success) {
        setPatients(res.patients);
      }
    } catch (err) {
      console.error(err);
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
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-600" />
            <span>Patient Administration & Master Index</span>
          </h2>
          <p className="text-xs text-slate-500">
            Search UHID, detect duplicate registrations, and manage demographics
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search UHID, Patient Name, Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
            />
          </div>

          <button
            onClick={() => setIsRegisterOpen(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-brand-500/20 transition flex items-center space-x-1.5 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Patient Registration</span>
          </button>
        </div>
      </div>

      {/* Patient List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
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
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">Loading patients...</td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">No patient records found.</td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.uhid} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-700">
                      {p.uhid}
                      {p.duplicateFlag && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 border border-amber-200 font-sans" title="Suspected Duplicate Flag">
                          Duplicate?
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {p.firstName} {p.lastName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 capitalize">
                      {p.gender}, {p.age} yrs
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">
                      {p.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full font-semibold text-[10px] bg-rose-50 text-rose-700 border border-rose-200">
                        {p.bloodGroup || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.allergies && p.allergies.length > 0 ? (
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-200">
                          {p.allergies.join(', ')}
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
                  {selectedPatient.allergies?.length ? selectedPatient.allergies.join(', ') : 'None documented'}
                </p>
              </div>

              <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200">
                <span className="font-bold text-sky-900 block mb-1 flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5" />
                  Chronic Conditions
                </span>
                <p className="text-sky-800">
                  {selectedPatient.chronicConditions?.length ? selectedPatient.chronicConditions.join(', ') : 'None documented'}
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
                    <div key={a.appointmentId} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800 font-mono">{a.tokenNumber}</span>
                          <span className="text-slate-600 font-medium">{a.doctorName}</span>
                          <span className="text-slate-400">({a.departmentName})</span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          {new Date(a.appointmentDate).toLocaleDateString()} at {a.timeSlot} &bull; Reason: {a.reasonForVisit || 'General OPD'}
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

          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsRegisterOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md shadow-brand-500/20 transition disabled:opacity-50"
            >
              {submitting ? 'Registering...' : 'Save & Assign UHID'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
