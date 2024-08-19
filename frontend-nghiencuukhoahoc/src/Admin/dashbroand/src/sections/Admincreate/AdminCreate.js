import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Khoa from "../../../../../public/img-admin/Khoa.png";
import BoMon from "../../../../../public/img-admin/BoMon.png";
import CTDT from "../../../../../public/img-admin/CTDT.png";
import ChucVu from "../../../../../public/img-admin/ChucVu.png";
import GiangVien from "../../../../../public/img-admin/GiangVien.png";
import "./AdminCreate.scss";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const AdminCreate = () => {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  const [TenDangNhap, setTenDangNhap] = useState(null);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const name = decodedToken.phanquyen; // Hoặc thuộc tính nào đó trong token
      setTenDangNhap(name);

      console.log("check", name);
    }
  }, [token]);
  const handleToCreateKhoa = () => {
    navigate("/admin/create-khoa");
  };
  const handleToCreateBM = () => {
    navigate("/admin/create-bm");
  };
  const handleToCreateGV = () => {
    navigate("/admin/giangvien");
  };

  const handleToCreateChucVuGV = () => {
    navigate("/admin/create-chucvu-gv");
  };
  const handleToCreateCTDT = () => {
    navigate("/admin/chuong-trinh-dao-tao");
  };
  return (
    <>
      <Container className="mt-4">
        {" "}
        <Row>
          {" "}
          <h3 className="welcome-adminCreate">
            Chúc {TenDangNhap} ngày mới tốt lành!
          </h3>{" "}
          <Col md={4} className="mb-4">
            <Card className="adminCreate-card" onClick={handleToCreateKhoa}>
              <div className="adminCreate-center">
                {" "}
                <Card.Img
                  variant="top"
                  src={Khoa}
                  className="adminCreate-img"
                />
              </div>

              <Card.Body>
                <Card.Title>Khoa Đại Học Trà Vinh</Card.Title>
                <Card.Text>
                  Bạn có thể tạo thêm một khoa mới vào hệ thống.
                </Card.Text>
                {/* <Button className="adminCreate-button">Tạo Khoa</Button> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="adminCreate-card" onClick={handleToCreateBM}>
              <div className="adminCreate-center adminCreate-center-BM">
                {" "}
                <Card.Img
                  variant="top"
                  src={BoMon}
                  className="adminCreate-img"
                />
              </div>

              <Card.Body>
                <Card.Title>Các Bộ Môn Đại Học Trà Vinh</Card.Title>
                <Card.Text>
                  Bạn có thể tạo thêm một bộ môn mới vào hệ thống.
                </Card.Text>
                {/* <Button className="adminCreate-button">Tạo Bộ Môn</Button> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="adminCreate-card" onClick={handleToCreateGV}>
              <div className="adminCreate-center adminCreate-center-GV">
                {" "}
                <Card.Img
                  variant="top"
                  src={GiangVien}
                  className="adminCreate-img"
                />
              </div>

              <Card.Body>
                <Card.Title>Giảng Viên Đại Học Trà Vinh</Card.Title>
                <Card.Text>
                  Bạn có thể tạo thêm giảng viên mới vào hệ thống.
                </Card.Text>
                {/* <Button className="adminCreate-button">Thêm Giảng Viên</Button> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="adminCreate-card" onClick={handleToCreateChucVuGV}>
              <div className="adminCreate-center adminCreate-center-CV">
                {" "}
                <Card.Img
                  variant="top"
                  src={ChucVu}
                  className="adminCreate-img"
                />
              </div>

              <Card.Body>
                <Card.Title>Thêm Chức Vụ Giảng Viên</Card.Title>
                <Card.Text>
                  Bạn có thể tạo thêm một chức vụ giảng viên mới vào hệ thống.
                </Card.Text>
                {/* <Button className="adminCreate-button">Tạo Chức Vụ</Button> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="adminCreate-card " onClick={handleToCreateCTDT}>
              <div className="adminCreate-center adminCreate-center-CTDT">
                {" "}
                <Card.Img
                  variant="top"
                  src={CTDT}
                  className="adminCreate-img"
                />
              </div>

              <Card.Body>
                <Card.Title>Chương Trình Đào Tạo Cho Bộ Môn</Card.Title>
                <Card.Text>
                  Bạn có thể thêm chương trình đào tạo mới của bộ vào hệ thống.
                </Card.Text>
                {/* <Button className="adminCreate-button">
                  Thêm Chương Trình Đào Tạo
                </Button> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminCreate;
