import express from 'express';
import { login, getCurrentUser, getStaff } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { enforceTenantIsolation } from '../middleware/tenant.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);
router.get('/staff', authenticate, enforceTenantIsolation, getStaff);

export default router;
