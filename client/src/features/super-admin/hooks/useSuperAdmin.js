import { useSaaS } from '../../../context/SaaSContext';
import { useAuth } from '../../../context/AuthContext';

export function useSuperAdmin() {
  const auth = useAuth();
  const saas = useSaaS();

  return {
    ...saas,
    currentUser: auth?.user,
    logout: auth?.logout
  };
}

export default useSuperAdmin;
