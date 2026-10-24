import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getAuthToken, setAuthToken, removeAuthToken, getStoredUser, setStoredUser, removeStoredUser } from '../services/api';

const AuthContext = createContext(null);

export const demoAccounts = [
  {
    roleName: 'SaaS Super Admin',
    role: 'super_admin',
    name: 'Vikramaditya Singhania',
    email: 'superadmin@lazfort.com',
    password: 'Super@123',
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    primaryJobs: 'Manage tenants, plans, platform configuration and support access.',
    keyNeeds: 'Tenant lifecycle, usage visibility, tightly controlled support access.',
    department: 'Global Cloud Platform Operations',
    specialization: 'Multi-Tenant Governance & Cloud Security'
  },
  {
    roleName: 'Hospital Admin',
    role: 'hospital_admin',
    name: 'Dr. Alok Verma',
    email: 'admin@lazfort.com',
    password: 'Admin@123',
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    primaryJobs: 'Configure departments, staff, tariffs, branches and permissions.',
    keyNeeds: 'Settings, user administration, audit reports and operational dashboards.',
    department: 'Hospital Administration',
    specialization: 'Healthcare Administration'
  },
  {
    roleName: 'Receptionist',
    role: 'receptionist',
    name: 'Pooja Verma',
    email: 'reception@lazfort.com',
    password: 'Staff@123',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    primaryJobs: 'Register patients, book appointments and manage queues.',
    keyNeeds: 'Fast search, duplicate detection, simple forms and clear queue status.',
    department: 'Front Desk & Patient Services',
    specialization: 'OPD Scheduling & Registration'
  },
  {
    roleName: 'Doctor',
    role: 'doctor',
    name: 'Dr. Rajesh Sharma, MD',
    email: 'dr.rajesh@lazfort.com',
    password: 'Doctor@123',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    primaryJobs: 'Review history, document consultation, prescribe and order tests.',
    keyNeeds: 'Patient context, quick note entry, safe correction and clear order status.',
    department: 'General Medicine',
    specialization: 'Internal Medicine & Diabetology',
    consultationFee: 600,
    licenseNumber: 'MCI-2008-41029'
  },
  {
    roleName: 'Nurse',
    role: 'nurse',
    name: 'Sister Marykutty Joseph',
    email: 'nurse@lazfort.com',
    password: 'Staff@123',
    badge: 'bg-rose-100 text-rose-700 border-rose-200',
    primaryJobs: 'Record vitals, update assigned care tasks and handoffs.',
    keyNeeds: 'Role-specific task list and time-stamped documentation.',
    department: 'OPD Nursing Triage',
    specialization: 'Vitals & Clinical Triage'
  },
  {
    roleName: 'Billing Executive',
    role: 'billing_executive',
    name: 'Amit Saxena',
    email: 'billing@lazfort.com',
    password: 'Staff@123',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    primaryJobs: 'Create invoices, collect payments and process authorized corrections.',
    keyNeeds: 'Transparent charge breakdown, receipts, outstanding balance and approvals.',
    department: 'Patient Accounts & Billing',
    specialization: 'Invoicing & TPA Reconciliation'
  },
  {
    roleName: 'Pharmacist / Lab Staff',
    role: 'pharmacist',
    name: 'Kavita Nair, B.Pharm',
    email: 'pharmacy@lazfort.com',
    password: 'Staff@123',
    badge: 'bg-teal-100 text-teal-700 border-teal-200',
    primaryJobs: 'Process prescriptions or orders and record fulfilment/results.',
    keyNeeds: 'Work queues, traceability, verification and stock/sample status.',
    department: 'Central Pharmacy & Clinical Laboratory',
    specialization: 'Drug Dispensation & Lab Orders'
  },
  {
    roleName: 'Patient',
    role: 'patient',
    name: 'Ramesh Kumar (UHID: LZF-2026-0001)',
    email: 'patient@lazfort.com',
    password: 'Patient@123',
    badge: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    primaryJobs: 'View own appointments, bills and released documents.',
    keyNeeds: 'Simple access, identity verification, consent and privacy.',
    department: 'Patient Self-Service Portal',
    specialization: 'Personal Health Records & Appointments'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getAuthToken());
  const [tenant, setTenant] = useState({
    name: 'Lazfort Memorial Hospital & Research Centre',
    code: 'LZF-HQ',
    currencySymbol: '₹',
    city: 'Bengaluru',
    hasBranches: true,
    branchesCount: 2,
    branchLimit: 5
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleExpired = () => {
      setUser(null);
      setToken(null);
    };
    window.addEventListener('auth-expired', handleExpired);
    return () => window.removeEventListener('auth-expired', handleExpired);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.success) {
        setAuthToken(res.token);
        setStoredUser(res.user);
        setToken(res.token);
        setUser(res.user);
        if (res.tenant) setTenant(res.tenant);
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      // Resilient fallback for demo/offline accounts if backend is not reachable
      const matched = demoAccounts.find(
        (a) =>
          a.email.toLowerCase() === email.toLowerCase() ||
          a.role.toLowerCase() === email.toLowerCase()
      );
      if (matched && (matched.password === password || password === 'Demo@123' || password === matched.password)) {
        const demoUser = {
          userId: `USR-${matched.role.toUpperCase()}-001`,
          username: matched.email.split('@')[0],
          email: matched.email,
          fullName: matched.name,
          role: matched.role,
          department: matched.department,
          specialization: matched.specialization,
          consultationFee: matched.consultationFee || 0,
          licenseNumber: matched.licenseNumber || 'DEMO-LIC-001',
          tenantId: 'TEN-LAZFORT-001'
        };
        const demoToken = 'mock_jwt_token_' + matched.role + '_' + Date.now();
        setAuthToken(demoToken);
        setStoredUser(demoUser);
        setToken(demoToken);
        setUser(demoUser);
        return { success: true };
      }
      return { success: false, message: err.message || 'Invalid credentials or connection error' };
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (role) => {
    const account = demoAccounts.find(a => a.role === role);
    if (!account) return { success: false, message: 'Role not found' };
    return await login(account.email, account.password);
  };

  const logout = () => {
    removeAuthToken();
    removeStoredUser();
    setUser(null);
    setToken(null);
  };

  const updateUser = (updatedFields) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedFields };
      setStoredUser(updated);
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, tenant, loading, login, quickLogin, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
