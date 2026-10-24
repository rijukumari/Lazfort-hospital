import React from 'react';
import BaseRoleLayout from './BaseRoleLayout';
import {
  LayoutDashboard,
  CalendarClock,
  CalendarPlus,
  Activity,
  Pill,
  FileText,
  FlaskConical,
  Receipt,
  UserCircle,
  LogOut
} from 'lucide-react';

export default function PatientLayout({
  activeTab,
  setActiveTab,
  children
}) {
  const navSections = [
    {
      title: 'PATIENT PORTAL',
      items: [
        { id: 'patient_dashboard', label: 'My Health Portal – Patient Dashboard', icon: LayoutDashboard },
        { id: 'patient_appointments', label: 'My Appointments & Tokens', icon: CalendarClock },
        { id: 'patient_book_opd', label: 'Book New OPD Visit', icon: CalendarPlus, badge: 'Book OPD' },
        { id: 'patient_services', label: 'Hospital Services & Facilities', icon: Activity },
        { id: 'patient_prescriptions', label: 'My Prescriptions', icon: Pill },
        { id: 'patient_medical_records', label: 'My Medical Records', icon: FileText },
        { id: 'patient_lab_reports', label: 'Lab Reports', icon: FlaskConical },
        { id: 'patient_invoices', label: 'Invoices & Receipts', icon: Receipt }
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
      roleTitle="Patient Self-Service Portal"
      roleBadge="Patient"
      navSections={navSections}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      profileData={{
        name: 'Ramesh Kumar',
        role: 'Patient',
        subtitle: 'UHID: LZF-2026-0001'
      }}
      footerNote="ABHA Connected &bull; Universal Patient ID"
    >
      {children}
    </BaseRoleLayout>
  );
}
