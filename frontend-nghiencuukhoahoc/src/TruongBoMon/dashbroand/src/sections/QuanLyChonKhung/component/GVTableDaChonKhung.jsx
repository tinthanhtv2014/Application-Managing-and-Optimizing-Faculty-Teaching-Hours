import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const GVTableDaChonKhung = ({ data }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Phát hiện màn hình di động

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã Giảng Viên</TableCell>
            <TableCell>Tên Giảng Viên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Giờ Giảng Dạy Chuẩn</TableCell>
            <TableCell>Giờ Nghiên Cứu Khoa Học Chuẩn</TableCell>
            <TableCell>Giờ Phục Vụ Cộng Đồng Chuẩn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row) => {
              const info = row.ThongtinGiangvien[0]; // Lấy thông tin giảng viên
              const gioChuan = info.GIOCHUAN[0]; // Lấy thông tin giờ chuẩn
              return (
                <TableRow key={row.MAGV}>
                  <TableCell>{row.MAGV}</TableCell>
                  <TableCell>{info.TENGIANGVIEN}</TableCell>
                  <TableCell>{info.EMAIL || "Không có"}</TableCell>
                  <TableCell className="text-info">
                    {gioChuan.GIOGIANGDAY_CHUAN}
                  </TableCell>
                  <TableCell className="text-info">
                    {gioChuan.GIONGHIENCUUKHOAHOC_CHUAN}
                  </TableCell>
                  <TableCell className="text-info">
                    {gioChuan.GIOPHUCVUCONGDONG_CHUAN}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Năm học này chưa có ai chọn khung
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length > rowsPerPage && (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      )}
    </TableContainer>
  );
};

export default GVTableDaChonKhung;
