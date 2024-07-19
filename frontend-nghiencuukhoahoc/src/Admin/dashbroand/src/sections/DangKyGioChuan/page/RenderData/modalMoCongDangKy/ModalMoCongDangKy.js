import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { Container } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const ModalMoCongDangKy = ({
  isOpen,
  onClose,
  TimeDangKyKhungGioChuan,
  setTimeDangKyKhungGioChuan,
  StartTime,
  setStartTime,
  EndTime,
  setEndTime,
}) => {
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const [SoNgay, setSoNgay] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (StartTime && EndTime) {
  //     setLoading(false);
  //   }
  // }, [StartTime, EndTime]);

  useEffect(() => {
    if (StartTime && SoNgay) {
      const startTimeMoment = moment(StartTime);
      if (startTimeMoment.isBefore(moment(), "day")) {
        setError("Thời gian bắt đầu không được ở quá khứ");
        setStartTime(moment().format("YYYY-MM-DDTHH:mm"));
      } else {
        setError("");
        const THOIGIANKETTHUC = startTimeMoment
          .add(Number(SoNgay), "days")
          .format("YYYY-MM-DDTHH:mm");
        setEndTime(THOIGIANKETTHUC);
      }
    }
  }, [SoNgay, StartTime]);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Trả về chuỗi rỗng nếu ngày không có giá trị

    const parts = dateString.split("T");
    if (parts.length !== 2) return ""; // Trả về chuỗi rỗng nếu định dạng không đúng

    return parts[0] + "T" + (parts[1] ? parts[1].slice(0, 5) : "00:00"); // Lấy phần ngày và giờ từ chuỗi định dạng ISO 8601
  };

  const handleOpenModangKy = async () => {
    if (error) return;
    const response = await CookiesAxios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/tao/thoigianxacnhan`,
      {
        THOIGIANBATDAU: StartTime,
        THOIGIANKETTHUC: EndTime,
      }
    );

    if (response.data.EC === 1) {
      setTimeDangKyKhungGioChuan(
        ` ${formatDate(EndTime)} đến ${formatDate(EndTime)}`
      );
      toast.success("Mở Khung Giờ Chuẩn Thành Công");
      setStartTime(response.data.DT.THOIGIANBATDAU);
      setEndTime(response.data.DT.THOIGIANKETTHUC);
    } else {
      toast.error(response.data.EM);
    }
    // Handle response and any necessary state updates
  };

  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    if (moment(value).isBefore(moment(), "day")) {
      setError("Thời gian bắt đầu không được ở quá khứ");
      setStartTime(moment().format("YYYY-MM-DDTHH:mm"));
    } else {
      setError("");
      setStartTime(value);
    }
  };

  console.log("CHECK THOIGIANBATDAU", StartTime);
  console.log("CHECK THOIGIANKETTHUC", EndTime);

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
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 2,
            }}
          >
            <Typography variant="subtitle1">Thời Gian Bắt Đầu</Typography>
            <input
              type="datetime-local"
              value={formatDate(StartTime) || ""}
              onChange={handleStartTimeChange}
              className="input-timechucdanh"
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #bdb3b3",
                fontSize: "16px",
                color: "#333",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </Box>
          {error && <Typography color="error">{error}</Typography>}

          <FormControl fullWidth margin="normal">
            <TextField
              label="Số Ngày"
              value={SoNgay}
              onChange={(e) => setSoNgay(e.target.value)}
              variant="outlined"
              type="number"
            />
          </FormControl>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 2,
            }}
          >
            <input
              type="datetime-local"
              value={formatDate(EndTime) || ""}
              disabled
              className="input-timechucdanh mt-2"
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #bdb3b3",
                fontSize: "16px",
                color: "#333",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </Box>

          <Button variant="outlined" onClick={handleOpenModangKy}>
            Xác Nhận
          </Button>
          <Typography>
            {TimeDangKyKhungGioChuan && TimeDangKyKhungGioChuan}
          </Typography>
        </Container>
      </Box>
    </Modal>
  );
};

export default ModalMoCongDangKy;
