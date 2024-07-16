import React, { useState } from "react";
import { Card, Row, Col, Container, Button, Toast } from "react-bootstrap";
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
import { toast } from "react-toastify";

const GiangVienProfile = ({ giangVien, CallbackAPiProfileGV }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(giangVien);
  const [dataChucDanh, setdataChucDanh] = useState(null);
  const [TimeChucDanh, setTimeChucDanh] = useState(editData.THOIGIANNHAN);
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });

  const handleEditClick = async () => {
    setIsEditing(true);
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xemchucdanh`
      );
      setdataChucDanh(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    }
  };
  const handleCancelClick = async () => {
    setEditData(giangVien);

    setIsEditing(false);
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${giangVien.TENDANGNHAP}`
      );
      setEditData(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    }
  };
  const isValidPhoneNumber = (phoneNumber) => {
    const vietnamPhoneNumberRegex =
      /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    return vietnamPhoneNumberRegex.test(phoneNumber);
  };

  const handleSaveClick = async () => {
    console.log("check ten dang nhap", editData.TENDANGNHAP);

    if (isValidPhoneNumber(editData.DIENTHOAI)) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/sua/thongtin/${editData.TENDANGNHAP}`,
          editData
        );
        console.log("Check", response.data.DT[0]);
        if (response.data.EC === 1) {
          setIsEditing(false);
          toast.success("Chỉnh sửa thông tin thành công");
          CallbackAPiProfileGV();
          // setEditData(response.data.DT[0]);
        } else {
          // handle error
          toast.error("Chỉnh sửa thông tin thất bại");
        }
      } catch (error) {
        console.error("Error updating giangVien data:", error);
      }
    } else {
      toast.error("Số điện thoại không hợp lệ");
    }
  };
  // const getFormattedDate = (dateTimeString) => {
  //   return dateTimeString.split("T")[0];
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Invalid date"; // Hoặc một giá trị mặc định nào đó
    }

    const chuyenTime = dateString.split("T")[0];
    const dateParts = chuyenTime.split("-");
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      return `${day}-${month}-${year}`;
    }
    return dateString; // Trả về nguyên dạng nếu không phải định dạng mong muốn
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card className="giang-vien-profile mt-4">
            <Card.Header className="d-flex align-items-center CardHeader-profile-avt">
              <Avatar className="profile-avatar" src={editData.avatar}>
                {/* {editData.TENGV.charAt(0)} */}
              </Avatar>
              <div className="ms-3 container-profile-avt-name">
                {isEditing ? (
                  <>
                    <TextField
                      className="input-editdataGV"
                      name="TENGV"
                      label="Tên giảng viên"
                      variant="outlined"
                      value={editData.TENGV}
                      onChange={handleChange}
                    />{" "}
                    <p className="profile-gv-avt-cv mt-2 ">
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
            <div className="container-profile-details">
              {" "}
              <Card.Body className="profile-details mt-2">
                {!isEditing ? (
                  <>
                    <div
                      className="container-button-edit"
                      onClick={handleEditClick}
                    >
                      {/* <Button variant="secondary">Chỉnh Sửa</Button> */}
                      <i class="fa-solid fa-pen-to-square"></i>{" "}
                      <span>Edit</span>
                    </div>{" "}
                  </>
                ) : (
                  <></>
                )}

                <Row className="mb-3">
                  <Col xs={12} sm={6} lg={3}>
                    {" "}
                    <span className="profile-name-email">Email:</span>
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <Typography variant="body1">
                      {isEditing ? (
                        <TextField
                          className="pml-1 profile-email-input input-editdataGV"
                          name="TENDANGNHAP"
                          variant="outlined"
                          disabled={true}
                          value={editData.TENDANGNHAP}
                          // onChange={handleChange}
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
                    <span>Điện thoại:</span>
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <Typography variant="body1">
                      {isEditing ? (
                        <TextField
                          className="pml-1  profile-email-input input-editdataGV"
                          name="DIENTHOAI"
                          variant="outlined"
                          value={editData.DIENTHOAI}
                          onChange={handleChange}
                        />
                      ) : editData.DIENTHOAI ? (
                        <>
                          {" "}
                          <p className="pmleft-1">{editData.DIENTHOAI}</p>
                        </>
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
                            className="pml-1  profile-email-input input-editdataGV"
                            name="DIACHI"
                            variant="outlined"
                            value={editData.DIACHI}
                            onChange={handleChange}
                          />
                        </>
                      ) : editData.DIACHI ? (
                        <>
                          {" "}
                          <p className="pmleft-1">{editData.DIACHI}</p>
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
                    <span>Chức Danh:</span>
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <Typography variant="body1" className="pmleft-1">
                      {isEditing ? (
                        <>
                          <Box sx={{ maxWidth: 220 }}>
                            <FormControl
                              fullWidth
                              className=" profile-email-input"
                            >
                              <InputLabel id="select-label-trang-thai ">
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
                                {dataChucDanh && dataChucDanh.length > 0 ? (
                                  dataChucDanh.map((chucdanh, index) => (
                                    <MenuItem
                                      key={index}
                                      value={chucdanh.TENCHUCDANH}
                                    >
                                      {chucdanh.TENCHUCDANH}
                                    </MenuItem>
                                  ))
                                ) : (
                                  <MenuItem value="" disabled>
                                    Không có bộ môn nào
                                  </MenuItem>
                                )}
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
                    <span>Trạng thái tài khoản:</span>
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <Typography
                      variant="body1"
                      className={`pmleft-1 ${
                        editData.TRANGTHAITAIKHOAN === "Đang hoạt động"
                          ? "text-success"
                          : " text-danger"
                      }`}
                    >
                      {editData.TRANGTHAITAIKHOAN
                        ? editData.TRANGTHAITAIKHOAN
                        : "Chưa cập nhật"}
                    </Typography>
                  </Col>
                  {isEditing ? (
                    <>
                      {" "}
                      <Col xs={12} sm={6} lg={3}>
                        <span>Thời gian nhận chức danh:</span>
                      </Col>
                      <Col xs={12} sm={6} lg={3}>
                        <input
                          name="THOIGIANNHAN"
                          type="date"
                          className="pmleft-1 input-timechucdanh"
                          value={editData.THOIGIANNHAN}
                          onChange={handleChange}
                        />
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col xs={12} sm={6} lg={3}>
                        <span>Thời gian nhận chức danh:</span>
                      </Col>
                      <Col xs={12} sm={6} lg={3}>
                        <p className="pmleft-1">
                          {formatDate(editData.THOIGIANNHAN)}
                        </p>
                      </Col>
                    </>
                  )}
                </Row>
                <Row>
                  {" "}
                  <Col xs={12} sm={6} lg={3}>
                    {" "}
                    <span>Bộ môn:</span>
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <Typography variant="body1" className="pmleft-1">
                      {editData.TENBOMON ? editData.TENBOMON : "Chưa cập nhật"}
                    </Typography>
                  </Col>{" "}
                  <Col xs={12} sm={6} lg={3}>
                    <span>Chức Vụ:</span>
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <Typography variant="body1" className="pmleft-1">
                      {editData.TENCHUCVU ? editData.TENCHUCVU : "Không có"}
                    </Typography>
                  </Col>
                </Row>
                <div className="mt-3">
                  {isEditing ? (
                    <>
                      {" "}
                      <Button
                        variant="primary"
                        className="container-profile-button-Luu"
                        onClick={handleSaveClick}
                      >
                        Lưu
                      </Button>
                      <Button
                        className="ml-4 container-profile-button-Huy"
                        variant="secondary"
                        onClick={handleCancelClick}
                      >
                        Hủy
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </Card.Body>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GiangVienProfile;
