import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CreateKhoa/CreateKhoa.scss";
import "./KhoaList.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheck,
  faTimes,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const GiangVienList = ({
  currentPage,
  totalPages,
  dataListGiangVien,
  activeRowGV,
  handleChoseRowGV,
  handleDeleteGiangVien,
  handleChoseEditGiangVien,
  handleShowUpdateModal,

  searchStatus,
  setCurrentPage,
  pageSize,
}) => {
  // Lọc và phân trang danh sách giảng viên
  const filteredGiangVien = dataListGiangVien
    ? dataListGiangVien

        .filter((giangvien) => {
          if (searchStatus === "All") return true;
          return giangvien.TRANGTHAITAIKHOAN === searchStatus;
        })
        .slice((currentPage - 1) * pageSize, currentPage * pageSize) // Đã chỉnh từ 0 sang 1
    : [];

  // Điều hướng trang
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const goToBackPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // Đảm bảo không nhỏ hơn 1
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      // Thay 0 thành 1
      buttons.push(
        <button
          key={i}
          type="button"
          className={`btn ${
            currentPage === i ? "btn-primary" : "btn-outline-primary"
          } mx-1`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  console.log("check dataa gv = >", filteredGiangVien);
  return (
    <>
      <TableContainer component={Paper}>
        <Table className="custom-table">
          <TableHead>
            <TableRow>
              <TableCell>Stt</TableCell>
              <TableCell>Mã GV</TableCell>
              <TableCell>Email Đăng Nhập</TableCell>
              <TableCell>Tên Giảng Viên</TableCell>
              <TableCell>Tên Chức Vụ</TableCell>
              <TableCell>Tên Chức Danh</TableCell>
              <TableCell>Số Điện Thoại</TableCell>
              <TableCell>Địa Chỉ</TableCell>
              <TableCell>Tên Bộ Môn</TableCell>
              <TableCell>Phân Quyền</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell>Xóa</TableCell>
              <TableCell>Tạm Ngưng</TableCell>
              <TableCell>Sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataListGiangVien.length > 0 ? (
              dataListGiangVien.map((giangvien, index) => (
                <TableRow
                  onClick={() => handleChoseRowGV(giangvien)}
                  key={index}
                  className={`custom-table-row ${
                    activeRowGV === giangvien.MABOMON ? "activeBM" : ""
                  }`}
                >
                  <TableCell>
                    {currentPage * pageSize + index + 1 - 10}
                  </TableCell>
                  <TableCell>{giangvien.MAGV}</TableCell>
                  <TableCell>{giangvien.TENDANGNHAP}</TableCell>
                  <TableCell>{giangvien.TENGV}</TableCell>
                  <TableCell>{giangvien.TENCHUCVU}</TableCell>
                  <TableCell>{giangvien.TENCHUCDANH}</TableCell>
                  <TableCell>{giangvien.DIENTHOAI}</TableCell>
                  <TableCell>{giangvien.DIACHI}</TableCell>
                  <TableCell>{giangvien.TENBOMON}</TableCell>
                  <TableCell
                    className={
                      giangvien.PHANQUYEN === "Admin"
                        ? "inactive-status"
                        : giangvien.PHANQUYEN === "Giảng Viên"
                        ? "text-dark"
                        : giangvien.PHANQUYEN === "Trưởng Bộ Môn"
                        ? "text-primary"
                        : giangvien.PHANQUYEN === "Trưởng Khoa"
                        ? "text-primary"
                        : ""
                    }
                  >
                    {giangvien.PHANQUYEN}
                  </TableCell>
                  <TableCell
                    className={
                      giangvien.TRANGTHAITAIKHOAN === "Ngưng hoạt động"
                        ? "inactive-status"
                        : giangvien.TRANGTHAITAIKHOAN === "Đang hoạt động"
                        ? "active-status"
                        : ""
                    }
                  >
                    {giangvien.TRANGTHAITAIKHOAN}
                  </TableCell>
                  <TableCell>
                    {giangvien.TRANGTHAITAIKHOAN === "Ngưng hoạt động" ? (
                      <IconButton
                        title="Xóa giảng viên"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGiangVien(giangvien);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      title={
                        giangvien.TRANGTHAITAIKHOAN === "Đang hoạt động"
                          ? "Đang hoạt động"
                          : "Ngưng hoạt động"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChoseEditGiangVien(giangvien);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          giangvien.TRANGTHAITAIKHOAN === "Đang hoạt động"
                            ? faCheck
                            : faTimes
                        }
                        className={
                          giangvien.TRANGTHAITAIKHOAN === "Đang hoạt động"
                            ? "text-success"
                            : "text-danger"
                        }
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      title="Chỉnh sửa thông tin giảng viên"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowUpdateModal(giangvien);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="14" className="opacity-7">
                  Bộ môn chưa có giảng viên
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        className="pagination-buttons mt-4"
        display="flex"
        justifyContent="center"
      >
        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={() => goToPage(1)}
        >
          Đầu
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={goToBackPage}
          sx={{ ml: 1 }}
        >
          Trước
        </Button>
        {renderPageButtons()}
        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
          sx={{ ml: 1 }}
        >
          Tiếp
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(totalPages)}
          sx={{ ml: 1 }}
        >
          Cuối
        </Button>
      </Box>
    </>
  );
};

export default GiangVienList;
