// components/CreateBoMonForm.js
import React from "react";
import { Form, Button } from "react-bootstrap";
import "../CreateKhoa.scss";
const CreateGiangVienForm = ({
  TenGV,
  setTenGV,
  disabledGV,
  handleSumitAddGV,
  isOpenEditButtonGV,
  handleSumitEditGV,
  handleIsOpenEditButtonGV,
  setMaGV,
}) => {
  return (
    <Form onSubmit={handleSumitAddGV} className="mt-4">
      <Form.Group controlId="formDepartmentName" className="mb-3">
        <h4>Thêm Giảng Viên</h4>
        <Form.Label className="opacity-7">
          Bạn cần phải chọn khoa ở bảng Table rồi mới thêm được vào bộ môn.
        </Form.Label>
        <Form.Control
          disabled={disabledGV}
          type="text"
          placeholder="Mã Giảng Viên "
          value={TenGV}
          onChange={(e) => setMaGV(e.target.value)}
          required
        />
        <Form.Control
          disabled={disabledGV}
          type="text"
          placeholder="Nhập email giảng viên "
          value={TenGV}
          onChange={(e) => setTenGV(e.target.value)}
          required
          className="mt-2 mb-2"
        />
        <Form.Control
          disabled={disabledGV}
          type="text"
          placeholder="Cấp Quyền Giảng Viên "
          value={TenGV}
          onChange={(e) => setTenGV(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Thêm Giảng Viên
      </Button>
      {isOpenEditButtonGV && (
        <>
          <Button
            variant="primary"
            className="ml-4"
            onClick={handleSumitEditGV}
          >
            Sửa Tên
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleIsOpenEditButtonGV}
          >
            Tắt
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateGiangVienForm;
