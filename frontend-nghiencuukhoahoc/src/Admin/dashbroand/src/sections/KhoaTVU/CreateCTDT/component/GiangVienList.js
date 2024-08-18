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

  dataMonHoc,
  activeRowGV,
  handleChoseRowGV,

  searchEmail,
  searchStatus,
  setCurrentPage,
}) => {
  const pageSize = 10;
  const totalGiangVien = dataMonHoc ? dataMonHoc.length : 0;
  const totalPages = Math.ceil(totalGiangVien / pageSize);

  const startIndex = currentPage * pageSize;

  const filteredChuongTrinh = dataMonHoc
    ? dataMonHoc
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
              <TableCell>Mã Chương Trình</TableCell>
              <TableCell>Mã Bộ Môn</TableCell>
              <TableCell>Tên Chương Trình</TableCell>
              <TableCell>Mã Môn Học</TableCell>
              <TableCell>Tên Môn Học</TableCell>
              <TableCell>Số Tín Chỉ Lý Thuyết</TableCell>
              <TableCell>Số Tín Chỉ Thực Hành</TableCell>
              <TableCell>Số Thứ Tự Học Kỳ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredChuongTrinh && filteredChuongTrinh.length > 0 ? (
              filteredChuongTrinh.map((chuongTrinh, index) => (
                <TableRow
                  onClick={() => handleChoseRowGV(chuongTrinh)}
                  key={index}
                  className={`custom-table-row ${
                    activeRowGV === chuongTrinh.MABOMON ? "activeBM" : ""
                  }`}
                >
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{chuongTrinh.MACHUONGTRINH}</TableCell>
                  <TableCell>{chuongTrinh.MABOMON}</TableCell>
                  <TableCell>{chuongTrinh.TENCHUONGTRINH}</TableCell>
                  <TableCell>{chuongTrinh.MAMONHOC}</TableCell>
                  <TableCell>{chuongTrinh.TENMONHOC}</TableCell>
                  <TableCell>{chuongTrinh.SOTINCHILYTHUYET}</TableCell>
                  <TableCell>{chuongTrinh.SOTINCHITHUCHANH}</TableCell>
                  <TableCell>{chuongTrinh.SOTHUTUHOCKI}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="9" className="opacity-7">
                  Chương trình đào tạo chưa có môn học
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
