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

const LopMonHocTable = ({ data, handlePhanCong }) => {
  // Hàm tính số giờ giảng dạy
  const calculateTeachingHours = (siso, tinChiLyThuyet, tinChiThucHanh) => {
    // Tính số giờ lý thuyết
    const gioLyThuyet = tinChiLyThuyet * 15;

    // Tính số giờ thực hành
    const gioThucHanh =
      siso > 30
        ? tinChiThucHanh * 2 * 30 // Chia làm 2 ca nếu sĩ số > 30
        : tinChiThucHanh * 1 * 30; // Không chia nếu sĩ số <= 30

    // Tổng số giờ
    return gioLyThuyet + gioThucHanh;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã Lớp</TableCell>
            <TableCell align="center">Sĩ Số</TableCell>
            <TableCell align="center">Tên Môn Học</TableCell>
            <TableCell align="center">Số Thứ Tự Học Kỳ</TableCell>
            <TableCell align="center">Số Giờ Giảng Dạy</TableCell>{" "}
            {/* Thêm cột này */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} onClick={() => handlePhanCong(row.MAMONHOC)}>
              <TableCell component="th" scope="row">
                {row.MALOP}
              </TableCell>
              <TableCell align="center">{row.SISO}</TableCell>
              <TableCell align="center">{row.TENMONHOC}</TableCell>

              <TableCell align="center">{row.SOTHUTUHOCKI}</TableCell>
              <TableCell align="center">
                {/* Gọi hàm calculateTeachingHours để tính toán */}
                {calculateTeachingHours(
                  row.SISO,
                  row.SOTINCHILYTHUYET,
                  row.SOTINCHITHUCHANH
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LopMonHocTable;
