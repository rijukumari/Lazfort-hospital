import React from 'react';
import SaaSSuperAdminProfile from '../../../pages/saas/SaaSSuperAdminProfile';

export default function SuperAdminProfile({ setActiveTab }) {
  return <SaaSSuperAdminProfile initialTab="overview" setActiveTab={setActiveTab} />;
}
