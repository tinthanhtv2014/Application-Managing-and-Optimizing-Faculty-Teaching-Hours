import React, { useEffect, useState } from "react";
import {
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField, // Thêm TextField để làm ô tìm kiếm
} from "@mui/material";
import axios from "axios";
import CookiesAxios from "../../CookiesAxios";
import "./ModalselectDanhMuc.scss";
const ModalDanhMuc = ({
  open,
  onClose,
  handleSelectDanhMuc,
  setMaLoaiDanhMuc,
}) => {
  const [dataOptions, setDataOptions] = useState([]);
  const [selectedLoaiDanhMuc, setSelectedLoaiDanhMuc] = useState("");
  const [dataDanhMuc, setDataDanhMuc] = useState([]);
  const [dataLoaiDanhMuc, setDataLoaiDanhMuc] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm

  useEffect(() => {
    const fetchDataOptions = async () => {
      try {
        const response_LoaiDanhMuc = await CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaidanhmuc`
        );
        if (response_LoaiDanhMuc.data.EC === 1) {
          setDataLoaiDanhMuc(response_LoaiDanhMuc.data.DT);
        }
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchDataOptions();
  }, []);

  const handleSelectChange = async (event) => {
    const value = event.target.value;
    setSelectedLoaiDanhMuc(value);
    setMaLoaiDanhMuc(value);
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/danhmucquydoi/${value}`
      );
      setDataDanhMuc(response.data.DT);
      console.log("check dataa danh muc ", response.data.DT);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredDataDanhMuc = dataDanhMuc.filter((danhmuc) =>
    danhmuc.NOI_DUNG_DANH_MUC.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleRowClick = (danhmuc) => {
    handleSelectDanhMuc(danhmuc); // Gọi hàm onSelect từ component cha và truyền dữ liệu của hàng được chọn
    onClose(); // Đóng modal sau khi chọn
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: "20px",
          bgcolor: "white",
          borderRadius: "8px",
          width: "80%",
          height: "80%",
          margin: "auto",
          //   display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          //   alignItems: "center",
          boxShadow: 24,
          overflowY: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {" "}
        <div className="container-select-loaidanhmuc">
          {" "}
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-label">Chọn loại danh mục</InputLabel>
            <Select
              labelId="select-label"
              value={selectedLoaiDanhMuc}
              onChange={handleSelectChange}
            >
              {dataLoaiDanhMuc.map((danhmuc) => (
                <MenuItem
                  key={danhmuc.MA_LOAI_DANH_MUC}
                  value={danhmuc.MA_LOAI_DANH_MUC}
                >
                  {danhmuc.TEN_LOAI_DANH_MUC}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Ô nhập liệu để tìm kiếm theo nội dung danh mục */}
          <TextField
            label="Tìm kiếm theo Nội Dung Danh Mục"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "30%" }}>Nội Dung Danh Mục</TableCell>
                <TableCell>Giờ chuẩn</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>WOS/Scopus</TableCell>
                <TableCell>Hạng WOS/Scopus</TableCell>
                <TableCell>Lợi Nhuận</TableCell>
                <TableCell>Đơn Vị Tính</TableCell>
                <TableCell>Giải Thưởng</TableCell>
                <TableCell>Xếp Hạng Quartiles</TableCell>
                <TableCell>Năm Thực Hiện</TableCell>
                <TableCell>Ghi Chú Danh Mục</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDataDanhMuc.map((danhmuc) => (
                <TableRow
                  key={danhmuc.MA_DANH_MUC}
                  onClick={() => handleRowClick(danhmuc)} // Thêm sự kiện click để chọn hàng
                  style={{ cursor: "pointer" }} // Đổi con trỏ chuột để người dùng biết có thể click
                >
                  <TableCell sx={{ width: "30%" }}>
                    {danhmuc.NOI_DUNG_DANH_MUC}
                  </TableCell>
                  <TableCell>{danhmuc.GIO_CHUAN}</TableCell>
                  <TableCell>{danhmuc.ISBN}</TableCell>
                  <TableCell>{danhmuc.WOS_SCOUPUS}</TableCell>
                  <TableCell>{danhmuc.HANG_WOS_SCOUPUS}</TableCell>
                  <TableCell>{danhmuc.LOI_NHUAN}</TableCell>
                  <TableCell>{danhmuc.DON_VI_TINH}</TableCell>
                  <TableCell>{danhmuc.GIAI_THUONG}</TableCell>
                  <TableCell>{danhmuc.XEP_HANG_QUARTILES}</TableCell>
                  <TableCell>{danhmuc.NAM_THUC_HIEN}</TableCell>
                  <TableCell>{danhmuc.GHI_CHU_DANH_MUC}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default ModalDanhMuc;
