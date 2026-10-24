import React from 'react';
import BaseRoleLayout from './BaseRoleLayout';
import {
  LayoutDashboard,
  Receipt,
  FileSpreadsheet,
  CreditCard,
  TrendingUp,
  BookOpen,
  Printer,
  UserCircle,
  Bell,
  LogOut
} from 'lucide-react';

export default function BillingExecutiveLayout({
  activeTab,
  setActiveTab,
  children
}) {
  const navSections = [
    {
      title: 'BILLING & FINANCE',
      items: [
        { id: 'billing_dashboard', label: 'Billing Dashboard', icon: LayoutDashboard },
        { id: 'billing', label: 'Billing & Invoicing', icon: Receipt, badge: 'Cashier Desk' },
        { id: 'tariffs', label: 'Service Tariffs & Charges', icon: FileSpreadsheet },
        { id: 'payments_refunds', label: 'Payments & Refunds', icon: CreditCard },
        { id: 'revenue_collections', label: 'Revenue & Collections', icon: TrendingUp },
        { id: 'invoice_ledger', label: 'Invoice Ledger', icon: BookOpen },
        { id: 'receipts_reports', label: 'Receipts & Reports', icon: Printer }
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { id: 'my_profile', label: 'My Profile', icon: UserCircle },
        { id: 'billing_notifications', label: 'Notifications', icon: Bell, badge: '2' }
      ]
    }
  ];

  return (
    <BaseRoleLayout
      roleTitle="Billing & Patient Accounts"
      roleBadge="Cashier"
      navSections={navSections}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      profileData={{
        name: 'Amit Saxena',
        role: 'Billing Executive',
        subtitle: 'Patient Accounts & Billing'
      }}
      footerNote="GST Tax Invoice Desks &bull; Counter 01"
    >
      {children}
    </BaseRoleLayout>
  );
}
