import "./TruongKhoaLogin.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const TruongKhoaLogin = () => {
  const [user, setUser] = useState(null);
  const [tokenGoogle, setTokenGoogle] = useState(null);

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
  const login = useGoogleLogin({
    onSuccess: (response) => console.log(response),
    onError: () => console.log("Login Failed"),
  });

  return (
    <GoogleOAuthProvider clientId="450673360873-ok5mu6bm0unjbr16f6eaf8f66mvrespq.apps.googleusercontent.com">
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
        <button onClick={() => login()}>Login with Google using Hook</button>
      </div>
    </GoogleOAuthProvider>
  );
};
export default TruongKhoaLogin;
