import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  MenuItem,
  Box,
} from "@mui/material";
import { Form, Dropdown } from "react-bootstrap";
import "../style/StylePhanCong.scss";
import CookiesAxios from "../../CookiesAxios";
const LopMonHocTable = ({ data, handleUpdateGiangVien }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState(""); // State cho ô tìm kiếm email
  const [suggestedTeachers, setSuggestedTeachers] = useState([]); // State cho danh sách giảng viên được gợi ý
  const suggestionsRef = useRef(null);
  const [indexSelect, setIndexSelect] = useState(null);
  const calculateTeachingHours = (siso, tinChiLyThuyet, tinChiThucHanh) => {
    const gioLyThuyet = tinChiLyThuyet * 15;
    const gioThucHanh =
      siso > 30 ? tinChiThucHanh * 2 * 30 : tinChiThucHanh * 1 * 30;
    return gioLyThuyet + gioThucHanh;
  };

  const handleRowClick = (index, row) => {
    setSelectedRow(row);
    setOpen(true);
    setIndexSelect(index);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setSuggestedTeachers([]); // Reset danh sách gợi ý khi đóng modal
  };

  const handleSearch = (e) => {
    setSearchEmail(e.target.value);
  };

  useEffect(() => {
    const fetchDataAllGV = async () => {
      try {
        if (searchEmail.length > 2) {
          // Gọi API khi có hơn 2 ký tự
          const response = await CookiesAxios.post(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/email/search`,
            { TENGIANGVIEN: searchEmail }
          );
          console.log("Dữ liệu tìm kiếm:", response.data);
          setSuggestedTeachers(response.data.DT); // Giả sử response.data.DT chứa danh sách giảng viên
        } else {
          setSuggestedTeachers([]); // Reset danh sách gợi ý nếu ký tự ít hơn 3
        }
      } catch (error) {
        console.error("Lỗi khi tìm kiếm giảng viên:", error);
      }
    };
    fetchDataAllGV();
  }, [searchEmail]);

  const handleSelectTeacher = (teacher, index) => {
    const updatedTeacher = {
      ...selectedRow,
      TENGV: teacher.TENGV,
      MAGV: teacher.MAGV,
    };

    setSelectedRow(updatedTeacher); // Cập nhật selectedRow
    setSearchEmail(""); // Reset ô tìm kiếm sau khi chọn giảng viên
    setSuggestedTeachers([]); // Xóa danh sách gợi ý sau khi chọn

    handleUpdateGiangVien(updatedTeacher, indexSelect); // `index` là chỉ số của hàng muốn cập nhật
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã Lớp</TableCell>
              <TableCell align="center">Tên Môn Học</TableCell>
              <TableCell align="center">Số Thứ Tự Học Kỳ</TableCell>
              <TableCell align="center">Số Giờ GD Của Môn</TableCell>
              <TableCell align="center">Phân Công</TableCell>
              <TableCell align="center">Số Giờ Đã Phân Công</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(index, row)}
                  sx={{
                    backgroundColor:
                      selectedRow === row ? "#f0f0f0" : "inherit",
                    cursor: "pointer",
                  }}
                  title={
                    row.TONG_SO_GIO
                      ? `Giảng Viên Đang Có Số Giờ Là ${row.TONG_SO_GIO} giờ`
                      : `Giảng Viên Chưa Được Phân Công`
                  }
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
                  <TableCell align="center">{row.TENGV}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: row.TONG_SO_GIO < 500 ? "green" : "red",
                    }}
                  >
                    {row.TONG_SO_GIO}
                  </TableCell>
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

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: {
                xs: "90vw", // 90% chiều rộng trên thiết bị nhỏ
                sm: "80vw", // 80% chiều rộng trên thiết bị nhỏ hơn
                md: "70vw", // 70% chiều rộng trên thiết bị vừa
                lg: "60vw", // 60% chiều rộng trên thiết bị lớn
              },
              height: {
                xs: "90vh", // 90% chiều cao trên thiết bị nhỏ
                sm: "80vh", // 80% chiều cao trên thiết bị nhỏ hơn
              },
              maxHeight: "80vh", // Đặt chiều cao tối đa
              maxWidth: "90vw", // Đặt chiều rộng tối đa
            },
          },
        }}
      >
        <DialogTitle>Thông Tin Giảng Viên</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <p>
                <strong>Mã Giảng Viên:</strong> {selectedRow.MAGV}
              </p>
              <p>
                <strong>Tên Giảng Viên:</strong> {selectedRow.TENGV}
              </p>
              <p>
                <strong>Số Giờ Đã Phân Công:</strong>{" "}
                {selectedRow.TONG_SO_GIO || "Chưa có"}
              </p>
              <div style={{ width: "300px", position: "relative" }}>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm giảng viên theo email"
                  value={searchEmail}
                  onChange={handleSearch}
                />
                {suggestedTeachers.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    style={{
                      position: "absolute",
                      zIndex: 10,
                      maxHeight: "400px",
                      overflowY: "auto",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                      width: "100%",
                      backgroundColor: "white",
                    }}
                  >
                    {suggestedTeachers.map((teacher) => (
                      <div
                        key={teacher.id}
                        onClick={() => handleSelectTeacher(teacher)}
                        className="suggestion-item"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 16px",
                          cursor: "pointer", // Thêm con trỏ để thể hiện đây là phần tử có thể nhấp
                        }}
                      >
                        {teacher.TENGV}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LopMonHocTable;
