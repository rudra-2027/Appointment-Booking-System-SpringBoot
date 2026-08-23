import React, { createContext, useContext, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);
const STORAGE_KEY = "appointment_console_session";
const TOKEN_KEY = "appointment_console_token";

function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getStoredSession);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authService.login(credentials);
      const nextSession = {
        token: data.token,
        email: data.email,
        role: (data.role || "").replace("ROLE_", ""),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
      localStorage.setItem(TOKEN_KEY, nextSession.token);
      setSession(nextSession);
      return nextSession;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload, role) => {
    const action = role === "PROVIDER" ? authService.registerProvider : authService.registerUser;
    return action(payload);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setSession(null);
  };

  const value = useMemo(
    () => ({
      user: session ? { email: session.email } : null,
      token: session?.token || null,
      role: session?.role || null,
      isAuthenticated: Boolean(session?.token),
      loading,
      login,
      register,
      logout,
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
