import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CookiesAxios from "../../CookiesAxios";
import moment from "moment";

const HockyNienKhoaModal = ({ open, handleClose }) => {
  const [hockyNienKhoas, setHockyNienKhoas] = useState([]);
  const [newHockyNienKhoa, setNewHockyNienKhoa] = useState({
    TENHKNK: "",
    TEN_NAM_HOC: "",
    NGAYBATDAUNIENKHOA: null, // Chuyển về null để sử dụng DatePicker
  });

  useEffect(() => {
    if (open) {
      fetchHockyNienKhoas();
    }
  }, [open]);

  const fetchHockyNienKhoas = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/hockynienkhoa`
      );
      setHockyNienKhoas(response.data.DT);
    } catch (error) {
      console.error("Error fetching hocky nien khoas:", error);
    }
  };

  const handleAddHockyNienKhoa = async () => {
    if (
      newHockyNienKhoa.TENHKNK.trim() === "" ||
      newHockyNienKhoa.TEN_NAM_HOC.trim() === "" ||
      !newHockyNienKhoa.NGAYBATDAUNIENKHOA
    )
      return;

    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/hockynienkhoa`,
        {
          ...newHockyNienKhoa,
          NGAYBATDAUNIENKHOA: newHockyNienKhoa.NGAYBATDAUNIENKHOA.toISOString(),
        }
      );
      setHockyNienKhoas(response.data.DT);
      setNewHockyNienKhoa({
        TENHKNK: "",
        TEN_NAM_HOC: "",
        NGAYBATDAUNIENKHOA: null,
      });
    } catch (error) {
      console.error("Error adding hocky nien khoa:", error);
    }
  };

  const handleDeleteHockyNienKhoa = async (id) => {
    try {
      const response = await CookiesAxios.delete(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/hockynienkhoa/${id}`
      );
      setHockyNienKhoas(response.data.DT);
    } catch (error) {
      console.error("Error deleting hocky nien khoa:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Học kỳ niên khóa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Danh sách các học kỳ niên khóa hiện tại.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              value={newHockyNienKhoa.TENHKNK}
              onChange={(e) =>
                setNewHockyNienKhoa({
                  ...newHockyNienKhoa,
                  TENHKNK: e.target.value,
                })
              }
              label="Tên học kỳ niên khóa"
              fullWidth
              margin="normal"
            />
            <TextField
              value={newHockyNienKhoa.TEN_NAM_HOC}
              onChange={(e) =>
                setNewHockyNienKhoa({
                  ...newHockyNienKhoa,
                  TEN_NAM_HOC: e.target.value,
                })
              }
              label="Tên năm học"
              fullWidth
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Ngày bắt đầu niên khóa"
                value={newHockyNienKhoa.NGAYBATDAUNIENKHOA}
                onChange={(newValue) =>
                  setNewHockyNienKhoa({
                    ...newHockyNienKhoa,
                    NGAYBATDAUNIENKHOA: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddHockyNienKhoa}
              style={{ marginTop: "16px", marginLeft: "10px" }}
            >
              Thêm
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã Học Kỳ Niên Khóa</TableCell>
                    <TableCell>Tên Học Kỳ Niên Khóa</TableCell>
                    <TableCell>Tên Năm Học</TableCell>
                    <TableCell>Ngày Bắt Đầu Niên Khóa</TableCell>
                    <TableCell>Xóa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hockyNienKhoas?.length > 0 ? (
                    hockyNienKhoas.map((hknk) => (
                      <TableRow key={hknk.MAHKNK}>
                        <TableCell>{hknk.MAHKNK}</TableCell>
                        <TableCell>{hknk.TENHKNK}</TableCell>
                        <TableCell>{hknk.TEN_NAM_HOC}</TableCell>
                        <TableCell>
                          {moment(hknk.NGAYBATDAUNIENKHOA).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              handleDeleteHockyNienKhoa(hknk.MAHKNK)
                            }
                          >
                            Xóa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Không có dữ liệu
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HockyNienKhoaModal;
