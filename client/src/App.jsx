import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { SaaSProvider } from './context/SaaSContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import AppointmentsQueue from './pages/AppointmentsQueue';
import DoctorEncounter from './pages/DoctorEncounter';
import BillingInvoices from './pages/BillingInvoices';
import ServiceTariffs from './pages/ServiceTariffs';
import StaffManagement from './pages/StaffManagement';
import AuditLogs from './pages/AuditLogs';
import NurseStation from './pages/NurseStation';
import PharmacyLabPanel from './pages/PharmacyLabPanel';
import PatientPortal from './pages/PatientPortal';

// Hospital Admin Extended Views
import {
  ClinicalRecordsView,
  DepartmentsView,
  BranchesView,
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
  NurseDashboardView,
  AssignedPatientsView,
  CareTasksView,
  ShiftHandoverView,
  BillingDashboardView,
  InvoiceLedgerView,
  ReceiptsReportsView,
  PharmacyDashboardView,
  PrescriptionQueueView,
  LabOrdersView,
  StockInventoryView,
  TestResultsReleaseView,
  PurchaseSuppliersView
} from './pages/hospital/HospitalAdminViews';

// SaaS Super Admin Pages
import SaaSPlatformOverview from './pages/saas/SaaSPlatformOverview';
import SaaSHospitalTenants from './pages/saas/SaaSHospitalTenants';
import SaaSSubscriptionPlans from './pages/saas/SaaSSubscriptionPlans';
import SaaSTenantSubscriptions from './pages/saas/SaaSTenantSubscriptions';
import SaaSPlatformUsers from './pages/saas/SaaSPlatformUsers';
import SaaSHospitalUsers from './pages/saas/SaaSHospitalUsers';
import SaaSRolesPermissions from './pages/saas/SaaSRolesPermissions';
import SaaSSecurityAudit from './pages/saas/SaaSSecurityAudit';
import SaaSSupportOperations from './pages/saas/SaaSSupportOperations';
import SaaSOtherViews from './pages/saas/SaaSOtherViews';

export default function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [consultAppointment, setConsultAppointment] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Set default tab on login
  useEffect(() => {
    if (user?.role === 'super_admin') {
      setActiveTab('saas_overview');
    } else if (user?.role === 'doctor') {
      setActiveTab('clinical');
    } else if (user?.role === 'receptionist') {
      setActiveTab('patients');
    } else if (user?.role === 'nurse') {
      setActiveTab('nurse_dashboard');
    } else if (user?.role === 'billing_executive') {
      setActiveTab('billing_dashboard');
    } else if (user?.role === 'pharmacist') {
      setActiveTab('pharmacy_dashboard');
    } else if (user?.role === 'patient') {
      setActiveTab('patient_dashboard');
    } else {
      setActiveTab('dashboard');
    }
  }, [user?.role]);

  if (!user) {
    return <Login />;
  }

  const handleStartConsultation = (appointment) => {
    setConsultAppointment(appointment);
    setActiveTab('clinical');
  };

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <SaaSProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex flex-1 items-start">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            mobileOpen={mobileOpen} 
            setMobileOpen={setMobileOpen} 
          />
          <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full overflow-x-hidden">
            {/* SaaS Super Admin Routes */}
            {isSuperAdmin && (
              <>
                {(activeTab === 'saas_overview' || activeTab === 'dashboard') && (
                  <SaaSPlatformOverview setActiveTab={setActiveTab} />
                )}
                {activeTab === 'saas_tenants' && <SaaSHospitalTenants />}
                {activeTab === 'saas_plans' && <SaaSSubscriptionPlans />}
                {activeTab === 'saas_subscriptions' && <SaaSTenantSubscriptions />}
                {activeTab === 'saas_platform_users' && <SaaSPlatformUsers />}
                {activeTab === 'saas_hospital_users' && <SaaSHospitalUsers />}
                {activeTab === 'saas_roles' && <SaaSRolesPermissions />}
                {activeTab === 'saas_audit' && <SaaSSecurityAudit />}
                {activeTab === 'saas_tickets' && <SaaSSupportOperations initialTab="tickets" />}
                {activeTab === 'saas_notifications' && <SaaSSupportOperations initialTab="notifications" />}
                {activeTab === 'saas_integrations' && <SaaSSupportOperations initialTab="integrations" />}

                {/* Remaining SaaS views */}
                {[
                  'saas_analytics',
                  'saas_health',
                  'saas_onboarding',
                  'saas_branches',
                  'saas_invoices',
                  'saas_transactions',
                  'saas_usage',
                  'saas_modules',
                  'saas_settings',
                  'saas_config',
                  'saas_sessions',
                  'saas_logs',
                  'saas_alerts',
                  'saas_maintenance',
                  'saas_profile',
                  'saas_password'
                ].includes(activeTab) && (
                  <SaaSOtherViews viewType={activeTab} setActiveTab={setActiveTab} />
                )}
              </>
            )}

            {/* Patient Portal Routes */}
            {!isSuperAdmin && user?.role === 'patient' && (
              <PatientPortal activeTab={activeTab} setActiveTab={setActiveTab} />
            )}

            {/* Hospital Staff Routes (Hospital Admin, Doctor, Nurse, Receptionist, Billing, Pharmacy) */}
            {!isSuperAdmin && user?.role !== 'patient' && (
              <>
                {activeTab === 'dashboard' && user?.role !== 'nurse' && user?.role !== 'billing_executive' && user?.role !== 'pharmacist' && <Dashboard setActiveTab={setActiveTab} />}
                {(activeTab === 'nurse_dashboard' || (user?.role === 'nurse' && activeTab === 'dashboard')) && (
                  <NurseDashboardView setActiveTab={setActiveTab} />
                )}
                {(activeTab === 'billing_dashboard' || (user?.role === 'billing_executive' && activeTab === 'dashboard')) && (
                  <BillingDashboardView setActiveTab={setActiveTab} />
                )}
                {(activeTab === 'pharmacy_dashboard' || (user?.role === 'pharmacist' && activeTab === 'dashboard')) && (
                  <PharmacyDashboardView setActiveTab={setActiveTab} />
                )}
                {activeTab === 'prescription_queue' && <PrescriptionQueueView setActiveTab={setActiveTab} />}
                {activeTab === 'lab_orders' && <LabOrdersView setActiveTab={setActiveTab} />}
                {activeTab === 'stock_inventory' && <StockInventoryView setActiveTab={setActiveTab} />}
                {activeTab === 'test_results' && <TestResultsReleaseView setActiveTab={setActiveTab} />}
                {activeTab === 'purchase_suppliers' && <PurchaseSuppliersView setActiveTab={setActiveTab} />}
                {activeTab === 'invoice_ledger' && <InvoiceLedgerView setActiveTab={setActiveTab} />}
                {activeTab === 'receipts_reports' && <ReceiptsReportsView setActiveTab={setActiveTab} />}
                {activeTab === 'assigned_patients' && <AssignedPatientsView setActiveTab={setActiveTab} />}
                {activeTab === 'care_tasks' && <CareTasksView setActiveTab={setActiveTab} />}
                {activeTab === 'shift_handover' && <ShiftHandoverView />}
                {activeTab === 'patients' && <Patients onSelectPatientForConsult={handleStartConsultation} />}
                {activeTab === 'appointments' && <AppointmentsQueue onStartConsultation={handleStartConsultation} />}
                {activeTab === 'clinical' && <DoctorEncounter initialAppointment={consultAppointment} />}
                {activeTab === 'nurse_station' && <NurseStation />}
                {activeTab === 'clinical_records' && <ClinicalRecordsView />}
                {activeTab === 'pharmacy_lab' && <PharmacyLabPanel />}
                {activeTab === 'staff' && <StaffManagement />}
                {activeTab === 'departments' && <DepartmentsView />}
                {activeTab === 'hospital_branches' && <BranchesView />}
                {activeTab === 'hospital_settings' && <HospitalSettingsView />}
                {activeTab === 'tariffs' && <ServiceTariffs />}
                {activeTab === 'billing' && <BillingInvoices />}
                {activeTab === 'payments_refunds' && <PaymentsRefundsView />}
                {activeTab === 'operational_reports' && <OperationalReportsView />}
                {activeTab === 'revenue_collections' && <RevenueCollectionsView />}
                {activeTab === 'hospital_users_roles' && <UsersRolesView />}
                {activeTab === 'audit' && <AuditLogs />}
                {activeTab === 'my_profile' && <MyProfileView />}
                {activeTab === 'patient_search' && <PatientSearchView />}
                {activeTab === 'payments_receipts' && <PaymentsReceiptsView />}
                {activeTab === 'patient_portal' && <PatientPortal activeTab={activeTab} setActiveTab={setActiveTab} />}
                {activeTab === 'my_patients' && <MyPatientsView onStartConsultation={handleStartConsultation} />}
                {activeTab === 'doctor_profile_timings' && <DoctorProfileTimingsView />}
              </>
            )}
          </main>
        </div>
      </div>
    </SaaSProvider>
  );
}
