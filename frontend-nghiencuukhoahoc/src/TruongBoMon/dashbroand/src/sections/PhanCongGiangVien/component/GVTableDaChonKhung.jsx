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
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const GVTableDaChonKhung = ({ data }) => {
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screen

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {(!isMobile || showAll) && <TableCell>Mã Giảng Viên</TableCell>}
            <TableCell>Tên Giảng Viên</TableCell>
            {(!isMobile || showAll) && <TableCell>Email</TableCell>}
            {(!isMobile || showAll) && <TableCell>Điện Thoại</TableCell>}
            {(!isMobile || showAll) && <TableCell>Địa Chỉ</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow key={row.MAGV}>
              {(!isMobile || showAll) && <TableCell>{row.MAGV}</TableCell>}
              <TableCell>{row.TENGV}</TableCell>
              {(!isMobile || showAll) && <TableCell>{row.EMAIL}</TableCell>}
              {(!isMobile || showAll) && <TableCell>{row.DIENTHOAI}</TableCell>}
              {(!isMobile || showAll) && <TableCell>{row.DIACHI}</TableCell>}
            </TableRow>
          ))}
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
      {isMobile && !showAll && (
        <Button
          variant="text"
          onClick={() => setShowAll(true)}
          sx={{ marginTop: 2 }}
        >
          Xem tất cả
        </Button>
      )}
      {isMobile && showAll && (
        <Button
          variant="text"
          onClick={() => setShowAll(false)}
          sx={{ marginTop: 2 }}
        >
          Ẩn bớt
        </Button>
      )}
    </TableContainer>
  );
};

export default GVTableDaChonKhung;
