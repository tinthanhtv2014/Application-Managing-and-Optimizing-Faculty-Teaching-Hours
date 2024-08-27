// components/CreateBoMonForm.js
import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import "../CreateKhoa.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const CreateGiangVienForm = ({
  TenGV,
  setQuyenGiangVien,
  setTenDangNhapGV,
  disabledGV,
  handleSumitAddGV,
  isOpenEditButtonGV,
  handleSumitEditGV,
  handleIsOpenEditButtonGV,
  setMaGV,
  setTrangThaiGV,
  TrangThaiGV,
  QuyenGiangVien,
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
          onChange={(e) => setTenDangNhapGV(e.target.value)}
          required
          className="mt-2 mb-2"
        />
        <Box sx={{ maxWidth: 300 }}>
          <FormControl fullWidth className="mt-2">
            <InputLabel id="demo-simple-select-label">Phân Quyền</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={QuyenGiangVien}
              label={QuyenGiangVien}
              disabled={disabledGV}
              onChange={(e) => setQuyenGiangVien(e.target.value)}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Giảng Viên">Giảng Viên</MenuItem>
              <MenuItem value="Trưởng Bộ Môn">Trưởng Bộ Môn</MenuItem>
              <MenuItem value="Trưởng Khoa">Trưởng Khoa</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Col md={6} className="mt-2">
          {" "}
          <Box sx={{ maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={TrangThaiGV}
                label={TrangThaiGV}
                disabled={disabledGV}
                onChange={(e) => setTrangThaiGV(e.target.value)}
              >
                <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                <MenuItem value="Ngưng hoạt động">Ngưng hoạt động</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Col>
      </Form.Group>
      <Button variant="success" type="submit" title="Thêm tài khoản giảng viên">
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
