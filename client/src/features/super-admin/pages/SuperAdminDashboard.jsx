import React from 'react';
import {
  PlatformOverview,
  PlatformAnalytics,
  SystemHealth,
  HospitalTenants,
  TenantOnboarding,
  BranchManagement,
  SubscriptionPlans,
  TenantSubscriptions,
  PlatformInvoices,
  PaymentsTransactions,
  UsageLimits,
  ModuleManagement,
  PlatformSettings,
  GlobalConfiguration,
  PlatformUsers,
  HospitalUsers,
  RolesPermissions,
  SecurityAuditTrail,
  LoginSessions,
  SystemLogs,
  SecurityAlerts,
  SupportTickets,
  PlatformNotifications,
  MaintenanceManagement,
  IntegrationManagement,
  SuperAdminProfile,
  SuperAdminPassword
} from '../components';

export default function SuperAdminDashboard({ activeTab = 'saas_overview', setActiveTab }) {
  switch (activeTab) {
    // 1. Main
    case 'saas_overview':
    case 'dashboard':
      return <PlatformOverview setActiveTab={setActiveTab} />;
    case 'saas_analytics':
      return <PlatformAnalytics />;
    case 'saas_health':
      return <SystemHealth />;

    // 2. Tenant Management
    case 'saas_tenants':
      return <HospitalTenants />;
    case 'saas_onboarding':
      return <TenantOnboarding setActiveTab={setActiveTab} />;
    case 'saas_branches':
      return <BranchManagement />;

    // 3. Subscriptions & Billing
    case 'saas_plans':
      return <SubscriptionPlans />;
    case 'saas_subscriptions':
      return <TenantSubscriptions />;
    case 'saas_invoices':
      return <PlatformInvoices />;
    case 'saas_transactions':
      return <PaymentsTransactions />;
    case 'saas_usage':
      return <UsageLimits />;

    // 4. Platform Configuration
    case 'saas_modules':
      return <ModuleManagement />;
    case 'saas_settings':
      return <PlatformSettings />;
    case 'saas_config':
      return <GlobalConfiguration />;

    // 5. Access Control
    case 'saas_platform_users':
      return <PlatformUsers />;
    case 'saas_hospital_users':
      return <HospitalUsers />;
    case 'saas_roles':
      return <RolesPermissions />;

    // 6. Security & Monitoring
    case 'saas_audit':
      return <SecurityAuditTrail />;
    case 'saas_sessions':
      return <LoginSessions />;
    case 'saas_logs':
      return <SystemLogs />;
    case 'saas_alerts':
      return <SecurityAlerts />;

    // 7. Support & Operations
    case 'saas_tickets':
      return <SupportTickets />;
    case 'saas_notifications':
      return <PlatformNotifications />;
    case 'saas_maintenance':
      return <MaintenanceManagement />;
    case 'saas_integrations':
      return <IntegrationManagement />;

    // 8. Account
    case 'saas_profile':
      return <SuperAdminProfile setActiveTab={setActiveTab} />;
    case 'saas_password':
      return <SuperAdminPassword setActiveTab={setActiveTab} />;

    default:
      return <PlatformOverview setActiveTab={setActiveTab} />;
  }
}
