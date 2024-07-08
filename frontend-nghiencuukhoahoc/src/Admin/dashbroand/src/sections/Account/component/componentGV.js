import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Avatar, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "../component/componentGV.scss";

const GiangVienProfile = ({ giangVien }) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card className="giang-vien-profile">
            <Card.Header className="d-flex align-items-center CardHeader-profile-avt">
              <Avatar className="profile-avatar" src={giangVien.avatar}>
                {giangVien.ten.charAt(0)}
              </Avatar>
              <div className="ms-3 container-profile-avt-name">
                {" "}
                <Typography variant="h6">{giangVien.ten}</Typography>{" "}
                <p className="profile-gv-avt-cv">Admin</p>{" "}
                <p className="">bộ Môn Công Nghệ Thông Tin</p>
              </div>
            </Card.Header>
            <Card.Body className="profile-details">
              <Row className="mb-3">
                <Col xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Email:</strong> {giangVien.email}
                  </Typography>
                </Col>
                <Col xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Điện thoại:</strong> {giangVien.dienThoai}
                  </Typography>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Địa chỉ:</strong> {giangVien.diaChi}
                  </Typography>
                </Col>
                <Col xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Bộ môn:</strong> {giangVien.boMon}
                  </Typography>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Typography variant="body1">
                    <strong>Trạng thái tài khoản:</strong>{" "}
                    {giangVien.trangThaiTaiKhoan}
                  </Typography>
                </Col>
              </Row>
            </Card.Body>
          </Card>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default GiangVienProfile;
