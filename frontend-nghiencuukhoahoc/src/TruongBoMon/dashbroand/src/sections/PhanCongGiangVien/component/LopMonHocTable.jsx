import React, { useState } from "react";
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
  const [selectedRow, setSelectedRow] = useState(null); // Lưu hàng được chọn

  // Hàm tính số giờ giảng dạy
  const calculateTeachingHours = (siso, tinChiLyThuyet, tinChiThucHanh) => {
    const gioLyThuyet = tinChiLyThuyet * 15;
    const gioThucHanh =
      siso > 30 ? tinChiThucHanh * 2 * 30 : tinChiThucHanh * 1 * 30;
    return gioLyThuyet + gioThucHanh;
  };

  // Hàm xử lý khi click vào hàng
  const handleRowClick = (mamMonHoc) => {
    setSelectedRow(mamMonHoc); // Cập nhật hàng được chọn
    handlePhanCong(mamMonHoc); // Gọi hàm phân công
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã Lớp</TableCell>
            <TableCell align="center">Tên Môn Học</TableCell>
            <TableCell align="center">Số Thứ Tự Học Kỳ</TableCell>
            <TableCell align="center">Số Giờ Giảng Dạy</TableCell>
            <TableCell align="center">Phân Công</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(row.MAMONHOC)} // Xử lý khi click
                sx={{
                  backgroundColor:
                    selectedRow === row.MAMONHOC ? "#f0f0f0" : "inherit", // Tô màu nếu được chọn
                  cursor: "pointer", // Thêm hiệu ứng con trỏ
                }}
              >
                <TableCell component="th" scope="row">
                  {row.MALOP}
                </TableCell>
                <TableCell align="center">{row.TENMONHOC}</TableCell>
                <TableCell align="center">{row.SOTHUTUHOCKI}</TableCell>
                <TableCell align="center">
                  {calculateTeachingHours(
                    row.SISO,
                    row.SOTINCHILYTHUYET,
                    row.SOTINCHITHUCHANH
                  )}
                </TableCell>
                <TableCell align="center">{row.MAGV}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LopMonHocTable;
