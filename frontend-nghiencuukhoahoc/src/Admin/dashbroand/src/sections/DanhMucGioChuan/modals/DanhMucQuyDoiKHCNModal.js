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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CookiesAxios from "../../CookiesAxios";
import { toast } from "react-toastify";

const DanhMucQuyDoiKHCNModal = ({ open, handleClose }) => {
  const [danhMucQuyDoiKHCN, setDanhMucQuyDoiKHCN] = useState([]);
  const [LoaiDanhMuc, setLoaiDanhMuc] = useState();
  const [formData, setFormData] = useState({
    MA_LOAI_DANH_MUC: "",
    GIO_CHUAN: "",
    NOI_DUNG_DANH_MUC: "",
    ISBN: "",
    WOS_SCOUPUS: "",
    HANG_WOS_SCOUPUS: "",
    LOI_NHUAN: "",
    DON_VI_TINH: "",
    GIAI_THUONG: "",
    XEP_HANG_QUARTILES: "",
    NAM_THUC_HIEN: "",
    TRANG_THAI_DANH_MUC: "",
    GHI_CHU_DANH_MUC: "",
  });

  useEffect(() => {
    if (open) {
      fetchDanhMucQuyDoiKHCN();
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
  const fetchDanhMucQuyDoiKHCN = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/danhmucquydoi`
      );
      setDanhMucQuyDoiKHCN(response.data.DT);
    } catch (error) {
      console.error("Error fetching danh muc quy doi KHCN:", error);
    }
  };

  const handleAddDanhMucQuyDoi = async () => {
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/danhmucquydoi`,
        formData
      );
      if (response.data.EC === 1) {
        setDanhMucQuyDoiKHCN(response.data.DT);
        toast.success(response.data.EM);
        setFormData({
          // Reset form after adding
          MA_LOAI_DANH_MUC: "",
          GIO_CHUAN: "",
          NOI_DUNG_DANH_MUC: "",
          ISBN: "",
          WOS_SCOUPUS: "",
          HANG_WOS_SCOUPUS: "",
          LOI_NHUAN: "",
          DON_VI_TINH: "",
          GIAI_THUONG: "",
          XEP_HANG_QUARTILES: "",
          NAM_THUC_HIEN: "",
          TRANG_THAI_DANH_MUC: "",
          GHI_CHU_DANH_MUC: "",
        });
      } else {
        toast.error(response.data.EM);
      }
    } catch (error) {
      console.error("Error adding danh muc quy doi KHCN:", error);
    }
  };

  const handleDeleteDanhMucQuyDoi = async (id) => {
    try {
      const response = await CookiesAxios.delete(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/danhmucquydoi/${id}`
      );
      setDanhMucQuyDoiKHCN(response.data.DT);
      toast.success("Xóa danh mục quy đổi thành công!");
    } catch (error) {
      console.error("Error deleting danh muc quy doi KHCN:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Danh Mục Quy Đổi KHCN</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Danh sách các danh mục quy đổi hiện tại.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Loại Danh Mục</InputLabel>
              <Select
                value={formData.MA_LOAI_DANH_MUC}
                onChange={(e) =>
                  setFormData({ ...formData, MA_LOAI_DANH_MUC: e.target.value })
                }
              >
                {Array.isArray(LoaiDanhMuc) &&
                  LoaiDanhMuc.map((qd) => (
                    <MenuItem
                      key={qd.MA_LOAI_DANH_MUC}
                      value={qd.MA_LOAI_DANH_MUC}
                    >
                      {qd.TEN_LOAI_DANH_MUC}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Giờ Chuẩn"
              value={formData.GIO_CHUAN}
              onChange={(e) =>
                setFormData({ ...formData, GIO_CHUAN: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nội Dung Danh Mục"
              value={formData.NOI_DUNG_DANH_MUC}
              onChange={(e) =>
                setFormData({ ...formData, NOI_DUNG_DANH_MUC: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="ISBN"
              value={formData.ISBN}
              onChange={(e) =>
                setFormData({ ...formData, ISBN: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="WOS/SCOUPUS"
              value={formData.WOS_SCOUPUS}
              onChange={(e) =>
                setFormData({ ...formData, WOS_SCOUPUS: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hạng WOS/SCOUPUS"
              value={formData.HANG_WOS_SCOUPUS}
              onChange={(e) =>
                setFormData({ ...formData, HANG_WOS_SCOUPUS: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Lợi Nhuận"
              value={formData.LOI_NHUAN}
              onChange={(e) =>
                setFormData({ ...formData, LOI_NHUAN: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Đơn Vị Tính"
              value={formData.DON_VI_TINH}
              onChange={(e) =>
                setFormData({ ...formData, DON_VI_TINH: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Giải Thưởng"
              value={formData.GIAI_THUONG}
              onChange={(e) =>
                setFormData({ ...formData, GIAI_THUONG: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Xếp Hạng Quartiles"
              value={formData.XEP_HANG_QUARTILES}
              onChange={(e) =>
                setFormData({ ...formData, XEP_HANG_QUARTILES: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Năm Thực Hiện"
              value={formData.NAM_THUC_HIEN}
              onChange={(e) =>
                setFormData({ ...formData, NAM_THUC_HIEN: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Trạng Thái Danh Mục"
              value={formData.TRANG_THAI_DANH_MUC}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  TRANG_THAI_DANH_MUC: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Ghi Chú Danh Mục"
              value={formData.GHI_CHU_DANH_MUC}
              onChange={(e) =>
                setFormData({ ...formData, GHI_CHU_DANH_MUC: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddDanhMucQuyDoi}
              style={{ marginTop: "16px" }}
            >
              Thêm
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã Danh Mục</TableCell>
                    <TableCell>Mã Loại Danh Mục</TableCell>
                    <TableCell>Giờ Chuẩn</TableCell>
                    <TableCell>Nội Dung</TableCell>
                    <TableCell>ISBN</TableCell>
                    <TableCell>WOS/SCOUPUS</TableCell>
                    <TableCell>Hạng WOS/SCOUPUS</TableCell>
                    <TableCell>Lợi Nhuận</TableCell>
                    <TableCell>Đơn Vị Tính</TableCell>
                    <TableCell>Giải Thưởng</TableCell>
                    <TableCell>Xếp Hạng Quartiles</TableCell>
                    <TableCell>Năm Thực Hiện</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                    <TableCell>Ghi Chú</TableCell>
                    <TableCell>Hành Động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(danhMucQuyDoiKHCN) &&
                  danhMucQuyDoiKHCN.length > 0 ? (
                    danhMucQuyDoiKHCN.map((qd) => (
                      <TableRow key={qd.MA_DANH_MUC}>
                        <TableCell>{qd.MA_DANH_MUC}</TableCell>
                        <TableCell>{qd.MA_LOAI_DANH_MUC}</TableCell>
                        <TableCell>{qd.GIO_CHUAN}</TableCell>
                        <TableCell>{qd.NOI_DUNG_DANH_MUC}</TableCell>
                        <TableCell>{qd.ISBN}</TableCell>
                        <TableCell>{qd.WOS_SCOUPUS}</TableCell>
                        <TableCell>{qd.HANG_WOS_SCOUPUS}</TableCell>
                        <TableCell>{qd.LOI_NHUAN}</TableCell>
                        <TableCell>{qd.DON_VI_TINH}</TableCell>
                        <TableCell>{qd.GIAI_THUONG}</TableCell>
                        <TableCell>{qd.XEP_HANG_QUARTILES}</TableCell>
                        <TableCell>{qd.NAM_THUC_HIEN}</TableCell>
                        <TableCell>{qd.TRANG_THAI_DANH_MUC}</TableCell>
                        <TableCell>{qd.GHI_CHU_DANH_MUC}</TableCell>
                        <TableCell>
                          <i
                            className="fa-solid fa-trash"
                            aria-label="delete"
                            onClick={() =>
                              handleDeleteDanhMucQuyDoi(qd.MA_DANH_MUC)
                            }
                            style={{ cursor: "pointer" }}
                          ></i>
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DanhMucQuyDoiKHCNModal;
