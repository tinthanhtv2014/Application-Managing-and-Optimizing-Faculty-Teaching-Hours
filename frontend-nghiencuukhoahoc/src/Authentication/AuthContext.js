// import Cookies from "js-cookie";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setAuth(token);
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem("accessToken", token);
    setAuth(token);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    //gọi api xuống backend
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
