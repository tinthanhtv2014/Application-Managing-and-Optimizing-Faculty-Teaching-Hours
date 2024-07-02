import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./CreateKhoa.scss";

const CreateKhoa = () => {
  const [tenKhoa, setTenKhoa] = useState("");
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });

  const navigate = useNavigate();
  const [dataListKhoa, setdataListKhoa] = useState();
  const [dataListBoMon, setdataListBoMon] = useState(null);
  const [MaKhoaShow, setMaKhoaShow] = useState();
  const auth = Cookies.get("accessToken");
  const fetchData = async () => {
    const response = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/xem`
    );
    console.log(response.data.DT);
    setdataListKhoa(response.data.DT);
  };
  useEffect(() => {
    const checkAuth = jwtDecode(auth);
    if (checkAuth.phanquyen === "Admin") {
      fetchData();
    } else {
      navigate("/");
    }
  }, [auth, MaKhoaShow]);
  useEffect(() => {
    const checkAuth = jwtDecode(auth);
    if (checkAuth.phanquyen === "Admin") {
      fetchData();
    } else {
      navigate("/");
    }
  }, [auth]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const response = await CookiesAxios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/tao`,
      { tenkhoa: tenKhoa }
    );
    fetchData();
    console.log(response.data);

    // Reset form fields
    // setTenKhoa("");
  };
  const handleDelete = async (maKhoa) => {
    // Handle form submission logic here
    const response = await CookiesAxios.delete(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/xoa`,
      {
        params: { makhoa: maKhoa },
      }
    );
    fetchData();
    console.log(response.data);
  };
  const handleChose = async (MaKhoa) => {
    if (MaKhoa) {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/only/xem`,
        {
          MAKHOA: MaKhoa,
        }
      );
      //   console.log("CHECk BM=>", response.data.DT);
      setdataListBoMon(response.data.DT);
    }
  };
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h2>Tạo Khoa Mới Cho TVU</h2>
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
        </Col>{" "}
        <Col md={6}>
          <h4 className="mt-4">Danh Sách Các Khoa</h4>
          {dataListKhoa && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã Khoa</th>
                  <th>Tên Khoa</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataListKhoa.map((khoa, index) => (
                  <tr
                    key={index}
                    className="table-row"
                    onClick={() => handleChose(khoa.MAKHOA)}
                  >
                    <td>{khoa.MAKHOA} </td>
                    <td>{khoa.TENKHOA}</td>
                    <td>
                      {" "}
                      <i
                        class="fa-solid fa-trash table-row-icon"
                        onClick={() => handleDelete(khoa.MAKHOA)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
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
              Tạo Bộ Môn
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h4 className="mt-4">Danh Sách Bộ Môn</h4>
          {dataListKhoa && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã Khoa</th>
                  <th>Tên Khoa</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataListBoMon.map((khoa, index) => (
                  <tr key={index} className="table-row">
                    <td>{khoa.MABOMON} </td>
                    <td>{khoa.TENBOMON}</td>
                    <td>
                      {" "}
                      <i
                        class="fa-solid fa-trash table-row-icon"
                        onClick={() => handleDelete(khoa.MAKHOA)}
                      ></i>
                    </td>
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
