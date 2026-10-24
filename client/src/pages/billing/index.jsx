import React from 'react';
import BillingInvoices from '../BillingInvoices';
import ServiceTariffs from '../ServiceTariffs';
import {
  BillingDashboardView,
  PaymentsRefundsView,
  RevenueCollectionsView,
  InvoiceLedgerView,
  ReceiptsReportsView,
  BillingNotificationsView,
  MyProfileView
} from '../hospital/HospitalAdminViews';

export default function BillingPage({
  activeTab,
  setActiveTab
}) {
  switch (activeTab) {
    case 'billing_dashboard':
    case 'dashboard':
      return <BillingDashboardView setActiveTab={setActiveTab} />;
    case 'billing':
      return <BillingInvoices />;
    case 'tariffs':
      return <ServiceTariffs />;
    case 'payments_refunds':
      return <PaymentsRefundsView />;
    case 'revenue_collections':
      return <RevenueCollectionsView />;
    case 'invoice_ledger':
      return <InvoiceLedgerView setActiveTab={setActiveTab} />;
    case 'receipts_reports':
      return <ReceiptsReportsView setActiveTab={setActiveTab} />;
    case 'billing_notifications':
      return <BillingNotificationsView setActiveTab={setActiveTab} />;
    case 'my_profile':
      return <MyProfileView />;
    default:
      return <BillingDashboardView setActiveTab={setActiveTab} />;
  }
}
