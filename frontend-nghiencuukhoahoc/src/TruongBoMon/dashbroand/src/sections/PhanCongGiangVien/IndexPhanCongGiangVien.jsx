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
  Grid,
  Switch,
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

  const [isOpenSwap, setIsOpenSwap] = useState(true);
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
  const handleChange = (event) => {
    setIsOpenSwap(event.target.checked);
  };
  if (Loading) {
    return "Đang tải dữ liệu...";
  }

  return (
    <>
      <Grid container spacing={2}>
        {/* Học Kì Niên Khóa */}
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: { md: 220, xs: "100%" } }}>
            <FormControl fullWidth className="profile-email-input">
              <InputLabel id="select-label-hoc-ki-nien-khoa">
                Học Kì Niên Khóa
              </InputLabel>
              <Select
                labelId="select-label-hoc-ki-nien-khoa"
                id="hoc-ki-nien-khoa-select"
                name="HOCKINIENKHOA"
                label="Học Kì Niên Khóa"
                value={select_HocKiNienKhoa}
                defaultValue={select_HocKiNienKhoa}
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
        </Grid>

        {/* Danh Sách Lớp */}
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: { md: 220, xs: "100%" } }}>
            <FormControl fullWidth className="profile-email-input">
              <InputLabel id="select-label-lop">Danh Sách Lớp</InputLabel>
              <Select
                labelId="select-label-lop"
                id="lop-select"
                name="DANHSACHLOP"
                label="Danh Sách Lớp"
                value={select_Lop}
                defaultValue={select_Lop}
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
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {" "}
        <Grid item xs={12} md={8}>
          {" "}
          <Box sx={{ mt: 3 }}>
            <LopMonHocTable data={data_MonHoc} />
          </Box>
        </Grid>
        {isOpenSwap ? (
          <>
            {" "}
            <Grid item xs={12} md={3}>
              {" "}
              <Box sx={{ mt: 3 }}>
                <GVTableDaChonKhung
                  data={data_ListGVDaChonKhung}
                  selectNamHoc={selectNamHoc}
                />
              </Box>
            </Grid>{" "}
          </>
        ) : (
          <>
            {" "}
            <Grid item xs={12} md={3}>
              {" "}
              <Box sx={{ mt: 3 }}>
                <GVTableDaChonKhung
                  data={data_ListGVDaChonKhung}
                  selectNamHoc={selectNamHoc}
                />
                1
              </Box>
            </Grid>{" "}
          </>
        )}
        <Grid item xs={12} md={1}>
          {" "}
          <Switch
            checked={isOpenSwap} // Kiểm soát Switch dựa vào isOpenSwap
            onChange={handleChange} // Gọi hàm khi Switch thay đổi
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>{" "}
      </Grid>
    </>
  );
};

export default IndexPhanCongGiangVien;
