import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("lms:user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("lms:user");
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("lms:user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms:user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export function RequireUser({ children }) {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return children;
}

export function RequireAdmin({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return null;
  }
  return children;
}
