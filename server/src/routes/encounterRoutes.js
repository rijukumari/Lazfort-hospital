import express from 'express';
import {
  getEncounter,
  saveDraftEncounter,
  finalizeEncounter
} from '../controllers/encounterController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { enforceTenantIsolation } from '../middleware/tenant.js';

const router = express.Router();

router.use(authenticate);
router.use(enforceTenantIsolation);

router.get('/:id', getEncounter);
router.post('/draft', authorize(['doctor', 'nurse', 'hospital_admin']), saveDraftEncounter);
router.post('/:encounterId/finalize', authorize(['doctor', 'hospital_admin']), finalizeEncounter);

export default router;
