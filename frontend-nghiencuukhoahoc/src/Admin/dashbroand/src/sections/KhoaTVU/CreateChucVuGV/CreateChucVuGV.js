import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";

const CreateChucvuChucdanh = () => {
  const [tenChucvu, setTenchucvu] = useState("");
  const [machucvu, setMachucvu] = useState("");
  const [machucdanh, setMachucdanh] = useState("");
  const [tenChucdanh, setTenchucdanh] = useState("");
  const [datachucvu, setDataChucvu] = useState([]);
  const [datachucdanh, setDataChucdanh] = useState([]);
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });

  //hàm thêm chức vụ chức danh ==================================
  const handleSubmitchucvu = async (e) => {
    e.preventDefault();
    console.log("check chức vụ", tenChucvu);
    // Handle form submission logic here
    const response = await CookiesAxios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/taochucvu`,
      { TENCHUCVU: tenChucvu }
    );
    console.log("check rrespone: ", response);
    setDataChucvu((prevData) => [...prevData, response.data]);
  };

  const handleSubmitchucdanh = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const response = await CookiesAxios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/taochucdanh`,
      { TENCHUCDANH: tenChucdanh }
    );
    console.log(response.data);
  };
  //hàm fetch data chức vụ chức danh =====================
  const fetchDataChucvu = async () => {
    const response = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xemchucvu`
    );

    if (response && response.data && response.data.DT) {
      setDataChucvu(response.data.DT);
    }
  };

  const fetchDataChucdanh = async () => {
    const response = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xemchucdanh`
    );

    if (response && response.data && response.data.DT) {
      setDataChucdanh(response.data.DT);
    }
  };

  //hàm xóa chức vụ chức danh  ============================
  const handleDeleteChucvu = async (machucvu) => {
    const response = await CookiesAxios.delete(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xoachucvu`,
      {
        params: {
          MACHUCVU: machucvu,
        },
      }
    );
  };
  const handleDeleteChucdanh = async (machucdanh) => {
    const response = await CookiesAxios.delete(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xoachucdanh`,
      {
        params: {
          MACHUCDANH: machucdanh,
        },
      }
    );
  };

  //hàm update chức vụ chức danh
  const handleUpdateChucvu = async (chucvu) => {
    setTenchucvu(chucvu.TENCHUCVU);
    setMachucvu(chucvu.MACHUCVU);
  };

  const handleUPDATEChucvu = async () => {
    console.log("cehck tên chức vụ", tenChucvu);
    console.log("cehck mã chức vụ", machucvu);
    const response = await CookiesAxios.put(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/suachucvu/${machucvu}`,
      { TENCHUCVU: tenChucvu }
    );
  };

  const handleUPDATEChucdanh = async () => {
    const response = await CookiesAxios.put(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/suachucdanh/${machucdanh}`,
      { TENCHUCDANH: tenChucdanh }
    );
  };
  const handleUpdateChucdanh = async (chucdanh) => {
    setTenchucdanh(chucdanh.TENCHUCDANH);
    setMachucdanh(chucdanh.MACHUCDANH);
  };

  const handleOFFmodel = async () => {
    setTenchucvu(null);
    setTenchucdanh(null);
  };

  //hàm userEffect
  useEffect(() => {
    fetchDataChucvu();
  }, [datachucvu]);
  useEffect(() => {
    fetchDataChucdanh();
  }, [datachucdanh]);
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h2>Tạo Chức Vụ Cho Giảng Viên</h2>
          <Form onSubmit={handleSubmitchucvu}>
            <Form.Label>
              {" "}
              "Đây là chức năng thêm chức vụ mới dành cho hệ thống, và phải cân
              nhắc khi thêm vào hệ thống, chức năng này cần phải có sự cho phép
              chỉ đạo của các chức vụ cấp cao".
            </Form.Label>
            <Form.Group controlId="formDepartmentName" className="mb-3">
              <Form.Label>Tên Chức vụ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hãy Nhập Tên Của Chức vụ Mới "
                value={tenChucvu}
                onChange={(e) => setTenchucvu(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Tạo Chức Vụ
            </Button>
            {tenChucvu && tenChucvu.length > 0 && (
              <>
                <Button onClick={() => handleUPDATEChucvu()}>sửa</Button>

                <Button onClick={() => handleOFFmodel()}>tắt</Button>
              </>
            )}
          </Form>
        </Col>
        <Col md={6}>
          <h2>Thông tin Chức vụ hiện tại</h2>
          {datachucvu && datachucvu.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã Chức Vụ</th>
                  <th>Tên Chức Vụ</th>
                </tr>
              </thead>
              <tbody>
                {datachucvu.map((chucvu, index) => (
                  <tr key={index}>
                    <td>{chucvu.MACHUCVU}</td>
                    <td>{chucvu.TENCHUCVU}</td>
                    <td>
                      <i
                        className="table-row-icon fa-solid fa-trash"
                        onClick={() => handleDeleteChucvu(chucvu.MACHUCVU)}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="table-row-icon-edit fa-solid fa-pen-to-square"
                        onClick={() => handleUpdateChucvu(chucvu)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h2>Tạo chức Danh Cho Giảng Viên</h2>
          <Form onSubmit={handleSubmitchucdanh}>
            <Form.Label>
              {" "}
              "Đây là chức năng thêm chức danh mới dành cho hệ thống, và phải
              cân nhắc khi thêm vào hệ thống, chức năng này cần phải có sự cho
              phép chỉ đạo của các chức vụ cấp cao".
            </Form.Label>
            <Form.Group controlId="formDepartmentName" className="mb-3">
              <Form.Label>Tên Chức Danh</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hãy Nhập Tên Của Chức Danh Mới "
                value={tenChucdanh}
                onChange={(e) => setTenchucdanh(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Tạo Chức Danh
            </Button>
            {tenChucdanh && tenChucdanh.length > 0 && (
              <>
                <Button onClick={() => handleUPDATEChucdanh()}>sửa</Button>

                <Button onClick={() => handleOFFmodel()}>tắt</Button>
              </>
            )}
          </Form>
        </Col>
        <Col md={6}>
          <h2>Thông tin Chức vụ hiện tại</h2>
          {datachucdanh && datachucdanh.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã Chức Vụ</th>
                  <th>Tên Chức Vụ</th>
                </tr>
              </thead>
              <tbody>
                {datachucdanh.map((chucdanh, index) => (
                  <tr key={index}>
                    <td>{chucdanh.MACHUCDANH}</td>
                    <td>{chucdanh.TENCHUCDANH}</td>
                    <td>
                      <i
                        className="table-row-icon fa-solid fa-trash"
                        onClick={() =>
                          handleDeleteChucdanh(chucdanh.MACHUCDANH)
                        }
                      ></i>
                    </td>
                    <td>
                      <i
                        className="table-row-icon-edit fa-solid fa-pen-to-square"
                        onClick={() => handleUpdateChucdanh(chucdanh)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateChucvuChucdanh;
