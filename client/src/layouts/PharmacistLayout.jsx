import React from 'react';
import BaseRoleLayout from './BaseRoleLayout';
import {
  LayoutDashboard,
  Pill,
  FlaskConical,
  Package,
  Activity,
  Truck,
  FileText,
  UserCircle,
  Bell,
  LogOut
} from 'lucide-react';

export default function PharmacistLayout({
  activeTab,
  setActiveTab,
  children
}) {
  const navSections = [
    {
      title: 'PHARMACY & LAB OPERATIONS',
      items: [
        { id: 'pharmacy_dashboard', label: 'Pharmacy Dashboard', icon: LayoutDashboard },
        { id: 'prescription_queue', label: 'Prescription Queue', icon: Pill, badge: 'Live Rx' },
        { id: 'lab_orders', label: 'Lab Orders & Samples', icon: FlaskConical },
        { id: 'stock_inventory', label: 'Stock & Inventory', icon: Package },
        { id: 'test_results', label: 'Test Results & Release', icon: Activity },
        { id: 'purchase_suppliers', label: 'Purchase & Suppliers', icon: Truck },
        { id: 'clinical_records', label: 'Clinical Records & Prescriptions', icon: FileText }
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { id: 'my_profile', label: 'My Profile', icon: UserCircle },
        { id: 'pharmacy_notifications', label: 'Notifications', icon: Bell, badge: '3' }
      ]
    }
  ];

  return (
    <BaseRoleLayout
      roleTitle="Pharmacy & Diagnostic Lab"
      roleBadge="Pharmacy"
      navSections={navSections}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      profileData={{
        name: 'Kavita Nair, B.Pharm',
        role: 'Pharmacist',
        subtitle: 'Central Pharmacy & Clinical Lab'
      }}
      footerNote="NABH Certified Dispensing & Laboratory"
    >
      {children}
    </BaseRoleLayout>
  );
}
