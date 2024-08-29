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
  const [data_hocKiNienKhoa, setData_hocKiNienKhoa] = useState([]);
  const [select_HocKiNienKhoa, setSelect_HocKiNienKhoa] = useState([]);
  const [data_Lop, setData_Lop] = useState([]);
  const [select_Lop, setSelect_Lop] = useState(null);
  // ---------------------------------------------------------------
  const [isDisableNamHoc, setIsDisableNamHoc] = useState(false);
  const [isOpenXemGiangVienChonKhung, setIsOpenXemGiangVienChonKhung] =
    useState(true);

  useEffect(() => {
    fetchListGiangVien();
  }, []);

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
      const response_Lop = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/lop/xem`
      );
      if (response.data.EC === 1) {
        setData_ListGVDaChonKhung(response.data.DT);
        setData_hocKiNienKhoa(response_hocKiNienKhoa.data.DT);
        setListNamHoc(response_NamHoc.data.DT);
        setSelect_HocKiNienKhoa(response_hocKiNienKhoa.data.DT[0].TENDANHGIA);
        setSelectNamHoc(response_NamHoc.data.DT[0].TENNAMHOC);
        setSelect_Lop(response_Lop.data.DT);
      }
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  };

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
                <MenuItem key={index} value={nienkhoa.TENHKNK}>
                  {nienkhoa.TENHKNK}
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
