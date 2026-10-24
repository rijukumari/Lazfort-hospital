import React from 'react';
import Dashboard from '../Dashboard';
import Patients from '../Patients';
import PatientPortal from '../PatientPortal';
import AppointmentsQueue from '../AppointmentsQueue';
import BillingInvoices from '../BillingInvoices';
import {
  PatientSearchView,
  PaymentsReceiptsView,
  MyProfileView
} from '../hospital/HospitalAdminViews';

export default function ReceptionistPage({
  activeTab,
  setActiveTab,
  onStartConsultation
}) {
  switch (activeTab) {
    case 'dashboard':
      return <Dashboard setActiveTab={setActiveTab} />;
    case 'patients':
    case 'patient':
    case 'patient_registration':
      return <Patients onSelectPatientForConsult={onStartConsultation} />;
    case 'patient_dashboard':
    case 'patient_portal':
      return <PatientPortal activeTab={activeTab} setActiveTab={setActiveTab} />;
    case 'appointments':
      return <AppointmentsQueue onStartConsultation={onStartConsultation} />;
    case 'patient_search':
      return <PatientSearchView setActiveTab={setActiveTab} />;
    case 'billing':
      return <BillingInvoices />;
    case 'payments_receipts':
      return <PaymentsReceiptsView setActiveTab={setActiveTab} />;
    case 'my_profile':
      return <MyProfileView />;
    default:
      return <Dashboard setActiveTab={setActiveTab} />;
  }
}
