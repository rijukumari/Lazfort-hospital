import React from 'react';
import BaseRoleLayout from './BaseRoleLayout';
import {
  LayoutDashboard,
  HeartPulse,
  UserPlus,
  CalendarClock,
  Users,
  ClipboardList,
  FileText,
  ArrowLeftRight,
  UserCircle,
  Bell,
  LogOut
} from 'lucide-react';

export default function NurseLayout({
  activeTab,
  setActiveTab,
  children
}) {
  const navSections = [
    {
      title: 'NURSING OPERATIONS',
      items: [
        { id: 'nurse_dashboard', label: 'Nurse Dashboard', icon: LayoutDashboard },
        { id: 'nurse_station', label: 'Nurse Triage & Vitals', icon: HeartPulse, badge: 'Live Triage' },
        { id: 'patients', label: 'Patient Registration', icon: UserPlus },
        { id: 'appointments', label: 'Appointments & OPD Queue', icon: CalendarClock }
      ]
    },
    {
      title: 'PATIENT CARE & TASKS',
      items: [
        { id: 'assigned_patients', label: 'Assigned Patients', icon: Users },
        { id: 'care_tasks', label: 'Care Tasks', icon: ClipboardList, badge: '3' },
        { id: 'clinical_records', label: 'Clinical Records & Prescriptions', icon: FileText },
        { id: 'shift_handover', label: 'Nursing Shift Handover', icon: ArrowLeftRight }
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { id: 'my_profile', label: 'My Profile', icon: UserCircle },
        { id: 'nurse_notifications', label: 'Notifications', icon: Bell, badge: '2' }
      ]
    }
  ];

  return (
    <BaseRoleLayout
      roleTitle="Nurse Station & Patient Care"
      roleBadge="Nurse"
      navSections={navSections}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      profileData={{
        name: 'Sister Marykutty Joseph',
        role: 'Nurse',
        subtitle: 'OPD Nursing Triage'
      }}
      footerNote="Clinical Vitals Telemetry &bull; Shift Triage"
    >
      {children}
    </BaseRoleLayout>
  );
}
