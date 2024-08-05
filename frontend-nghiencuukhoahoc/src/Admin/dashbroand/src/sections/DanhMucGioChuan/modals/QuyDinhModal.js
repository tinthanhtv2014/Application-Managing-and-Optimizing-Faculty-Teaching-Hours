import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
} from "@mui/material";
import CookiesAxios from "../../CookiesAxios";
import axios from "axios";

const QuyDinhModal = ({ open, handleClose }) => {
  const [quyDinhs, setQuyDinhs] = useState([]);
  const [newQuyDinh, setNewQuyDinh] = useState("");

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

  const handleDeleteQuyDinh = async (id) => {
    try {
      await CookiesAxios.delete(`/api/quy_dinh/${id}`);
      setQuyDinhs(quyDinhs.filter((qd) => qd.MA_QUY_DINH !== id));
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
          <Grid item xs={12} md={6}>
            <p>Tên các quy định đang hiện hành</p>
            <List>
              {quyDinhs.map((qd) => (
                <ListItem
                  key={qd.MA_QUY_DINH}
                  secondaryAction={
                    <i
                      class="bi bi-trash"
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteQuyDinh(qd.MA_QUY_DINH)}
                    ></i>
                  }
                >
                  <ListItemText primary={qd.TEN_QUY_DINH} />
                </ListItem>
              ))}
            </List>
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
