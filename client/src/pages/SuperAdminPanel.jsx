import React, { useState } from 'react';
import { SaaSProvider } from '../context/SaaSContext';
import SaaSSuperAdminLayout from '../layouts/SaaSSuperAdminLayout';
import SuperAdminDashboard from '../features/super-admin/pages/SuperAdminDashboard';

export default function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState('saas_overview');

  return (
    <SaaSProvider>
      <SaaSSuperAdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        <SuperAdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
      </SaaSSuperAdminLayout>
    </SaaSProvider>
  );
}
