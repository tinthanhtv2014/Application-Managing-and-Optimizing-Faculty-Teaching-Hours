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

import CookiesAxios from "../CookiesAxios";
const DangKyDanhMucGioChuan = () => {
  const [IsOpenSelectOption, setIsOpenSelectOption] =
    useState("Đăng Ký Danh Mục");
  const [TenDeTaiNghienCuu, setTenDeTaiNghienCuu] = useState("");
  const navigate = useNavigate();
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
            <Row>
              <Col md={5} className="row-with-border-danhmuc">
                <Typography className="text-open-gate detai-b">
                  Nhập Tên Đề Tài
                </Typography>
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  defaultValue="Normal"
                  name="TenDeTai"
                  type="text"
                  variant="outlined"
                  value={TenDeTaiNghienCuu}
                  onChange={(e) => setTenDeTaiNghienCuu(e.target.value)}
                />
              </Col>
              <Col md={6} className="row-with-border-danhmuc d-flex detai-a">
                {/* <p className="text-tendetai "></p> */}
                <Typography className="text-open-gate detai-b">
                  {TenDeTaiNghienCuu}
                </Typography>
              </Col>
            </Row>
          </>
        ) : (
          "Xem Lịch Sử Đăng Ký Danh Mục"
        )}
      </Container>
    </>
  );
};

export default DangKyDanhMucGioChuan;
