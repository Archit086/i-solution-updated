import { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Assuming your JWT payload has `user_id` and `role`
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ id: decoded.user_id, email: decoded.email });
          setRole(decoded.role || 'customer');
          setIsAuthenticated(true);
        } else {
          localStorage.clear();
        }
      } catch (err) {
        localStorage.clear();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/token/', { email, password });
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    
    // Decode new token to get user role
    const decoded = jwtDecode(res.data.access);
    setUser({ id: decoded.user_id, email });
    setRole(decoded.role || 'customer');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
