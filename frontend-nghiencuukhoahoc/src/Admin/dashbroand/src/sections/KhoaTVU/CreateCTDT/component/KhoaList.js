import React from "react";
import "../../CreateKhoa/CreateKhoa.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./KhoaList.scss";
const ComponentSelectCTDT = ({ dataListCTDT, activeRow, handleChose }) => {
  console.log("check Active Row", activeRow);

  return (
    <>
      <Box sx={{ maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label-trang-thai">
            Chương Trình Đào Tạo
          </InputLabel>
          <Select
            labelId="select-label-trang-thai"
            id="trang-thai-select"
            className="height-selectGV"
            value={activeRow}
            label="Chương Trình Đào Tạo"
            onChange={(e) => handleChose(e.target.value)}
          >
            {dataListCTDT && dataListCTDT.length > 0 ? (
              dataListCTDT.map((khoa, index) => (
                <MenuItem key={index} value={khoa.MACHUONGTRINH}>
                  {khoa.TENCHUONGTRINH}
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

export default ComponentSelectCTDT;
