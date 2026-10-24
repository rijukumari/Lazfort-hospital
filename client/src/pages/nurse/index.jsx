import React from 'react';
import Patients from '../Patients';
import AppointmentsQueue from '../AppointmentsQueue';
import NurseStation from '../NurseStation';
import {
  NurseDashboardView,
  AssignedPatientsView,
  CareTasksView,
  ClinicalRecordsView,
  ShiftHandoverView,
  NurseNotificationsView,
  MyProfileView
} from '../hospital/HospitalAdminViews';

export default function NursePage({
  activeTab,
  setActiveTab,
  onStartConsultation
}) {
  switch (activeTab) {
    case 'nurse_dashboard':
    case 'dashboard':
      return <NurseDashboardView setActiveTab={setActiveTab} />;
    case 'nurse_station':
      return <NurseStation />;
    case 'patients':
    case 'patient':
    case 'patient_registration':
      return <Patients onSelectPatientForConsult={onStartConsultation} />;
    case 'appointments':
      return <AppointmentsQueue onStartConsultation={onStartConsultation} />;
    case 'assigned_patients':
      return <AssignedPatientsView setActiveTab={setActiveTab} />;
    case 'care_tasks':
      return <CareTasksView setActiveTab={setActiveTab} />;
    case 'clinical_records':
      return <ClinicalRecordsView />;
    case 'shift_handover':
      return <ShiftHandoverView />;
    case 'nurse_notifications':
      return <NurseNotificationsView setActiveTab={setActiveTab} />;
    case 'my_profile':
      return <MyProfileView />;
    default:
      return <NurseDashboardView setActiveTab={setActiveTab} />;
  }
}
