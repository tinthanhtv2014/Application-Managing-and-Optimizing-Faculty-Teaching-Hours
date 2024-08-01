import React from "react";
import "../../CreateKhoa/CreateKhoa.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./KhoaList.scss";
const KhoaList = ({ dataListKhoa, activeRow, handleChose }) => {
  console.log("check Active Row", activeRow);

  return (
    <>
      <Box sx={{ maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="khoa-select-label">Chọn Khoa</InputLabel>
          <Select
            labelId="khoa-select-label"
            id="khoa-select"
            className="height-selectGV"
            value={activeRow}
            label="Chọn Khoa"
            onChange={(e) => handleChose(e.target.value)}
          >
            {dataListKhoa && dataListKhoa.length > 0 ? (
              dataListKhoa.map((khoa, index) => (
                <MenuItem key={index} value={khoa.MAKHOA}>
                  {khoa.TENKHOA}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Không có khoa nào</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default KhoaList;
