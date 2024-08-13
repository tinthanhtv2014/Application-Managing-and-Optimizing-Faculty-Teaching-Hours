import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { Button, Typography } from "@mui/material";
import moment from "moment";

import CookiesAxios from "../CookiesAxios";
import DangKyDanhMucGioChuan from "./RegisterDanhMucGioChuan";
const IndexDangKyDanhmuc = () => {
  const [loading, setLoading] = useState(true);

  const [IsOpenCheckKhoa, setIsOpenCheckKhoa] = useState(false);
  const [OpenChucNangtheokhungthoigian, setOpenChucNangtheokhungthoigian] =
    useState({ XemKhungGioChuan: null, ChonKhungGio: null });

  const [MaGV, setMaGV] = useState(null);
  const [startTimeGate, setStartTimeGate] = useState(null);
  const [endTimeGate, setEndTimeGate] = useState(null);

  useEffect(() => {
    const auth = Cookies.get("accessToken");
    const decodeAuth = jwtDecode(auth);

    fetchDataGV(decodeAuth.taikhoan);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Trả về chuỗi rỗng nếu ngày không có giá trị

    const date = moment(dateString);
    if (!date.isValid()) return ""; // Trả về chuỗi rỗng nếu định dạng không đúng

    return date.format("DD-MM-YYYY"); // Định dạng ngày theo yêu cầu
  };

  const fetchDataGV = async (taikhoan) => {
    try {
      // Lấy thông tin giảng viên
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`
      );

      const response_XemTimeKhungGioChuan = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xem/thoigianxacnhan`
      );

      if (
        response_XemTimeKhungGioChuan.data.EC === 1 &&
        response_XemTimeKhungGioChuan.data.DT.length > 0
      ) {
        // Tìm phần tử có TEN_KHOA trùng khớp với TENKHOA của giảng viên
        const matchedKhoa = response_XemTimeKhungGioChuan.data.DT.find(
          (item) =>
            item.TEN_KHOA === response.data.DT.TENKHOA &&
            item.GHICHU === "NGHIENCUU"
        );

        console.log("check true", matchedKhoa);
        if (matchedKhoa) {
          const formattedStartDate = formatDate(matchedKhoa.THOIGIANBATDAU);
          const formattedEndDate = formatDate(matchedKhoa.THOIGIANKETTHUC);

          console.log("GHICHU", matchedKhoa.GHICHU);
          const currentDate = formatDate(moment().format());
          setStartTimeGate(formattedStartDate);
          setEndTimeGate(formattedEndDate);
          if (
            moment(currentDate, "YYYY-MM-DD").isBetween(
              moment(formattedStartDate, "YYYY-MM-DD"),
              moment(formattedEndDate, "YYYY-MM-DD"),
              null,
              "[)"
            )
          ) {
            setOpenChucNangtheokhungthoigian({
              XemLSDangKyNghienCuu: "Xem Lịch Sử Đăng Ký Danh Mục",
              DangKyNghienCuu: "Đăng Ký Danh Mục",
            });
            setIsOpenCheckKhoa(true);
          } else {
            setOpenChucNangtheokhungthoigian({
              XemLSDangKyNghienCuu: "Xem Lịch Sử Đăng Ký Danh Mục",
            });
          }
        } else {
          setOpenChucNangtheokhungthoigian({
            XemLSDangKyNghienCuu: "Xem Lịch Sử Đăng Ký Danh Mục",
          });
        }
      } else {
        setOpenChucNangtheokhungthoigian({
          XemLSDangKyNghienCuu: "Xem Lịch Sử Đăng Ký Danh Mục",
        });
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Đang lấy dữ liệu....</Typography>; // Hiển thị thông báo tải dữ liệu
  }

  return (
    <DangKyDanhMucGioChuan
      IsOpenCheckKhoa={IsOpenCheckKhoa}
      OpenChucNangtheokhungthoigian={OpenChucNangtheokhungthoigian}
      MaGV={MaGV}
      startTimeGate={startTimeGate}
      endTimeGate={endTimeGate}
    />
  );
};

export default IndexDangKyDanhmuc;
