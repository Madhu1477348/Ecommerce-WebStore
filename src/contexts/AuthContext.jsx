import React, { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  const signup = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      alert("user already exists");
      return;
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setUser({ id: newUser.id, name, email });
    navigate("/");
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[}");
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email });
      navigate("/");
    } else {
      alert("Invalid Email or Password!");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
