// src/components/CustomModal.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
const ModalMoCongDangKy = ({ isOpen, onClose }) => {
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const [SoNgay, setSoNgay] = useState();
  const [disableEndTime, setDisableEndTime] = useState(false);
  const [StartTime, setStartTime] = useState(null);
  const [EndTime, setEndTime] = useState(null);

  const handleOpenModangKy = async () => {
    const response = await CookiesAxios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/tao/thoigianxacnhan`,
      {}
    );
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",

          borderRadius: "13px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Container>
          <Typography variant="h6" component="h2">
            Mở Cổng Đăng Ký Khung Giờ Chuẩn
          </Typography>{" "}
          <input
            name="THOIGIANNHAN"
            type="date"
            value={StartTime}
            onChange={(e) => setStartTime(e.target.value)}
            className=" input-timechucdanh mt-2"
          />{" "}
          <FormControl fullWidth margin="normal">
            <TextField
              label="Số Ngày"
              value={SoNgay}
              onChange={(e) => setSoNgay(e.target.value)}
              variant="outlined"
              className="height-selectGV"
            />
          </FormControl>{" "}
          <input
            name="THOIGIANNHAN"
            type="date"
            value={EndTime}
            className=" input-timechucdanh mt-2 mb-2"
            onChange={(e) => setEndTime(e.target.value)}
            disabled={disableEndTime}
          />
          <Button variant="outlined" onClick={handleOpenModangKy}>
            Xác Nhận
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};

export default ModalMoCongDangKy;
