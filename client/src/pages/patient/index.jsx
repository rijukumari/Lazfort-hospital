import React from 'react';
import PatientPortal from '../PatientPortal';

export default function PatientPage({
  activeTab,
  setActiveTab
}) {
  return (
    <PatientPortal
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}
