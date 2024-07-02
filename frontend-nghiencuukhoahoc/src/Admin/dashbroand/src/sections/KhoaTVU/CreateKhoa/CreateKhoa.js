import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./CreateKhoa.scss";

const CreateKhoa = () => {
  const [tenKhoa, setTenKhoa] = useState("");
  const [TenBoMon, setTenBoMon] = useState("");
  const [MaKhoa, setMaKhoa] = useState();
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });

  const navigate = useNavigate();
  const [activeRow, setActiveRow] = useState(null); //biến đổi màu table KHOA
  const [dataListKhoa, setdataListKhoa] = useState();
  const [dataListBoMon, setdataListBoMon] = useState(null);

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
  }, [auth]);
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
    setActiveRow(maKhoa);
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
    setMaKhoa(MaKhoa);
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

  const handleSumitAddBoMon = async (e) => {
    e.preventDefault();

    if (TenBoMon && MaKhoa) {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/tao`,
        { TENBOMON: TenBoMon, MAKHOA: MaKhoa }
      );
      console.log(response.data);
      if (response.data.EC === 1) {
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
      }
      fetchData();
    }
  };
  const handleDeleteBoMon = async (MABOMON) => {
    // Handle form submission logic here
    const response = await CookiesAxios.delete(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/xoa`,
      {
        params: { mabomon: MABOMON },
      }
    );
    if (response.data.EC === 1) {
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
    }
    fetchData();
    console.log(response.data);
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
                    className={`table-row ${
                      activeRow === khoa.MAKHOA ? "active" : ""
                    }`}
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
          <Form onSubmit={handleSumitAddBoMon}>
            <Form.Group controlId="formDepartmentName" className="mb-3">
              <Form.Label>Tên Bộ Môn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hãy Nhập Tên Của Bộ Môn Mới "
                value={TenBoMon}
                onChange={(e) => setTenBoMon(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Tạo Bộ Môn
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h4>Danh Sách Bộ Môn</h4>
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
                {dataListBoMon && dataListBoMon.length > 0 ? (
                  dataListBoMon.map((khoa, index) => (
                    <tr key={index} className="table-row">
                      <td>{khoa.MABOMON}</td>
                      <td>{khoa.TENBOMON}</td>
                      <td>
                        <i
                          className="fa-solid fa-trash table-row-icon"
                          onClick={() => handleDeleteBoMon(khoa.MABOMON)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Không có bộ môn nào</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateKhoa;
