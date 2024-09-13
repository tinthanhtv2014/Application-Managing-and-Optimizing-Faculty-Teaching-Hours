import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CookiesAxios from "../../CookiesAxios";

const ListPhanCong = ({ select_HocKiNienKhoa }) => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho từ khóa tìm kiếm
  const [filteredLecturers, setFilteredLecturers] = useState([]); // Thêm state để lưu giảng viên đã lọc

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await CookiesAxios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/danhsach/monhoc/danhsach/giangvien`,
          { MAHKNK: select_HocKiNienKhoa.MAHKNK }
        );

        console.log("check response", response.data);
        setLecturers(response.data.DT);

        setFilteredLecturers(response.data.DT); // Ban đầu hiển thị toàn bộ giảng viên
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    if (select_HocKiNienKhoa) {
      fetchLecturers();
    }
  }, [select_HocKiNienKhoa]);

  // Hàm xử lý khi có sự thay đổi trong input tìm kiếm
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Lọc giảng viên dựa trên từ khóa tìm kiếm
    const filtered = lecturers.filter((lecturer) =>
      lecturer.TENGV.toLowerCase().includes(value)
    );
    setFilteredLecturers(filtered);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box sx={{ maxWidth: { md: 320, xs: "100%" }, mb: 3 }}>
        <TextField
          label="Tìm kiếm giảng viên"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Bảng hiển thị giảng viên */}
      <TableContainer component={Paper}>
        <Table aria-label="Danh sách phân công giảng dạy">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Họ và Tên</TableCell>
              <TableCell>Giờ chuẩn</TableCell>
              <TableCell>Môn được phân công giảng dạy</TableCell>
              <TableCell>Mã lớp</TableCell>
              <TableCell>Học kỳ I</TableCell>
              <TableCell>Học kỳ II</TableCell>
              <TableCell>Tổng giờ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLecturers.map((lecturer, index) => {
              // Tính tổng số giờ giảng dạy
              const totalHours = lecturer.monPhanCong.reduce(
                (acc, mon) => acc + mon.SO_GIO,
                0
              );

              return (
                <TableRow key={lecturer.MAGV}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{lecturer.TENGV}</TableCell>
                  <TableCell>{lecturer.GIOGIANGDAY_CHUAN}</TableCell>
                  <TableCell>
                    {lecturer.monPhanCong.map((mon) => (
                      <Box key={mon.MALOP}>
                        <Typography>{mon.TENMONHOC}</Typography>
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    {lecturer.monPhanCong.map((mon) => (
                      <Box key={mon.MALOP}>
                        <Typography>{mon.MALOP}</Typography>
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    {lecturer.monPhanCong.map((mon) => (
                      <Box key={mon.MALOP}>
                        <Typography>
                          {mon.TENHKNK === "Học Kì 1" ? `${mon.SO_GIO}` : ""}
                        </Typography>
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    {lecturer.monPhanCong.map((mon) => (
                      <Box key={mon.MALOP}>
                        <Typography>
                          {mon.TENHKNK === "Học Kì 2" ? `${mon.SO_GIO}` : ""}
                        </Typography>
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell style={{ color: "#A02334" }}>
                    {totalHours}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListPhanCong;
