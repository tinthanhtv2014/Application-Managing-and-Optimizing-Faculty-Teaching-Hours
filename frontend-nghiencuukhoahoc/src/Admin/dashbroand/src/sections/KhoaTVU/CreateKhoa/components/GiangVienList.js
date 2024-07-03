// components/BoMonList.js
import React from "react";
import { Table } from "react-bootstrap";

const GiangVienList = ({
  dataListGiangVien,
  activeRowGV,
  handleChoseRowGV,
  handleDeleteGiangVien,
  handleChoseEditGiangVien,
}) => {
  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Mã GV</th>
          <th>Tên Giảng Viên</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {dataListGiangVien && dataListGiangVien.length > 0 ? (
          dataListGiangVien.map((giangvien, index) => (
            <tr
              onClick={() => handleChoseRowGV(giangvien)}
              key={index}
              className={`table-row ${
                activeRowGV === giangvien.MABOMON ? "activeBM" : ""
              }`}
            >
              <td>{giangvien.MAGV}</td>
              <td>{giangvien.TENGV}</td>
              <td>{giangvien.EMAIL}</td>
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
            <td colSpan="3" className="opacity-7">
              Không có bộ môn nào
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default GiangVienList;
