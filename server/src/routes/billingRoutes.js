import express from 'express';
import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  recordPayment,
  processRefund
} from '../controllers/billingController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { enforceTenantIsolation } from '../middleware/tenant.js';

const router = express.Router();

router.use(authenticate);
router.use(enforceTenantIsolation);

router.get('/invoices', getInvoices);
router.get('/invoices/:invoiceId', getInvoiceById);
router.post('/invoices', authorize(['super_admin', 'hospital_admin', 'billing_executive', 'receptionist']), createInvoice);
router.post('/invoices/:invoiceId/pay', authorize(['super_admin', 'hospital_admin', 'billing_executive']), recordPayment);
router.post('/invoices/:invoiceId/refund', authorize(['super_admin', 'hospital_admin', 'billing_executive']), processRefund);

export default router;
