import React from 'react';
import BaseRoleLayout from './BaseRoleLayout';
import {
  LayoutDashboard,
  UserPlus,
  CalendarClock,
  Search as SearchIcon,
  Receipt,
  CreditCard,
  UserCircle,
  LogOut
} from 'lucide-react';

export default function ReceptionistLayout({
  activeTab,
  setActiveTab,
  children
}) {
  const navSections = [
    {
      title: 'CLINICAL OPERATIONS',
      items: [
        { id: 'dashboard', label: 'Reception Dashboard', icon: LayoutDashboard },
        { id: 'patients', label: 'Patient Registration', icon: UserPlus },
        { id: 'appointments', label: 'Appointments & OPD Queue', icon: CalendarClock },
        { id: 'patient_search', label: 'Patient Search & Records', icon: SearchIcon }
      ]
    },
    {
      title: 'BILLING',
      items: [
        { id: 'billing', label: 'Billing & Invoicing', icon: Receipt },
        { id: 'payments_receipts', label: 'Payments & Receipts', icon: CreditCard }
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
      roleTitle="Reception Desk & OPD Triage"
      roleBadge="Reception"
      navSections={navSections}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      profileData={{
        name: 'Pooja Verma',
        role: 'Receptionist',
        subtitle: 'Front Desk & Patient Services'
      }}
      footerNote="Fast OPD Queue &bull; Patient Service Desk"
    >
      {children}
    </BaseRoleLayout>
  );
}
