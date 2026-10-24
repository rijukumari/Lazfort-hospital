import React from 'react';
import {
  PharmacyDashboardView,
  PrescriptionQueueView,
  LabOrdersView,
  StockInventoryView,
  TestResultsReleaseView,
  PurchaseSuppliersView,
  ClinicalRecordsView,
  PharmacyNotificationsView,
  MyProfileView
} from '../hospital/HospitalAdminViews';

export default function PharmacistPage({
  activeTab,
  setActiveTab
}) {
  switch (activeTab) {
    case 'pharmacy_dashboard':
    case 'dashboard':
      return <PharmacyDashboardView setActiveTab={setActiveTab} />;
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
    case 'clinical_records':
      return <ClinicalRecordsView />;
    case 'pharmacy_notifications':
      return <PharmacyNotificationsView setActiveTab={setActiveTab} />;
    case 'my_profile':
      return <MyProfileView />;
    default:
      return <PharmacyDashboardView setActiveTab={setActiveTab} />;
  }
}
