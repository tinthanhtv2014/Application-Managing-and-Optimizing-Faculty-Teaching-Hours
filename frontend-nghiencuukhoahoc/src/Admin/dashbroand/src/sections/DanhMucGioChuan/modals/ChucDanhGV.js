import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import CookiesAxios from "../../CookiesAxios";

const ChucDanhGiangVien = ({ open, handleClose }) => {
  useEffect(() => {
    if (open) {
      fetchDataChucdanh();
    }
  }, [open]);

  const [machucdanh, setMachucdanh] = useState("");
  const [tenChucdanh, setTenchucdanh] = useState("");

  const [datachucdanh, setDataChucdanh] = useState([]);

  const handleSubmitchucdanh = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const response = await CookiesAxios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/taochucdanh`,
      { TENCHUCDANH: tenChucdanh }
    );
    console.log(response.data);
  };

  const fetchDataChucdanh = async () => {
    const response = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xemchucdanh`
    );

    if (response && response.data && response.data.DT) {
      setDataChucdanh(response.data.DT);
    }
  };

  //hàm xóa chức vụ chức danh  ============================

  const handleDeleteChucdanh = async (machucdanh) => {
    const response = await CookiesAxios.delete(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xoachucdanh`,
      {
        params: {
          MACHUCDANH: machucdanh,
        },
      }
    );
  };

  const handleUPDATEChucdanh = async () => {
    const response = await CookiesAxios.put(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/suachucdanh/${machucdanh}`,
      { TENCHUCDANH: tenChucdanh }
    );
  };
  const handleUpdateChucdanh = async (chucdanh) => {
    setTenchucdanh(chucdanh.TENCHUCDANH);
    setMachucdanh(chucdanh.MACHUCDANH);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Quản Lý Chức Danh Cho Giảng Viên</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Danh sách các chức danh giảng viên
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Container sx={{ mt: 4 }}>
              <form onSubmit={handleSubmitchucdanh}>
                <FormControl fullWidth margin="normal">
                  {/* <InputLabel>Tên Chức danh</InputLabel> */}
                  <TextField
                    type="text"
                    label="Tên Chức Danh"
                    value={tenChucdanh}
                    onChange={(e) => setTenchucdanh(e.target.value)}
                    required
                  />
                </FormControl>
                <Button variant="contained" type="submit">
                  Tạo Chức Danh
                </Button>
                {tenChucdanh && tenChucdanh.length > 0 && (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleUPDATEChucdanh}
                      sx={{ ml: 2 }}
                    >
                      Sửa
                    </Button>
                  </>
                )}
              </form>

              {datachucdanh && datachucdanh.length > 0 ? (
                <TableContainer className="mt-4" component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Mã Chức Danh</TableCell>
                        <TableCell>Tên Chức Danh</TableCell>
                        <TableCell>Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datachucdanh.map((chucdanh, index) => (
                        <TableRow key={index}>
                          <TableCell>{chucdanh.MACHUCDANH}</TableCell>
                          <TableCell>{chucdanh.TENCHUCDANH}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                handleDeleteChucdanh(chucdanh.MACHUCDANH)
                              }
                            >
                              Xóa
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => handleUpdateChucdanh(chucdanh)}
                              sx={{ ml: 2 }}
                            >
                              Sửa
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <p>Không có dữ liệu</p>
              )}
            </Container>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChucDanhGiangVien;
