import React from "react";
import "../../CreateKhoa/CreateKhoa.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const KhoaList = ({
  dataListKhoa,
  activeRow,
  handleChose,
  handleDelete,
  handleChoseEditKhoa,
}) => {
  console.log("check Active Row", activeRow);

  return (
    <div className="custom-select-container">
      {dataListKhoa && dataListKhoa.length > 0 ? (
        <div className="mb-3">
          <select
            className="form-select"
            onChange={(e) => handleChose(e.target.value)}
            value={activeRow}
          >
            {dataListKhoa.map((khoa, index) => (
              <option key={index} value={khoa.MAKHOA}>
                {khoa.TENKHOA}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Không có khoa nào</p>
      )}
    </div>
  );
};

export default KhoaList;
