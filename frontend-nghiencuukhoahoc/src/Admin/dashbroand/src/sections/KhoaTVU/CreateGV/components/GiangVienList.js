// components/BoMonList.js
import React from "react";
import { Table } from "react-bootstrap";
import "../../CreateKhoa/CreateKhoa.scss";
import "./KhoaList.scss";
const GiangVienList = ({
  dataListGiangVien,
  activeRowGV,
  handleChoseRowGV,
  handleDeleteGiangVien,
  handleChoseEditGiangVien,
}) => {
  return (
    <>
      {" "}
      <table className="custom-table">
        <thead>
          <tr>
            <th>Mã GV</th>
            <th>Email Đăng Nhập</th>
            <th>Tên Giảng Viên</th>
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
          {dataListGiangVien && dataListGiangVien.length > 0 ? (
            dataListGiangVien.map((giangvien, index) => (
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
                <td>{giangvien.SODIENTHOAI}</td>
                <td>{giangvien.DIACHI}</td>
                <td>{giangvien.TENBOMON}</td>
                <td>{giangvien.PHANQUYEN}</td>
                <td
                  className={
                    giangvien.TRANGTHAITAIKHOAN == "Ngưng hoạt động"
                      ? "inactive-status"
                      : giangvien.TRANGTHAITAIKHOAN == "Đang hoạt động"
                      ? "active-status"
                      : ""
                  }
                >
                  {giangvien.TRANGTHAITAIKHOAN}
                </td>
                <td>
                  <i
                    className="fa-solid fa-trash table-row-icon"
                    onClick={() => handleDeleteGiangVien(giangvien.MABOMON)}
                  ></i>
                </td>
                <td>
                  <i
                    className="fa-solid fa-pen-to-square table-row-icon-edit"
                    onClick={() => handleChoseEditGiangVien(giangvien)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="opacity-7">
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
