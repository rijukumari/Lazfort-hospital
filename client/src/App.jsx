import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { SaaSProvider } from './context/SaaSContext';
import Login from './pages/Login';

// Role-Specific Layouts
import {
  SaaSSuperAdminLayout,
  HospitalAdminLayout,
  ReceptionistLayout,
  DoctorLayout,
  NurseLayout,
  BillingExecutiveLayout,
  PharmacistLayout,
  PatientLayout
} from './layouts';

// Role-Specific Modular Page Routers
import SuperAdminPage from './pages/super-admin';
import HospitalAdminPage from './pages/hospital-admin';
import ReceptionistPage from './pages/receptionist';
import DoctorPage from './pages/doctor';
import NursePage from './pages/nurse';
import BillingPage from './pages/billing';
import PharmacistPage from './pages/pharmacist';
import PatientPage from './pages/patient';

export default function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [consultAppointment, setConsultAppointment] = useState(null);

  // Set default active tab based on authenticated role
  useEffect(() => {
    if (!user?.role) return;

    if (user.role === 'super_admin') {
      setActiveTab('saas_overview');
    } else if (user.role === 'doctor') {
      setActiveTab('clinical');
    } else if (user.role === 'receptionist') {
      setActiveTab('dashboard');
    } else if (user.role === 'nurse') {
      setActiveTab('nurse_dashboard');
    } else if (user.role === 'billing_executive') {
      setActiveTab('billing_dashboard');
    } else if (user.role === 'pharmacist' || user.role === 'lab_technician') {
      setActiveTab('pharmacy_dashboard');
    } else if (user.role === 'patient') {
      setActiveTab('patient_dashboard');
    } else {
      setActiveTab('dashboard');
    }
  }, [user?.role]);

  // Authentication Guard
  if (!user || !user.role) {
    return <Login />;
  }

  const handleStartConsultation = (appointment) => {
    setConsultAppointment(appointment);
    setActiveTab('clinical');
  };

  // 1. SaaS Super Admin Panel
  if (user.role === 'super_admin') {
    return (
      <SaaSProvider>
        <SaaSSuperAdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          <SuperAdminPage activeTab={activeTab} setActiveTab={setActiveTab} />
        </SaaSSuperAdminLayout>
      </SaaSProvider>
    );
  }

  // 2. Doctor Consultation Workspace
  if (user.role === 'doctor') {
    return (
      <SaaSProvider>
        <DoctorLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          <DoctorPage
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            consultAppointment={consultAppointment}
            onStartConsultation={handleStartConsultation}
          />
        </DoctorLayout>
      </SaaSProvider>
    );
  }

  // 3. Nurse Station & Triage Operations
  if (user.role === 'nurse') {
    return (
      <SaaSProvider>
        <NurseLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          <NursePage
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onStartConsultation={handleStartConsultation}
          />
        </NurseLayout>
      </SaaSProvider>
    );
  }

  // 4. Receptionist OPD Desk & Registration
  if (user.role === 'receptionist') {
    return (
      <SaaSProvider>
        <ReceptionistLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          <ReceptionistPage
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onStartConsultation={handleStartConsultation}
          />
        </ReceptionistLayout>
      </SaaSProvider>
    );
  }

  // 5. Billing Executive & Finance
  if (user.role === 'billing_executive') {
    return (
      <SaaSProvider>
        <BillingExecutiveLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          <BillingPage activeTab={activeTab} setActiveTab={setActiveTab} />
        </BillingExecutiveLayout>
      </SaaSProvider>
    );
  }

  // 6. Pharmacist & Diagnostic Lab Panel
  if (user.role === 'pharmacist' || user.role === 'lab_technician') {
    return (
      <SaaSProvider>
        <PharmacistLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          <PharmacistPage activeTab={activeTab} setActiveTab={setActiveTab} />
        </PharmacistLayout>
      </SaaSProvider>
    );
  }

  // 7. Patient Self-Service Portal
  if (user.role === 'patient') {
    return (
      <SaaSProvider>
        <PatientLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          <PatientPage activeTab={activeTab} setActiveTab={setActiveTab} />
        </PatientLayout>
      </SaaSProvider>
    );
  }

  // 8. Hospital Administrator Console (Default role)
  return (
    <SaaSProvider>
      <HospitalAdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        <HospitalAdminPage
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          consultAppointment={consultAppointment}
          onStartConsultation={handleStartConsultation}
        />
      </HospitalAdminLayout>
    </SaaSProvider>
  );
}
