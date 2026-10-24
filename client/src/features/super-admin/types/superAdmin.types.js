/**
 * Super Admin Domain Types, Tab Enums and Constants
 */

export const SUPER_ADMIN_TABS = {
  // Main
  OVERVIEW: 'saas_overview',
  ANALYTICS: 'saas_analytics',
  HEALTH: 'saas_health',
  
  // Tenant Management
  TENANTS: 'saas_tenants',
  ONBOARDING: 'saas_onboarding',
  BRANCHES: 'saas_branches',
  
  // Subscriptions & Billing
  PLANS: 'saas_plans',
  SUBSCRIPTIONS: 'saas_subscriptions',
  INVOICES: 'saas_invoices',
  TRANSACTIONS: 'saas_transactions',
  USAGE: 'saas_usage',
  
  // Platform Configuration
  MODULES: 'saas_modules',
  SETTINGS: 'saas_settings',
  CONFIG: 'saas_config',
  
  // Access Control
  PLATFORM_USERS: 'saas_platform_users',
  HOSPITAL_USERS: 'saas_hospital_users',
  ROLES: 'saas_roles',
  
  // Security & Monitoring
  AUDIT: 'saas_audit',
  SESSIONS: 'saas_sessions',
  LOGS: 'saas_logs',
  ALERTS: 'saas_alerts',
  
  // Support & Operations
  TICKETS: 'saas_tickets',
  NOTIFICATIONS: 'saas_notifications',
  MAINTENANCE: 'saas_maintenance',
  INTEGRATIONS: 'saas_integrations',
  
  // Account
  PROFILE: 'saas_profile',
  PASSWORD: 'saas_password'
};

export const PLAN_TIERS = {
  BASIC: 'Basic Clinic',
  PROFESSIONAL: 'Professional Hospital',
  ENTERPRISE: 'Enterprise Tier',
  ENTERPRISE_PLUS: 'Enterprise Plus'
};

export const TENANT_STATUS = {
  ACTIVE: 'Active',
  TRIAL: 'Trial Active',
  SUSPENDED: 'Suspended',
  PENDING: 'Pending Approval'
};
