// LopMonHocTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const LopMonHocTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã Lớp</TableCell>
            <TableCell align="center">Tên Lớp</TableCell>
            <TableCell align="center">Năm Tuyển Sinh</TableCell>
            <TableCell align="center">Sĩ Số</TableCell>
            <TableCell align="center">Mã Môn Học</TableCell>
            <TableCell align="center">Tên Môn Học</TableCell>
            <TableCell align="center">Số Tín Chỉ Lý Thuyết</TableCell>
            <TableCell align="center">Số Tín Chỉ Thực Hành</TableCell>
            <TableCell align="center">Tên Chương Trình</TableCell>
            <TableCell align="center">Số Quyết Định</TableCell>
            <TableCell align="center">Trình Độ</TableCell>
            <TableCell align="center">Tổng Số Tín Chỉ</TableCell>
            <TableCell align="center">Mô Tả Học Kỳ</TableCell>
            <TableCell align="center">Số Thứ Tự Học Kỳ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.MALOP}
              </TableCell>
              <TableCell align="center">{row.TENLOP}</TableCell>
              <TableCell align="center">{row.NAMTUYENSINH}</TableCell>
              <TableCell align="center">{row.SISO}</TableCell>
              <TableCell align="center">{row.MAMONHOC}</TableCell>
              <TableCell align="center">{row.TENMONHOC}</TableCell>
              <TableCell align="center">{row.SOTINCHILYTHUYET}</TableCell>
              <TableCell align="center">{row.SOTINCHITHUCHANH}</TableCell>
              <TableCell align="center">{row.TENCHUONGTRINH}</TableCell>
              <TableCell align="center">{row.SO_QUYET_DINH}</TableCell>
              <TableCell align="center">{row.TRINH_DO}</TableCell>
              <TableCell align="center">{row.TONG_SO_TIN_CHI}</TableCell>
              <TableCell align="center">{row.MO_TA_HOC_KY}</TableCell>
              <TableCell align="center">{row.SOTHUTUHOCKI}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LopMonHocTable;
