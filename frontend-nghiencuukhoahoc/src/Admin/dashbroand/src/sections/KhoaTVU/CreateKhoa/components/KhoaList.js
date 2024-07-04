import React from "react";
import { Table } from "react-bootstrap";
import "../CreateKhoa.scss";
import "./KhoaList.scss";
const KhoaList = ({
  dataListKhoa,
  activeRow,
  handleChose,
  handleDelete,
  handleChoseEditKhoa,
}) => {
  console.log("check Atice Row", activeRow);

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Mã Khoa</th>
          <th>Tên Khoa</th>
          <th></th> <th></th>
        </tr>
      </thead>
      <tbody>
        {dataListKhoa && dataListKhoa.length > 0 ? (
          dataListKhoa.map((khoa, index) => (
            <tr
              key={index}
              className={`custom-table-row ${
                activeRow === khoa.MAKHOA ? "active" : ""
              }`}
              onClick={() => handleChose(khoa.MAKHOA)}
            >
              <td className="mau">{khoa.MAKHOA}</td>
              <td>{khoa.TENKHOA}</td>
              <td>
                <i
                  className="table-row-icon fa-solid fa-trash"
                  onClick={() => handleDelete(khoa.MAKHOA)}
                ></i>{" "}
              </td>
              <td>
                {" "}
                <i
                  className="table-row-icon-edit fa-solid fa-pen-to-square"
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
    </table>
  );
};

export default KhoaList;
