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

const ModalDanhMuc = ({ open, onClose }) => {
  const [dataOptions, setDataOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [fetchedData, setFetchedData] = useState(null);

  // Gọi API để lấy dữ liệu cho thẻ select
  useEffect(() => {
    const fetchDataOptions = async () => {
      try {
        const response = await axios.get("URL_API_GET_OPTIONS"); // Thay đổi với URL thực tế
        setDataOptions(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchDataOptions();
  }, []);

  // Hàm xử lý khi chọn option
  const handleSelectChange = async (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    // Gọi API để lấy dữ liệu dựa trên option đã chọn
    try {
      const response = await axios.get(`URL_API_GET_DATA/${value}`); // Thay đổi với URL thực tế
      setFetchedData(response.data);
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
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {dataOptions.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Hiển thị dữ liệu được lấy từ backend nếu có */}
        {fetchedData && <div>{JSON.stringify(fetchedData)}</div>}
      </Box>
    </Modal>
  );
};

export default ModalDanhMuc;
