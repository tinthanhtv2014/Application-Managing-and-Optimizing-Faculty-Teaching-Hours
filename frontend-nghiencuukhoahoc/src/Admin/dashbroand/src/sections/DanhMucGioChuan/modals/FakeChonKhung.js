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
import ExcelChonKhung from "./component/ExcelChonKhung";

const FakeChonKhung = ({ open, handleClose }) => {
  useEffect(() => {
    if (open) {
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Excel FakeChonKhung</DialogTitle>
      <DialogContent>
        <DialogContentText>Danh sách các Excel FakeChonKhung</DialogContentText>
        <Grid container spacing={2}>
          <ExcelChonKhung />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FakeChonKhung;
