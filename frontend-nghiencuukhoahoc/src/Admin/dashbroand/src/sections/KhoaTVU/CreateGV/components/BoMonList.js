import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CreateKhoa/CreateKhoa.scss";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./KhoaList.scss";
const BoMonList = ({
  dataListBoMon,
  activeRowBM,
  handleChoseRowBM,
  selectBoMon,
  setSelectBoMon,
}) => {
  return (
    <div className="custom-select-container">
      <Box sx={{ maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="bomon-select-label">Chọn Bộ Môn</InputLabel>
          <Select
            className="height-selectGV"
            labelId="bomon-select-label"
            id="bomon-select"
            value={selectBoMon}
            label="Chọn Bộ Môn"
            onChange={(e) => setSelectBoMon(e.target.value)}
          >
            {dataListBoMon && dataListBoMon.length > 0 ? (
              dataListBoMon.map((bomon, index) => (
                <MenuItem key={index} value={bomon.TENBOMON}>
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
