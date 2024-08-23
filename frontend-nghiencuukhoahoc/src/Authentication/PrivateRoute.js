import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../component/ComponentLoading/CompnentLoading.tsx";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // import jwtDecode correctly
import DashboardAdmin from "../Admin/dashbroand/src/main.jsx";
import DashboardTruongKhoa from "../TruongKhoa/dashbroand/src/main.jsx";
import DashboardTruongBoMon from "../TruongBoMon/dashbroand/src/main.jsx";
import DashboardGiangVien from "../GiangVien/dashbroand/src/main.jsx";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(true);
  const auth = Cookies.get("accessToken");
  const navigate = useNavigate();
  console.log("check cookie =>", auth);
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const [phanQuyenAdmin, setPhanquyenAdmin] = useState(false);
  const [phanQuyenGV, setPhanquyenGV] = useState(false);
  const [phanQuyenTBM, setPhanquyenTBM] = useState(false);
  const [phanQuyenTK, setPhanquyenTK] = useState(false);
  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        console.log("Fetching protected data...");
        try {
          const response = await CookiesAxios.get(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/taikhoan/protected`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );

          console.log("API response:", response.data.user.phanquyen); // Log phản hồi từ API
          console.log(
            "check token user update trang thai ",
            response.data.user
          );
          console.log("response.data.message", response.data.message);
          if (response.data.message === "Protected data") {
            if (response.data.user.phanquyen === "Admin") {
              setPhanquyenAdmin(true);
            } else if (response.data.user.phanquyen === "Trưởng Khoa") {
              setPhanquyenTK(true);
            } else if (response.data.user.phanquyen === "Trưởng Bộ Môn") {
              setPhanquyenTBM(true);
            } else if (response.data.user.phanquyen === "Giảng viên") {
              setPhanquyenGV(true);
            }
            setRedirect(false);
          } else {
            setRedirect(true);
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setRedirect(true);
            navigate("/");
          } else {
            console.error("Lỗi khi tải dữ liệu được bảo vệ:", error);
            navigate("/");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
      setRedirect(true);
    }
  }, [auth]);

  if (loading) {
    return <Loading />;
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (phanQuyenAdmin) {
    return <DashboardAdmin />;
  }

  if (phanQuyenGV) {
    return <DashboardGiangVien />;
  }
  if (phanQuyenTBM) {
    return <DashboardTruongBoMon />;
  }
  if (phanQuyenTK) {
    return <DashboardTruongKhoa />;
  }
  return navigate("/");
};

export default PrivateRoute;
