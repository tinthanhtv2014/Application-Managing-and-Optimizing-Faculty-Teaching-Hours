import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminLogin.scss";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode trực tiếp thay vì từ jwt-decode
import logoGG from "../../../src/public/logo/google.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [user, setUser] = useState(null);
  const [tokenGoogle, setTokenGoogle] = useState(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token Response:", tokenResponse);
      setTokenGoogle(tokenResponse.access_token);

      // Lấy thông tin người dùng từ Google API
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        setUser(userInfo.data);
        console.log(userInfo.data);
        console.log("User Info:", userInfo.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  useEffect(() => {
    if (user) {
      console.log("check user =>", user.email);
      const FectData = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/taikhoan/dangnhapgoogle`,
            { tendangnhap: user.email }
          );
          console.log("check token =>", response.data);

          if (response.data.EC === 1) {
            const accessToken = response.data.DT.access_token;

            // Kiểm tra nếu accessToken là chuỗi hợp lệ
            if (typeof accessToken === "string") {
              const decoded = jwtDecode(accessToken);

              if (decoded.phanquyen === "Giảng Viên") {
                Cookies.set("accessToken", accessToken);
                navigate("/giang-vien");
              } else if (decoded.phanquyen === "Admin") {
                Cookies.set("accessToken", accessToken);
                navigate("/admin");
              } else if (decoded.phanquyen === "Trưởng Khoa") {
                Cookies.set("accessToken", accessToken);
                navigate("/truongkhoa");
              } else if (decoded.phanquyen === "Trưởng Bộ Môn") {
                Cookies.set("accessToken", accessToken);
                navigate("/truong-bm");
              } else if (decoded.phanquyen === "Giảng Viên Ngoài Trường") {
                Cookies.set("accessToken", accessToken);
                navigate("/giang-vien-ngoai-truong");
              }
            } else {
              toast.error("Đã xảy ra lỗi !");
            }
          } else {
            toast.error(response.data.EM);
          }
        } catch (error) {
          console.error("Đã xảy ra lỗi:", error);
          toast.error("Đã xảy ra lỗi.");
        }
      };
      FectData();
    }
  }, [user, navigate]);

  return (
    <div className="admin-login">
      <div>
        <button className="Button-gg" onClick={() => login()}>
          <img src={logoGG} alt="Logo" className="logo-gg" />
          <div className="content-sign">
            <p>Sign in with Google</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
