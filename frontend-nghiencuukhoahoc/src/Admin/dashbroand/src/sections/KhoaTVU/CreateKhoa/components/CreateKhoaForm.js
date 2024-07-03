// components/CreateKhoaForm.js
import React from "react";
import { Form, Button } from "react-bootstrap";

const CreateKhoaForm = ({
  tenKhoa,
  setTenKhoa,
  handleSubmit,
  isOpenEditButton,
  handleSumitEditKhoa,
  handleIsOpenEditButton,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Tạo Khoa Mới Cho Hệ Thống</h2>
      <Form.Label>
        "Đây là chức năng tạo ra một khoa mới dành cho hệ thống, và phải cân
        nhắc khi thêm vào hệ thống, chức năng này cần phải có sự cho phép chỉ
        đạo của các chứ chức vụ cấp cao".
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
      <Button variant="success" type="submit">
        Tạo Khoa
      </Button>
      {isOpenEditButton && (
        <>
          <Button
            variant="primary"
            className="ml-4"
            onClick={handleSumitEditKhoa}
          >
            Sửa Tên
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleIsOpenEditButton}
          >
            Tắt
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateKhoaForm;
