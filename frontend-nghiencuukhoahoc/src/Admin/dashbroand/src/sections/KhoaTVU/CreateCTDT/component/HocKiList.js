import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CreateKhoa/CreateKhoa.scss";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./KhoaList.scss";
const HocKiList = ({ dataHocKi, selectHocKi, handleChoseHocKi }) => {
  // console.log("dataHocKi", dataHocKi);
  return (
    <div className="custom-select-container">
      <Box sx={{ maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="bomon-select-label">Chọn học kì</InputLabel>
          <Select
            className="height-selectGV"
            labelId="bomon-select-label"
            id="bomon-select"
            value={selectHocKi}
            label="Chọn học kì"
            onChange={(e) => handleChoseHocKi(e.target.value)}
          >
            {dataHocKi && dataHocKi.length > 0 ? (
              dataHocKi.map((hocki, index) => (
                <MenuItem key={index} value={hocki.value}>
                  {hocki.label}
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

export default HocKiList;
