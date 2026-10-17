import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import AppointmentsQueue from './pages/AppointmentsQueue';
import DoctorEncounter from './pages/DoctorEncounter';
import BillingInvoices from './pages/BillingInvoices';
import ServiceTariffs from './pages/ServiceTariffs';
import StaffManagement from './pages/StaffManagement';
import AuditLogs from './pages/AuditLogs';

export default function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [consultAppointment, setConsultAppointment] = useState(null);

  if (!user) {
    return <Login />;
  }

  const handleStartConsultation = (appointment) => {
    setConsultAppointment(appointment);
    setActiveTab('clinical');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-x-hidden">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'patients' && <Patients onSelectPatientForConsult={handleStartConsultation} />}
          {activeTab === 'appointments' && <AppointmentsQueue onStartConsultation={handleStartConsultation} />}
          {activeTab === 'clinical' && <DoctorEncounter initialAppointment={consultAppointment} />}
          {activeTab === 'billing' && <BillingInvoices />}
          {activeTab === 'tariffs' && <ServiceTariffs />}
          {activeTab === 'staff' && <StaffManagement />}
          {activeTab === 'audit' && <AuditLogs />}
        </main>
      </div>
    </div>
  );
}
