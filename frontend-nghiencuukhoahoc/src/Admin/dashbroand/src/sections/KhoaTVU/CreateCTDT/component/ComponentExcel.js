import React, { useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Modal, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ComponentExcel.scss";
const ComponentExcelCTDT = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const auth = Cookies.get("accessToken");
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const navigate = useNavigate();

  const handleAddUser = async () => {
    if (data.length > 0) {
      try {
        const response = await CookiesAxios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/taikhoan/tao/excel`,
          data,
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        );
        if (response.data.EC === 1) {
          toast.success(response.data.EM);
        } else {
          toast.error(response.data.EM);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Chưa có dữ liệu excel");
      return;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="mt-2">
      <input type="file" onChange={handleFileUpload} id="formFile" />
      <label htmlFor="formFile" className="btn btn-primary">
        Upload File
      </label>

      <button
        type="button"
        onClick={handleAddUser}
        className="btn btn-success ml-4"
      >
        Thêm Tài Khoản
      </button>
      {data && data.length > 0 && (
        <button
          type="button"
          onClick={handleShowModal}
          className="btn btn-primary ml-2"
        >
          Xem Dữ Liệu
        </button>
      )}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        className="modal-Component-excel custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Dữ Liệu Excel Của Bạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ComponentExcelCTDT;
