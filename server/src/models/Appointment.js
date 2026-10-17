import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  appointmentId: { type: String, required: true },
  patientId: { type: String, required: true, ref: 'Patient' }, // UHID
  patientName: { type: String, required: true },
  patientPhone: { type: String },
  patientGender: { type: String },
  patientAge: { type: Number },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  departmentId: { type: String, required: true },
  departmentName: { type: String, required: true },
  appointmentDate: { type: Date, required: true, index: true },
  timeSlot: { type: String, required: true },
  queueNumber: { type: Number, required: true },
  tokenNumber: { type: String, required: true }, // e.g. "Q-01"
  priority: { type: String, enum: ['normal', 'urgent', 'emergency'], default: 'normal' },
  status: { 
    type: String, 
    enum: ['booked', 'checked_in', 'in_consultation', 'completed', 'cancelled'], 
    default: 'booked',
    index: true
  },
  reasonForVisit: { type: String },
  checkInTime: { type: Date },
  consultationStartTime: { type: Date },
  consultationEndTime: { type: Date },
  bookedBy: { type: String }
}, { timestamps: true });

appointmentSchema.index({ tenantId: 1, appointmentId: 1 }, { unique: true });
appointmentSchema.index({ tenantId: 1, doctorId: 1, appointmentDate: 1, timeSlot: 1 });

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
