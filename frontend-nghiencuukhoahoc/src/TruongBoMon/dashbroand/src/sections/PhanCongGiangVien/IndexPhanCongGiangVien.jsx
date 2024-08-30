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
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import LopMonHocTable from "./component/LopMonHocTable";
const IndexPhanCongGiangVien = () => {
  const [data_ListGVChuaChonKhung, setData_ListGVChuaChonKhung] = useState([]);
  const [data_ListGVDaChonKhung, setData_ListGVDaChonKhung] = useState([]);
  const [data_NamHoc, setData_NamHoc] = useState([]);
  const [ListNamHoc, setListNamHoc] = useState(null);
  const [selectNamHoc, setSelectNamHoc] = useState([]);
  const [data_hocKiNienKhoa, setData_hocKiNienKhoa] = useState([]);
  const [select_HocKiNienKhoa, setSelect_HocKiNienKhoa] = useState([]);
  const [data_Lop, setData_Lop] = useState([]);
  const [select_Lop, setSelect_Lop] = useState(null);
  const [data_MonHoc, setData_MonHoc] = useState([]);
  const [TenBoMon, setTenBoMon] = useState(null);
  const [Loading, setLoading] = useState(true);

  // ---------------------------------------------------------------
  const [isDisableNamHoc, setIsDisableNamHoc] = useState(false);
  const [isOpenXemGiangVienChonKhung, setIsOpenXemGiangVienChonKhung] =
    useState(true);

  useEffect(() => {
    const auth = Cookies.get("accessToken");
    const decodeAuth = jwtDecode(auth);

    fetchDataGV(decodeAuth.taikhoan);
    fetchListGiangVien();
  }, []);
  useEffect(() => {
    if (TenBoMon) {
      fetchDataLop_byBoMon();
    }
  }, [TenBoMon]);
  useEffect(() => {
    if (select_Lop && select_HocKiNienKhoa) {
      fetchDataMonHoc_byLop();
    }
  }, [select_Lop, select_HocKiNienKhoa]);
  const fetchDataGV = async (taikhoan) => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`
      );

      console.log("Danh sách tài khoản:", response.data.DT);

      if (response.data.EC === 1) {
        setTenBoMon(response.data.DT.TENBOMON);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    }
  };
  const fetchListGiangVien = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/phancong/dachonkhung`
      );
      const response_hocKiNienKhoa = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/hockinienkhoa/xem`
      );
      const response_NamHoc = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/namhoc/xem`
      );

      if (response.data.EC === 1) {
        setData_ListGVDaChonKhung(response.data.DT);
        setData_hocKiNienKhoa(response_hocKiNienKhoa.data.DT);
        setListNamHoc(response_NamHoc.data.DT);
        setSelect_HocKiNienKhoa(response_hocKiNienKhoa.data.DT[0].TENDANHGIA);
        setSelectNamHoc(response_NamHoc.data.DT[0].TENNAMHOC);
      }
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  };
  const fetchDataLop_byBoMon = async () => {
    try {
      const response_Lop = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/lop/bomon/xem`,
        { TENBOMON: TenBoMon }
      );
      if (response_Lop.data.EC === 1) {
        setData_Lop(response_Lop.data.DT);
      }
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  };
  const fetchDataMonHoc_byLop = async () => {
    try {
      const response_MonHoc = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/phancong/lophoc/hocki`,
        { MALOP: select_Lop, HOCKINIENKHOA: select_HocKiNienKhoa }
      );

      if (response_MonHoc.data.EC === 1) {
        setData_MonHoc(response_MonHoc.data.DT);
      }
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  };

  if (Loading) {
    return "Đang tải dữ liệu...";
  }

  return (
    <>
      <Box sx={{ maxWidth: { md: 220, xs: "100%" } }}>
        <FormControl fullWidth className="profile-email-input">
          <InputLabel id="select-label-trang-thai">Học Kì Niên Khóa</InputLabel>
          <Select
            labelId="select-label-trang-thai"
            id="trang-thai-select"
            name="HOCKINIENKHOA"
            label="Học Kì Niên Khóa"
            value={select_HocKiNienKhoa}
            defaultValue={select_HocKiNienKhoa}
            // disabled={isDisableNamHoc}
            onChange={(e) => setSelect_HocKiNienKhoa(e.target.value)}
            variant="outlined"
          >
            {data_hocKiNienKhoa && data_hocKiNienKhoa.length > 0 ? (
              data_hocKiNienKhoa.map((nienkhoa, index) => (
                <MenuItem key={index} value={nienkhoa}>
                  {nienkhoa.TEN_NAM_HOC} {nienkhoa.TENHKNK}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Không có Học Kì Niên Khóa
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ maxWidth: { md: 220, xs: "100%" } }}>
        <FormControl fullWidth className="profile-email-input">
          <InputLabel id="select-label-trang-thai">Danh Sách Lớp</InputLabel>
          <Select
            labelId="select-label-trang-thai"
            id="trang-thai-select"
            name="HOCKINIENKHOA"
            label="Học Kì Niên Khóa"
            value={select_Lop}
            defaultValue={select_Lop}
            // disabled={isDisableNamHoc}
            onChange={(e) => setSelect_Lop(e.target.value)}
            variant="outlined"
          >
            {data_Lop && data_Lop.length > 0 ? (
              data_Lop.map((lop, index) => (
                <MenuItem key={index} value={lop.MALOP}>
                  {lop.TENLOP}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Không có dữ liệu lớp...
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      <LopMonHocTable data={data_MonHoc} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "1200px" }}>
          {/* {isOpenXemGiangVienChonKhung ? (
            <GVTableDaChonKhung
              data={data_ListGVDaChonKhung}
              selectNamHoc={selectNamHoc}
            />
          ) : (
            <GVTableDaChonKhung
              data={data_ListGVChuaChonKhung}
              selectNamHoc={selectNamHoc}
            />
          )} */}
        </Box>
      </Box>
    </>
  );
};

export default IndexPhanCongGiangVien;
