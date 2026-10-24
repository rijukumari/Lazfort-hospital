import React from 'react';
import BaseRoleLayout from './BaseRoleLayout';
import {
  LayoutDashboard,
  UserPlus,
  CalendarClock,
  Stethoscope,
  FileText,
  HeartPulse,
  Activity,
  TestTube,
  UserCog,
  Building2,
  GitFork,
  SlidersHorizontal,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  UserCircle
} from 'lucide-react';

export default function HospitalAdminLayout({
  activeTab,
  setActiveTab,
  children
}) {
  const navSections = [
    {
      title: 'HOSPITAL OPERATIONS',
      items: [
        { id: 'dashboard', label: 'Hospital Dashboard', icon: LayoutDashboard },
        { id: 'patients', label: 'Patient Registration', icon: UserPlus },
        { id: 'appointments', label: 'Appointments & OPD Queue', icon: CalendarClock },
        { id: 'clinical', label: 'Clinical Consultation', icon: Stethoscope, badge: 'Live OPD' },
        { id: 'clinical_records', label: 'Clinical Records & Prescriptions', icon: FileText },
        { id: 'nurse_station', label: 'Nurse Triage & Vitals', icon: HeartPulse },
        { id: 'pharmacy_lab', label: 'Pharmacy & Lab Operations', icon: TestTube }
      ]
    },
    {
      title: 'HOSPITAL ADMINISTRATION',
      items: [
        { id: 'staff', label: 'Staff & Doctor Directory', icon: UserCog },
        { id: 'departments', label: 'Clinical Departments', icon: Building2 },
        { id: 'hospital_branches', label: 'Hospital Branches', icon: GitFork },
        { id: 'hospital_services', label: 'Hospital Services & Facilities', icon: Activity },
        { id: 'hospital_settings', label: 'Hospital Settings & OPD Timings', icon: SlidersHorizontal },
        { id: 'tariffs', label: 'Service Tariffs & Charges', icon: FileSpreadsheet },
        { id: 'billing', label: 'Billing & Invoicing', icon: Receipt },
        { id: 'payments_refunds', label: 'Payments & Refunds', icon: CreditCard },
        { id: 'operational_reports', label: 'Operational Reports', icon: BarChart3 },
        { id: 'revenue_collections', label: 'Revenue & Collections', icon: TrendingUp },
        { id: 'hospital_users_roles', label: 'Roles & Permissions', icon: ShieldCheck },
        { id: 'audit', label: 'Security & Audit Logs', icon: ShieldAlert }
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { id: 'my_profile', label: 'My Profile', icon: UserCircle }
      ]
    }
  ];

  return (
    <BaseRoleLayout
      roleTitle="Hospital Administrator"
      roleBadge="Admin"
      navSections={navSections}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      profileData={{
        name: 'Dr. Alok Verma',
        role: 'Hospital Admin',
        subtitle: 'Indiranagar Branch'
      }}
      footerNote="Hospital Management Console &bull; NABH Ready"
    >
      {children}
    </BaseRoleLayout>
  );
}
