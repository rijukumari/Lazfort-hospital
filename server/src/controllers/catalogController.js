import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { ServiceCatalog } from '../models/ServiceCatalog.js';
import { Department } from '../models/Department.js';
import { logAuditEvent } from '../middleware/audit.js';

export const getServices = async (req, res) => {
  try {
    const { category, search, branchId, status, all } = req.query;
    let services = [];

    const isAll = all === 'true' || all === true;

    if (isMongoDBActive()) {
      const filter = { tenantId: req.tenantId };
      
      // If not requesting all (e.g. Patient Portal or active-only views)
      if (!isAll && !status) {
        filter.$and = [
          { $or: [{ active: true }, { active: { $exists: false } }] },
          { $or: [{ status: 'Active' }, { status: { $exists: false } }, { status: null }] }
        ];
      } else if (status && status !== 'all') {
        filter.status = status;
      }

      if (category && category !== 'all') {
        filter.category = category;
      }

      if (branchId && branchId !== 'ALL' && branchId !== 'all') {
        filter.$or = [
          { branchId: branchId },
          { branchId: 'ALL' },
          { branchId: { $exists: false } },
          { branchId: null },
          { branchId: '' }
        ];
      }

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { serviceCode: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } }
        ];
      }

      services = await ServiceCatalog.find(filter).sort({ category: 1, name: 1 }).lean();
    } else {
      services = inMemoryStore.serviceCatalog.filter(s => {
        if (s.tenantId !== req.tenantId) return false;

        // Status check
        if (!isAll && !status) {
          if (s.status) {
            if (s.status !== 'Active') return false;
          } else if (!s.active) {
            return false;
          }
        } else if (status && status !== 'all') {
          if ((s.status || (s.active ? 'Active' : 'Inactive')) !== status) return false;
        }

        // Category check
        if (category && category !== 'all' && s.category !== category) return false;

        // Branch check
        if (branchId && branchId !== 'ALL' && branchId !== 'all') {
          if (s.branchId && s.branchId !== 'ALL' && s.branchId !== branchId) return false;
        }

        // Search check
        if (search) {
          const q = search.toLowerCase();
          const matchName = (s.name || '').toLowerCase().includes(q);
          const matchCode = (s.serviceCode || '').toLowerCase().includes(q);
          const matchDept = (s.department || '').toLowerCase().includes(q);
          if (!matchName && !matchCode && !matchDept) return false;
        }

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
  const { 
    serviceCode, 
    name, 
    category, 
    department, 
    branchId,
    standardPrice, 
    taxPercent, 
    description,
    bookingEnabled,
    status,
    contactPhone,
    instructions,
    active
  } = req.body;

  if (!serviceCode || !name || !category || standardPrice === undefined) {
    return res.status(400).json({ success: false, message: 'Missing required service fields (code, name, category, standardPrice).' });
  }

  try {
    let result = null;
    const finalStatus = status || (active === false ? 'Inactive' : 'Active');
    const finalActive = finalStatus === 'Active';

    const payload = {
      tenantId: req.tenantId,
      serviceCode: serviceCode.trim().toUpperCase(),
      name: name.trim(),
      category,
      department: department || 'General Medicine',
      branchId: branchId || 'LZF-HQ',
      standardPrice: Number(standardPrice),
      taxPercent: Number(taxPercent || 0),
      description: description || '',
      bookingEnabled: bookingEnabled !== false,
      status: finalStatus,
      active: finalActive,
      contactPhone: contactPhone || '',
      instructions: instructions || '',
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
      action: 'SERVICE_MODIFIED',
      entityType: 'ServiceCatalog',
      entityId: payload.serviceCode,
      details: `Service updated for ${payload.name} (${payload.serviceCode}): Status=${payload.status}, ₹${payload.standardPrice}`,
      metadata: payload,
      ipAddress: req.ip
    });

    return res.json({ success: true, message: 'Service saved successfully', service: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateServiceStatus = async (req, res) => {
  const { serviceCode } = req.params;
  const { status, active } = req.body;

  if (!serviceCode) {
    return res.status(400).json({ success: false, message: 'Service code is required.' });
  }

  const code = serviceCode.trim().toUpperCase();
  const nextStatus = status || (active === true ? 'Active' : 'Inactive');
  const nextActive = nextStatus === 'Active';

  try {
    let updated = null;

    if (isMongoDBActive()) {
      updated = await ServiceCatalog.findOneAndUpdate(
        { tenantId: req.tenantId, serviceCode: code },
        { status: nextStatus, active: nextActive, updatedAt: new Date() },
        { new: true }
      ).lean();
    } else {
      const idx = inMemoryStore.serviceCatalog.findIndex(
        s => s.tenantId === req.tenantId && s.serviceCode === code
      );
      if (idx !== -1) {
        inMemoryStore.serviceCatalog[idx] = {
          ...inMemoryStore.serviceCatalog[idx],
          status: nextStatus,
          active: nextActive,
          updatedAt: new Date()
        };
        updated = inMemoryStore.serviceCatalog[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: `Service ${code} not found.` });
    }

    await logAuditEvent({
      tenantId: req.tenantId,
      actor: req.user,
      action: 'SERVICE_STATUS_CHANGED',
      entityType: 'ServiceCatalog',
      entityId: code,
      details: `Service ${code} status changed to ${nextStatus}`,
      metadata: { status: nextStatus, active: nextActive },
      ipAddress: req.ip
    });

    return res.json({ success: true, message: `Service ${code} is now ${nextStatus}`, service: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req, res) => {
  const { serviceCode } = req.params;
  const code = serviceCode?.trim()?.toUpperCase();

  try {
    if (isMongoDBActive()) {
      await ServiceCatalog.findOneAndUpdate(
        { tenantId: req.tenantId, serviceCode: code },
        { active: false, status: 'Inactive', updatedAt: new Date() }
      );
    } else {
      const idx = inMemoryStore.serviceCatalog.findIndex(
        s => s.tenantId === req.tenantId && s.serviceCode === code
      );
      if (idx !== -1) {
        inMemoryStore.serviceCatalog[idx].active = false;
        inMemoryStore.serviceCatalog[idx].status = 'Inactive';
        inMemoryStore.serviceCatalog[idx].updatedAt = new Date();
      }
    }

    return res.json({ success: true, message: `Service ${code} deactivated successfully.` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
