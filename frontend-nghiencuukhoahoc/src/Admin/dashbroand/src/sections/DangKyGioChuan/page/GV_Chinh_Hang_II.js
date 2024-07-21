import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import RenderData from "./RenderData/Renderdata";

const GV_CaoCap_Hang_II = ({
  ChucDanhGiangVien,
  MaGV,
  OpenChucNangtheokhungthoigian,
  fetchDataGV,
}) => {
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });

  const [giangVien, setGiangVien] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [TenDangNhapGV, setTenDangNhapGV] = useState(null);
  const [ListKhungGioChuan, setListKhungGioChuan] = useState(null);
  const [ListNamHoc, setListNamHoc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = Cookies.get("accessToken");
        const decodeAuth = jwtDecode(auth);
        setTenDangNhapGV(decodeAuth.taikhoan);
        await fetchDataGV_II();
      } catch (error) {
        console.error("Lỗi khi giải mã token hoặc lấy dữ liệu:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchDataGV_II = async () => {
    try {
      const [response_ListKhungChuan, responseListNamHoc] = await Promise.all([
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xem/khunggiochuan/${ChucDanhGiangVien}`
        ),
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/namhoc/xem`
        ),
      ]);

      console.log(
        "Check response_ListKhungChuan:",
        response_ListKhungChuan.data.DT
      );
      console.log("Check responseListNamHoc:", responseListNamHoc.data.DT);

      if (response_ListKhungChuan.data.EC === 1) {
        setListKhungGioChuan(response_ListKhungChuan.data.DT);
        setListNamHoc(responseListNamHoc.data.DT);
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

  console.log("Data Khung chuan:", ListKhungGioChuan);

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
        dataListNamHoc={ListNamHoc}
        MaGV={MaGV}
        OpenChucNangtheokhungthoigian={OpenChucNangtheokhungthoigian}
        fetchDataGV={fetchDataGV}
      />
    </>
  );
};

export default GV_CaoCap_Hang_II;
