import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { toast } from "react-toastify";
import CookiesAxios from "../../CookiesAxios";
const ModalMoCongDangKy = ({ open, handleClose }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataListKhoa, setdataListKhoa] = useState(null);
  const [TenKhoa, setTenKhoa] = useState(null);
  const [StartTime, setStartTime] = useState(moment());
  const [EndTime, setEndTime] = useState(moment());

  const [TimeDangKyKhungGioChuan, setTimeDangKyKhungGioChuan] = useState(null);
  const [dataThoiGianXacNhan, setDataThoiGianXacNhan] = useState([]);
  useEffect(() => {
    if (StartTime && EndTime) {
      const startTimeMoment = moment(StartTime);
      const endTimeMoment = moment(EndTime);

      if (endTimeMoment.isBefore(startTimeMoment)) {
        setError("Thời gian kết thúc phải sau thời gian bắt đầu");
        setEndTime(moment(StartTime).add(1, "days").format("YYYY-MM-DDTHH:mm"));
      } else {
        setError("");
      }
      fetchDataKhoa();
    }
  }, [EndTime, StartTime]);
  useEffect(() => {
    fetchDataKhoa();
    fetchThoiGianXacNhan();
  }, []);
  const fetchDataKhoa = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/xem`
      );
      console.log("list khoa =>", response.data.DT);
      setdataListKhoa(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khoa:", error);
    }
  };
  const fetchThoiGianXacNhan = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xem/thoigianxacnhan`,
        { withCredentials: true } // Nếu bạn cần gửi cookie hoặc JWT trong yêu cầu
      );
      console.log("Thời gian xác nhận:", response.data);
      if (response.data.EC === 1) {
        setDataThoiGianXacNhan(response.data.DT);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thời gian xác nhận:", error);
      throw error;
    }
  };
  const formatDateShow = (dateString) => {
    if (!dateString) return "";
    const date = moment(dateString);
    if (!moment.isMoment(date) || !date.isValid()) return "";
    return date.format("HH:mm - DD/MM/YYYY");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = moment(dateString);
    if (!moment.isMoment(date) || !date.isValid()) return "";
    return date.local().format("YYYY-MM-DDTHH:mm");
  };

  const handleOffDangky = async () => {
    if (TenKhoa) {
      try {
        const response = await CookiesAxios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xoa/thoigianxacnhan`,
          { TENKHOA: TenKhoa, GHICHU: "NGHIENCUU" }
        );

        console.log("response.data.DT", response.data.DT);

        if (response.data.EC === 1) {
          setDataThoiGianXacNhan(response.data.DT);
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
        console.error("Lỗi khi đóng khung giờ chuẩn:", error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
      }
    } else {
      toast.error("Bạn chưa chọn khoa!! ");
    }
  };
  const handleOpenModangKy = async () => {
    console.log("StartTime + EndTime", StartTime + EndTime);
    if (error) return;

    if (TenKhoa) {
      try {
        const response = await CookiesAxios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/tao/thoigianxacnhan`,
          {
            THOIGIANBATDAU: StartTime,
            THOIGIANKETTHUC: EndTime,
            TENKHOA: TenKhoa,
            GHICHU: "NGHIENCUU",
          }
        );

        console.log("response.data.DT", response.data);

        if (response.data.EC === 1) {
          setDataThoiGianXacNhan(response.data.DT);
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
    } else {
      toast.error("Bạn chưa chọn khoa để mở");
    }
  };

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };

  // console.log("CHECK THOIGIANBATDAU", StartTime);
  // console.log("CHECK THOIGIANKETTHUC", EndTime);
  const filteredDataChonKhung = Array.isArray(dataThoiGianXacNhan)
    ? dataThoiGianXacNhan.filter((item) => item.GHICHU === "CHONKHUNG")
    : [];
  const filteredDataNghienCuu = Array.isArray(dataThoiGianXacNhan)
    ? dataThoiGianXacNhan.filter((item) => item.GHICHU === "NGHIENCUU")
    : [];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "70%",
          maxWidth: "1100px",
          maxHeight: "600px",
          bgcolor: "background.paper",
          borderRadius: "13px",
          boxShadow: 24,
          p: 4,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" }, // Điều chỉnh hướng dựa trên kích thước màn hình
          alignItems: "center",
        }}
      >
        <Container sx={{ width: { xs: "100%", md: "50%" } }}>
          <Row>
            <Typography variant="h6" component="h2">
              Mở Cổng Đăng Ký Nghiên Cứu Khoa Học
            </Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 2,
                }}
              >
                <Typography variant="subtitle1">Thời Gian Bắt Đầu</Typography>
                <DateTimePicker
                  value={moment(StartTime, "YYYY-MM-DDTHH:mm:ss.SSSZ")}
                  onChange={handleStartTimeChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 2,
                }}
              >
                <Typography variant="subtitle1">Thời Gian Kết Thúc</Typography>
                <DateTimePicker
                  value={moment(StartTime, "YYYY-MM-DDTHH:mm:ss.SSSZ")}
                  onChange={handleEndTimeChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                />
              </Box>

              {error && <Typography color="error">{error}</Typography>}
            </LocalizationProvider>
            <Box
              sx={{
                maxWidth: 300,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="khoa-select-label">Chọn Khoa</InputLabel>
                <Select
                  labelId="khoa-select-label"
                  id="khoa-select"
                  className="height-selectGV"
                  value={TenKhoa}
                  label="Chọn Khoa"
                  onChange={(e) => {
                    setTenKhoa(e.target.value);
                  }}
                >
                  {dataListKhoa && dataListKhoa.length > 0 ? (
                    dataListKhoa.map((khoa, index) => (
                      <MenuItem key={index} value={khoa.TENKHOA}>
                        {khoa.TENKHOA}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Không có khoa nào</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
            <Col className="mt-2">
              {" "}
              <Button variant="outlined" onClick={handleOpenModangKy}>
                Mở Cổng
              </Button>
            </Col>{" "}
            <Col className="mt-2">
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
          </Row>{" "}
        </Container>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            pl: { md: 4 },
            borderLeft: { md: "1px solid #ccc" },
          }}
        >
          <Typography variant="h6" component="h2">
            Thời Gian Xác Nhận
          </Typography>
          <Box>
            <Typography variant="subtitle1">CHONKHUNG</Typography>
            {filteredDataChonKhung.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography>
                  {item.TEN_KHOA}:{" "}
                  {moment(item.THOIGIANBATDAU).format("D/M/YYYY")} -{" "}
                  {moment(item.THOIGIANKETTHUC).format("D/M/YYYY")}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box mt={4}>
            <Typography variant="subtitle1">NGHIENCUU</Typography>
            {filteredDataNghienCuu.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography>
                  {item.TEN_KHOA}:{" "}
                  {moment(item.THOIGIANBATDAU).format("D/M/YYYY")} -{" "}
                  {moment(item.THOIGIANKETTHUC).format("D/M/YYYY")}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalMoCongDangKy;
