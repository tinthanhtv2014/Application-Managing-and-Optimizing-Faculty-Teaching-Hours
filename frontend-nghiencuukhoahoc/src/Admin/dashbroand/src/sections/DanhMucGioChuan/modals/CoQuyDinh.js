import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import axios from "axios";
import CookiesAxios from "../../CookiesAxios";
const CoQuyDinh = ({ open, handleClose }) => {
  const [maQuyDoi, setMaQuyDoi] = useState("");
  const [maLoaiDanhMuc, setMaLoaiDanhMuc] = useState("");
  const [maLoaiTacGia, setMaLoaiTacGia] = useState("");
  const [soTacGia, setSoTacGia] = useState("");
  const [tyLeQuyDoi, setTyLeQuyDoi] = useState([]);
  const [loaiDanhMuc, setLoaiDanhMuc] = useState([]);
  const [loaiTacGia, setLoaiTacGia] = useState([]);
  const [data_TyLeQuyDoi, setData_TyLeQuyDoi] = useState([]);
  const [data_LoaiTacGia, setData_LoaiTacGia] = useState([]);
  const [data_LoaiDanhMuc, setData_LoaiDanhMuc] = useState([]);
  const [data_CoQuyDinh, setData_CoQuyDinh] = useState([]);
  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  // Giả lập dữ liệu quy định
  const fetchData = async () => {
    try {
      const [
        data_TyLeQuyDoi,
        data_LoaiTacGia,
        data_LoaiDanhMuc,
        data_CoQuyDinh,
      ] = await Promise.all([
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/tylequydoi`
        ),
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaitacgia`
        ),
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaidanhmuc`
        ),
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/coquydinh`
        ),
      ]);
      // console.log("check fetch data_TyLeQuyDoi =>", data_TyLeQuyDoi.data.DT);
      // console.log("check fetch data_LoaiTacGia =>", data_LoaiTacGia.data.DT);
      console.log("check fetch data_LoaiDanhMuc =>", data_CoQuyDinh.data.DT);
      setData_LoaiDanhMuc(data_LoaiDanhMuc.data.DT);
      setData_TyLeQuyDoi(data_TyLeQuyDoi.data.DT);
      setData_LoaiTacGia(data_LoaiTacGia.data.DT);
      setData_CoQuyDinh(data_CoQuyDinh.data.DT);
    } catch (error) {
      console.error("Error fetching quy dinhs:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/coquydinh`,
        {
          MA_QUY_DOI: maQuyDoi,
          MA_LOAI_DANH_MUC: maLoaiDanhMuc,
          MA_LOAI_TAC_GIA: maLoaiTacGia,
          SO_TAC_GIA: soTacGia,
        }
      );
      console.log("check fetch Quy dinh =>", response.data.DT);
      setData_CoQuyDinh(response.data.DT);
    } catch (error) {
      console.error("Error fetching quy dinhs:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Có Quy Định</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nội dung Danh mục quy đổi khoa học công nghệ.
        </DialogContentText>
        <FormControl fullWidth margin="normal">
          <InputLabel>Quy Đổi</InputLabel>
          <Select
            value={maQuyDoi}
            onChange={(e) => setMaQuyDoi(e.target.value)}
          >
            {data_TyLeQuyDoi.map((item) => (
              <MenuItem key={item.MA_QUY_DOI} value={item.MA_QUY_DOI}>
                {item.TEN_QUY_DOI}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Loại Danh Mục</InputLabel>
          <Select
            value={maLoaiDanhMuc}
            onChange={(e) => setMaLoaiDanhMuc(e.target.value)}
          >
            {data_LoaiDanhMuc.map((item) => (
              <MenuItem
                key={item.MA_LOAI_DANH_MUC}
                value={item.MA_LOAI_DANH_MUC}
              >
                {item.TEN_LOAI_DANH_MUC}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Loại Tác Giả</InputLabel>
          <Select
            value={maLoaiTacGia}
            onChange={(e) => setMaLoaiTacGia(e.target.value)}
          >
            {data_LoaiTacGia.map((item) => (
              <MenuItem key={item.MA_LOAI_TAC_GIA} value={item.MA_LOAI_TAC_GIA}>
                {item.TEN_LOAI_TAC_GIA}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          label="Số Tác Giả"
          type="number"
          fullWidth
          value={soTacGia}
          onChange={(e) => setSoTacGia(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên Loại Danh Mục</TableCell>
                <TableCell>Tên Loại Tác Giả</TableCell>
                <TableCell>Tên Quy Định</TableCell>
                <TableCell>Tên Quy Đổi</TableCell>
                <TableCell>Trạng Thái Quy Đổi</TableCell>
                <TableCell>Tỷ Lệ</TableCell>

                <TableCell>Ghi Chú Quy Đổi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data_CoQuyDinh) && data_CoQuyDinh.length > 0 ? (
                data_CoQuyDinh.map((qd) => (
                  <TableRow key={qd.MA_DANH_MUC}>
                    <TableCell>{qd.TEN_LOAI_DANH_MUC}</TableCell>
                    <TableCell>{qd.TEN_LOAI_TAC_GIA}</TableCell>
                    <TableCell>{qd.TEN_QUY_DINH}</TableCell>
                    <TableCell>{qd.TEN_QUY_DOI}</TableCell>

                    <TableCell>{qd.TRANG_THAI_QUY_DOI}</TableCell>
                    <TableCell>{qd.TY_LE}</TableCell>

                    <TableCell>{qd.GHI_CHU_QUY_DOI}</TableCell>
                    <TableCell>
                      {/* <i
                        className="fa-solid fa-trash"
                        aria-label="delete"
                        onClick={() => handleDeleteDanhMucQuyDoi(qd.MA_DANH_MUC)}
                        style={{ cursor: "pointer" }}
                      ></i> */}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CoQuyDinh;
