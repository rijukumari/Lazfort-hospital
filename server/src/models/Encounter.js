import mongoose from 'mongoose';

const encounterSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  encounterId: { type: String, required: true },
  appointmentId: { type: String, required: true, index: true },
  patientId: { type: String, required: true, index: true }, // UHID
  patientName: { type: String, required: true },
  doctorId: { type: String, required: true, index: true },
  doctorName: { type: String, required: true },
  departmentName: { type: String, required: true },
  encounterDate: { type: Date, default: Date.now },
  vitals: {
    bpSystolic: { type: Number },
    bpDiastolic: { type: Number },
    pulseRate: { type: Number },
    temperatureF: { type: Number },
    spO2: { type: Number },
    weightKg: { type: Number },
    heightCm: { type: Number },
    bmi: { type: Number },
    respiratoryRate: { type: Number }
  },
  chiefComplaint: { type: String, required: true },
  historyOfPresentIllness: { type: String },
  pastMedicalHistory: { type: String },
  systemicExamination: { type: String },
  provisionalDiagnosis: { type: String, required: true },
  icd10Code: { type: String },
  assessmentPlan: { type: String, required: true },
  disposition: { 
    type: String, 
    enum: ['discharge_home', 'follow_up_scheduled', 'admit_ipd', 'refer_specialist', 'emergency_transfer'], 
    default: 'discharge_home' 
  },
  followUpDate: { type: Date },
  status: { type: String, enum: ['draft', 'finalized'], default: 'draft', index: true },
  finalizedAt: { type: Date },
  finalizedBy: { type: String },
  amendmentReason: { type: String }
}, { timestamps: true });

encounterSchema.index({ tenantId: 1, encounterId: 1 }, { unique: true });

export const Encounter = mongoose.models.Encounter || mongoose.model('Encounter', encounterSchema);
