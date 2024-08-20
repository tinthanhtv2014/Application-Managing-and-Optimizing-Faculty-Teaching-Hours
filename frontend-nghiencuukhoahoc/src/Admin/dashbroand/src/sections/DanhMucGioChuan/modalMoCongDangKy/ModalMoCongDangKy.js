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
import moment from "moment";
import { toast } from "react-toastify";
import CookiesAxios from "../../CookiesAxios";
const ModalMoCongDangKy = ({ open, handleClose }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataListKhoa, setdataListKhoa] = useState(null);
  const [TenKhoa, setTenKhoa] = useState(null);
  const [StartTime, setStartTime] = useState(null);
  const [EndTime, setEndTime] = useState(null);
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
    if (TenKhoa) {
      try {
        const response = await CookiesAxios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xoa/thoigianxacnhan`,
          { TENKHOA: TenKhoa, GHICHU: "NGHIENCUU" }
        );

        console.log("response.data.DT", response.data.DT);

        if (response.data.EC === 1) {
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
    } else {
      toast.error("Bạn chưa chọn khoa để mở");
    }
  };

  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    setStartTime(value);
  };

  const handleEndTimeChange = (e) => {
    const value = e.target.value;
    setEndTime(value);
  };

  // console.log("CHECK THOIGIANBATDAU", StartTime);
  // console.log("CHECK THOIGIANKETTHUC", EndTime);
  const filteredDataChonKhung = dataThoiGianXacNhan.filter(
    (item) => item.GHICHU === "CHONKHUNG"
  );
  const filteredDataNghienCuu = dataThoiGianXacNhan.filter(
    (item) => item.GHICHU === "NGHIENCUU"
  );
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
                onChange={handleEndTimeChange}
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
            </Box>{" "}
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
