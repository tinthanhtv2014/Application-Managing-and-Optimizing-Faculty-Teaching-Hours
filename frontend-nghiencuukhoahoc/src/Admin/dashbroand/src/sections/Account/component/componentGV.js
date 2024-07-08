import React, { useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import {
  Avatar,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Box,
  FormControl,
} from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../component/componentGV.scss";

const GiangVienProfile = ({ giangVien }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(giangVien);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setEditData(giangVien);
    setIsEditing(false);
  };
  const handleSaveClick = async () => {
    try {
      const response = await axios.post(
        "/api/v1/admin/giangvien/update",
        editData
      );
      if (response.data.EC === 1) {
        setIsEditing(false);
      } else {
        // handle error
        alert(response.data.EM);
      }
    } catch (error) {
      console.error("Error updating giangVien data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  console.log("check", editData);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card className="giang-vien-profile">
            <Card.Header className="d-flex align-items-center CardHeader-profile-avt">
              <Avatar className="profile-avatar" src={editData.avatar}>
                {/* {editData.TENGV.charAt(0)} */}
              </Avatar>
              <div className="ms-3 container-profile-avt-name">
                {isEditing ? (
                  <>
                    <TextField
                      name="TENGV"
                      label="Tên giảng viên"
                      variant="outlined"
                      value={editData.TENGV}
                      onChange={handleChange}
                    />{" "}
                    <p className="profile-gv-avt-cv mt-2">
                      {editData.PHANQUYEN
                        ? editData.PHANQUYEN
                        : "Chưa cập nhật"}
                    </p>
                    <p>
                      {editData.TENBOMON ? editData.TENBOMON : "Chưa cập nhật"}
                    </p>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">
                      {editData.TENGV ? editData.TENGV : "Chưa cập nhật"}
                    </Typography>
                    <p className="profile-gv-avt-cv">
                      {editData.PHANQUYEN
                        ? editData.PHANQUYEN
                        : "Chưa cập nhật"}
                    </p>
                    <p>
                      {editData.TENBOMON ? editData.TENBOMON : "Chưa cập nhật"}
                    </p>
                  </>
                )}
              </div>
            </Card.Header>
            <Card.Body className="profile-details mt-2">
              <Row className="mb-3">
                <Col xs={12} sm={6} lg={3}>
                  {" "}
                  <strong>Email:</strong>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <Typography variant="body1">
                    {isEditing ? (
                      <TextField
                        className="pml-1"
                        name="TENDANGNHAP"
                        variant="outlined"
                        value={editData.TENDANGNHAP}
                        onChange={handleChange}
                      />
                    ) : editData.TENDANGNHAP ? (
                      <>
                        {" "}
                        <p className="pmleft-1">{editData.TENDANGNHAP}</p>
                      </>
                    ) : (
                      "Chưa cập nhật"
                    )}
                  </Typography>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  {" "}
                  <strong>Điện thoại:</strong>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <Typography variant="body1">
                    {isEditing ? (
                      <TextField
                        className="pml-1"
                        name="DIENTHOAI"
                        variant="outlined"
                        value={editData.DIENTHOAI}
                        onChange={handleChange}
                      />
                    ) : editData.DIENTHOAI ? (
                      editData.DIENTHOAI
                    ) : (
                      <p className="pmleft-1">Chưa cập nhật</p>
                    )}
                  </Typography>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={6} lg={3}>
                  {" "}
                  <span className="pmt-1">Địa chỉ:</span>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <Typography variant="body1">
                    {isEditing ? (
                      <>
                        {" "}
                        <TextField
                          className="pml-1"
                          name="DIACHI"
                          variant="outlined"
                          value={editData.DIACHI}
                          onChange={handleChange}
                        />
                      </>
                    ) : editData.DIACHI ? (
                      <>
                        {" "}
                        <strong>Địa chỉ:</strong>
                        {editData.DIACHI}
                      </>
                    ) : (
                      <>
                        {" "}
                        <p className="pmleft-1">Chưa cập nhật</p>
                      </>
                    )}
                  </Typography>
                </Col>{" "}
                <Col xs={12} sm={6} lg={3}>
                  {" "}
                  <strong>Chức Danh:</strong>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <Typography variant="body1" className="pmleft-1">
                    {isEditing ? (
                      <>
                        <Box sx={{ maxWidth: 220 }}>
                          <FormControl fullWidth>
                            <InputLabel id="select-label-trang-thai">
                              Chức danh
                            </InputLabel>
                            <Select
                              labelId="select-label-trang-thai"
                              id="trang-thai-select"
                              name="TENCHUCDANH"
                              label="Chức danh"
                              value={
                                editData.TENCHUCDANH
                                  ? editData.TENCHUCDANH
                                  : "Chưa cập nhật"
                              }
                              onChange={handleChange}
                              variant="outlined"
                              // className="pml-1"
                            >
                              <MenuItem value="Chức danh 1">
                                Chưa cập nhật
                              </MenuItem>
                              <MenuItem value="Chức danh 1">
                                Chức danh 1
                              </MenuItem>
                              <MenuItem value="Chức danh 2">
                                Chức danh 2
                              </MenuItem>
                              <MenuItem value="Chức danh 3">
                                Chức danh 3
                              </MenuItem>
                            </Select>{" "}
                          </FormControl>
                        </Box>
                      </>
                    ) : editData.TENCHUCDANH ? (
                      editData.TENCHUCDANH
                    ) : (
                      "Chưa cập nhật"
                    )}
                  </Typography>
                </Col>
              </Row>
              <Row>
                {" "}
                <Col xs={12} sm={6} lg={3}>
                  <strong>Trạng thái tài khoản:</strong>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <Typography variant="body1" className="pmleft-1">
                    {editData.TRANGTHAITAIKHOAN
                      ? editData.TRANGTHAITAIKHOAN
                      : "Chưa cập nhật"}
                  </Typography>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <strong>Chức Vụ:</strong>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <Typography variant="body1" className="pmleft-1">
                    {editData.TENCHUCVU ? editData.TENCHUCVU : "Không có"}
                  </Typography>
                </Col>
              </Row>
              <Row>
                {" "}
                <Col xs={12} sm={6} lg={3}>
                  {" "}
                  <strong>Bộ môn:</strong>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <Typography variant="body1" className="pmleft-1">
                    {editData.TENBOMON ? editData.TENBOMON : "Chưa cập nhật"}
                  </Typography>
                </Col>
              </Row>
              <div className="mt-3">
                {isEditing ? (
                  <>
                    {" "}
                    <Button variant="primary" onClick={handleSaveClick}>
                      Lưu
                    </Button>
                    <Button
                      className="ml-4"
                      variant="secondary"
                      onClick={handleCancelClick}
                    >
                      Hủy
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" onClick={handleEditClick}>
                    Chỉnh Sửa
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GiangVienProfile;
