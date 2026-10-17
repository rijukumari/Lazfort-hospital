import express from 'express';
import { getDashboardMetrics } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';
import { enforceTenantIsolation } from '../middleware/tenant.js';

const router = express.Router();

router.use(authenticate);
router.use(enforceTenantIsolation);

router.get('/metrics', getDashboardMetrics);

export default router;
