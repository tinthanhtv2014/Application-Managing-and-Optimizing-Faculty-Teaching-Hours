import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CreateKhoa/CreateKhoa.scss";
import "./KhoaList.scss";

const GiangVienList = ({
  isOpenGetAllApiGV,
  handleGetAllGiangVien,
  dataListGiangVien,
  activeRowGV,
  handleChoseRowGV,
  handleDeleteGiangVien,
  handleChoseEditGiangVien,
}) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const handleSearch = (e) => {
    setSearchEmail(e.target.value);
    setCurrentPage(0);
  };
  const pageSize = 10;
  const startIndex = currentPage * pageSize;
  console.log("check data compoennt GV list =>", dataListGiangVien);
  const filteredGiangVien = dataListGiangVien
    ? searchEmail
      ? dataListGiangVien
          .filter((giangvien) => {
            if (giangvien.TENDANGNHAP) {
              return giangvien.TENDANGNHAP.toLowerCase().includes(
                searchEmail.toLowerCase()
              );
            }
            return false;
          })
          .slice(startIndex, startIndex + pageSize)
      : dataListGiangVien.slice(startIndex, startIndex + pageSize)
    : [];

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  console.log(isOpenGetAllApiGV);
  return (
    <>
      <div className="mb-3  col-4">
        <input
          type="text"
          className="form-control "
          placeholder="Nhập email đăng nhập"
          value={searchEmail}
          onChange={handleSearch}
        />
      </div>
      <button
        type="text"
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
        {" "}
        {isOpenGetAllApiGV === true ? "Chỉ Xem Bộ Môn" : "Xem Tất Cả "}
      </button>
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
                <td>{giangvien.SODIENTHOAI}</td>
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
                      handleDeleteGiangVien(giangvien.MAGV);
                    }}
                  ></i>
                </td>
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
                      handleChoseEditGiangVien(giangvien);
                    }}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="opacity-7">
                Bộ môn chưa có giảng viên
              </td>
            </tr>
          )}
        </tbody>
      </table>{" "}
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
