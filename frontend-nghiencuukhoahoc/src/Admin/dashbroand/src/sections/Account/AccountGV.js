import React, { useEffect, useState } from "react";
import axios from "axios";
import GiangVienProfile from "./component/componentGV";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CookiesAxios from "../CookiesAxios";
const AccountGV = () => {
  const [giangVien, setGiangVien] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [TenDangNhapGV, setTenDangNhapGV] = useState(null);

  useEffect(() => {
    const auth = Cookies.get("accessToken");
    const decodeAuth = jwtDecode(auth);
    console.log(decodeAuth);
    setTenDangNhapGV(decodeAuth.taikhoan);
    fetchDataGV(decodeAuth.taikhoan);
  }, []);
  const CallbackAPiProfileGV = () => {
    fetchDataGV(TenDangNhapGV);
  };
  const fetchDataGV = async (taikhoan) => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`
      );

      console.log("Danh sách tài khoản:", response.data.DT);

      if (response.data.EC === 1) {
        setGiangVien(response.data.DT);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {giangVien ? (
        <GiangVienProfile
          CallbackAPiProfileGV={CallbackAPiProfileGV}
          giangVien={giangVien}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AccountGV;
