import { useEffect, useState } from "react";
import CookiesAxios from "../CookiesAxios";
import {
  Box,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import GVTableDaChonKhung from "./component/GVTableDaChonKhung";

const IndexPhanCongGiangVien = () => {
  const [data_ListGVChuaChonKhung, setData_ListGVChuaChonKhung] = useState([]);
  const [data_ListGVDaChonKhung, setData_ListGVDaChonKhung] = useState([]);
  const [data_NamHoc, setData_NamHoc] = useState([]);
  const [ListNamHoc, setListNamHoc] = useState(null);
  const [selectNamHoc, setSelectNamHoc] = useState([]);
  // ---------------------------------------------------------------
  const [isDisableNamHoc, setIsDisableNamHoc] = useState(false);
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
      const response_NamHoc = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/namhoc/xem`
      );

      if (response.data.EC === 1) {
        setData_ListGVDaChonKhung(response.data.DT);
        setListNamHoc(response_NamHoc.data.DT);
        setSelectNamHoc(response_NamHoc.data.DT[0].TENNAMHOC);
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
      <Box sx={{ maxWidth: { md: 220, xs: "100%" } }}>
        <FormControl fullWidth className="profile-email-input">
          <InputLabel id="select-label-trang-thai">Năm học</InputLabel>
          <Select
            labelId="select-label-trang-thai"
            id="trang-thai-select"
            name="TENCHUCDANH"
            label="Chức danh"
            value={selectNamHoc}
            defaultValue={selectNamHoc}
            disabled={isDisableNamHoc}
            onChange={(e) => setSelectNamHoc(e.target.value)}
            variant="outlined"
          >
            {ListNamHoc && ListNamHoc.length > 0 ? (
              ListNamHoc.map((namhoc, index) => (
                <MenuItem key={index} value={namhoc.TENNAMHOC}>
                  {namhoc.TENNAMHOC}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Không có năm học nào
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
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
          <GVTableDaChonKhung
            data={data_ListGVDaChonKhung}
            selectNamHoc={selectNamHoc}
          />
        ) : (
          <GVTableDaChonKhung
            data={data_ListGVChuaChonKhung}
            selectNamHoc={selectNamHoc}
          />
        )}
      </Box>
    </Box>
  );
};

export default IndexPhanCongGiangVien;
