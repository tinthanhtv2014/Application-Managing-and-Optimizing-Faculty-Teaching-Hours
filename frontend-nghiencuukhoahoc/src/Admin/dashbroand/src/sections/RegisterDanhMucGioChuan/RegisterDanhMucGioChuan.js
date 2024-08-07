import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  TextField,
} from "@mui/material";

import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "./RegisterDanhMucGioChuan.scss";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import CookiesAxios from "../CookiesAxios";
import Cookies from "js-cookie";
const DangKyDanhMucGioChuan = ({ MaGV }) => {
  const [IsOpenSelectOption, setIsOpenSelectOption] =
    useState("Đăng Ký Danh Mục");
  const [TenDeTaiNghienCuu, setTenDeTaiNghienCuu] = useState("");
  const navigate = useNavigate();
  const [tacGiaList, setTacGiaList] = useState([
    { ten: "", loai: "" },
    // Thêm các tác giả khác nếu có
  ]);
  const [LoaiTacGia, setLoaiTacGia] = useState([]);
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      // console.log("check decoded", decoded.taikhoan);
      const fectData = async () => {
        const response = await CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaitacgia`
        );

        setLoaiTacGia(response.data.DT);
      };
      fectData();
      try {
      } catch (error) {
        console.log("error UseEffect call api Data ", error);
      }
    }
  }, []);
  const handleLoaiTacGiaChange = (index, value) => {
    const newList = [...tacGiaList];
    newList[index].loai = value;
    setTacGiaList(newList);
  };
  const handleAddTacGia = () => {
    setTacGiaList([...tacGiaList, { ten: "", loai: "" }]);
  };

  const handleTacGiaChange = (index, value) => {
    const updatedTacGiaList = [...tacGiaList];
    updatedTacGiaList[index].ten = value;
    setTacGiaList(updatedTacGiaList);
  };
  const handleRemoveTacGia = (index) => {
    const updatedTacGiaList = tacGiaList.filter((_, i) => i !== index);
    setTacGiaList(updatedTacGiaList);
  };
  const handleback = () => {
    navigate("/admin/dang-ky-khung-gio-chuan");
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={2}>
            {" "}
            <Button variant="contained" onClick={handleback}>
              Trờ Về
            </Button>
          </Col>
        </Row>{" "}
        <Row className="mt-4">
          <Col md={6}>
            <Col md={6}>
              {" "}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chức Năng</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={IsOpenSelectOption}
                  label="Chức Năng"
                  onChange={(e) => setIsOpenSelectOption(e.target.value)}
                >
                  <MenuItem value="Đăng Ký Danh Mục">Đăng Ký Danh Mục</MenuItem>
                  <MenuItem value="Xem Lịch Sử Đăng Ký Danh Mục">
                    Xem Lịch Sử Đăng Ký Danh Mục
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
          </Col>
        </Row>
        {IsOpenSelectOption === "Đăng Ký Danh Mục" ? (
          <>
            {" "}
            {/* START----------------Tên Đề Tài--------------------------- */}
            <Row>
              <Col md={7} className="row-with-border-danhmuc">
                <Col md={4}>
                  {" "}
                  <Typography className="text-open-gate detai-b">
                    Nhập Tên Đề Tài
                  </Typography>
                </Col>{" "}
                <Col md={7}>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    defaultValue="Normal"
                    name="TenDeTai"
                    type="text"
                    variant="outlined"
                    value={TenDeTaiNghienCuu}
                    onChange={(e) => setTenDeTaiNghienCuu(e.target.value)}
                    sx={{ width: "calc(100% + 5px)" }} // Tăng chiều rộng thêm 50px
                  />
                </Col>
              </Col>
              <Col md={4} className="row-with-border-danhmuc d-flex detai-a">
                {/* <p className="text-tendetai "></p> */}
                <Typography className="text-open-gate detai-b">
                  {TenDeTaiNghienCuu}
                </Typography>
              </Col>
            </Row>
            {/* END----------------Tên Đề Tài--------------------------- */}
            {/* START---------------Danh Sách Tác Giả--------------------------- */}
            <Row>
              <Col md={7} className="">
                {tacGiaList.map((tacGia, index) => (
                  <div
                    key={index}
                    className="mt-2 d-flex position-re row-with-border-danhmuc-nodisplay-flex"
                  >
                    {" "}
                    <Col md={5} className="mt-2">
                      {" "}
                      <TextField
                        label={`Khoa nào`}
                        value={tacGia.ten}
                        onChange={(e) =>
                          handleTacGiaChange(index, e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />{" "}
                      <TextField
                        label={`Bộ Môn nào`}
                        value={tacGia.ten}
                        onChange={(e) =>
                          handleTacGiaChange(index, e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />{" "}
                      <TextField
                        label={`Mã Số GV`}
                        value={tacGia.ten}
                        onChange={(e) =>
                          handleTacGiaChange(index, e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />{" "}
                      <TextField
                        label={`Tên Giảng Viên`}
                        value={tacGia.ten}
                        onChange={(e) =>
                          handleTacGiaChange(index, e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />{" "}
                      <TextField
                        label={`Email Giảng Viên`}
                        value={tacGia.ten}
                        onChange={(e) =>
                          handleTacGiaChange(index, e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                    </Col>
                    <Col md={6} className="mt-2 ml-4">
                      <FormControl fullWidth margin="normal">
                        <InputLabel id={`loai-tac-gia-label-${index}`}>
                          Loại Tác Giả {index + 1}
                        </InputLabel>
                        <Select
                          labelId={`loai-tac-gia-label-${index}`}
                          value={tacGia.loai}
                          label="Loại Tác Giả a"
                          onChange={(e) =>
                            handleLoaiTacGiaChange(index, e.target.value)
                          }
                        >
                          {LoaiTacGia.map((loai) => (
                            <MenuItem
                              key={loai.MA_LOAI_TAC_GIA}
                              value={loai.MA_LOAI_TAC_GIA}
                            >
                              {loai.TEN_LOAI_TAC_GIA}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Col>
                    <i
                      className="fa-solid fa-xmark position-ab"
                      aria-label="delete"
                      onClick={() => handleRemoveTacGia(index)}
                      size="small"
                    ></i>
                  </div>
                ))}
                <div className="mt-3">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTacGia}
                  >
                    Thêm Tác Giả
                  </Button>
                </div>
              </Col>
              <Col md={4}></Col>
            </Row>
            {/* END----------------Danh Sách Tác Giả--------------------------- */}
          </>
        ) : (
          "Xem Lịch Sử Đăng Ký Danh Mục"
        )}
      </Container>
    </>
  );
};

export default DangKyDanhMucGioChuan;
