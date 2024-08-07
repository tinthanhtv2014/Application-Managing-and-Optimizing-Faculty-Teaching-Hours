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

const LoaiTacGiaModal = ({ open, handleClose }) => {
  const [loaiTacGia, setLoaiTacGia] = useState([]);
  const [select_TEN_LOAI_TAC_GIA, setTEN_LOAI_TAC_GIA] = useState("");

  useEffect(() => {
    if (open) {
      fetchLoaiTacGia();
    }
  }, [open]);

  const fetchLoaiTacGia = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaitacgia`
      );
      setLoaiTacGia(response.data.DT);
    } catch (error) {
      console.error("Error fetching loai tac gia:", error);
    }
  };

  const handleAddTacGia = async () => {
    if (select_TEN_LOAI_TAC_GIA.trim() === "") return;

    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaitacgia`,
        {
          TEN_LOAI_TAC_GIA: select_TEN_LOAI_TAC_GIA,
        }
      );
      if (response.data.EC === 1) {
        setLoaiTacGia(response.data.DT);
        toast.success(response.data.EM);
      } else {
        toast.error(response.data.EM);
      }

      setTEN_LOAI_TAC_GIA(""); // Clear input field after adding
    } catch (error) {
      console.error("Error adding loai tac gia:", error);
    }
  };

  const handleDeleteTacGia = async (id) => {
    try {
      const response = await CookiesAxios.delete(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaitacgia/${id}`
      );
      if (response.data.EC === 1) {
        setLoaiTacGia(response.data.DT);
        toast.success("Xóa loại tác giả thành công!");
      } else {
        toast.error(response.data.EM);
      }
    } catch (error) {
      console.error("Error deleting loai tac gia:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Loại Tác Giả</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Danh sách các loại tác giả hiện tại.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              value={select_TEN_LOAI_TAC_GIA}
              onChange={(e) => setTEN_LOAI_TAC_GIA(e.target.value)}
              label="Thêm Tên Loại Tác Giả"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTacGia}
            >
              Thêm
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã Loại Tác Giả</TableCell>
                    <TableCell>Tên Loại Tác Giả</TableCell>
                    <TableCell>Hành Động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(loaiTacGia) && loaiTacGia.length > 0 ? (
                    loaiTacGia.map((tg) => (
                      <TableRow key={tg.MA_LOAI_TAC_GIA}>
                        <TableCell>{tg.MA_LOAI_TAC_GIA}</TableCell>
                        <TableCell>{tg.TEN_LOAI_TAC_GIA}</TableCell>
                        <TableCell>
                          <i
                            className="fa-solid fa-trash"
                            aria-label="delete"
                            onClick={() =>
                              handleDeleteTacGia(tg.MA_LOAI_TAC_GIA)
                            }
                            style={{ cursor: "pointer" }}
                          ></i>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
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

export default LoaiTacGiaModal;
