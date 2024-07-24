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

const ModalMoCongDangKy = ({
  isOpen,
  onClose,
  TimeDangKyKhungGioChuan,
  setTimeDangKyKhungGioChuan,
  StartTime,
  setStartTime,
  EndTime,
  setEndTime,
  fetchDataGV,
  TenDangNhapGV,
}) => {
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataListKhoa, setdataListKhoa] = useState(null);
  const [TenKhoa, setTenKhoa] = useState(null);

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
  const fetchDataKhoa = async () => {
    const response = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/xem`
    );
    console.log("list khoa =>", response.data.DT);
    setdataListKhoa(response.data.DT);
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
    if (TimeDangKyKhungGioChuan) {
      if (TenKhoa) {
        try {
          const response = await CookiesAxios.post(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xoa/thoigianxacnhan`,
            { TENKHOA: TenKhoa }
          );

          console.log("response.data.DT", response.data.DT);

          if (response.data.EC === 1) {
            fetchDataGV(TenDangNhapGV);
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
        toast.error("Bạn chưa chọn khoa!! ");
      }
    } else {
      toast.error("Bạn chưa mở cổng!! ");
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
          }
        );

        console.log("response.data.DT", response.data.DT);

        if (response.data.EC === 1) {
          fetchDataGV(TenDangNhapGV);
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
      </Box>
    </Modal>
  );
};

export default ModalMoCongDangKy;
