import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import "./Renderdata.scss";
import { Col, Container, Row, Toast } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import ModalMoCongDangKy from "./modalMoCongDangKy/ModalMoCongDangKy";
const RenderData = ({
  dataKhungChuan,
  dataTenKhungChuan,
  dataListNamHoc,
  MaGV,
}) => {
  const [TenKhung, setTenKhung] = useState();
  const [loading, setLoading] = useState(true);
  const [selectNamHoc, setSelectNamhoc] = useState();
  const [isOpenOption, setIsOpenOption] = useState("Chọn Khung Giờ");
  const [selectedRow, setSelectedRow] = useState(null);
  const [SelectKhungGioChuan, setSelectKhungGioChuan] = useState(null);
  const [dataRenderKhungChuan, setDataRenderKhungChuan] = useState(null);
  const [isDisableNamHoc, setIsDisableNamHoc] = useState(false);
  const [isOpenButtonSelectKhung, setisOpenButtonSelectKhung] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  useEffect(() => {
    console.log("dataKhungChuan", dataKhungChuan);
    if (dataKhungChuan) {
      setLoading(false);
      setDataRenderKhungChuan(dataKhungChuan);
      setSelectNamhoc(dataListNamHoc[0].TENNAMHOC);
    }
  }, [dataKhungChuan]);
  useEffect(() => {
    const DataXemKhungGio = async () => {
      try {
        if (isOpenOption === "Xem Khung Giờ") {
          setisOpenButtonSelectKhung(false);
          setIsDisableNamHoc(false);
          const response = await CookiesAxios.post(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xem/canhan/khunggiochuan`,
            { MAGV: MaGV, TENNAMHOC: selectNamHoc }
          );
          console.log(response.data.DT);
          setDataRenderKhungChuan(response.data.DT);
        } else if (isOpenOption === "Chọn Khung Giờ") {
          setDataRenderKhungChuan(dataKhungChuan);
          setIsDisableNamHoc(true);
          setSelectNamhoc(dataListNamHoc[0].TENNAMHOC);
          setisOpenButtonSelectKhung(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    DataXemKhungGio();
  }, [isOpenOption, selectNamHoc]);
  const handleRowClick = (index, khungChuan) => {
    setSelectedRow(index);
    setSelectKhungGioChuan(khungChuan);
    console.log("check khungChuan", khungChuan);
  };
  const handleCancelSelectKhungGioChuan = () => {
    setSelectKhungGioChuan(null);
    setSelectedRow(null);
  };

  const handleSelectKhungGioChuan = async () => {
    const response = await CookiesAxios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/tao/khunggiochuan`,
      {
        MAGV: MaGV,
        MAKHUNG: SelectKhungGioChuan.MAKHUNG,
        TENNAMHOC: selectNamHoc,
      }
    );
    if (response.data.EC === 1) {
      toast.success(response.data.EM);
    } else {
      toast.error(response.data.EM);
    }
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  if (loading) {
    return <p>loading</p>;
  }

  return (
    <>
      <Container>
        <Row className="mb-4">
          {" "}
          <Col>
            <Button variant="outlined" onClick={handleOpenModal}>
              {" "}
              Mở Cổng Đăng Ký
            </Button>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Box sx={{ maxWidth: 220 }}>
              <FormControl fullWidth className="profile-email-input">
                <InputLabel id="select-label-trang-thai">Chức Năng</InputLabel>
                <Select
                  labelId="select-label-trang-thai"
                  id="trang-thai-select"
                  name="TENCHUCDANH"
                  label="Chức Năng"
                  value={isOpenOption}
                  defaultValue={isOpenOption}
                  onChange={(e) => setIsOpenOption(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="Xem Khung Giờ">Xem Khung Giờ</MenuItem>
                  <MenuItem value="Chọn Khung Giờ">Chọn Khung Giờ</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Col>{" "}
          <Col>
            <Box sx={{ maxWidth: 220 }}>
              <FormControl fullWidth className="profile-email-input">
                <InputLabel id="select-label-trang-thai">Năm học</InputLabel>
                <Select
                  labelId="select-label-trang-thai"
                  id="trang-thai-select"
                  name="TENCHUCDANH"
                  label="Chức danh"
                  value={selectNamHoc}
                  defaultValue={selectNamHoc}
                  disabled={isDisableNamHoc}
                  onChange={(e) => setSelectNamhoc(e.target.value)}
                  variant="outlined"
                >
                  {dataListNamHoc && dataListNamHoc.length > 0 ? (
                    dataListNamHoc.map((namhoc, index) => (
                      <MenuItem key={index} value={namhoc.TENNAMHOC}>
                        {namhoc.TENNAMHOC}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      Không có năm học nào
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
          </Col>
          {isOpenButtonSelectKhung ? (
            <>
              {" "}
              {SelectKhungGioChuan ? (
                <>
                  <Col>
                    <Button
                      variant="outlined"
                      className="button-selectKhung"
                      color="secondary"
                      onClick={handleCancelSelectKhungGioChuan}
                    >
                      Bạn đang chọn {SelectKhungGioChuan.TENKHUNGCHUAN}{" "}
                      <i className="fas fa-times"></i>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="contained"
                      onClick={handleSelectKhungGioChuan}
                    >
                      Xác Nhận
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col>
                    <Button variant="outlined" color="secondary" disabled>
                      Bạn chưa chọn khung giờ chuẩn
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="contained" disabled>
                      Xác Nhận
                    </Button>
                  </Col>
                </>
              )}
            </>
          ) : (
            <>
              {" "}
              <Col></Col>
              <Col></Col>
            </>
          )}
        </Row>
        <Row className="mt-4">
          <TableContainer
            component={Paper}
            sx={{ width: "100%" }}
            className="render-data-conatinerTable"
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Tên khung chuẩn</TableCell>
                  <TableCell align="center">Giờ giảng dạy hành chinh</TableCell>
                  <TableCell align="center">Giờ giảng dạy chuẩn</TableCell>
                  <TableCell align="center">
                    Giờ nghiên cứu khoa học hành chính
                  </TableCell>
                  <TableCell align="center">
                    Giờ nghiên cứu khoa học chuẩn
                  </TableCell>
                  <TableCell align="center">
                    Giờ phục vụ cộng đồng hành chính
                  </TableCell>
                  <TableCell align="center">
                    Giờ phục vụ cộng đồng chuẩn
                  </TableCell>
                  <TableCell align="center">Ghi Chú</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataRenderKhungChuan.map((khungChuan, index) => (
                  <TableRow
                    className={`table-row ${
                      selectedRow === index ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleRowClick(index, khungChuan)} // Xử lý khi click vào dòng
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell align="center" className="text-info">
                      {khungChuan.TENKHUNGCHUAN ?? ""}
                    </TableCell>
                    <TableCell align="center">
                      {khungChuan.GIOGIANGDAY_HANHCHINH ?? ""}
                    </TableCell>
                    <TableCell align="center" className="text-info">
                      {khungChuan.GIOGIANGDAY_CHUAN ?? ""}
                    </TableCell>
                    <TableCell align="center">
                      {khungChuan.GIONGHIENCUUKHOAHOC_HANHCHINH ?? ""}
                    </TableCell>
                    <TableCell align="center" className="text-info">
                      {khungChuan.GIONGHIENCUUKHOAHOC_CHUAN ?? ""}
                    </TableCell>
                    <TableCell align="center">
                      {khungChuan.GIOPHUCVUCONGDONG_HANHCHINH ?? ""}
                    </TableCell>
                    <TableCell align="center" className="text-info">
                      {khungChuan.GIOPHUCVUCONGDONG_CHUAN ?? ""}
                    </TableCell>
                    <TableCell align="center">
                      {khungChuan.GHICHU ?? ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Row>
      </Container>{" "}
      <ModalMoCongDangKy isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default RenderData;
