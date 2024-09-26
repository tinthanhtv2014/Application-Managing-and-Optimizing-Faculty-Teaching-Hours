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
import ExcelChuyenMonGV from "./component/ExcelChuyenMonGV";

const FakeChuyenMonGV = ({ open, handleClose }) => {
  useEffect(() => {
    if (open) {
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Excel FakeChuyenMonGV</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Danh sách các Excel FakeChuyenMonGV
        </DialogContentText>
        <Grid container spacing={2}>
          <ExcelChuyenMonGV />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FakeChuyenMonGV;
