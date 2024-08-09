import React, { useEffect, useState } from "react";
import {
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import axios from "axios";
import CookiesAxios from "../../CookiesAxios";
const ModalDanhMuc = ({ open, onClose }) => {
  const [dataOptions, setDataOptions] = useState([]);
  const [selectedLoaiDanhMuc, setSelectedLoaiDanhMuc] = useState("");
  const [dataDanhMuc, setDataDanhMuc] = useState([]);
  const [dataLoaiDanhMuc, setDataLoaiDanhMuc] = useState([]);
  // Gọi API để lấy dữ liệu cho thẻ select
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

  // Hàm xử lý khi chọn option
  const handleSelectChange = async (event) => {
    const value = event.target.value;
    setSelectedLoaiDanhMuc(value);

    // Gọi API để lấy dữ liệu dựa trên option đã chọn
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/danhmucquydoi/${value}`
      ); // Thay đổi với URL thực tế
      setDataDanhMuc(response.data.DT);
      console.log("check dataa danh muc ", response.data.DT);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 24,
          overflowY: "auto",
          position: "absolute", // Đảm bảo modal được căn giữa
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Căn giữa modal
        }}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-label">Chọn Option</InputLabel>
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
        </FormControl>{" "}
        {dataDanhMuc.map((danhmuc) => (
          <p key={danhmuc.MA_DANH_MUC} value={danhmuc.MA_DANH_MUC}>
            {danhmuc.NOI_DUNG_DANH_MUC}
          </p>
        ))}
      </Box>
    </Modal>
  );
};

export default ModalDanhMuc;
