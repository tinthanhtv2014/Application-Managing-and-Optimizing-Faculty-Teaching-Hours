// components/CreateBoMonForm.js
import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import "../../CreateKhoa/CreateKhoa.scss";
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
    <Form onSubmit={handleSumitAddGV} className="mt-2">
      <Form.Group controlId="formDepartmentName" className="mb-2">
        <Form.Control
          className="width-input-50"
          disabled={disabledGV}
          type="text"
          placeholder="Mã Giảng Viên "
          title="Mã giảng viên là duy nhất cho mỗi giảng viên"
          value={TenGV}
          onChange={(e) => setMaGV(e.target.value)}
          required
        />
        <Form.Control
          disabled={disabledGV}
          type="text"
          placeholder="Nhập email giảng viên"
          title="Email này duy nhất và giảng viên có thể dùng để đăng nhập"
          value={TenGV}
          onChange={(e) => setTenDangNhapGV(e.target.value)}
          required
          className="mt-2 mb-2 width-input-50"
        />
        <Box sx={{ maxWidth: 200 }}>
          <FormControl fullWidth className="mt-2">
            <InputLabel id="demo-simple-select-label ">Phân Quyền</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              title="Bạn có thể cấp quyền tài khoản này"
              value={QuyenGiangVien}
              label="Phân Quyền"
              className="height-selectGV"
              disabled={disabledGV}
              onChange={(e) => setQuyenGiangVien(e.target.value)}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Giảng Viên">Giảng Viên</MenuItem>
              <MenuItem value="Trưởng Bộ Môn">Trưởng Bộ Môn</MenuItem>
              <MenuItem value="Trưởng Khoa">Trưởng Khoa</MenuItem>
              <MenuItem value="Giảng Viên Ngoài Trường">
                Giảng Viên Ngoài Trường
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Col md={6} className="mt-2">
          {" "}
          <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                title="Bạn có thể chọn trạng thái hoạt động của tài khoản này trước khi tạo"
                id="demo-simple-select"
                value={TrangThaiGV}
                label="Trạng Thái"
                className="height-selectGV"
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
      <Button
        variant="success"
        type="submit"
        title="Thêm giảng viên cho bộ môn"
      >
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
