import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import RenderData from "./RenderData/Renderdata";

const GV_CaoCap_Hang_I = ({ ChucDanhGiangVien }) => {
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });

  const [giangVien, setGiangVien] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [TenDangNhapGV, setTenDangNhapGV] = useState(null);
  const [ListKhungGioChuan, setListKhungGioChuan] = useState(null);
  const [ListTenKhung_TENCHUCDANH, setListTenKhung_TENCHUCDANH] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = Cookies.get("accessToken");
        const decodeAuth = jwtDecode(auth);
        setTenDangNhapGV(decodeAuth.taikhoan);
        await fetchDataGV();
      } catch (error) {
        console.error("Lỗi khi giải mã token hoặc lấy dữ liệu:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchDataGV = async () => {
    try {
      const [response, response1] = await Promise.all([
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xem/khunggiochuan/${ChucDanhGiangVien}`
        ),
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xem/all/tenkhung/${ChucDanhGiangVien}`
        ),
      ]);

      if (response.data.EC === 1) {
        setListTenKhung_TENCHUCDANH(response1.data.DT);
        setListKhungGioChuan(response.data.DT);
      } else {
        toast.error("Không thể lấy dữ liệu khung giờ chuẩn");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khung giờ chuẩn:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Đã xảy ra lỗi khi tải dữ liệu.</p>;
  }

  return (
    <>
      <RenderData
        dataKhungChuan={ListKhungGioChuan}
        dataTenKhungChuan={ListTenKhung_TENCHUCDANH}
      />
    </>
  );
};

export default GV_CaoCap_Hang_I;
