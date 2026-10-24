import React from 'react';
import SuperAdminDashboard from '../../features/super-admin/pages/SuperAdminDashboard';

export default function SuperAdminPage({ activeTab, setActiveTab }) {
  return <SuperAdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
}
