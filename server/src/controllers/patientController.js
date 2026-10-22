import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { Patient } from '../models/Patient.js';
import { Appointment } from '../models/Appointment.js';
import { Encounter } from '../models/Encounter.js';
import { Prescription } from '../models/Prescription.js';
import { Invoice } from '../models/Invoice.js';
import { logAuditEvent } from '../middleware/audit.js';

export const getAllPatients = async (req, res) => {
  // Patients cannot search or list hospital-wide patient records
  if (req.user?.role === 'patient') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Patients cannot view full patient directories.'
    });
  }

  try {
    const { query } = req.query;
    let patients = [];

    if (isMongoDBActive()) {
      const filter = { tenantId: req.tenantId };
      if (query) {
        filter.$or = [
          { uhid: { $regex: query, $options: 'i' } },
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } },
          { phone: { $regex: query, $options: 'i' } }
        ];
      }
      patients = await Patient.find(filter).sort({ createdAt: -1 }).lean();
    } else {
      patients = inMemoryStore.patients.filter(p => p.tenantId === req.tenantId);
      if (query) {
        const q = query.toLowerCase();
        patients = patients.filter(p => 
          p.uhid.toLowerCase().includes(q) ||
          p.firstName.toLowerCase().includes(q) ||
          p.lastName.toLowerCase().includes(q) ||
          p.phone.includes(q)
        );
      }
    }

    return res.json({ success: true, count: patients.length, patients });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPatientByUhid = async (req, res) => {
  const { uhid } = req.params;

  // Enforce patient privacy: patient cannot query another patient's UHID
  if (req.user?.role === 'patient') {
    const userUhid = req.user.licenseNumber?.replace('UHID-', '') || (req.user.fullName?.match(/LZF-\d{4}-\d{4}/)?.[0]) || 'LZF-2026-0001';
    if (uhid !== userUhid) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own authorized health records.'
      });
    }
  }

  try {
    let patient = null;
    let appointments = [];
    let encounters = [];
    let prescriptions = [];
    let invoices = [];

    if (isMongoDBActive()) {
      patient = await Patient.findOne({ tenantId: req.tenantId, uhid }).lean();
      if (patient) {
        appointments = await Appointment.find({ tenantId: req.tenantId, patientId: uhid }).sort({ appointmentDate: -1 }).lean();
        encounters = await Encounter.find({ tenantId: req.tenantId, patientId: uhid }).sort({ encounterDate: -1 }).lean();
        prescriptions = await Prescription.find({ tenantId: req.tenantId, patientId: uhid }).sort({ createdAt: -1 }).lean();
        invoices = await Invoice.find({ tenantId: req.tenantId, patientId: uhid }).sort({ date: -1 }).lean();
      }
    } else {
      patient = inMemoryStore.patients.find(p => p.tenantId === req.tenantId && p.uhid === uhid);
      if (patient) {
        appointments = inMemoryStore.appointments.filter(a => a.tenantId === req.tenantId && a.patientId === uhid);
        encounters = inMemoryStore.encounters.filter(e => e.tenantId === req.tenantId && e.patientId === uhid);
        prescriptions = (inMemoryStore.prescriptions || []).filter(p => p.tenantId === req.tenantId && p.patientId === uhid);
        invoices = inMemoryStore.invoices.filter(i => i.tenantId === req.tenantId && i.patientId === uhid);
      }
    }

    if (!patient) {
      return res.status(404).json({ success: false, message: `Patient with UHID ${uhid} not found.` });
    }

    return res.json({
      success: true,
      patient,
      history: {
        appointments,
        encounters,
        prescriptions,
        invoices
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const checkDuplicates = async (req, res) => {
  const { phone, firstName, lastName } = req.query;
  if (!phone && (!firstName || !lastName)) {
    return res.json({ success: true, duplicates: [] });
  }

  try {
    let matches = [];
    if (isMongoDBActive()) {
      const conditions = [];
      if (phone) conditions.push({ phone });
      if (firstName && lastName) {
        conditions.push({
          firstName: { $regex: `^${firstName}$`, $options: 'i' },
          lastName: { $regex: `^${lastName}$`, $options: 'i' }
        });
      }
      matches = await Patient.find({ tenantId: req.tenantId, $or: conditions }).lean();
    } else {
      matches = inMemoryStore.patients.filter(p => {
        if (p.tenantId !== req.tenantId) return false;
        const phoneMatch = phone && p.phone === phone;
        const nameMatch = firstName && lastName && 
          p.firstName.toLowerCase() === firstName.toLowerCase() && 
          p.lastName.toLowerCase() === lastName.toLowerCase();
        return phoneMatch || nameMatch;
      });
    }

    return res.json({
      success: true,
      hasDuplicates: matches.length > 0,
      duplicates: matches
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const registerPatient = async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    dob,
    age,
    phone,
    email,
    bloodGroup,
    address,
    emergencyContact,
    allergies,
    chronicConditions
  } = req.body;

  if (!firstName || !lastName || !gender || !phone || age === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Required fields missing: First Name, Last Name, Gender, Age, and Phone are mandatory.'
    });
  }

  try {
    // Generate next UHID
    let count = 0;
    if (isMongoDBActive()) {
      count = await Patient.countDocuments({ tenantId: req.tenantId });
    } else {
      count = inMemoryStore.patients.filter(p => p.tenantId === req.tenantId).length;
    }

    const currentYear = new Date().getFullYear();
    const uhidSequence = (count + 1).toString().padStart(4, '0');
    const uhid = `LZF-${currentYear}-${uhidSequence}`;

    // Check if phone already registered to flag duplicate
    let duplicateFlag = false;
    let duplicateNotes = '';
    if (isMongoDBActive()) {
      const existing = await Patient.findOne({ tenantId: req.tenantId, phone });
      if (existing) {
        duplicateFlag = true;
        duplicateNotes = `Suspected duplicate of UHID ${existing.uhid} sharing phone number ${phone}.`;
      }
    } else {
      const existing = inMemoryStore.patients.find(p => p.tenantId === req.tenantId && p.phone === phone);
      if (existing) {
        duplicateFlag = true;
        duplicateNotes = `Suspected duplicate of UHID ${existing.uhid} sharing phone number ${phone}.`;
      }
    }

    const newPatient = {
      tenantId: req.tenantId,
      uhid,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      dob: dob || null,
      age: Number(age),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      bloodGroup: bloodGroup || 'Unknown',
      address: address || { street: '', city: 'Bengaluru', state: 'Karnataka', pincode: '' },
      emergencyContact: emergencyContact || { name: '', relation: '', phone: '' },
      allergies: Array.isArray(allergies) ? allergies : (allergies ? [allergies] : []),
      chronicConditions: Array.isArray(chronicConditions) ? chronicConditions : (chronicConditions ? [chronicConditions] : []),
      duplicateFlag,
      duplicateNotes,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isMongoDBActive()) {
      await Patient.create(newPatient);
    } else {
      inMemoryStore.patients.unshift(newPatient);
    }

    // Audit Log
    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: 'PATIENT_REGISTERED',
      entityType: 'Patient',
      entityId: uhid,
      details: `Registered patient ${newPatient.firstName} ${newPatient.lastName} with UHID ${uhid}`,
      metadata: { uhid, phone: newPatient.phone, duplicateFlag },
      ipAddress: req.ip
    });

    return res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      patient: newPatient
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePatient = async (req, res) => {
  const { uhid } = req.params;
  let updates = req.body;

  // If patient role, restrict to permitted contact and personal details
  if (req.user?.role === 'patient') {
    const { phone, email, address, emergencyContact } = req.body;
    updates = {};
    if (phone) updates.phone = phone.trim();
    if (email !== undefined) updates.email = email.trim();
    if (address) updates.address = address;
    if (emergencyContact) updates.emergencyContact = emergencyContact;
  }

  try {
    let updatedPatient = null;
    if (isMongoDBActive()) {
      updatedPatient = await Patient.findOneAndUpdate(
        { tenantId: req.tenantId, uhid },
        { ...updates, updatedAt: new Date() },
        { new: true }
      ).lean();
    } else {
      const idx = inMemoryStore.patients.findIndex(p => p.tenantId === req.tenantId && p.uhid === uhid);
      if (idx !== -1) {
        inMemoryStore.patients[idx] = {
          ...inMemoryStore.patients[idx],
          ...updates,
          updatedAt: new Date()
        };
        updatedPatient = inMemoryStore.patients[idx];
      }
    }

    if (!updatedPatient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: 'PATIENT_UPDATED',
      entityType: 'Patient',
      entityId: uhid,
      details: `Updated demographic/clinical records for UHID ${uhid}`,
      metadata: updates,
      ipAddress: req.ip
    });

    return res.json({ success: true, message: 'Patient updated', patient: updatedPatient });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
