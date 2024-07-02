import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const CreateKhoa = () => {
  const [tenKhoa, setTenKhoa] = useState("");
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const response = await CookiesAxios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/tao`,
      { tenkhoa: tenKhoa }
    );
    console.log(response.data);

    // Reset form fields
    // setTenKhoa("");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h2>Tạo Thêm Giảng Viên Mới Vào Hệ Thống</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Label>
              {" "}
              "Đây là chức năng tạo ra một khoa mới dành cho hệ thống, và phải
              cân nhắc khi thêm vào hệ thống, chức năng này cần phải có sự cho
              phép chỉ đạo của các chứ chức vụ cấp cao".
            </Form.Label>
            <Form.Group controlId="formDepartmentName" className="mb-3">
              <Form.Label>Tên Khoa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hãy Nhập Tên Của Khoa Mới "
                value={tenKhoa}
                onChange={(e) => setTenKhoa(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Tạo Khoa
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDepartmentName" className="mb-3">
              <Form.Label>Tên Bộ Môn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hãy Nhập Tên Của Bộ Môn Mới "
                value={tenKhoa}
                onChange={(e) => setTenKhoa(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Tạo Khoa
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateKhoa;
