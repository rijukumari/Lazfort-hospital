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
router.put('/:uhid', authorize(['super_admin', 'hospital_admin', 'receptionist', 'nurse']), updatePatient);

export default router;
