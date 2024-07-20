import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { Container, Col, Row } from "react-bootstrap";
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

  useEffect(() => {
    if (StartTime && SoNgay) {
      const startTimeMoment = moment(StartTime);
      const endTimeMoment = startTimeMoment.add(Number(SoNgay), "days");

      if (endTimeMoment.isBefore(moment())) {
        setError("Thời gian kết thúc phải ở tương lai");
        setEndTime(moment().add(1, "days").format("YYYY-MM-DDTHH:mm"));
      } else {
        setError("");
        setEndTime(endTimeMoment.format("YYYY-MM-DDTHH:mm"));
      }
    }
  }, [SoNgay, StartTime]);

  const formatDateShow = (dateString) => {
    if (!dateString) return ""; // Trả về chuỗi rỗng nếu ngày không có giá trị

    const date = moment(dateString);
    if (!date.isValid()) return ""; // Trả về chuỗi rỗng nếu định dạng không đúng

    return date.format("HH:mm - DD/MM/YYYY"); // Định dạng ngày theo yêu cầu
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Trả về chuỗi rỗng nếu ngày không có giá trị

    const date = moment(dateString); // Sử dụng moment để phân tích chuỗi
    if (!date.isValid()) return ""; // Trả về chuỗi rỗng nếu định dạng không đúng

    // Định dạng ngày theo yêu cầu, sử dụng múi giờ địa phương
    return date.local().format("YYYY-MM-DDTHH:mm"); // Chuyển đổi sang định dạng ngày giờ địa phương
  };
  const handleOffDangky = async () => {
    if (TimeDangKyKhungGioChuan) {
      try {
        const response = await CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xoa/thoigianxacnhan`
        );

        console.log("response.data.DT", response.data.DT);

        if (response.data.EC === 1) {
          setTimeDangKyKhungGioChuan("");
          setEndTime("");
          setStartTime("");
          toast.success("Đóng Khung Giờ Chuẩn Thành Công");
        } else {
          toast.error(response.data.EM);
        }
      } catch (error) {
        console.error("Lỗi khi đóng khung giờ chuẩn:", error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
      }
    } else {
      toast.error("Bạn chưa mở cổng!! ");
    }
  };
  const handleOpenModangKy = async () => {
    console.log("StartTime + EndTime", StartTime + EndTime);
    if (error) return;

    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/tao/thoigianxacnhan`,
        {
          THOIGIANBATDAU: StartTime,
          THOIGIANKETTHUC: EndTime,
        }
      );

      console.log("response.data.DT", response.data.DT);

      if (response.data.EC === 1) {
        setTimeDangKyKhungGioChuan(
          `${formatDateShow(
            response.data.DT.THOIGIANBATDAU
          )} đến ${formatDateShow(response.data.DT.THOIGIANKETTHUC)}`
        );
        toast.success("Mở Khung Giờ Chuẩn Thành Công");
        setStartTime(response.data.DT.THOIGIANBATDAU);
        setEndTime(response.data.DT.THOIGIANKETTHUC);
      } else {
        toast.error(response.data.EM);
      }
    } catch (error) {
      console.error("Lỗi khi mở khung giờ chuẩn:", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };

  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    setStartTime(value);
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
          <Row>
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
              <Typography variant="subtitle1">Thời Gian Kết Thúc</Typography>
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
            <Col>
              {" "}
              <Button variant="outlined" onClick={handleOpenModangKy}>
                Mở Cổng
              </Button>
            </Col>{" "}
            <Col>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleOffDangky}
              >
                Đóng cổng
              </Button>
            </Col>
            <Typography>
              {TimeDangKyKhungGioChuan && TimeDangKyKhungGioChuan}
            </Typography>
          </Row>
        </Container>
      </Box>
    </Modal>
  );
};

export default ModalMoCongDangKy;
