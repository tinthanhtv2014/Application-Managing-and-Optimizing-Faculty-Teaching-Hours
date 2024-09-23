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
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import CookiesAxios from "../../CookiesAxios";
import moment from "moment";
import { toast } from "react-toastify";

const HockyNienKhoaModal = ({ open, handleClose }) => {
  const [hockyNienKhoas, setHockyNienKhoas] = useState([]);
  const [newHockyNienKhoa, setNewHockyNienKhoa] = useState({
    TENHKNK: "",
    TEN_NAM_HOC: moment().format("YYYY"),
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
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/hockinienkhoa/xem`
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
    ) {
      toast.error("Vui lòng chọn dữ liệu");
      return;
    }
    if (!newHockyNienKhoa.TEN_NAM_HOC.includes("Năm Học")) {
      const namHoc = parseInt(newHockyNienKhoa.TEN_NAM_HOC, 10); // Lấy năm hiện tại
      newHockyNienKhoa.TEN_NAM_HOC = `Năm Học ${namHoc} - ${namHoc + 1}`;
      console.log("1");
    }
    console.log("newHockyNienKhoa", newHockyNienKhoa.TEN_NAM_HOC);
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/hockinienkhoa/tao`,
        {
          ...newHockyNienKhoa,
          NGAYBATDAUNIENKHOA: newHockyNienKhoa.NGAYBATDAUNIENKHOA.toISOString(),
        }
      );
      console.log("check dataa", response.data);
      if (response.data.EC === 1) {
        setHockyNienKhoas(response.data.DT);
        setNewHockyNienKhoa({
          TENHKNK: "",
          TEN_NAM_HOC: moment().format("YYYY"),
          NGAYBATDAUNIENKHOA: null,
        });
      }

      if (response.data.EC !== 1) {
        toast.error(`Lỗi: ${response.data.EM}`);
      }
    } catch (error) {
      console.error("Error adding hocky nien khoa:", error);
    }
  };

  const handleDeleteHockyNienKhoa = async (id) => {
    try {
      const response = await CookiesAxios.delete(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/hockinienkhoa/xoa`,
        {
          data: { MAHKNK: id },
        }
      );
      if (response.data.EC === 1) {
        setHockyNienKhoas(response.data.DT);
      }
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
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: 330 }}>
              <FormControl fullWidth className="profile-email-input">
                <InputLabel id="select-label-trang-thai">Năm học</InputLabel>
                <Select
                  labelId="select-label-trang-thai"
                  id="trang-thai-select"
                  name="TENCHUCDANH"
                  label="Chức danh"
                  value={newHockyNienKhoa.TENHKNK}
                  defaultValue={newHockyNienKhoa.TENHKNK}
                  onChange={(e) =>
                    setNewHockyNienKhoa({
                      ...newHockyNienKhoa,
                      TENHKNK: e.target.value,
                    })
                  }
                  variant="outlined"
                >
                  <MenuItem value="Học Kì 1">Học Kì 1</MenuItem>
                  <MenuItem value="Học Kì 2">Học Kì 2</MenuItem>
                </Select>
                <FormControl
                  fullWidth
                  className="profile-email-input"
                  sx={{ mt: 2, mb: 2 }}
                >
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      views={["year"]} // Chỉ hiển thị lựa chọn năm
                      label="Tên Năm Học"
                      value={moment(newHockyNienKhoa.TEN_NAM_HOC, "YYYY")}
                      onChange={(newValue) =>
                        setNewHockyNienKhoa({
                          ...newHockyNienKhoa,
                          TEN_NAM_HOC: newValue
                            ? `Năm Học ${moment(newValue).format(
                                "YYYY"
                              )} - ${moment(newValue)
                                .add(1, "year")
                                .format("YYYY")}`
                            : ``,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
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
                </LocalizationProvider>{" "}
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddHockyNienKhoa}
                style={{ marginTop: "16px", marginLeft: "10px" }}
              >
                Thêm
              </Button>
            </Box>
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
