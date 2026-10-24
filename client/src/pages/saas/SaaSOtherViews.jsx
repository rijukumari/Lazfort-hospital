import React from 'react';
import SuperAdminDashboard from '../../features/super-admin/pages/SuperAdminDashboard';

export default function SaaSOtherViews({ viewType, setActiveTab }) {
  return <SuperAdminDashboard activeTab={viewType} setActiveTab={setActiveTab} />;
}
