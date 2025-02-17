import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "artist") {
        localStorage.setItem("artist_id", user.id);
      } else {
        localStorage.removeItem("artist_id");
      }

      if (user.role === "admin") {
        localStorage.setItem("admin_id", user.id);
      } else {
        localStorage.removeItem("admin_id");
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("artist_id");
      localStorage.removeItem("admin_id");
    }
  }, [user]);

  const login = (newToken, userData) => {
    if (!userData?.id) {
      console.error("⚠️ خطأ: بيانات المستخدم لا تحتوي على معرف!");
      return;
    }

    setToken(newToken);
    setUser(userData);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    if (userData.role === "artist") {
      localStorage.setItem("artist_id", userData.id);
    }

    if (userData.role === "admin") {
      localStorage.setItem("admin_id", userData.id);
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("artist_id");
    localStorage.removeItem("admin_id");

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
