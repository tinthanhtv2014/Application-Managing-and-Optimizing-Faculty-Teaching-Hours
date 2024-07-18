import React, { useState } from "react";
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
  isOpenGetAllApiGV,
  handleGetAllGiangVien,
  dataListGiangVien,
  activeRowGV,
  handleChoseRowGV,
  handleDeleteGiangVien,
  handleChoseEditGiangVien,
  searchEmail,
  searchStatus,
  setCurrentPage,
  handleShowUpdateModal,
  prevPage,
  nextPage,
}) => {
  const pageSize = 10;
  const totalGiangVien = dataListGiangVien ? dataListGiangVien.length : 0;
  const totalPages = Math.ceil(totalGiangVien / pageSize);

  const startIndex = currentPage * pageSize;

  const filteredGiangVien = dataListGiangVien
    ? dataListGiangVien
        .filter((giangvien) => {
          if (searchEmail && giangvien.TENDANGNHAP) {
            return giangvien.TENDANGNHAP.toLowerCase().includes(
              searchEmail.toLowerCase()
            );
          }
          return true;
        })
        .filter((giangvien) => {
          if (searchStatus === "All") return true;
          return giangvien.TRANGTHAITAIKHOAN === searchStatus;
        })
        .slice(startIndex, startIndex + pageSize)
    : [];

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const goToBackPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          type="button"
          className={`btn ${
            currentPage === i ? "btn-primary" : "btn-outline-primary"
          } mx-1`}
          onClick={() => goToPage(i)}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

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
            {filteredGiangVien && filteredGiangVien.length > 0 ? (
              filteredGiangVien.map((giangvien, index) => (
                <TableRow
                  onClick={() => handleChoseRowGV(giangvien)}
                  key={index}
                  className={`custom-table-row ${
                    activeRowGV === giangvien.MABOMON ? "activeBM" : ""
                  }`}
                >
                  <TableCell>{startIndex + index + 1}</TableCell>
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
          disabled={currentPage === 0}
          onClick={() => goToPage(0)}
        >
          Đầu
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={currentPage === 0}
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
          disabled={currentPage === totalPages - 1}
          onClick={goToNextPage}
          sx={{ ml: 1 }}
        >
          Tiếp
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={currentPage === totalPages - 1}
          onClick={() => goToPage(totalPages - 1)}
          sx={{ ml: 1 }}
        >
          Cuối
        </Button>
      </Box>
    </>
  );
};

export default GiangVienList;
