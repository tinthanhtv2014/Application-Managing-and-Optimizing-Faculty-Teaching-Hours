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

            <TableCell align="center">Sĩ Số</TableCell>

            <TableCell align="center">Tên Môn Học</TableCell>
            <TableCell align="center">Số Tín Chỉ Lý Thuyết</TableCell>
            <TableCell align="center">Số Tín Chỉ Thực Hành</TableCell>

            <TableCell align="center">Số Thứ Tự Học Kỳ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.MALOP}
              </TableCell>

              <TableCell align="center">{row.SISO}</TableCell>

              <TableCell align="center">{row.TENMONHOC}</TableCell>
              <TableCell align="center">{row.SOTINCHILYTHUYET}</TableCell>
              <TableCell align="center">{row.SOTINCHITHUCHANH}</TableCell>

              <TableCell align="center">{row.SOTHUTUHOCKI}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LopMonHocTable;
