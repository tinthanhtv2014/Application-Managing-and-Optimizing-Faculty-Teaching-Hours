import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CreateKhoa/CreateKhoa.scss";
import "./KhoaList.scss";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
      <table className="custom-table">
        <thead>
          <tr>
            <th>Stt</th>
            <th>Mã GV</th>
            <th>Email Đăng Nhập</th>
            <th>Tên Giảng Viên</th>
            <th>Tên Chức Vụ</th>
            <th>Tên Chức Danh</th>
            <th>Số Điện Thoại</th>
            <th>Địa Chỉ</th>
            <th>Tên Bộ Môn</th>
            <th>Phân Quyền</th>
            <th>Trạng Thái</th>
            <th>Xóa</th>
            <th>Tạm Ngưng</th>
            <th>Sửa</th>
          </tr>
        </thead>
        <tbody>
          {filteredGiangVien && filteredGiangVien.length > 0 ? (
            filteredGiangVien.map((giangvien, index) => (
              <tr
                onClick={() => handleChoseRowGV(giangvien)}
                key={index}
                className={`custom-table-row ${
                  activeRowGV === giangvien.MABOMON ? "activeBM" : ""
                }`}
              >
                <td>{startIndex + index + 1}</td>
                <td>{giangvien.MAGV}</td>
                <td>{giangvien.TENDANGNHAP}</td>
                <td>{giangvien.TENGV}</td>
                <td>{giangvien.TENCHUCVU}</td>
                <td>{giangvien.TENCHUCDANH}</td>
                <td>{giangvien.DIENTHOAI}</td>
                <td>{giangvien.DIACHI}</td>
                <td>{giangvien.TENBOMON}</td>
                <td
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
                </td>
                <td
                  className={
                    giangvien.TRANGTHAITAIKHOAN === "Ngưng hoạt động"
                      ? "inactive-status"
                      : giangvien.TRANGTHAITAIKHOAN === "Đang hoạt động"
                      ? "active-status"
                      : ""
                  }
                >
                  {giangvien.TRANGTHAITAIKHOAN}
                </td>
                <td>
                  {giangvien.TRANGTHAITAIKHOAN === "Ngưng hoạt động" ? (
                    <>
                      {" "}
                      <i
                        className="fa-solid fa-trash table-row-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGiangVien(giangvien);
                        }}
                      ></i>
                    </>
                  ) : (
                    false
                  )}{" "}
                </td>
                <td>
                  <i
                    title={
                      giangvien.TRANGTHAITAIKHOAN === "Đang hoạt động"
                        ? "Đang hoạt động"
                        : " Ngưng hoạt động"
                    }
                    className={
                      giangvien.TRANGTHAITAIKHOAN === "Đang hoạt động"
                        ? "fa-solid fa-check text-success"
                        : "fa-solid fa-xmark text-danger"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChoseEditGiangVien(giangvien);
                    }}
                  ></i>
                </td>{" "}
                <td>
                  <i
                    title={
                      giangvien.TRANGTHAITAIKHOAN === "Đang hoạt động"
                        ? "Chỉnh sửa thông tin giảng viên"
                        : "Chỉnh sửa thông tin giảng viên"
                    }
                    className="fa-solid fa-pen-to-square table-row-icon-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowUpdateModal(giangvien);
                    }}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="opacity-7">
                Bộ môn chưa có giảng viên
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination-buttons mt-4">
        <button
          type="button"
          className="btn btn-primary"
          disabled={currentPage === 0}
          onClick={() => goToPage(0)}
        >
          Đầu
        </button>
        <button
          type="button"
          className="btn btn-primary ml-4"
          disabled={currentPage === 0}
          onClick={prevPage}
        >
          Trước
        </button>
        {renderPageButtons()}
        <button
          type="button"
          className="btn btn-primary ml-4"
          disabled={currentPage === totalPages - 1}
          onClick={nextPage}
        >
          Tiếp
        </button>
        <button
          type="button"
          className="btn btn-primary ml-2"
          disabled={currentPage === totalPages - 1}
          onClick={() => goToPage(totalPages - 1)}
        >
          Cuối
        </button>
      </div>
    </>
  );
};

export default GiangVienList;
