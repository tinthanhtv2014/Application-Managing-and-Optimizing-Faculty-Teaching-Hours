import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import "../components/KhoaList.scss";
import "./updateGiangVienModal.scss";

const UpdateGiangVienModal = ({
  show,
  handleClose,
  lecturerData,
  updateLecturer,
  dataListChucVuGiangVien,
  dataListChucDanhGiangVien,
  isOpenGetAllApiGV,
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
      // toast.success("Dữ liệu giảng viên đã được tải.");
    } else {
      toast.error("Không có dữ liệu giảng viên.");
    }
  }, [lecturerData]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      TENGV: tenGV,
      DIACHI: diaChiGiangVien,
      DIENTHOAI: SodienthoaiGV,
      TENCHUCDANH: ChucDanhGiangVien,
      TENCHUCVU: chucVuGiangVien,
      PHANQUYEN: PhanQuyenGiangVien,
      TENDANGNHAP: tenDangNhapGV,
      TENBOMON: TenBoMon,
      TRANGTHAITAIKHOAN: TrangThaiDangNhap,
      isOpenGetAllApiGV: isOpenGetAllApiGV,
    };
    updateLecturer(updatedData);
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          boxShadow: 100,
          p: 4,
          borderRadius: 2,
          width: {
            xs: "90%", // Width for extra small screens
            sm: "70%", // Width for small screens
            md: "50%", // Width for medium and up screens
          },
        }}
        className="modal-updateGV"
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Thay Đổi Thông Tin Giảng Viên
        </Typography>
        <form onSubmit={handleUpdate}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              value={tenDangNhapGV}
              disabled
              variant="outlined"
              className="height-selectGV"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Tên Giảng Viên"
              value={tenGV}
              onChange={(e) => setTenGV(e.target.value)}
              variant="outlined"
              className="height-selectGV"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="chuc-vu-label">Tên Chức Vụ</InputLabel>
            <Select
              labelId="chuc-vu-label"
              value={chucVuGiangVien}
              onChange={(e) => setchucVuGiangVien(e.target.value)}
              variant="outlined"
              className="height-selectGV"
              label="Tên Chức Vụ"
            >
              {dataListChucVuGiangVien && dataListChucVuGiangVien.length > 0 ? (
                dataListChucVuGiangVien.map((chucvu, index) => (
                  <MenuItem key={index} value={chucvu.TENCHUCVU}>
                    {chucvu.TENCHUCVU}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Chức vụ không có</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="chuc-danh-label">Tên Chức Danh</InputLabel>
            <Select
              labelId="chuc-danh-label"
              value={ChucDanhGiangVien}
              onChange={(e) => setChucDanhGiangVien(e.target.value)}
              variant="outlined"
              className="height-selectGV"
              label="Tên Chức Danh"
            >
              {dataListChucDanhGiangVien &&
              dataListChucDanhGiangVien.length > 0 ? (
                dataListChucDanhGiangVien.map((chucdanh, index) => (
                  <MenuItem key={index} value={chucdanh.TENCHUCDANH}>
                    {chucdanh.TENCHUCDANH}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Chức danh không có</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Số Điện Thoại"
              value={SodienthoaiGV}
              onChange={(e) => setSodienthoaiGV(e.target.value)}
              variant="outlined"
              className="height-selectGV"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Địa chỉ"
              value={diaChiGiangVien}
              onChange={(e) => setdiaChiGiangVien(e.target.value)}
              variant="outlined"
              className="height-selectGV"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="phan-quyen-label">Phân Quyền</InputLabel>
            <Select
              labelId="phan-quyen-label"
              value={PhanQuyenGiangVien}
              onChange={(e) => setPhanQuyenGiangVien(e.target.value)}
              variant="outlined"
              className="height-selectGV"
              label="Phân Quyền"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Trưởng Khoa">Trưởng Khoa</MenuItem>
              <MenuItem value="Trưởng Bộ Môn">Trưởng Bộ Môn</MenuItem>
              <MenuItem value="Giảng viên">Giảng viên</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type="submit" className="mt-2">
            Cập Nhật Thông Tin
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateGiangVienModal;
