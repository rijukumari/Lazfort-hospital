import React from 'react';
import Dashboard from '../Dashboard';
import Patients from '../Patients';
import AppointmentsQueue from '../AppointmentsQueue';
import DoctorEncounter from '../DoctorEncounter';
import NurseStation from '../NurseStation';
import PharmacyLabPanel from '../PharmacyLabPanel';
import StaffManagement from '../StaffManagement';
import ServiceTariffs from '../ServiceTariffs';
import BillingInvoices from '../BillingInvoices';
import AuditLogs from '../AuditLogs';
import PatientPortal from '../PatientPortal';
import {
  ClinicalRecordsView,
  DepartmentsView,
  BranchesView,
  HospitalServicesView,
  HospitalSettingsView,
  PaymentsRefundsView,
  OperationalReportsView,
  RevenueCollectionsView,
  UsersRolesView,
  MyProfileView,
  PatientSearchView,
  PaymentsReceiptsView,
  MyPatientsView,
  DoctorProfileTimingsView,
  DoctorLeaveAvailabilityView,
  DoctorNotificationsView,
  NurseDashboardView,
  AssignedPatientsView,
  CareTasksView,
  ShiftHandoverView,
  NurseNotificationsView,
  BillingDashboardView,
  InvoiceLedgerView,
  ReceiptsReportsView,
  BillingNotificationsView,
  PharmacyDashboardView,
  PrescriptionQueueView,
  LabOrdersView,
  StockInventoryView,
  TestResultsReleaseView,
  PurchaseSuppliersView,
  PharmacyNotificationsView
} from '../hospital/HospitalAdminViews';

export default function HospitalAdminPage({
  activeTab,
  setActiveTab,
  consultAppointment,
  onStartConsultation
}) {
  switch (activeTab) {
    case 'dashboard':
      return <Dashboard setActiveTab={setActiveTab} />;
    case 'patients':
    case 'patient':
    case 'patient_registration':
      return <Patients onSelectPatientForConsult={onStartConsultation} />;
    case 'patient_search':
      return <PatientSearchView setActiveTab={setActiveTab} />;
    case 'patient_dashboard':
    case 'patient_portal':
    case 'patient_appointments':
    case 'patient_book_opd':
    case 'patient_prescriptions':
    case 'patient_medical_records':
    case 'patient_lab_reports':
    case 'patient_invoices':
    case 'patient_services':
      return <PatientPortal activeTab={activeTab} setActiveTab={setActiveTab} />;
    case 'appointments':
      return <AppointmentsQueue onStartConsultation={onStartConsultation} />;
    case 'clinical':
      return <DoctorEncounter initialAppointment={consultAppointment} />;
    case 'clinical_records':
      return <ClinicalRecordsView />;
    case 'my_patients':
      return <MyPatientsView onStartConsultation={onStartConsultation} />;
    case 'doctor_profile_timings':
      return <DoctorProfileTimingsView />;
    case 'doctor_leave_availability':
      return <DoctorLeaveAvailabilityView />;
    case 'doctor_notifications':
      return <DoctorNotificationsView />;
    case 'nurse_dashboard':
      return <NurseDashboardView setActiveTab={setActiveTab} />;
    case 'nurse_station':
      return <NurseStation />;
    case 'assigned_patients':
      return <AssignedPatientsView setActiveTab={setActiveTab} />;
    case 'care_tasks':
      return <CareTasksView setActiveTab={setActiveTab} />;
    case 'shift_handover':
      return <ShiftHandoverView />;
    case 'nurse_notifications':
      return <NurseNotificationsView setActiveTab={setActiveTab} />;
    case 'billing_dashboard':
      return <BillingDashboardView setActiveTab={setActiveTab} />;
    case 'billing':
      return <BillingInvoices />;
    case 'tariffs':
      return <ServiceTariffs />;
    case 'payments_refunds':
      return <PaymentsRefundsView />;
    case 'payments_receipts':
      return <PaymentsReceiptsView setActiveTab={setActiveTab} />;
    case 'invoice_ledger':
      return <InvoiceLedgerView setActiveTab={setActiveTab} />;
    case 'receipts_reports':
      return <ReceiptsReportsView setActiveTab={setActiveTab} />;
    case 'billing_notifications':
      return <BillingNotificationsView setActiveTab={setActiveTab} />;
    case 'pharmacy_dashboard':
      return <PharmacyDashboardView setActiveTab={setActiveTab} />;
    case 'pharmacy_lab':
      return <PharmacyLabPanel />;
    case 'prescription_queue':
      return <PrescriptionQueueView setActiveTab={setActiveTab} />;
    case 'lab_orders':
      return <LabOrdersView setActiveTab={setActiveTab} />;
    case 'stock_inventory':
      return <StockInventoryView setActiveTab={setActiveTab} />;
    case 'test_results':
      return <TestResultsReleaseView setActiveTab={setActiveTab} />;
    case 'purchase_suppliers':
      return <PurchaseSuppliersView setActiveTab={setActiveTab} />;
    case 'pharmacy_notifications':
      return <PharmacyNotificationsView setActiveTab={setActiveTab} />;
    case 'staff':
      return <StaffManagement />;
    case 'departments':
      return <DepartmentsView />;
    case 'hospital_branches':
      return <BranchesView />;
    case 'hospital_services':
      return <HospitalServicesView setActiveTab={setActiveTab} />;
    case 'hospital_settings':
      return <HospitalSettingsView />;
    case 'operational_reports':
      return <OperationalReportsView />;
    case 'revenue_collections':
      return <RevenueCollectionsView />;
    case 'hospital_users_roles':
      return <UsersRolesView />;
    case 'audit':
      return <AuditLogs />;
    case 'my_profile':
      return <MyProfileView />;
    default:
      return <Dashboard setActiveTab={setActiveTab} />;
  }
}
