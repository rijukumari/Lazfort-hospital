import express from 'express';
import {
  getAllPatients,
  getPatientByUhid,
  checkDuplicates,
  registerPatient,
  updatePatient
} from '../controllers/patientController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { enforceTenantIsolation } from '../middleware/tenant.js';

const router = express.Router();

router.use(authenticate);
router.use(enforceTenantIsolation);

router.get('/', getAllPatients);
router.get('/check-duplicates', checkDuplicates);
router.get('/:uhid', getPatientByUhid);
router.post('/', authorize(['super_admin', 'hospital_admin', 'receptionist']), registerPatient);
router.put('/:uhid', (req, res, next) => {
  if (req.user?.role === 'patient') {
    const userUhid = req.user.licenseNumber?.replace('UHID-', '') || (req.user.fullName?.match(/LZF-\d{4}-\d{4}/)?.[0]) || 'LZF-2026-0001';
    if (req.params.uhid === userUhid) {
      return next();
    }
    return res.status(403).json({ success: false, message: 'Forbidden. Patients can only update their own profile.' });
  }
  authorize(['super_admin', 'hospital_admin', 'receptionist', 'nurse'])(req, res, next);
}, updatePatient);

export default router;
