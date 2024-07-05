import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CreateKhoa/CreateKhoa.scss";
import "./KhoaList.scss";

const GiangVienList = ({
  dataListGiangVien,
  activeRowGV,
  handleChoseRowGV,
  handleDeleteGiangVien,
  handleChoseEditGiangVien,
}) => {
  const [searchEmail, setSearchEmail] = useState("");

  const handleSearch = (e) => {
    setSearchEmail(e.target.value);
  };

  const filteredGiangVien = dataListGiangVien
    ? dataListGiangVien.filter((giangvien) =>
        giangvien.TENDANGNHAP.toLowerCase().includes(searchEmail.toLowerCase())
      )
    : [];
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
      <table className="custom-table">
        <thead>
          <tr>
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
      </table>
    </>
  );
};

export default GiangVienList;
