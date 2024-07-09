import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const CreateKhoa = () => {
  const [tenKhoa, setTenKhoa] = useState("");
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const navigate = useNavigate();
  const [dataListKhoa, setdataListKhoa] = useState();
  const auth = Cookies.get("accessToken");
  useEffect(() => {
    const checkAuth = jwtDecode(auth);
    if (checkAuth.phanquyen === "Admin") {
      const fetchData = async () => {
        const response = await CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/xem`
        );
        console.log(response.data.DT);
        setdataListKhoa(response.data.DT);
      };
      fetchData();
    } else {
      navigate("/");
    }
  }, [auth]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (tenKhoa) {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/tao`,
        { tenkhoa: tenKhoa }
      );
      // console.log(response.data);
    }

    // Reset form fields
    // setTenKhoa("");
  };

  return (
    <Container className="mt-4">
      <Row>
        <h2>Tạo Bộ Môn Cho Khoa</h2>
      </Row>

      <Row>
        <Col md={6} className="mt-4">
          <h4>Tạo Bộ Môn Mới Cho Khoa</h4>
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
        <Col md={6}>
          <h4 className="mt-4">Danh Sách Các Khoa</h4>
          {dataListKhoa && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã Khoa</th>
                  <th>Tên Khoa</th>
                </tr>
              </thead>
              <tbody>
                {dataListKhoa.map((khoa, index) => (
                  <tr key={index}>
                    <td>{khoa.MAKHOA}</td>
                    <td>{khoa.TENKHOA}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateKhoa;
