import express from 'express';
import {
  getAppointments,
  getQueue,
  bookAppointment,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';
import { authenticate } from '../middleware/auth.js';
import { enforceTenantIsolation } from '../middleware/tenant.js';

const router = express.Router();

router.use(authenticate);
router.use(enforceTenantIsolation);

router.get('/', getAppointments);
router.get('/queue', getQueue);
router.post('/', bookAppointment);
router.patch('/:appointmentId/status', updateAppointmentStatus);

export default router;
