import express from 'express';
import {
  getServices,
  getDepartments,
  createOrUpdateService,
  updateServiceStatus,
  deleteService
} from '../controllers/catalogController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { enforceTenantIsolation } from '../middleware/tenant.js';

const router = express.Router();

router.use(authenticate);
router.use(enforceTenantIsolation);

router.get('/services', getServices);
router.get('/departments', getDepartments);
router.post('/services', authorize(['super_admin', 'hospital_admin']), createOrUpdateService);
router.patch('/services/:serviceCode/status', authorize(['super_admin', 'hospital_admin']), updateServiceStatus);
router.put('/services/:serviceCode/status', authorize(['super_admin', 'hospital_admin']), updateServiceStatus);
router.delete('/services/:serviceCode', authorize(['super_admin', 'hospital_admin']), deleteService);

export default router;
