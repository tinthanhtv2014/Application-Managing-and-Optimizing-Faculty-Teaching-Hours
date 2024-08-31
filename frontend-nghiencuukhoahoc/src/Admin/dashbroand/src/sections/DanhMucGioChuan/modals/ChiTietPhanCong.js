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
import ComponentExcelChiTietPhanCong from "./component/ExcelChiTietPhanCong";

const ModalChiTietPhanCong = ({ open, handleClose }) => {
  useEffect(() => {
    if (open) {
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Excel Chi Tiết Phân Công</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Danh sách các Excel Chi Tiết Phân Công
        </DialogContentText>
        <Grid container spacing={2}>
          <ComponentExcelChiTietPhanCong />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalChiTietPhanCong;
