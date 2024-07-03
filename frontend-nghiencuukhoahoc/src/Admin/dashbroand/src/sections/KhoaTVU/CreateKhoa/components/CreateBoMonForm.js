// components/CreateBoMonForm.js
import React from "react";
import { Form, Button } from "react-bootstrap";

const CreateBoMonForm = ({
  TenBoMon,
  setTenBoMon,
  disabledBM,
  handleSumitAddBoMon,
  isOpenEditButtonBM,
  handleSumitEditBM,
  handleIsOpenEditButtonBM,
}) => {
  return (
    <Form onSubmit={handleSumitAddBoMon}>
      <Form.Group controlId="formDepartmentName" className="mb-3">
        <h4>Tạo Bộ Môn</h4>
        <Form.Label>
          "Bạn cần phải chọn khoa ở bảng Table rồi mới thêm được vào bộ môn".
        </Form.Label>
        <Form.Control
          disabled={disabledBM}
          type="text"
          placeholder="Hãy Nhập Tên Của Bộ Môn Mới "
          value={TenBoMon}
          onChange={(e) => setTenBoMon(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Tạo Bộ Môn
      </Button>
      {isOpenEditButtonBM && (
        <>
          <Button
            variant="primary"
            className="ml-4"
            onClick={handleSumitEditBM}
          >
            Sửa Tên
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleIsOpenEditButtonBM}
          >
            Tắt
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateBoMonForm;
