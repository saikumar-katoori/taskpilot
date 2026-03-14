import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('tp_token');
    const storedRole = window.localStorage.getItem('tp_role');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedRole) {
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    const receivedToken = response.data?.token;
    const receivedRole = response.data?.role;

    if (receivedToken) {
      window.localStorage.setItem('tp_token', receivedToken);
      setToken(receivedToken);
    }

    if (receivedRole) {
      window.localStorage.setItem('tp_role', receivedRole);
      setRole(receivedRole);
    }

    return { token: receivedToken, role: receivedRole };
  };

  const signup = async (payload) => {
    // backend expects role string, other fields as provided
    const response = await api.post('/signup', payload);
    return response.data;
  };

  const logout = () => {
    window.localStorage.removeItem('tp_token');
    window.localStorage.removeItem('tp_role');
    setToken(null);
    setRole(null);
  };

  const value = {
    token,
    role,
    isAuthenticated: Boolean(token),
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
