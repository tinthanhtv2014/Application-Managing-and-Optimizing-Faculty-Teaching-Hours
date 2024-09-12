import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import CookiesAxios from "../CookiesAxios";

const IndexPhanCongCuaToi = () => {
  const [dataPhanCong, setDataPhanCong] = useState([]);
  const [magv, setMagv] = useState("");
  const [hocKiNienKhoaList, setHocKiNienKhoaList] = useState([]);
  const [selectedHocKiNienKhoa, setSelectedHocKiNienKhoa] = useState("");

  useEffect(() => {
    const auth = Cookies.get("accessToken");
    const decodeAuth = jwtDecode(auth);
    fetchDataGV(decodeAuth.taikhoan);
    fetchHocKiNienKhoa();
  }, []);

  const fetchDataGV = async (taikhoan) => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`
      );
      if (response.data.EC === 1) {
        setMagv(response.data.DT.MAGV);
      }
    } catch (error) {
      console.error("Error fetching giangvien data: ", error);
    }
  };

  const fetchHocKiNienKhoa = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/hockinienkhoa/xem`
      );
      if (response.data.EC === 1) {
        setHocKiNienKhoaList(response.data.DT);
        setSelectedHocKiNienKhoa(response.data.DT[0].MAHKNK);
      }
    } catch (error) {
      console.error("Error fetching hoc ki nien khoa data: ", error);
    }
  };

  const fetchPhanCong = async () => {
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/danhsach/monhoc/giangvien/canhan`,
        {
          MAGV: magv,
          MAHKNK: selectedHocKiNienKhoa,
        }
      );
      console.log("check phan cong =>", response.data);
      if (response.data.EC === 1) {
        setDataPhanCong(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching phan cong mon hoc data: ", error);
    }
  };

  useEffect(() => {
    if (magv && selectedHocKiNienKhoa) {
      fetchPhanCong();
    }
  }, [magv, selectedHocKiNienKhoa]);

  const handleChange = (event) => {
    setSelectedHocKiNienKhoa(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      {/* Form Select */}
      <Grid item xs={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="hoc-ki-nien-khoa-label">Học Kì Niên Khóa</InputLabel>
          <Select
            labelId="hoc-ki-nien-khoa-label"
            id="hoc-ki-nien-khoa-select"
            value={selectedHocKiNienKhoa}
            label="Học Kì Niên Khóa"
            onChange={handleChange}
          >
            {hocKiNienKhoaList.map((hocKi) => (
              <MenuItem key={hocKi.MAHKNK} value={hocKi.MAHKNK}>
                {hocKi.TENHKNK} {hocKi.TEN_NAM_HOC}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Bảng Phân Công */}
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Phân Công Môn Học
          </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Lớp</TableCell>
                <TableCell>Tên Lớp</TableCell>
                <TableCell>Tên Môn Học</TableCell>
                <TableCell>Số Giờ</TableCell>
                <TableCell>Học Kỳ</TableCell>
                <TableCell>Sĩ Số</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPhanCong.map((monhoc) => (
                <TableRow>
                  <TableCell>{monhoc.CHITIET_LOP[0].MALOP}</TableCell>
                  <TableCell>{monhoc.CHITIET_LOP[0].TENLOP}</TableCell>
                  <TableCell>{monhoc.TENMONHOC}</TableCell>
                  <TableCell>{monhoc.THOI_LUONG_MON_HOC}</TableCell>
                  <TableCell>{monhoc.TENHKNK}</TableCell>
                  <TableCell>{monhoc.CHITIET_LOP[0].SISO}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default IndexPhanCongCuaToi;
