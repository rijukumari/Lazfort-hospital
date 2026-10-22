import React from 'react';
import { useAuth } from '../context/AuthContext';
import SaaSSuperAdminSidebar from './SaaSSuperAdminSidebar';
import HospitalAdminSidebar from './HospitalAdminSidebar';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const { user } = useAuth();
  const role = user?.role || 'receptionist';

  // SaaS Super Admin uses the specialized 28-item platform governance sidebar
  if (role === 'super_admin') {
    return (
      <SaaSSuperAdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
      />
    );
  }

  // Hospital Admin and hospital staff use the responsive dark navy sidebar with exact section hierarchy
  return (
    <HospitalAdminSidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
    />
  );
}
