import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { ServiceCatalog } from '../models/ServiceCatalog.js';
import { Department } from '../models/Department.js';
import { logAuditEvent } from '../middleware/audit.js';

export const getServices = async (req, res) => {
  try {
    const { category, search } = req.query;
    let services = [];

    if (isMongoDBActive()) {
      const filter = { tenantId: req.tenantId, active: true };
      if (category) filter.category = category;
      if (search) filter.name = { $regex: search, $options: 'i' };
      services = await ServiceCatalog.find(filter).sort({ category: 1, name: 1 }).lean();
    } else {
      services = inMemoryStore.serviceCatalog.filter(s => {
        if (s.tenantId !== req.tenantId || !s.active) return false;
        if (category && s.category !== category) return false;
        if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });
      services.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    }

    return res.json({ success: true, count: services.length, services });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    let departments = [];
    if (isMongoDBActive()) {
      departments = await Department.find({ tenantId: req.tenantId, active: true }).lean();
    } else {
      departments = inMemoryStore.departments.filter(d => d.tenantId === req.tenantId && d.active);
    }
    return res.json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrUpdateService = async (req, res) => {
  const { serviceCode, name, category, department, standardPrice, taxPercent, description } = req.body;

  if (!serviceCode || !name || !category || standardPrice === undefined) {
    return res.status(400).json({ success: false, message: 'Missing required tariff configuration fields.' });
  }

  try {
    let result = null;
    const payload = {
      tenantId: req.tenantId,
      serviceCode: serviceCode.trim().toUpperCase(),
      name: name.trim(),
      category,
      department: department || 'General',
      standardPrice: Number(standardPrice),
      taxPercent: Number(taxPercent || 0),
      description: description || '',
      active: true,
      updatedAt: new Date()
    };

    if (isMongoDBActive()) {
      result = await ServiceCatalog.findOneAndUpdate(
        { tenantId: req.tenantId, serviceCode: payload.serviceCode },
        payload,
        { upsert: true, new: true }
      ).lean();
    } else {
      const idx = inMemoryStore.serviceCatalog.findIndex(
        s => s.tenantId === req.tenantId && s.serviceCode === payload.serviceCode
      );
      if (idx !== -1) {
        inMemoryStore.serviceCatalog[idx] = { ...inMemoryStore.serviceCatalog[idx], ...payload };
        result = inMemoryStore.serviceCatalog[idx];
      } else {
        payload.createdAt = new Date();
        inMemoryStore.serviceCatalog.push(payload);
        result = payload;
      }
    }

    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: 'TARIFF_MODIFIED',
      entityType: 'ServiceCatalog',
      entityId: payload.serviceCode,
      details: `Tariff updated for ${payload.name}: ₹${payload.standardPrice} (+${payload.taxPercent}% tax)`,
      metadata: payload,
      ipAddress: req.ip
    });

    return res.json({ success: true, message: 'Tariff saved successfully', service: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
