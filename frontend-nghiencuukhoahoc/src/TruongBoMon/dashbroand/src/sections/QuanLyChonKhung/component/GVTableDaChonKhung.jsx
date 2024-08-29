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

const GVTableDaChonKhung = ({ data, selectNamHoc }) => {
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [selectedGV, setSelectedGV] = useState(null); // Trạng thái để lưu giảng viên đã chọn
  const [details, setDetails] = useState(null); // Trạng thái để lưu thông tin chi tiết của giảng viên

  useEffect(() => {
    if (selectNamHoc && selectedGV) {
      fetchDetails(selectedGV);
    }
  }, [selectNamHoc]);
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
    if (selectedGV === row.MAGV) {
      setSelectedGV(null);
      setDetails(null);
    } else {
      setSelectedGV(row.MAGV);
      fetchDetails(row.MAGV);
    }
  };

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
            <React.Fragment key={row.MAGV}>
              <TableRow
                onClick={() => handleRowClick(row)}
                sx={{
                  cursor: "pointer",
                }}
              >
                {(!isMobile || showAll) && <TableCell>{row.MAGV}</TableCell>}
                <TableCell
                  className={`${selectedGV === row.MAGV ? "text-success" : ""}`}
                >
                  {row.TENGV}
                </TableCell>
                {(!isMobile || showAll) && <TableCell>{row.EMAIL}</TableCell>}
                {(!isMobile || showAll) && (
                  <TableCell>{row.DIENTHOAI}</TableCell>
                )}
                {(!isMobile || showAll) && <TableCell>{row.DIACHI}</TableCell>}
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse
                    in={selectedGV === row.MAGV}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={1}>
                      {details ? (
                        <>
                          <Table size="small" aria-label="details">
                            <TableBody>
                              <TableRow>
                                <TableCell sx={{ color: "red" }}>
                                  Khung Chuẩn:
                                </TableCell>
                                <TableCell sx={{ color: "red" }}>
                                  {details.TENKHUNGCHUAN}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Giờ Giảng Dạy Hành Chính:</TableCell>
                                <TableCell>
                                  {details.GIOGIANGDAY_HANHCHINH}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{ color: "red" }}>
                                  Giờ Giảng Dạy Chuẩn:
                                </TableCell>
                                <TableCell sx={{ color: "red" }}>
                                  {details.GIOGIANGDAY_CHUAN}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  Giờ Nghiên Cứu Khoa Học Hành Chính:
                                </TableCell>
                                <TableCell>
                                  {details.GIONGHIENCUUKHOAHOC_HANHCHINH}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{ color: "red" }}>
                                  Giờ Nghiên Cứu Khoa Học Chuẩn:
                                </TableCell>
                                <TableCell sx={{ color: "red" }}>
                                  {details.GIONGHIENCUUKHOAHOC_CHUAN}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  Giờ Phục Vụ Cộng Đồng Hành Chính:
                                </TableCell>
                                <TableCell>
                                  {details.GIOPHUCVUCONGDONG_HANHCHINH}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{ color: "red" }}>
                                  Giờ Phục Vụ Cộng Đồng Chuẩn:
                                </TableCell>
                                <TableCell sx={{ color: "red" }}>
                                  {details.GIOPHUCVUCONGDONG_CHUAN}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Ghi Chú:</TableCell>
                                <TableCell>
                                  {details.GHICHU || "Không có"}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </>
                      ) : (
                        <Typography sx={{ color: "red" }}>
                          {" "}
                          Giảng viên không có khung chuẩn
                        </Typography>
                      )}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
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
