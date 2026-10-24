import React from 'react';
import BaseRoleLayout from './BaseRoleLayout';
import {
  Stethoscope,
  CalendarClock,
  FileText,
  HeartPulse,
  Users,
  Clock,
  Calendar,
  UserCircle,
  Bell,
  LogOut
} from 'lucide-react';

export default function DoctorLayout({
  activeTab,
  setActiveTab,
  children
}) {
  const navSections = [
    {
      title: 'CLINICAL WORKSPACE',
      items: [
        { id: 'clinical', label: 'Doctor OPD Consultation', icon: Stethoscope, badge: 'Live OPD' },
        { id: 'appointments', label: 'Appointments & OPD Queue', icon: CalendarClock },
        { id: 'clinical_records', label: 'Clinical Records & Prescriptions', icon: FileText },
        { id: 'nurse_station', label: 'Nurse Triage & Vitals', icon: HeartPulse },
        { id: 'my_patients', label: 'My Patients', icon: Users }
      ]
    },
    {
      title: 'DOCTOR SETTINGS',
      items: [
        { id: 'doctor_profile_timings', label: 'Doctor Profile & Timings', icon: Clock },
        { id: 'doctor_leave_availability', label: 'Leave & Availability', icon: Calendar }
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { id: 'my_profile', label: 'My Profile', icon: UserCircle },
        { id: 'doctor_notifications', label: 'Notifications', icon: Bell, badge: '3' }
      ]
    }
  ];

  return (
    <BaseRoleLayout
      roleTitle="Doctor Clinical Consultation"
      roleBadge="Doctor"
      navSections={navSections}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      profileData={{
        name: 'Dr. Rajesh Sharma, MD',
        role: 'Doctor',
        subtitle: 'General Medicine & Diabetology'
      }}
      footerNote="MCI-2008-41029 &bull; Room 104 OPD"
    >
      {children}
    </BaseRoleLayout>
  );
}
