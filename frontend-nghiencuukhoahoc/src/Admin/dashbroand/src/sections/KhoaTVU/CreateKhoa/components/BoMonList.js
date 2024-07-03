// components/BoMonList.js
import React from "react";
import { Table } from "react-bootstrap";
import "../CreateKhoa.scss";
const BoMonList = ({
  dataListBoMon,
  activeRowBM,
  handleChoseRowBM,
  handleDeleteBoMon,
  handleChoseEditBM,
}) => {
  console.log("check  activeRowBM=>", activeRowBM);
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Mã Bộ Môn</th>
          <th>Tên Bộ Môn</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {dataListBoMon && dataListBoMon.length > 0 ? (
          dataListBoMon.map((bomon, index) => (
            <tr
              onClick={() => handleChoseRowBM(bomon)}
              key={index}
              className={`custom-table-row ${
                activeRowBM === bomon.MABOMON ? "active" : ""
              }`}
            >
              <td>{bomon.MABOMON}</td>
              <td>{bomon.TENBOMON}</td>
              <td>
                <i
                  className="fa-solid fa-trash table-row-icon"
                  onClick={() => handleDeleteBoMon(bomon.MABOMON)}
                ></i>
              </td>
              <td>
                <i
                  className="fa-solid fa-pen-to-square table-row-icon-edit"
                  onClick={() => handleChoseEditBM(bomon)}
                ></i>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">Không có bộ môn nào</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BoMonList;
