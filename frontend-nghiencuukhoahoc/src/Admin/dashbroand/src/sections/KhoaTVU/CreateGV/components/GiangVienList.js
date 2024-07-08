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
}) => {
  // const [searchEmail, setSearchEmail] = useState("");
  // const [searchStatus, setSearchStatus] = useState("All");
  // const [currentPage, setCurrentPage] = useState(0);

  // const handleSearch = (e) => {
  //   setSearchEmail(e.target.value);
  //   setCurrentPage(0);
  // };

  // const handleStatusChange = (e) => {
  //   setSearchStatus(e.target.value);
  //   setCurrentPage(0);
  // };
  console.log("searchStatus =>", searchStatus);
  console.log("currentPage =>", currentPage);
  const pageSize = 10;
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

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <>
      {/* <div className="mb-3 col-4 mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập email đăng nhập"
          value={searchEmail}
          onChange={handleSearch}
        />
      </div> */}
      {/* <div className="mb-3 col-4 mt-2">
        <Box sx={{ maxWidth: 300 }}>
          <FormControl fullWidth className="mt-2">
            <InputLabel id="select-label-trang-thai">Trạng thái</InputLabel>
            <Select
              labelId="select-label-trang-thai"
              id="trang-thai-select"
              className={`height-selectGV ${
                searchStatus === "Đang hoạt động"
                  ? "text-success"
                  : searchStatus === "Ngưng hoạt động"
                  ? "text-danger"
                  : ""
              }`}
              value={searchStatus}
              label="Trạng thái"
              onChange={handleStatusChange}
            >
              <MenuItem value="All">Hiển thị tất cả</MenuItem>
              <MenuItem value="Đang hoạt động" className="text-success">
                Đang hoạt động
              </MenuItem>
              <MenuItem value="Ngưng hoạt động" className="text-danger">
                Ngưng hoạt động
              </MenuItem>
            </Select>{" "}
          </FormControl>
        </Box>
      </div> */}
      {/* <button
        type="button"
        className={` ${
          isOpenGetAllApiGV === true ? "btn btn-dark" : "btn btn-success"
        }`}
        placeholder="Nhập email đăng nhập"
        value={isOpenGetAllApiGV}
        onClick={handleGetAllGiangVien}
        title={
          isOpenGetAllApiGV === true
            ? "Xem Tất Cả Giảng Viên Ở Bộ Môn"
            : "Xem Tất Cả Giảng Viên"
        }
      >
        {isOpenGetAllApiGV === true ? "Chỉ Xem Bộ Môn" : "Xem Tất Cả "}
      </button> */}
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
            <th></th>
            <th></th>
            <th></th>
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
                <td>{index + 1}</td>
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
                  <i
                    className="fa-solid fa-trash table-row-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGiangVien(giangvien);
                    }}
                  ></i>
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
                        ? "Ngưng hoạt động"
                        : "Đang hoạt động"
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
            <>
              <tr>
                <td colSpan="13" className="opacity-7">
                  Bộ môn chưa có giảng viên
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div className="pagination-buttons mt-4">
        <button
          type="button"
          className="btn btn-primary"
          disabled={currentPage === 0}
          onClick={prevPage}
        >
          Trở Lại
        </button>
        <button
          type="button"
          className="btn btn-primary ml-4"
          disabled={
            !dataListGiangVien ||
            (filteredGiangVien.length === 0 && currentPage === 0) ||
            filteredGiangVien.length < pageSize
          }
          onClick={nextPage}
        >
          Tiếp Tục
        </button>
      </div>
    </>
  );
};

export default GiangVienList;
