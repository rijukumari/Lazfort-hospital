import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import {
  CalendarClock,
  UserPlus,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Calendar,
  Filter,
  Stethoscope,
  CheckCheck,
  UserCheck
} from 'lucide-react';

export default function AppointmentsQueue({ onStartConsultation }) {
  const { user } = useAuth();
  const [queueData, setQueueData] = useState({ summary: {}, queue: {} });
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // New Booking State
  const [patients, setPatients] = useState([]);
  const [patientSearch, setPatientSearch] = useState('');
  const [bookForm, setBookForm] = useState({
    patientId: '',
    doctorId: '',
    departmentId: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    priority: 'normal',
    reasonForVisit: ''
  });
  const [bookingError, setBookingError] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const url = `/appointments/queue${selectedDoctorId ? `?doctorId=${selectedDoctorId}` : ''}`;
      const res = await api.get(url);
      if (res.success) {
        setQueueData(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffAndDepts = async () => {
    try {
      const [staffRes, deptRes] = await Promise.all([
        api.get('/auth/staff'),
        api.get('/catalog/departments')
      ]);
      if (staffRes.success) {
        const docs = staffRes.staff.filter(s => s.role === 'doctor');
        setDoctors(docs);
        if (user?.role === 'doctor' && !selectedDoctorId) {
          setSelectedDoctorId(user.userId);
        }
      }
      if (deptRes.success) {
        setDepartments(deptRes.departments);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStaffAndDepts();
  }, []);

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 20000); // 20s live sync
    return () => clearInterval(interval);
  }, [selectedDoctorId]);

  // Load patients for booking dropdown
  useEffect(() => {
    if (isBookModalOpen) {
      api.get('/patients').then(res => {
        if (res.success) setPatients(res.patients);
      });
    }
  }, [isBookModalOpen]);

  const handleStatusChange = async (appointmentId, status) => {
    try {
      const res = await api.patch(`/appointments/${appointmentId}/status`, { status });
      if (res.success) {
        fetchQueue();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDoctorSelect = (docId) => {
    const doc = doctors.find(d => d.userId === docId);
    let deptId = '';
    if (doc) {
      const foundDept = departments.find(dep => dep.name.toLowerCase().includes(doc.department.toLowerCase()));
      if (foundDept) deptId = foundDept.deptId;
    }
    setBookForm({
      ...bookForm,
      doctorId: docId,
      departmentId: deptId || departments[0]?.deptId || 'DEP-GEN'
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');
    setSubmittingBooking(true);

    try {
      const res = await api.post('/appointments', bookForm);
      if (res.success) {
        setIsBookModalOpen(false);
        fetchQueue();
        setBookForm({
          patientId: '',
          doctorId: '',
          departmentId: '',
          appointmentDate: new Date().toISOString().split('T')[0],
          timeSlot: '10:00 AM',
          priority: 'normal',
          reasonForVisit: ''
        });
      } else {
        setBookingError(res.message);
      }
    } catch (err) {
      setBookingError(err.message);
    } finally {
      setSubmittingBooking(false);
    }
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '11:30 AM', '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-brand-600" />
            <span>OPD Queue & Outpatient Appointments Board</span>
          </h2>
          <p className="text-xs text-slate-500">
            Real-time outpatient tokens, arrivals, and doctor consultation progression
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Doctor Filter */}
          <div className="relative">
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-700"
            >
              <option value="">All Doctors (Hospital View)</option>
              {doctors.map(d => (
                <option key={d.userId} value={d.userId}>
                  {d.fullName} ({d.department})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-brand-500/20 transition flex items-center space-x-1.5 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Queue Metrics Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-amber-700 font-semibold uppercase text-[10px] block">Waiting in Lobby</span>
            <span className="text-lg font-bold text-amber-900 font-mono">{queueData?.summary?.waiting || 0}</span>
          </div>
          <Clock className="w-6 h-6 text-amber-500 opacity-60" />
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-sky-700 font-semibold uppercase text-[10px] block">In Consultation</span>
            <span className="text-lg font-bold text-sky-900 font-mono">{queueData?.summary?.inConsultation || 0}</span>
          </div>
          <Stethoscope className="w-6 h-6 text-sky-500 opacity-60" />
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-emerald-700 font-semibold uppercase text-[10px] block">Completed Today</span>
            <span className="text-lg font-bold text-emerald-900 font-mono">{queueData?.summary?.completed || 0}</span>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-500 opacity-60" />
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-slate-600 font-semibold uppercase text-[10px] block">Scheduled / Upcoming</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{queueData?.summary?.booked || 0}</span>
          </div>
          <Calendar className="w-6 h-6 text-slate-400 opacity-60" />
        </div>
      </div>

      {/* OPD Queue Grid: Waiting vs In-Consultation vs Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Waiting / Checked-in */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Waiting Room Queue ({queueData?.queue?.waiting?.length || 0})
            </h3>
          </div>

          <div className="space-y-3 mt-4">
            {queueData?.queue?.waiting?.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center italic">No patients currently waiting.</p>
            ) : (
              queueData?.queue?.waiting?.map(a => (
                <div key={a.appointmentId} className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 transition text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-sm text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
                      {a.tokenNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Wait: {Math.max(1, Math.round((Date.now() - new Date(a.checkInTime || a.createdAt).getTime()) / 60000))}m
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{a.patientName}</h4>
                    <p className="text-slate-500 text-[11px]">
                      UHID: <span className="font-mono">{a.patientId}</span> &bull; {a.patientGender}, {a.patientAge}y
                    </p>
                    <p className="text-slate-600 font-medium text-[11px] mt-1">
                      Doctor: {a.doctorName} ({a.departmentName})
                    </p>
                    {a.reasonForVisit && (
                      <p className="text-slate-500 text-[11px] italic mt-0.5">"{a.reasonForVisit}"</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200/50">
                    <button
                      onClick={() => onStartConsultation ? onStartConsultation(a) : handleStatusChange(a.appointmentId, 'in_consultation')}
                      className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-3 py-1.5 rounded-lg transition flex items-center space-x-1 shadow-sm"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Call into Room</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Consultation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
              In Consultation ({queueData?.queue?.inConsultation?.length || 0})
            </h3>
          </div>

          <div className="space-y-3 mt-4">
            {queueData?.queue?.inConsultation?.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center italic">No ongoing consultations.</p>
            ) : (
              queueData?.queue?.inConsultation?.map(a => (
                <div key={a.appointmentId} className="p-3.5 rounded-xl border border-sky-300 bg-sky-50/50 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-sm text-sky-900 bg-sky-100 px-2 py-0.5 rounded">
                      {a.tokenNumber}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-sky-700 bg-sky-200/60 px-2 py-0.5 rounded-full animate-pulse">
                      In Room
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{a.patientName}</h4>
                    <p className="text-slate-500 text-[11px]">
                      UHID: <span className="font-mono">{a.patientId}</span>
                    </p>
                    <p className="text-sky-900 font-semibold text-[11px] mt-1">
                      Dr. {a.doctorName}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-sky-200">
                    <button
                      onClick={() => onStartConsultation ? onStartConsultation(a) : handleStatusChange(a.appointmentId, 'completed')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg transition flex items-center space-x-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Open Workspace</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Scheduled / Upcoming Tokens */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              Scheduled / Awaiting Check-In ({queueData?.queue?.booked?.length || 0})
            </h3>
          </div>

          <div className="space-y-3 mt-4">
            {queueData?.queue?.booked?.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center italic">No upcoming appointments pending check-in.</p>
            ) : (
              queueData?.queue?.booked?.map(a => (
                <div key={a.appointmentId} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800 text-xs">{a.tokenNumber}</span>
                    <span className="font-semibold text-brand-700 text-[11px]">{a.timeSlot}</span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900">{a.patientName}</h4>
                    <p className="text-slate-500 text-[11px]">
                      Dr. {a.doctorName} &bull; {a.departmentName}
                    </p>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleStatusChange(a.appointmentId, 'checked_in')}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-1 rounded-lg text-xs transition flex items-center space-x-1 shadow-sm"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Mark Patient Arrived</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Schedule Outpatient Appointment"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
          {bookingError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{bookingError}</span>
            </div>
          )}

          {/* Patient Selection */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
            <select
              required
              value={bookForm.patientId}
              onChange={e => setBookForm({ ...bookForm, patientId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            >
              <option value="">-- Choose Registered Patient (UHID) --</option>
              {patients.map(p => (
                <option key={p.uhid} value={p.uhid}>
                  {p.uhid} - {p.firstName} {p.lastName} ({p.phone})
                </option>
              ))}
            </select>
          </div>

          {/* Doctor & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Consulting Doctor *</label>
              <select
                required
                value={bookForm.doctorId}
                onChange={e => handleDoctorSelect(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              >
                <option value="">-- Choose Doctor --</option>
                {doctors.map(d => (
                  <option key={d.userId} value={d.userId}>
                    {d.fullName} ({d.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department</label>
              <select
                required
                value={bookForm.departmentId}
                onChange={e => setBookForm({ ...bookForm, departmentId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              >
                {departments.map(dep => (
                  <option key={dep.deptId} value={dep.deptId}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time Slot (with Conflict Check) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Appointment Date *</label>
              <input
                type="date"
                required
                value={bookForm.appointmentDate}
                onChange={e => setBookForm({ ...bookForm, appointmentDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Time Slot *</label>
              <select
                required
                value={bookForm.timeSlot}
                onChange={e => setBookForm({ ...bookForm, timeSlot: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white font-medium"
              >
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Chief Reason for Visit</label>
            <input
              type="text"
              value={bookForm.reasonForVisit}
              onChange={e => setBookForm({ ...bookForm, reasonForVisit: e.target.value })}
              placeholder="e.g. Chronic joint ache, Diabetes routine checkup"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submittingBooking}
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md shadow-brand-500/20 disabled:opacity-50"
            >
              {submittingBooking ? 'Booking...' : 'Confirm & Generate Queue Token'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
