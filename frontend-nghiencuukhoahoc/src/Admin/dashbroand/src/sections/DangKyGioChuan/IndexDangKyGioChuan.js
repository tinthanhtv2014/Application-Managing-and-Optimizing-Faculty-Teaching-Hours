import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import GV_Hang_III from "./page/GV_Hang_III";

import GV_CaoCap_Hang_I from "./page/GV_CaoCap_Hang_I";
import GV_Chinh_Hang_II from "./page/GV_Chinh_Hang_II";
import GV_TapSu from "./page/GV_TapSu";
import { Button, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const DangKyGioChuan = () => {
  const [giangVien, setGiangVien] = useState(null);
  const [loading, setLoading] = useState(true);

  const [ChucDanhGiangVien, setChucDanhGiangVien] = useState(null);
  const [isGVCaoCapHangI, setIsGVCaoCapHangI] = useState(false);
  const [isGVChinhHangII, setIsGVChinhHangII] = useState(false);
  const [isGVHangIII, setIsGVHangIII] = useState(false);

  const [isGVTapSu, setIsGVTapSu] = useState(false);
  const [IsOpenCheckKhoa, setIsOpenCheckKhoa] = useState(false);
  const [OpenChucNangtheokhungthoigian, setOpenChucNangtheokhungthoigian] =
    useState({ XemKhungGioChuan: null, ChonKhungGio: null });

  const [MaGV, setMaGV] = useState(null);
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = Cookies.get("accessToken");
    const decodeAuth = jwtDecode(auth);

    fetchDataGV(decodeAuth.taikhoan);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Trả về chuỗi rỗng nếu ngày không có giá trị

    const date = moment(dateString);
    if (!date.isValid()) return ""; // Trả về chuỗi rỗng nếu định dạng không đúng

    return date.format("YYYY-MM-DD"); // Định dạng ngày theo yêu cầu
  };

  const fetchDataGV = async (taikhoan) => {
    setLoading(true); // Đặt loading thành true khi bắt đầu lấy dữ liệu
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`
      );
      const response_XemTimeKhungGioChuan = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xem/thoigianxacnhan`
      );
      console.log("TENKHOA USER", response.data.DT.TENKHOA);
      console.log(
        "check time khung gio =>",
        response_XemTimeKhungGioChuan.data.EC
      );
      if (response_XemTimeKhungGioChuan.data.EC === 1) {
        if (response_XemTimeKhungGioChuan.data.DT.length > 0) {
          const startTime =
            response_XemTimeKhungGioChuan.data.DT[0].THOIGIANBATDAU;
          const endTime =
            response_XemTimeKhungGioChuan.data.DT[0].THOIGIANKETTHUC;

          // Định dạng startTime và endTime chỉ lấy ngày
          const formattedStartDate = formatDate(startTime);
          const formattedEndDate = formatDate(endTime);

          // setStartTime(formattedStartDate);
          // setEndTime(formattedEndDate);

          // Lấy thời gian hiện tại và định dạng chỉ có ngày
          const currentDate = formatDate(moment().format()); // Định dạng ngày hiện tại

          console.log("Start Date:", formattedStartDate);
          console.log("End Date:", formattedEndDate);

          // So sánh currentDate với startMoment và endMoment
          if (
            moment(currentDate, "YYYY-MM-DD").isBetween(
              moment(formattedStartDate, "YYYY-MM-DD"),
              moment(formattedEndDate, "YYYY-MM-DD"),
              null,
              "[)"
            ) &&
            response.data.DT.TENKHOA ==
              response_XemTimeKhungGioChuan.data.DT[0].TEN_KHOA
          ) {
            setOpenChucNangtheokhungthoigian({
              XemKhungGio: "Xem Khung Giờ",
              ChonKhungGio: "Chọn Khung Giờ",
            });
            setIsOpenCheckKhoa(true);
          } else {
            setOpenChucNangtheokhungthoigian({
              XemKhungGio: "Xem Khung Giờ",
            });
          }
        } else {
          setOpenChucNangtheokhungthoigian({
            XemKhungGio: "Xem Khung Giờ",
          });
        }
      }

      if (response.data.EC === 1) {
        setGiangVien(response.data.DT);
        setChucDanhGiangVien(response.data.DT.TENCHUCDANH);
        setMaGV(response.data.DT.MAGV);

        switch (response.data.DT.TENCHUCDANH) {
          case "Giảng viên (Hạng III)":
            setIsGVHangIII(true);
            break;
          case "Giảng viên cao cấp (Hạng I)":
            setIsGVCaoCapHangI(true);
            break;
          case "Giảng viên chính (Hạng II)":
            setIsGVChinhHangII(true);
            break;

          case "Giảng viên Tập sự":
            setIsGVTapSu(true);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    } finally {
      setLoading(false); // Đặt loading thành false sau khi lấy dữ liệu xong
    }
  };

  const handleMoveProfileGV = () => {
    if (!loading) {
      navigate("/admin/account-giangvien");
    }
  };

  if (loading) {
    return <Typography>Đang tải dữ liệu, vui lòng đợi...</Typography>; // Hiển thị thông báo tải dữ liệu
  }

  if (isGVHangIII) {
    return (
      <GV_Hang_III
        IsOpenCheckKhoa={IsOpenCheckKhoa}
        OpenChucNangtheokhungthoigian={OpenChucNangtheokhungthoigian}
        ChucDanhGiangVien={ChucDanhGiangVien}
        MaGV={MaGV}
        fetchDataGV={fetchDataGV}
      />
    );
  }

  if (isGVCaoCapHangI) {
    return (
      <GV_CaoCap_Hang_I
        IsOpenCheckKhoa={IsOpenCheckKhoa}
        OpenChucNangtheokhungthoigian={OpenChucNangtheokhungthoigian}
        ChucDanhGiangVien={ChucDanhGiangVien}
        MaGV={MaGV}
        fetchDataGV={fetchDataGV}
      />
    );
  }
  if (isGVChinhHangII) {
    return (
      <GV_Chinh_Hang_II
        IsOpenCheckKhoa={IsOpenCheckKhoa}
        OpenChucNangtheokhungthoigian={OpenChucNangtheokhungthoigian}
        ChucDanhGiangVien={ChucDanhGiangVien}
        MaGV={MaGV}
        fetchDataGV={fetchDataGV}
      />
    );
  }
  if (isGVTapSu) {
    return (
      <GV_TapSu
        IsOpenCheckKhoa={IsOpenCheckKhoa}
        OpenChucNangtheokhungthoigian={OpenChucNangtheokhungthoigian}
        ChucDanhGiangVien={ChucDanhGiangVien}
        MaGV={MaGV}
        fetchDataGV={fetchDataGV}
      />
    );
  }

  return (
    <Typography>
      Hãy Cập Nhật Chức Danh Để Đăng Ký Khung Giờ Chuẩn{" "}
      <Button variant="outlined" onClick={handleMoveProfileGV}>
        Cập Nhật Chức Danh <i className="fa-solid fa-right-long ml-4"></i>
      </Button>{" "}
    </Typography>
  );
};

export default DangKyGioChuan;
