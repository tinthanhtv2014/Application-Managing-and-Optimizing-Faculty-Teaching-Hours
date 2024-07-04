import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CreateKhoa/CreateKhoa.scss";

const BoMonList = ({
  dataListBoMon,
  activeRowBM,
  handleChoseRowBM,
  handleDeleteBoMon,
  handleChoseEditBM,
}) => {
  console.log("check activeRowBM=>", activeRowBM);

  return (
    <div className="custom-select-container">
      <div className="mb-3">
        <select
          className="form-select"
          value={activeRowBM}
          onChange={(e) => handleChoseRowBM(e.target.value)}
        >
          {dataListBoMon && dataListBoMon.length > 0 ? (
            dataListBoMon.map((bomon, index) => (
              <option key={index} value={bomon.MABOMON}>
                {bomon.TENBOMON}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Không có bộ môn nào
            </option>
          )}
        </select>
      </div>
    </div>
  );
};

export default BoMonList;
