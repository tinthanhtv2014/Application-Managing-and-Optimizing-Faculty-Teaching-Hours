import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DanhMucGioChuan = () => {
  const [open, setOpen] = useState({
    quyDinh: false,
    tyLeQuyDoiGioChuan: false,
    loaiDanhMuc: false,
    danhMucQuyDoiKHCN: false,
    loaiTacGia: false,
  });

  const handleClickOpen = (modal) => {
    setOpen({ ...open, [modal]: true });
  };

  const handleClose = (modal) => {
    setOpen({ ...open, [modal]: false });
  };

  return (
    <>
      <h1>Hello DanhMucGioChuan</h1>
      <Button variant="outlined" onClick={() => handleClickOpen("quyDinh")}>
        Quy định
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleClickOpen("tyLeQuyDoiGioChuan")}
      >
        Tỷ lệ quy đổi giờ chuẩn
      </Button>
      <Button variant="outlined" onClick={() => handleClickOpen("loaiDanhMuc")}>
        Loại danh mục
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleClickOpen("danhMucQuyDoiKHCN")}
      >
        Danh mục quy đổi khoa học công nghệ
      </Button>
      <Button variant="outlined" onClick={() => handleClickOpen("loaiTacGia")}>
        Loại tác giả
      </Button>

      {/* Modal Quy định */}
      <Dialog open={open.quyDinh} onClose={() => handleClose("quyDinh")}>
        <DialogTitle>Quy định</DialogTitle>
        <DialogContent>
          <DialogContentText>Nội dung Quy định.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("quyDinh")}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Tỷ lệ quy đổi giờ chuẩn */}
      <Dialog
        open={open.tyLeQuyDoiGioChuan}
        onClose={() => handleClose("tyLeQuyDoiGioChuan")}
      >
        <DialogTitle>Tỷ lệ quy đổi giờ chuẩn</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nội dung Tỷ lệ quy đổi giờ chuẩn.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("tyLeQuyDoiGioChuan")}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Loại danh mục */}
      <Dialog
        open={open.loaiDanhMuc}
        onClose={() => handleClose("loaiDanhMuc")}
      >
        <DialogTitle>Loại danh mục</DialogTitle>
        <DialogContent>
          <DialogContentText>Nội dung Loại danh mục.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("loaiDanhMuc")}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Danh mục quy đổi khoa học công nghệ */}
      <Dialog
        open={open.danhMucQuyDoiKHCN}
        onClose={() => handleClose("danhMucQuyDoiKHCN")}
      >
        <DialogTitle>Danh mục quy đổi khoa học công nghệ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nội dung Danh mục quy đổi khoa học công nghệ.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("danhMucQuyDoiKHCN")}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Loại tác giả */}
      <Dialog open={open.loaiTacGia} onClose={() => handleClose("loaiTacGia")}>
        <DialogTitle>Loại tác giả</DialogTitle>
        <DialogContent>
          <DialogContentText>Nội dung Loại tác giả.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("loaiTacGia")}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DanhMucGioChuan;
