import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import CookiesAxios from "../../../CookiesAxios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ComponentExcelCTDT = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const auth = Cookies.get("accessToken");
  const fileInputRef = useRef(null);

  const handleAddUser = async () => {
    if (data.length > 0) {
      try {
        const response = await CookiesAxios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/chuongtrinh/tao`,
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

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mt-2">
      <input
        type="file"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input element
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFileButtonClick}
        sx={{ mb: 2 }}
      >
        Upload File
      </Button>

      <Button
        variant="contained"
        color="success"
        sx={{ ml: 2, mb: 2 }}
        onClick={handleAddUser}
      >
        Thêm Chương Trình Đào Tạo
      </Button>

      {data.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2, mb: 2 }}
          onClick={handleOpenDialog}
        >
          Xem Dữ Liệu
        </Button>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Dữ Liệu Excel Của Bạn</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {data.length > 0 &&
                    Object.keys(data[0]).map((key) => (
                      <TableCell key={key}>{key}</TableCell>
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
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ComponentExcelCTDT;
