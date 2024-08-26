import { useEffect, useState } from "react";
import CookiesAxios from "../CookiesAxios";
import { Button, Box } from "@mui/material";
import GVTableDaChonKhung from "./component/GVTableDaChonKhung";

const IndexPhanCongGiangVien = () => {
  const [data_ListGVChuaChonKhung, setData_ListGVChuaChonKhung] = useState([]);
  const [data_ListGVDaChonKhung, setData_ListGVDaChonKhung] = useState([]);
  const [isOpenXemGiangVienChonKhung, setIsOpenXemGiangVienChonKhung] =
    useState(true);

  useEffect(() => {
    fetchListGiangVien();
  }, []);

  useEffect(() => {
    if (
      data_ListGVChuaChonKhung.length === 0 &&
      isOpenXemGiangVienChonKhung === false
    ) {
      fetchListGiangVienChuaChonKhung();
    }
  }, [isOpenXemGiangVienChonKhung]);

  const fetchListGiangVienChuaChonKhung = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/phancong/chuachonkhung`
      );
      console.log("chua chon khung =>", response.data);
      if (response.data.EC === 1) {
        setData_ListGVChuaChonKhung(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  };

  const fetchListGiangVien = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/phancong/dachonkhung`
      );
      console.log("da chon khung =>", response.data);
      if (response.data.EC === 1) {
        setData_ListGVDaChonKhung(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant={isOpenXemGiangVienChonKhung ? "outlined" : "text"}
          onClick={() => setIsOpenXemGiangVienChonKhung(true)}
          sx={{
            color: isOpenXemGiangVienChonKhung ? "green" : "grey.500",
            borderColor: isOpenXemGiangVienChonKhung ? "green" : "grey.500",
            opacity: isOpenXemGiangVienChonKhung ? 1 : 0.6,
          }}
        >
          Danh Sách Giảng Viên Đã Chọn Khung
        </Button>{" "}
        <Button
          variant={isOpenXemGiangVienChonKhung ? "text" : "outlined"}
          onClick={() => setIsOpenXemGiangVienChonKhung(false)}
          sx={{
            color: !isOpenXemGiangVienChonKhung ? "red" : "grey.500",
            borderColor: !isOpenXemGiangVienChonKhung ? "red" : "grey.500",
            opacity: !isOpenXemGiangVienChonKhung ? 1 : 0.6,
          }}
        >
          Danh Sách Giảng Viên Chưa Chọn Khung
        </Button>
      </Box>
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        {isOpenXemGiangVienChonKhung ? (
          <GVTableDaChonKhung data={data_ListGVDaChonKhung} />
        ) : (
          <GVTableDaChonKhung data={data_ListGVChuaChonKhung} />
        )}
      </Box>
    </Box>
  );
};

export default IndexPhanCongGiangVien;
