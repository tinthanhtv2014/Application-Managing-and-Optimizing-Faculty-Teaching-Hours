// UpdateGiangVienModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";
const UpdateGiangVienModal = ({
  show,
  handleClose,
  lecturerData,
  updateLecturer,
  dataListChucVuGiangVien,
  dataListChucDanhGiangVien,
}) => {
  const [tenGV, setTenGV] = useState();
  const [tenDangNhapGV, setTenDangNhapGV] = useState();
  const [SodienthoaiGV, setSodienthoaiGV] = useState();

  const [diaChiGiangVien, setdiaChiGiangVien] = useState();
  const [chucVuGiangVien, setchucVuGiangVien] = useState();
  const [ChucDanhGiangVien, setChucDanhGiangVien] = useState();
  const [PhanQuyenGiangVien, setPhanQuyenGiangVien] = useState();
  const [TenBoMon, setTenBoMon] = useState();
  const [TrangThaiDangNhap, setTrangThaiDangNhap] = useState();
  useEffect(() => {
    if (lecturerData) {
      setTenGV(lecturerData.TENGV);

      setTenDangNhapGV(lecturerData.TENDANGNHAP);
      setdiaChiGiangVien(lecturerData.DIACHI);
      setSodienthoaiGV(lecturerData.DIENTHOAI);
      setChucDanhGiangVien(lecturerData.TENCHUCDANH);
      setchucVuGiangVien(lecturerData.TENCHUCVU);
      setPhanQuyenGiangVien(lecturerData.PHANQUYEN);
      setTenBoMon(lecturerData.TENBOMON);
      setTrangThaiDangNhap(lecturerData.TRANGTHAITAIKHOAN);
      //   console.log("check UseEffect");
      toast.success("oke");
    } else {
      toast.error("bug");
    }
  }, [lecturerData]);
  //  console.log("show", show);
  //console.log("lecturerData", lecturerData);
  // console.log("updateLecturer", updateLecturer);
  // console.log("ChucdanhGV", ChucDanhGiangVien);
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      //   ...lecturerData,
      TENGV: tenGV,
      DIACHI: diaChiGiangVien,
      DIENTHOAI: SodienthoaiGV,
      TENCHUCDANH: ChucDanhGiangVien,
      TENCHUCVU: chucVuGiangVien,
      PHANQUYEN: PhanQuyenGiangVien,
      TENDANGNHAP: tenDangNhapGV,
      TENBOMON: TenBoMon,
      TRANGTHAITAIKHOAN: TrangThaiDangNhap,
    };
    console.log("check ", updatedData);
    updateLecturer(updatedData);
  };

  //console.log("tenGV:", tenGV);
  //console.log("tenDangNhapGV:", tenDangNhapGV);
  //console.log("SodienthoaiGV:", SodienthoaiGV);
  //console.log("chucVuGiangVien:", chucVuGiangVien);
  //console.log("ChucDanhGiangVien:", ChucDanhGiangVien);
  // console.log("PhanQuyenGiangVien:", PhanQuyenGiangVien);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Lecturer Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formTenDangNhap">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              title="Email không thể thay đổi"
              value={tenDangNhapGV}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formTenGV">
            <Form.Label>Tên Giảng Viên</Form.Label>
            <Form.Control
              type="text"
              title="Bạn có thể thay đổi tên Giảng Viên"
              value={tenGV}
              onChange={(e) => setTenGV(e.target.value)}
            />
          </Form.Group>

          <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tên Chức Vụ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                title="Bạn có thể thay đổi tên chức vụ giảng viên"
                id="demo-simple-select"
                value={chucVuGiangVien}
                label="Trạng Thái"
                className="height-selectGV"
                onChange={(e) => setchucVuGiangVien(e.target.value)}
              >
                {dataListChucVuGiangVien &&
                dataListChucVuGiangVien.length > 0 ? (
                  dataListChucVuGiangVien.map((chucvu, index) => (
                    <MenuItem key={index} value={chucvu.TENCHUCVU}>
                      {chucvu.TENCHUCVU}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Chưc danh không có</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tên Chức Danh
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                title="Bạn có thể thay đổi chức danh giảng viên"
                id="demo-simple-select"
                value={ChucDanhGiangVien}
                label="Trạng Thái"
                className="height-selectGV"
                onChange={(e) => setChucDanhGiangVien(e.target.value)}
              >
                {dataListChucDanhGiangVien &&
                dataListChucDanhGiangVien.length > 0 ? (
                  dataListChucDanhGiangVien.map((chucdanh, index) => (
                    <MenuItem key={index} value={chucdanh.TENCHUCDANH}>
                      {chucdanh.TENCHUCDANH}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Chưc danh không có</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>

          <Form.Group controlId="formTrangThaiGV">
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter status"
              value={SodienthoaiGV}
              title="Bạn có thể thay đổi số điện thoại giảng viên"
              onChange={(e) => setSodienthoaiGV(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTrangThaiGV">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter status"
              value={diaChiGiangVien}
              title="Bạn có thể thay đổi địa chỉ giảng viên"
              onChange={(e) => setdiaChiGiangVien(e.target.value)}
            />
          </Form.Group>
          <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Phân Quyền</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                title="Thay đổi quyền hạn tài khoản giảng viên"
                id="demo-simple-select"
                value={PhanQuyenGiangVien}
                label={PhanQuyenGiangVien}
                className="height-selectGV"
                onChange={(e) => setPhanQuyenGiangVien(e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Trưởng Khoa">Trưởng Khoa</MenuItem>
                <MenuItem value="Trưởng Bộ Môn">Trưởng Bộ Môn</MenuItem>
                <MenuItem value="Giảng viên">Giảng viên</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateGiangVienModal;
