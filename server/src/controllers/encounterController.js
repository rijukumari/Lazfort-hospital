import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { Encounter } from '../models/Encounter.js';
import { Prescription } from '../models/Prescription.js';
import { Appointment } from '../models/Appointment.js';
import { logAuditEvent } from '../middleware/audit.js';

export const getEncounter = async (req, res) => {
  const { id } = req.params; // encounterId or appointmentId
  try {
    let encounter = null;
    let prescription = null;

    if (isMongoDBActive()) {
      encounter = await Encounter.findOne({
        tenantId: req.tenantId,
        $or: [{ encounterId: id }, { appointmentId: id }]
      }).lean();

      if (encounter) {
        prescription = await Prescription.findOne({
          tenantId: req.tenantId,
          encounterId: encounter.encounterId
        }).lean();
      }
    } else {
      encounter = inMemoryStore.encounters.find(
        e => e.tenantId === req.tenantId && (e.encounterId === id || e.appointmentId === id)
      );
      if (encounter) {
        prescription = inMemoryStore.prescriptions.find(
          p => p.tenantId === req.tenantId && p.encounterId === encounter.encounterId
        );
      }
    }

    if (!encounter) {
      return res.status(404).json({ success: false, message: 'Encounter record not found' });
    }

    return res.json({ success: true, encounter, prescription });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const saveDraftEncounter = async (req, res) => {
  const {
    appointmentId,
    patientId,
    patientName,
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
  } = req.body;

  if (!appointmentId || !patientId || !chiefComplaint) {
    return res.status(400).json({
      success: false,
      message: 'Appointment ID, Patient UHID, and Chief Complaint are required.'
    });
  }

  try {
    let existing = null;
    if (isMongoDBActive()) {
      existing = await Encounter.findOne({ tenantId: req.tenantId, appointmentId });
    } else {
      existing = inMemoryStore.encounters.find(e => e.tenantId === req.tenantId && e.appointmentId === appointmentId);
    }

    // Check if already finalized (BR-04)
    if (existing && existing.status === 'finalized') {
      return res.status(403).json({
        success: false,
        message: 'This encounter has already been finalized. Post-finalization edits require an authorized amendment.'
      });
    }

    const doctorName = req.user.fullName || 'Dr. Consultant';
    const doctorId = req.user.userId;
    const departmentName = req.user.department || 'General Medicine';

    let encounterRecord = null;
    const encounterId = existing ? existing.encounterId : `ENC-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`;

    const payload = {
      tenantId: req.tenantId,
      encounterId,
      appointmentId,
      patientId,
      patientName: patientName || 'Patient',
      doctorId,
      doctorName,
      departmentName,
      vitals: vitals || {},
      chiefComplaint,
      historyOfPresentIllness: historyOfPresentIllness || '',
      pastMedicalHistory: pastMedicalHistory || '',
      systemicExamination: systemicExamination || '',
      provisionalDiagnosis: provisionalDiagnosis || '',
      icd10Code: icd10Code || '',
      assessmentPlan: assessmentPlan || '',
      disposition: disposition || 'discharge_home',
      followUpDate: followUpDate || null,
      status: 'draft',
      updatedAt: new Date()
    };

    if (isMongoDBActive()) {
      if (existing) {
        encounterRecord = await Encounter.findOneAndUpdate(
          { tenantId: req.tenantId, appointmentId },
          payload,
          { new: true }
        ).lean();
      } else {
        payload.createdAt = new Date();
        encounterRecord = await Encounter.create(payload);
      }
    } else {
      if (existing) {
        const idx = inMemoryStore.encounters.findIndex(e => e.tenantId === req.tenantId && e.appointmentId === appointmentId);
        inMemoryStore.encounters[idx] = { ...inMemoryStore.encounters[idx], ...payload };
        encounterRecord = inMemoryStore.encounters[idx];
      } else {
        payload.createdAt = new Date();
        inMemoryStore.encounters.push(payload);
        encounterRecord = payload;
      }
    }

    return res.json({
      success: true,
      message: 'Encounter clinical draft saved',
      encounter: encounterRecord
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const finalizeEncounter = async (req, res) => {
  const { encounterId } = req.params;
  const {
    medicines = [],
    labOrders = [],
    generalAdvice = '',
    dietaryRestrictions = ''
  } = req.body;

  try {
    let encounter = null;
    if (isMongoDBActive()) {
      encounter = await Encounter.findOne({ tenantId: req.tenantId, encounterId });
    } else {
      encounter = inMemoryStore.encounters.find(e => e.tenantId === req.tenantId && e.encounterId === encounterId);
    }

    if (!encounter) {
      return res.status(404).json({ success: false, message: 'Encounter not found' });
    }

    if (encounter.status === 'finalized') {
      return res.status(400).json({ success: false, message: 'Encounter is already finalized.' });
    }

    // Verify clinical authorization (BR-07)
    if (req.user.role !== 'doctor' && req.user.role !== 'hospital_admin') {
      return res.status(403).json({
        success: false,
        message: 'Clinical authorization policy restricts finalization to licensed clinicians.'
      });
    }

    const now = new Date();
    const finalizationStamp = {
      status: 'finalized',
      finalizedAt: now,
      finalizedBy: `${req.user.fullName} (${req.user.role})`,
      updatedAt: now
    };

    if (isMongoDBActive()) {
      encounter = await Encounter.findOneAndUpdate(
        { tenantId: req.tenantId, encounterId },
        finalizationStamp,
        { new: true }
      ).lean();
    } else {
      const idx = inMemoryStore.encounters.findIndex(e => e.tenantId === req.tenantId && e.encounterId === encounterId);
      inMemoryStore.encounters[idx] = { ...inMemoryStore.encounters[idx], ...finalizationStamp };
      encounter = inMemoryStore.encounters[idx];
    }

    // Create / Update Prescription
    const prescriptionId = `RX-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`;
    const prescriptionData = {
      tenantId: req.tenantId,
      prescriptionId,
      encounterId: encounter.encounterId,
      patientId: encounter.patientId,
      patientName: encounter.patientName,
      doctorId: req.user.userId,
      doctorName: req.user.fullName,
      medicines,
      labOrders,
      generalAdvice,
      dietaryRestrictions,
      status: 'active',
      createdAt: now,
      updatedAt: now
    };

    if (isMongoDBActive()) {
      await Prescription.findOneAndUpdate(
        { tenantId: req.tenantId, encounterId: encounter.encounterId },
        prescriptionData,
        { upsert: true, new: true }
      );
      // Mark linked appointment as completed
      await Appointment.findOneAndUpdate(
        { tenantId: req.tenantId, appointmentId: encounter.appointmentId },
        { status: 'completed', consultationEndTime: now }
      );
    } else {
      const pIdx = inMemoryStore.prescriptions.findIndex(
        p => p.tenantId === req.tenantId && p.encounterId === encounter.encounterId
      );
      if (pIdx !== -1) {
        inMemoryStore.prescriptions[pIdx] = prescriptionData;
      } else {
        inMemoryStore.prescriptions.push(prescriptionData);
      }

      // Mark linked appointment as completed
      const aIdx = inMemoryStore.appointments.findIndex(
        a => a.tenantId === req.tenantId && a.appointmentId === encounter.appointmentId
      );
      if (aIdx !== -1) {
        inMemoryStore.appointments[aIdx].status = 'completed';
        inMemoryStore.appointments[aIdx].consultationEndTime = now;
      }
    }

    // Audit Log
    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: 'ENCOUNTER_FINALIZED',
      entityType: 'Encounter',
      entityId: encounterId,
      details: `Encounter finalized by ${req.user.fullName}. Diagnosis: ${encounter.provisionalDiagnosis}. Rx issued with ${medicines.length} medications.`,
      metadata: { encounterId, prescriptionId, medicinesCount: medicines.length },
      ipAddress: req.ip
    });

    return res.json({
      success: true,
      message: 'Encounter finalized and Prescription locked successfully',
      encounter,
      prescription: prescriptionData
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
