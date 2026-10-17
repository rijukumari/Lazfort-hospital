import { AuditLog } from '../models/AuditLog.js';
import { inMemoryStore, isMongoDBActive } from '../services/storageService.js';

export const logAuditEvent = async ({
  tenantId,
  actor,
  action,
  entityType,
  entityId,
  details = '',
  metadata = {},
  ipAddress = '127.0.0.1'
}) => {
  const logEntry = {
    tenantId: tenantId || 'TEN-LAZFORT-001',
    logId: `AUD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`,
    actorId: actor?.userId || 'SYSTEM',
    actorName: actor?.fullName || actor?.username || 'System Agent',
    actorRole: actor?.role || 'system',
    action,
    entityType,
    entityId,
    details,
    metadata,
    ipAddress,
    timestamp: new Date()
  };

  try {
    if (isMongoDBActive()) {
      await AuditLog.create(logEntry);
    } else {
      inMemoryStore.auditLogs.unshift(logEntry);
    }
  } catch (error) {
    console.error('[Audit Log Error]', error.message);
  }
};
