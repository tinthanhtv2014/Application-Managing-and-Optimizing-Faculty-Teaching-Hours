import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import App from "../../src/app.jsx";
import Loading from "../component/ComponentLoading/CompnentLoading.tsx";
import Cookies from "js-cookie";
// import CookiesAxios from "../../../config/AxiosConfig.js";
import axios from "axios";
import LoginPage from "../Admin/dashbroand/src/pages/login.jsx";
const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(true);
  const auth = Cookies.get("accessToken");
  console.log("check cookie =>", auth);
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("API response:");
      try {
        const response = await CookiesAxios.get(
          "http://localhost:3003/admin/v1/protected",
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        );

        console.log("API response:", response); // Log phản hồi từ API

        if (
          response.data.message === "Protected data" &&
          response.data.user.role === "admin"
        ) {
          setRedirect(false);
          console.log("Oke");
        } else {
          setRedirect(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setRedirect(true);
        } else {
          console.error("Lỗi khi tải dữ liệu được bảo vệ:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth]);

  if (loading) {
    return <Loading />;
  }

  if (redirect) {
    return <Navigate to="/admin" />;
  }

  return <LoginPage />;
};

export default PrivateRoute;
