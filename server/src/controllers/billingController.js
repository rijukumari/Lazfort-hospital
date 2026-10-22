import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { Invoice } from '../models/Invoice.js';
import { Payment } from '../models/Payment.js';
import { ServiceCatalog } from '../models/ServiceCatalog.js';
import { Patient } from '../models/Patient.js';
import { logAuditEvent } from '../middleware/audit.js';

export const getInvoices = async (req, res) => {
  try {
    let { patientId, status } = req.query;
    let invoices = [];

    // Enforce patient privacy: patients can only query their own invoices
    if (req.user?.role === 'patient') {
      const userUhid = req.user.licenseNumber?.replace('UHID-', '') || (req.user.fullName?.match(/LZF-\d{4}-\d{4}/)?.[0]) || 'LZF-2026-0001';
      patientId = userUhid;
    }

    if (isMongoDBActive()) {
      const filter = { tenantId: req.tenantId };
      if (patientId) filter.patientId = patientId;
      if (status) filter.status = status;
      invoices = await Invoice.find(filter).sort({ date: -1 }).lean();
    } else {
      invoices = inMemoryStore.invoices.filter(i => {
        if (i.tenantId !== req.tenantId) return false;
        if (patientId && i.patientId !== patientId) return false;
        if (status && i.status !== status) return false;
        return true;
      });
      invoices.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return res.json({ success: true, count: invoices.length, invoices });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
  const { invoiceId } = req.params;
  try {
    let invoice = null;
    let payments = [];

    if (isMongoDBActive()) {
      invoice = await Invoice.findOne({ tenantId: req.tenantId, invoiceId }).lean();
      if (invoice) {
        payments = await Payment.find({ tenantId: req.tenantId, invoiceId }).sort({ receivedAt: -1 }).lean();
      }
    } else {
      invoice = inMemoryStore.invoices.find(i => i.tenantId === req.tenantId && i.invoiceId === invoiceId);
      if (invoice) {
        payments = inMemoryStore.payments.filter(p => p.tenantId === req.tenantId && p.invoiceId === invoiceId);
      }
    }

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    // Enforce patient privacy
    if (req.user?.role === 'patient') {
      const userUhid = req.user.licenseNumber?.replace('UHID-', '') || (req.user.fullName?.match(/LZF-\d{4}-\d{4}/)?.[0]) || 'LZF-2026-0001';
      if (invoice.patientId !== userUhid) {
        return res.status(403).json({ success: false, message: 'Access denied. You can only view your own authorized invoices.' });
      }
    }

    return res.json({ success: true, invoice, payments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Creates an invoice with STRICT server-side calculation (PRD BR-05).
 * Raw client submitted prices are cross-checked or retrieved directly from tariffs.
 */
export const createInvoice = async (req, res) => {
  const { patientId, encounterId, items = [], notes = '' } = req.body;

  if (!patientId || !items.length) {
    return res.status(400).json({
      success: false,
      message: 'Patient UHID and at least one billable service line item are required.'
    });
  }

  try {
    // Fetch patient
    let patient = null;
    if (isMongoDBActive()) {
      patient = await Patient.findOne({ tenantId: req.tenantId, uhid: patientId }).lean();
    } else {
      patient = inMemoryStore.patients.find(p => p.tenantId === req.tenantId && p.uhid === patientId);
    }

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Retrieve system tariffs
    let tariffs = [];
    if (isMongoDBActive()) {
      tariffs = await ServiceCatalog.find({ tenantId: req.tenantId, active: true }).lean();
    } else {
      tariffs = inMemoryStore.serviceCatalog.filter(s => s.tenantId === req.tenantId && s.active);
    }

    // Calculate server-side totals safely
    let subtotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;
    const computedItems = [];

    for (const rawItem of items) {
      const tariff = tariffs.find(t => t.serviceCode === rawItem.serviceCode);
      const unitPrice = tariff ? tariff.standardPrice : Number(rawItem.unitPrice || 0);
      const taxPercent = tariff ? tariff.taxPercent : Number(rawItem.taxPercent || 0);
      const serviceName = tariff ? tariff.name : (rawItem.serviceName || 'Hospital Service');
      const quantity = Math.max(1, Number(rawItem.quantity || 1));
      const discountPercent = Math.min(100, Math.max(0, Number(rawItem.discountPercent || 0)));

      const lineGross = unitPrice * quantity;
      const lineDiscount = lineGross * (discountPercent / 100);
      const lineTaxable = lineGross - lineDiscount;
      const lineTax = lineTaxable * (taxPercent / 100);
      const itemTotal = Number((lineTaxable + lineTax).toFixed(2));

      subtotal += lineGross;
      totalDiscount += lineDiscount;
      totalTax += lineTax;

      computedItems.push({
        serviceCode: rawItem.serviceCode || 'CUSTOM',
        serviceName,
        quantity,
        unitPrice,
        discountPercent,
        taxPercent,
        itemTotal
      });
    }

    subtotal = Number(subtotal.toFixed(2));
    totalDiscount = Number(totalDiscount.toFixed(2));
    totalTax = Number(totalTax.toFixed(2));
    const grandTotal = Number((subtotal - totalDiscount + totalTax).toFixed(2));

    const invoiceId = `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`;

    const newInvoice = {
      tenantId: req.tenantId,
      invoiceId,
      patientId: patient.uhid,
      patientName: `${patient.firstName} ${patient.lastName}`,
      patientPhone: patient.phone,
      encounterId: encounterId || null,
      date: new Date(),
      items: computedItems,
      subtotal,
      totalDiscount,
      totalTax,
      grandTotal,
      paidAmount: 0,
      balanceDue: grandTotal,
      status: 'unpaid',
      notes,
      createdBy: req.user ? `${req.user.fullName} (${req.user.role})` : 'Billing Desk',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isMongoDBActive()) {
      await Invoice.create(newInvoice);
    } else {
      inMemoryStore.invoices.unshift(newInvoice);
    }

    // Audit Log
    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: 'INVOICE_GENERATED',
      entityType: 'Invoice',
      entityId: invoiceId,
      details: `Generated invoice ${invoiceId} for ${patient.uhid}. Grand Total: ₹${grandTotal}`,
      metadata: { invoiceId, grandTotal, itemsCount: computedItems.length },
      ipAddress: req.ip
    });

    return res.status(201).json({
      success: true,
      message: 'Invoice generated successfully',
      invoice: newInvoice
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Records payment and generates official hospital receipt (PRD FR-010, BR-06).
 */
export const recordPayment = async (req, res) => {
  const { invoiceId } = req.params;
  const { amount, paymentMethod, transactionReference = '', notes = '' } = req.body;

  const payAmount = Number(amount);
  if (!payAmount || payAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Valid payment amount is required.' });
  }

  const validMethods = ['cash', 'upi', 'credit_card', 'debit_card', 'net_banking', 'insurance_tpa'];
  if (!validMethods.includes(paymentMethod)) {
    return res.status(400).json({ success: false, message: `Unsupported payment method: ${paymentMethod}` });
  }

  try {
    let invoice = null;
    if (isMongoDBActive()) {
      invoice = await Invoice.findOne({ tenantId: req.tenantId, invoiceId });
    } else {
      invoice = inMemoryStore.invoices.find(i => i.tenantId === req.tenantId && i.invoiceId === invoiceId);
    }

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    if (invoice.balanceDue <= 0 && invoice.status === 'paid') {
      return res.status(400).json({ success: false, message: 'Invoice is already fully settled.' });
    }

    if (payAmount > invoice.balanceDue + 0.01) {
      return res.status(400).json({
        success: false,
        message: `Payment amount ₹${payAmount} exceeds remaining balance due of ₹${invoice.balanceDue}`
      });
    }

    const newPaidAmount = Number((invoice.paidAmount + payAmount).toFixed(2));
    const newBalanceDue = Number(Math.max(0, invoice.grandTotal - newPaidAmount).toFixed(2));
    const newStatus = newBalanceDue <= 0.01 ? 'paid' : 'partial';

    const paymentId = `PAY-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`;
    const receiptNumber = `RCP-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`;

    const paymentRecord = {
      tenantId: req.tenantId,
      paymentId,
      receiptNumber,
      invoiceId: invoice.invoiceId,
      patientId: invoice.patientId,
      patientName: invoice.patientName,
      amount: payAmount,
      paymentMethod,
      transactionReference,
      receivedBy: req.user ? req.user.fullName : 'Cashier',
      receivedAt: new Date(),
      notes,
      isRefund: false,
      createdAt: new Date()
    };

    if (isMongoDBActive()) {
      await Payment.create(paymentRecord);
      await Invoice.findOneAndUpdate(
        { tenantId: req.tenantId, invoiceId },
        { paidAmount: newPaidAmount, balanceDue: newBalanceDue, status: newStatus, updatedAt: new Date() }
      );
    } else {
      inMemoryStore.payments.unshift(paymentRecord);
      invoice.paidAmount = newPaidAmount;
      invoice.balanceDue = newBalanceDue;
      invoice.status = newStatus;
      invoice.updatedAt = new Date();
    }

    // Audit Log
    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: 'PAYMENT_RECORDED',
      entityType: 'Payment',
      entityId: paymentId,
      details: `Collected ₹${payAmount} via ${paymentMethod} for invoice ${invoiceId}. Receipt: ${receiptNumber}`,
      metadata: { receiptNumber, amount: payAmount, paymentMethod, newBalanceDue },
      ipAddress: req.ip
    });

    return res.status(201).json({
      success: true,
      message: `Payment recorded successfully. Receipt #${receiptNumber} generated.`,
      payment: paymentRecord,
      invoiceStatus: {
        paidAmount: newPaidAmount,
        balanceDue: newBalanceDue,
        status: newStatus
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Authorized Void / Refund with Reason (PRD FR-011).
 */
export const processRefund = async (req, res) => {
  const { invoiceId } = req.params;
  const { reason } = req.body;

  if (!reason || reason.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: 'A formal operational reason (minimum 5 characters) is required to process a refund/void.'
    });
  }

  try {
    let invoice = null;
    if (isMongoDBActive()) {
      invoice = await Invoice.findOne({ tenantId: req.tenantId, invoiceId });
    } else {
      invoice = inMemoryStore.invoices.find(i => i.tenantId === req.tenantId && i.invoiceId === invoiceId);
    }

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const previousStatus = invoice.status;
    const now = new Date();

    if (isMongoDBActive()) {
      await Invoice.findOneAndUpdate(
        { tenantId: req.tenantId, invoiceId },
        { status: 'refunded', voidReason: reason, balanceDue: 0, updatedAt: now }
      );
    } else {
      invoice.status = 'refunded';
      invoice.voidReason = reason;
      invoice.balanceDue = 0;
      invoice.updatedAt = now;
    }

    // Audit Log
    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: 'PAYMENT_REFUNDED',
      entityType: 'Invoice',
      entityId: invoiceId,
      details: `Invoice ${invoiceId} marked refunded/voided by ${req.user.fullName}. Reason: ${reason}`,
      metadata: { previousStatus, reason },
      ipAddress: req.ip
    });

    return res.json({
      success: true,
      message: `Invoice ${invoiceId} marked as refunded. Audit record logged.`,
      invoice
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
