import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const RenderData = ({ dataKhungChuan, dataTenKhungChuan }) => {
  const [TenKhung, setTenKhung] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataKhungChuan) {
      console.log("dataKhungChuan", dataKhungChuan);
      setLoading(false);
    }
  }, [dataKhungChuan]);

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <>
      <Box sx={{ maxWidth: 220 }}>
        <FormControl fullWidth className="profile-email-input">
          <InputLabel id="select-label-trang-thai">Chức danh</InputLabel>
          <Select
            labelId="select-label-trang-thai"
            id="trang-thai-select"
            name="TENCHUCDANH"
            label="Chức danh"
            value={TenKhung}
            defaultValue={TenKhung}
            onChange={(e) => setTenKhung(e.target.value)}
            variant="outlined"
          >
            {dataTenKhungChuan && dataTenKhungChuan.length > 0 ? (
              dataTenKhungChuan.map((tenkhung, index) => (
                <MenuItem key={index} value={tenkhung.TENKHUNGCHUAN}>
                  {tenkhung.TENKHUNGCHUAN}
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
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {" "}
              <TableCell align="center">Tên khung chuẩn</TableCell>{" "}
              <TableCell align="center">Giờ giảng dạy hành chinh</TableCell>
              <TableCell align="center">Giờ giảng dạy chuẩn</TableCell>{" "}
              <TableCell align="center">
                Giờ nghiên cứu khoa học hành chính
              </TableCell>
              <TableCell align="center">
                Giờ nghiên cứu khoa học chuẩn
              </TableCell>{" "}
              <TableCell align="center">
                Giờ phục vụ cộng đồng hành chính
              </TableCell>
              <TableCell align="center">Giờ phục vụ cộng đồng chuẩn</TableCell>
              <TableCell align="center">Ghi Chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataKhungChuan.map((khungChuan, index) => (
              <TableRow key={index}>
                {" "}
                <TableCell align="center">
                  {khungChuan.TENKHUNGCHUAN ?? ""}
                </TableCell>
                <TableCell align="center">
                  {khungChuan.GIOGIANGDAY_HANHCHINH ?? ""}
                </TableCell>
                <TableCell align="center" className="text-info">
                  {khungChuan.GIOGIANGDAY_CHUAN ?? ""}
                </TableCell>{" "}
                <TableCell align="center">
                  {khungChuan.GIONGHIENCUUKHOAHOC_HANHCHINH ?? ""}
                </TableCell>
                <TableCell align="center" className="text-info">
                  {khungChuan.GIONGHIENCUUKHOAHOC_CHUAN ?? ""}
                </TableCell>{" "}
                <TableCell align="center">
                  {khungChuan.GIOPHUCVUCONGDONG_HANHCHINH ?? ""}
                </TableCell>
                <TableCell align="center" className="text-info">
                  {khungChuan.GIOPHUCVUCONGDONG_CHUAN ?? ""}
                </TableCell>
                <TableCell align="center">{khungChuan.GHICHU ?? ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RenderData;
