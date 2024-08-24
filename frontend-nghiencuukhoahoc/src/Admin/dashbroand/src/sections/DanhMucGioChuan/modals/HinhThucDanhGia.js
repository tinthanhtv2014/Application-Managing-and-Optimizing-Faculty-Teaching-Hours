import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import CookiesAxios from "../../CookiesAxios";

import { toast } from "react-toastify";

const HinhThucDanhGia = ({ open, handleClose }) => {
  const [dataHinhThucDanhGia, setDataHinhThucDanhGia] = useState([]);
  const [newHinhThucDanhGia, setNewHinhThucDanhGia] = useState("");

  useEffect(() => {
    if (open) {
      fetchHinhThucDanhGia();
    }
  }, [open]);

  const fetchHinhThucDanhGia = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/hinhthucdanhgia/xem`
      );
      // console.log("check fetch Quy dinh =>", response.data);
      setDataHinhThucDanhGia(response.data.DT);
    } catch (error) {
      console.error("Error fetching quy dinhs:", error);
    }
  };

  const handleAddHinhThucDanhGia = async () => {
    if (newHinhThucDanhGia.trim() === "") return;

    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/hinhthucdanhgia/tao`,
        {
          TENDANHGIA: newHinhThucDanhGia,
        }
      );
      console.log("check response.data", response.data.DT);
      if (response.data.EC === 1) {
        setDataHinhThucDanhGia(response.data.DT);
        setNewHinhThucDanhGia("");
        toast(response.data.EM);
      } else {
        toast(response.data.EM);
      }
    } catch (error) {
      console.error("Error adding quy dinh:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Quy định</DialogTitle>
      <DialogContent>
        <DialogContentText>Danh sách các quy định hiện tại.</DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              value={newHinhThucDanhGia}
              onChange={(e) => setNewHinhThucDanhGia(e.target.value)}
              label="Thêm quy định mới"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddHinhThucDanhGia}
            >
              Thêm
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã Đánh Giá</TableCell>
                    <TableCell>Tên Đánh Giá</TableCell>{" "}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataHinhThucDanhGia?.length > 0 ? (
                    dataHinhThucDanhGia.map((qd) => (
                      <TableRow key={qd.MA_QUY_DINH}>
                        <TableCell>{qd.MADANHGIAKETTHUC}</TableCell>
                        <TableCell>{qd.TENDANHGIA}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Không có dữ liệu
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HinhThucDanhGia;
