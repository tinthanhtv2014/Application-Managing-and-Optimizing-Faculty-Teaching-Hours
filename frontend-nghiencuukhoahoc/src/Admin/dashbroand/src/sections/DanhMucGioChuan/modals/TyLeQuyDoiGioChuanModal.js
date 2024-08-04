import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const TyLeQuyDoiGioChuanModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Tỷ lệ quy đổi giờ chuẩn</DialogTitle>
      <DialogContent>
        <DialogContentText>Nội dung Tỷ lệ quy đổi giờ chuẩn.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TyLeQuyDoiGioChuanModal;
