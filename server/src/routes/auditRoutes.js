import express from 'express';
import { getAuditLogs } from '../controllers/auditController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { enforceTenantIsolation } from '../middleware/tenant.js';

const router = express.Router();

router.use(authenticate);
router.use(enforceTenantIsolation);

router.get('/logs', authorize(['super_admin', 'hospital_admin', 'billing_executive']), getAuditLogs);

export default router;
