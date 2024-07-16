import React, { useEffect, useState } from "react";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const GV_CaoCap_Hang_I = ({ ChucDanhGiangVien }) => {
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const [giangVien, setGiangVien] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [TenDangNhapGV, setTenDangNhapGV] = useState(null);
  const [ListKhungGioChuan, setListKhungGioChuan] = useState(null);
  useEffect(() => {
    console.log("ChucDanhGiangVien,", ChucDanhGiangVien);
    const auth = Cookies.get("accessToken");
    const decodeAuth = jwtDecode(auth);
    console.log(decodeAuth);
    setTenDangNhapGV(decodeAuth.taikhoan);
    fetchDataGV();
  }, []);

  const fetchDataGV = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xem/khunggiochuan/${ChucDanhGiangVien}`
      );

      console.log("Danh sách khung giờ chuẩn", response.data.DT);

      if (response.data.EC === 1) {
        setListKhungGioChuan(response.data.DT);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    }
  };
  return (
    <>
      <p> {ChucDanhGiangVien}asd</p>
    </>
  );
};
export default GV_CaoCap_Hang_I;
