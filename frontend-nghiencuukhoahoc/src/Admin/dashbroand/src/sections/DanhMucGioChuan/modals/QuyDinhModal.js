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
import axios from "axios";

const QuyDinhModal = ({ open, handleClose }) => {
  const [quyDinhs, setQuyDinhs] = useState([]);
  const [newQuyDinh, setNewQuyDinh] = useState("");
  const [StatusQuyDinh, setStatusQuyDinh] = useState("");
  useEffect(() => {
    if (open) {
      fetchQuyDinhs();
    }
  }, [open]);

  const fetchQuyDinhs = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/quydinh`
      );
      // console.log("check fetch Quy dinh =>", response.data);
      setQuyDinhs(response.data.DT);
    } catch (error) {
      console.error("Error fetching quy dinhs:", error);
    }
  };

  const handleAddQuyDinh = async () => {
    if (newQuyDinh.trim() === "") return;

    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/quydinh`,
        {
          TEN_QUY_DINH: newQuyDinh,
        }
      );
      console.log("check response.data", response.data.DT);
      setQuyDinhs(response.data.DT);
      setNewQuyDinh("");
    } catch (error) {
      console.error("Error adding quy dinh:", error);
    }
  };
  const handleUpdateStatusQuyDinh = async (qd) => {
    const TrangThai = "Đang áp dụng";
    if (qd.TRANG_THAI_QUY_DINH == "Đang áp dụng") {
      return TrangThai == "Ngưng áp dụng";
    }
    try {
      const response = await CookiesAxios.put(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/quydinh/${qd.MA_QUY_DINH}`,
        { TRANG_THAI_QUY_DINH: TrangThai }
      );
      console.log("check handleDeleteQuyDinh", response.data);
      setQuyDinhs(response.data.DT);
    } catch (error) {
      console.error("Error deleting quy dinh:", error);
    }
  };

  const handleDeleteQuyDinh = async (id) => {
    try {
      const response = await CookiesAxios.delete(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/quydinh/${id}`
      );
      console.log("check handleDeleteQuyDinh", response.data);
      setQuyDinhs(response.data.DT);
    } catch (error) {
      console.error("Error deleting quy dinh:", error);
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
              value={newQuyDinh}
              onChange={(e) => setNewQuyDinh(e.target.value)}
              label="Thêm quy định mới"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddQuyDinh}
            >
              Thêm
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã Quy Định</TableCell>
                    <TableCell>Tên Quy Định</TableCell>
                    <TableCell>Hành Động</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quyDinhs.map((qd) => (
                    <TableRow key={qd.MA_QUY_DINH}>
                      <TableCell>{qd.MA_QUY_DINH}</TableCell>
                      <TableCell>{qd.TEN_QUY_DINH}</TableCell>
                      <TableCell>
                        <i
                          className="fa-solid fa-trash"
                          aria-label="delete"
                          onClick={() => handleDeleteQuyDinh(qd.MA_QUY_DINH)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </TableCell>
                      <TableCell>
                        <i
                          className="fa-solid fa-trash"
                          aria-label="delete"
                          onClick={() => handleUpdateStatusQuyDinh(qd)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </TableCell>
                    </TableRow>
                  ))}
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

export default QuyDinhModal;
