import "./TruongKhoaLogin.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const TruongKhoaLogin = () => {
  const [user, setUser] = useState(null);
  const [tokenGoogle, setTokenGoogle] = useState(null);
  const clientId =
    "450673360873-ok5mu6bm0unjbr16f6eaf8f66mvrespq.apps.googleusercontent.com";
  const redirectUri = "http://localhost:3000";
  useEffect(() => {
    const fetchData = async () => {
      if (tokenGoogle) {
        try {
          const decoded = jwtDecode(tokenGoogle);
          console.log("Decoded Token:", decoded);
          setUser(decoded.name); // Cập nhật giá trị user sau khi giải mã token thành công
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    fetchData();
  }, [tokenGoogle]);

  useEffect(() => {
    console.log("encodeddd Token:", user);
  }, [user]);

  const handleLogout = () => {
    // axios.get("/logout").then(() => {
    //   setUser(null);
    //   setTokenGoogle(null);
    // });
    setUser(null);
  };

  return (
    <div className="admin-login">
      {user ? (
        <div>
          <h1>Welcome, {user}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            setTokenGoogle(credentialResponse.credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </div>
  );
};
export default TruongKhoaLogin;
