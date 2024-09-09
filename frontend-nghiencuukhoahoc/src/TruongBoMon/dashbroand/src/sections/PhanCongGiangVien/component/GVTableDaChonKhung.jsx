import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  useMediaQuery,
  useTheme,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios"; // Giả sử bạn sử dụng axios để gọi API
import CookiesAxios from "../../CookiesAxios";

const GVTableDaChonKhung = ({ data, selectNamHoc, select_HocKiNienKhoa }) => {
  const [selectedGV, setSelectedGV] = useState(null); // Trạng thái để lưu giảng viên đã chọn
  const [details, setDetails] = useState(null); // Trạng thái để lưu thông tin chi tiết của giảng viên

  useEffect(() => {
    if (selectNamHoc && selectedGV) {
      fetchDetails(selectedGV);
    }
  }, [selectNamHoc]);

  const fetchDetails = async (MAGV) => {
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/phancong/dachonkhung/chitiet`,
        {
          MAGV,
          TENNAMHOC: selectNamHoc,
        }
      );
      if (response.data.EC === 1) {
        setDetails(response.data.DT[0]);
      }
    } catch (error) {
      console.error("Failed to fetch details", error);
    }
  };

  const handleRowClick = (row) => {
    handlePhanCong(row.MAGV);
    if (selectedGV === row.MAGV) {
      setSelectedGV(null);
      setDetails(null);
    } else {
      setSelectedGV(row.MAGV);
      fetchDetails(row.MAGV);
    }
  };
  console.log("check data=>", data);
  const handlePhanCong = async (MAGV) => {
    console.log("check select_HocKiNienKhoa", select_HocKiNienKhoa);
    console.log("check MAGV", MAGV);
    if (select_HocKiNienKhoa && MAGV) {
      try {
        const response = await CookiesAxios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/phancong/dachonkhung/chitiet`,
          { HOCKINIENKHOA: select_HocKiNienKhoa, MAGV: MAGV }
        );
        if (response.data.EC === 1) {
          setDetails(response.data.DT[0]);
        }
      } catch (error) {
        console.error("Failed to fetch details", error);
      }
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Giảng Viên</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <React.Fragment key={row.MAGV}>
              <TableRow
                onClick={() => handleRowClick(row)}
                sx={{
                  cursor: "pointer",
                }}
              >
                <TableCell
                  className={`${selectedGV === row.MAGV ? "text-success" : ""}`}
                  title={row.MALOP}
                >
                  {row.TENGV}
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GVTableDaChonKhung;
