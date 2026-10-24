import React from 'react';
import DoctorEncounter from '../DoctorEncounter';
import AppointmentsQueue from '../AppointmentsQueue';
import NurseStation from '../NurseStation';
import {
  ClinicalRecordsView,
  MyPatientsView,
  DoctorProfileTimingsView,
  DoctorLeaveAvailabilityView,
  DoctorNotificationsView,
  MyProfileView
} from '../hospital/HospitalAdminViews';

export default function DoctorPage({
  activeTab,
  setActiveTab,
  consultAppointment,
  onStartConsultation
}) {
  switch (activeTab) {
    case 'clinical':
      return <DoctorEncounter initialAppointment={consultAppointment} />;
    case 'appointments':
      return <AppointmentsQueue onStartConsultation={onStartConsultation} />;
    case 'clinical_records':
      return <ClinicalRecordsView />;
    case 'nurse_station':
      return <NurseStation />;
    case 'my_patients':
    case 'patients':
    case 'patient':
      return <MyPatientsView onStartConsultation={onStartConsultation} />;
    case 'doctor_profile_timings':
      return <DoctorProfileTimingsView />;
    case 'doctor_leave_availability':
      return <DoctorLeaveAvailabilityView />;
    case 'doctor_notifications':
      return <DoctorNotificationsView />;
    case 'my_profile':
      return <MyProfileView />;
    default:
      return <DoctorEncounter initialAppointment={consultAppointment} />;
  }
}
