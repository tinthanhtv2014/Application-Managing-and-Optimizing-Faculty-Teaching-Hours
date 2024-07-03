// components/KhoaList.js
import React from "react";
import { Table } from "react-bootstrap";

const KhoaList = ({
  dataListKhoa,
  activeRow,
  handleChose,
  handleDelete,
  handleChoseEditKhoa,
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Mã Khoa</th>
          <th>Tên Khoa</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {dataListKhoa && dataListKhoa.length > 0 ? (
          dataListKhoa.map((khoa, index) => (
            <tr
              key={index}
              className={`table-row ${
                activeRow === khoa.MAKHOA ? "active" : ""
              }`}
              onClick={() => handleChose(khoa.MAKHOA)}
            >
              <td>{khoa.MAKHOA}</td>
              <td>{khoa.TENKHOA}</td>
              <td>
                <i
                  className="fa-solid fa-trash table-row-icon"
                  onClick={() => handleDelete(khoa.MAKHOA)}
                ></i>
              </td>
              <td>
                <i
                  className="fa-solid fa-pen-to-square table-row-icon-edit"
                  onClick={() => handleChoseEditKhoa(khoa)}
                ></i>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">Không có khoa nào</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default KhoaList;
