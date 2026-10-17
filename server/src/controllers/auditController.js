import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';
import { AuditLog } from '../models/AuditLog.js';

export const getAuditLogs = async (req, res) => {
  try {
    const { action, actorId, limit = 50 } = req.query;
    let logs = [];

    if (isMongoDBActive()) {
      const filter = { tenantId: req.tenantId };
      if (action) filter.action = action;
      if (actorId) filter.actorId = actorId;
      logs = await AuditLog.find(filter).sort({ timestamp: -1 }).limit(Number(limit)).lean();
    } else {
      logs = inMemoryStore.auditLogs.filter(l => {
        if (l.tenantId !== req.tenantId) return false;
        if (action && l.action !== action) return false;
        if (actorId && l.actorId !== actorId) return false;
        return true;
      });
      logs = logs.slice(0, Number(limit));
    }

    return res.json({ success: true, count: logs.length, logs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
