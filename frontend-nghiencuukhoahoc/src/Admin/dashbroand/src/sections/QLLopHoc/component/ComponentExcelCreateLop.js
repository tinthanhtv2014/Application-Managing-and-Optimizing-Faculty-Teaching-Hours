import React, { useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import CookiesAxios from "../../CookiesAxios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

const ComponentExcelLop = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const auth = Cookies.get("accessToken");

  const handleAddUser = async () => {
    if (data.length > 0) {
      try {
        const response = await CookiesAxios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/lop/tao/excel`,
          data,
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        );
        if (response.data.EC === 1) {
          toast.success("Thêm dữ liệu thành công");
        } else {
          toast.error(response.data.EM);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Chưa có dữ liệu excel");
      return;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Box sx={{ mt: 2 }}>
      <input
        type="file"
        onChange={handleFileUpload}
        id="formFile"
        style={{ display: "none" }}
      />
      <label htmlFor="formFile">
        <Button variant="contained" component="span" color="primary">
          Upload File
        </Button>
      </label>

      <Button
        variant="contained"
        color="success"
        onClick={handleAddUser}
        sx={{ ml: 2 }}
      >
        Thêm Danh Sách Lớp
      </Button>

      {data.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowModal}
          sx={{ mt: 2 }}
        >
          Xem Dữ Liệu
        </Button>
      )}

      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>Dữ Liệu Excel Của Bạn</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {data.length > 0 &&
                    Object.keys(data[0]).map((key) => (
                      <TableCell key={key}>
                        <Typography variant="body2" fontWeight="bold">
                          {key}
                        </Typography>
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((cell, i) => (
                      <TableCell key={i}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComponentExcelLop;
