import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CreateKhoa/CreateKhoa.scss";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./KhoaList.scss";
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
      <Box sx={{ maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="bomon-select-label">Chọn Bộ Môn</InputLabel>
          <Select
            className="height-selectGV"
            labelId="bomon-select-label"
            id="bomon-select"
            value={activeRowBM}
            label="Chọn Bộ Môn"
            onChange={(e) => handleChoseRowBM(e.target.value)}
          >
            {dataListBoMon && dataListBoMon.length > 0 ? (
              dataListBoMon.map((bomon, index) => (
                <MenuItem key={index} value={bomon.MABOMON}>
                  {bomon.TENBOMON}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Không có bộ môn nào
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default BoMonList;
