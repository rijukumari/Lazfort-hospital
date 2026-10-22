import React, { createContext, useContext, useState } from 'react';
import {
  initialTenants,
  initialPlans,
  initialPlatformUsers,
  initialHospitalUsers,
  initialAuditRecords,
  initialSupportTickets,
  initialNotifications,
  initialIntegrations,
  initialBranches,
  initialInvoices,
  initialRolePermissions
} from '../services/saasMockData';

const SaaSContext = createContext(null);

export function SaaSProvider({ children }) {
  const [tenants, setTenants] = useState(initialTenants);
  const [plans, setPlans] = useState(initialPlans);
  const [platformUsers, setPlatformUsers] = useState(initialPlatformUsers);
  const [hospitalUsers, setHospitalUsers] = useState(initialHospitalUsers);
  const [auditRecords, setAuditRecords] = useState(initialAuditRecords);
  const [tickets, setTickets] = useState(initialSupportTickets);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [branches, setBranches] = useState(initialBranches);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [rolePermissions, setRolePermissions] = useState(initialRolePermissions);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Tenant Handlers
  const addTenant = (tenantData) => {
    const newId = `TEN-${tenantData.code || 'HSP'}-${Math.floor(100 + Math.random() * 900)}`;
    const newTenant = {
      ...tenantData,
      id: newId,
      status: 'Active',
      totalUsers: 1,
      branchesCount: 1,
      regDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      storageUsed: '1 GB',
      paymentStatus: 'Paid',
      mrr: tenantData.plan === 'Enterprise' ? 75000 : tenantData.plan === 'Professional' ? 35000 : 15000
    };

    setTenants(prev => [newTenant, ...prev]);

    // Log in audit trail
    addAuditRecord({
      action: 'TENANT_ONBOARDED',
      tenant: `${newTenant.id} (${newTenant.name})`,
      status: 'Success',
      details: `Hospital onboarded on ${newTenant.plan} plan.`
    });

    showToast(`Hospital tenant ${newTenant.name} (${newTenant.id}) successfully created!`);
    return newTenant;
  };

  const updateTenant = (id, updatedFields) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
    addAuditRecord({
      action: 'TENANT_UPDATED',
      tenant: id,
      status: 'Success',
      details: `Tenant configuration modified.`
    });
    showToast(`Tenant ${id} updated successfully!`);
  };

  const toggleTenantStatus = (id, newStatus, reason = '') => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    addAuditRecord({
      action: newStatus === 'Active' ? 'TENANT_ACTIVATED' : 'TENANT_SUSPENDED',
      tenant: id,
      status: 'Success',
      details: `Status changed to ${newStatus}. ${reason ? `Reason: ${reason}` : ''}`
    });
    showToast(`Tenant ${id} status set to ${newStatus}!`);
  };

  // Plan Handlers
  const addPlan = (planData) => {
    const newId = `PLAN-${planData.tier.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const newPlan = {
      ...planData,
      id: newId,
      status: 'Active',
      activeTenantsCount: 0
    };
    setPlans(prev => [...prev, newPlan]);
    showToast(`Subscription plan ${newPlan.name} created successfully!`);
    return newPlan;
  };

  const updatePlan = (id, updatedFields) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    showToast(`Plan ${id} updated successfully!`);
  };

  const togglePlanStatus = (id) => {
    setPlans(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`Plan ${p.name} status changed to ${nextStatus}!`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  // Support Ticket Handlers
  const updateTicketStatus = (id, newStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    showToast(`Support ticket ${id} marked as ${newStatus}!`);
  };

  // Notification Broadcast Handlers
  const addNotification = (notifData) => {
    const newNotif = {
      ...notifData,
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Broadcast Sent'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Platform notification "${newNotif.title}" broadcasted to ${newNotif.target}!`);
    return newNotif;
  };

  // Integration Handlers
  const updateIntegration = (id, updatedFields) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, ...updatedFields } : i));
    showToast(`Integration ${id} updated successfully!`);
  };

  const testIntegration = (id) => {
    showToast(`Connection test for ${id}: 200 OK — Ping latency 42ms.`);
  };

  // Audit Records
  const addAuditRecord = ({ action, tenant, status = 'Success', details = '' }) => {
    const newRecord = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      user: 'superadmin@lazfort.com',
      role: 'SaaS Super Admin',
      action,
      tenant: tenant || 'GLOBAL_PLATFORM',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      ip: '103.22.18.44',
      status,
      details
    };
    setAuditRecords(prev => [newRecord, ...prev]);
  };

  // Permissions Matrix
  const updatePermission = (roleName, field) => {
    setRolePermissions(prev => prev.map(r => {
      if (r.role === roleName) {
        return { ...r, [field]: !r[field] };
      }
      return r;
    }));
    showToast(`Updated ${field.toUpperCase()} permission for role ${roleName}. (Prototype matrix updated)`);
  };

  return (
    <SaaSContext.Provider
      value={{
        tenants,
        addTenant,
        updateTenant,
        toggleTenantStatus,
        plans,
        addPlan,
        updatePlan,
        togglePlanStatus,
        platformUsers,
        setPlatformUsers,
        hospitalUsers,
        setHospitalUsers,
        auditRecords,
        addAuditRecord,
        tickets,
        updateTicketStatus,
        notifications,
        addNotification,
        integrations,
        updateIntegration,
        testIntegration,
        branches,
        setBranches,
        invoices,
        setInvoices,
        rolePermissions,
        updatePermission,
        toast,
        showToast
      }}
    >
      {children}
      {/* Toast popup */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs animate-in slide-in-from-bottom-2 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="font-semibold text-slate-100">{toast.message}</span>
        </div>
      )}
    </SaaSContext.Provider>
  );
}

export const useSaaS = () => {
  const context = useContext(SaaSContext);
  if (!context) {
    throw new Error('useSaaS must be used within a SaaSProvider');
  }
  return context;
};
