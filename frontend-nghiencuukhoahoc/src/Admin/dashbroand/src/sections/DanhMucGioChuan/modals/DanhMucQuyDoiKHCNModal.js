import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DanhMucQuyDoiKHCNModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Danh mục quy đổi khoa học công nghệ</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nội dung Danh mục quy đổi khoa học công nghệ.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DanhMucQuyDoiKHCNModal;
