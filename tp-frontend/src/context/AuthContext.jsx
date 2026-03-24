import { useState } from 'react';
import api from '../api/axios';
import { AuthContext } from './AuthContextStore';

const getStoredValue = (key) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(key);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredValue('tp_token'));
  const [role, setRole] = useState(() => getStoredValue('tp_role'));
  const loading = false;

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    const receivedToken = response.data?.token;
    const receivedRole = response.data?.role;

    if (receivedToken) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tp_token', receivedToken);
      }
      setToken(receivedToken);
    }

    if (receivedRole) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tp_role', receivedRole);
      }
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
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('tp_token');
      window.localStorage.removeItem('tp_role');
    }
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
