import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getAuthToken, setAuthToken, removeAuthToken, getStoredUser, setStoredUser, removeStoredUser } from '../services/api';

const AuthContext = createContext(null);

export const demoAccounts = [
  {
    roleName: 'Hospital Admin',
    role: 'hospital_admin',
    name: 'Dr. Alok Verma',
    email: 'admin@lazfort.com',
    password: 'Admin@123',
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    description: 'Hospital configuration, tariffs, staff, reports & audit'
  },
  {
    roleName: 'Senior Physician (Doctor)',
    role: 'doctor',
    name: 'Dr. Rajesh Sharma, MD',
    email: 'dr.rajesh@lazfort.com',
    password: 'Doctor@123',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    description: 'OPD queue, clinical encounter, SOAP notes & prescription finalization'
  },
  {
    roleName: 'Front Desk Reception',
    role: 'receptionist',
    name: 'Pooja Verma',
    email: 'reception@lazfort.com',
    password: 'Staff@123',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    description: 'Patient registration, duplicate detection, appointments & token check-in'
  },
  {
    roleName: 'Billing Executive',
    role: 'billing_executive',
    name: 'Amit Saxena',
    email: 'billing@lazfort.com',
    password: 'Staff@123',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    description: 'Tariff charge capture, invoicing, payment collection & receipts'
  },
  {
    roleName: 'OPD Lead Nurse',
    role: 'nurse',
    name: 'Sister Marykutty',
    email: 'nurse@lazfort.com',
    password: 'Staff@123',
    badge: 'bg-rose-100 text-rose-700 border-rose-200',
    description: 'Patient triage, vitals recording & nursing notes'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getAuthToken());
  const [tenant, setTenant] = useState({
    name: 'Lazfort Memorial Hospital & Research Centre',
    code: 'LZF-HQ',
    currencySymbol: '₹',
    city: 'Bengaluru'
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
      return { success: false, message: err.message };
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

  return (
    <AuthContext.Provider value={{ user, token, tenant, loading, login, quickLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
