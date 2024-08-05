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

const LoaiDanhMucModal = ({ open, handleClose }) => {
  const [loaiDanhMuc, setLoaiDanhMuc] = useState([]);
  const [slect_TEN_LOAI_DANH_MUC, setTEN_LOAI_DANH_MUC] = useState("");
  const [TRANG_THAI_DANH_MUC, setTRANG_THAI_DANH_MUC] = useState("");

  useEffect(() => {
    if (open) {
      fetchLoaidanhMuc();
    }
  }, [open]);

  const fetchLoaidanhMuc = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaidanhmuc`
      );
      setLoaiDanhMuc(response.data.DT);
    } catch (error) {
      console.error("Error fetching loai danh muc:", error);
    }
  };

  const handleAddDanhMuc = async () => {
    if (slect_TEN_LOAI_DANH_MUC.trim() === "") return;

    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaidanhmuc`,
        {
          TEN_LOAI_DANH_MUC: slect_TEN_LOAI_DANH_MUC,
        }
      );
      console.log("check LoaiDanhMuc", response.data.DT);
      if (response.data.EC === 1) {
        setLoaiDanhMuc(response.data.DT);
      } else {
        toast.error(response.data.EM);
      }

      setTEN_LOAI_DANH_MUC(""); // Clear input field after adding
    } catch (error) {
      console.error("Error adding loai danh muc:", error);
    }
  };

  const handleDeleteDanhMuc = async (id) => {
    try {
      const response = await CookiesAxios.delete(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaidanhmuc/${id}`
      );
      setLoaiDanhMuc(response.data.DT);
    } catch (error) {
      console.error("Error deleting loai danh muc:", error);
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
              value={slect_TEN_LOAI_DANH_MUC}
              onChange={(e) => setTEN_LOAI_DANH_MUC(e.target.value)}
              label="Thêm Tên Danh Mục"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddDanhMuc}
            >
              Thêm
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã Loại Danh Mục</TableCell>
                    <TableCell>Tên Loại Danh Mục</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                    <TableCell>Hành Động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(loaiDanhMuc) && loaiDanhMuc.length > 0 ? (
                    loaiDanhMuc.map((qd) => (
                      <TableRow key={qd.MA_LOAI_DANH_MUC}>
                        <TableCell>{qd.MA_LOAI_DANH_MUC}</TableCell>
                        <TableCell>{qd.TEN_LOAI_DANH_MUC}</TableCell>
                        <TableCell>{qd.TRANG_THAI_DANH_MUC}</TableCell>
                        <TableCell>
                          <i
                            className="fa-solid fa-trash"
                            aria-label="delete"
                            onClick={() =>
                              handleDeleteDanhMuc(qd.MA_LOAI_DANH_MUC)
                            }
                            style={{ cursor: "pointer" }}
                          ></i>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
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

export default LoaiDanhMucModal;
