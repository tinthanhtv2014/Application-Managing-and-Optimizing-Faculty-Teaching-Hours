import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import CookiesAxios from "../../CookiesAxios";
function ModalChucVu({ open, handleClose }) {
  const [tenChucvu, setTenchucvu] = useState("");
  const [machucvu, setMachucvu] = useState("");
  const [datachucvu, setDataChucvu] = useState([]);
  useEffect(() => {
    if (open) {
      fetchDataChucvu();
    }
  }, [open]);

  //hàm thêm chức vụ chức danh ==================================
  const handleSubmitchucvu = async (e) => {
    e.preventDefault();
    try {
      console.log("check chức vụ", tenChucvu);
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/taochucvu`,
        { TENCHUCVU: tenChucvu }
      );
      if (response.data.EC == 1) {
        setDataChucvu(response.data.DT);
      }
    } catch (error) {
      console.error("Error creating chức vụ:", error);
      // Bạn có thể thêm thông báo lỗi hoặc xử lý lỗi khác ở đây
    }
  };

  const handleDeleteChucvu = async (machucvu) => {
    try {
      const response = await CookiesAxios.delete(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xoachucvu`,
        {
          params: {
            MACHUCVU: machucvu,
          },
        }
      );
      console.log("Deleted chức vụ: ", machucvu);
      // Bạn có thể cập nhật lại danh sách chức vụ sau khi xóa thành công
      setDataChucvu((prevData) =>
        prevData.filter((chucvu) => chucvu.MACHUCVU !== machucvu)
      );
    } catch (error) {
      console.error("Error deleting chức vụ:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const fetchDataChucvu = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xemchucvu`
      );

      if (response && response.data && response.data.DT) {
        setDataChucvu(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching data chức vụ:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleUpdateChucvu = async (chucvu) => {
    try {
      setTenchucvu(chucvu.TENCHUCVU);
      setMachucvu(chucvu.MACHUCVU);
    } catch (error) {
      console.error("Error setting chức vụ for update:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleUPDATEChucvu = async () => {
    try {
      console.log("check tên chức vụ", tenChucvu);
      console.log("check mã chức vụ", machucvu);
      const response = await CookiesAxios.put(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/suachucvu/${machucvu}`,
        { TENCHUCVU: tenChucvu }
      );
      console.log("Updated chức vụ:", response);
      // Bạn có thể cập nhật lại danh sách chức vụ sau khi sửa thành công
      fetchDataChucvu(); // Fetch lại danh sách chức vụ sau khi update
    } catch (error) {
      console.error("Error updating chức vụ:", error);
      // Xử lý lỗi nếu cần
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Quản Lý Chức Vụ Giảng Viên</DialogTitle>
      <DialogContent>
        <DialogContentText>Danh sách các chức vụ giảng viên</DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Container sx={{ mt: 4 }}>
              <form onSubmit={handleSubmitchucvu}>
                <FormControl fullWidth margin="normal">
                  {/* <InputLabel>Tên Chức vụ</InputLabel> */}
                  <TextField
                    type="text"
                    label="Tên Chức vụ"
                    value={tenChucvu}
                    onChange={(e) => setTenchucvu(e.target.value)}
                    required
                  />
                </FormControl>
                <Button variant="contained" type="submit">
                  Tạo Chức Vụ
                </Button>
                {tenChucvu && tenChucvu.length > 0 && (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleUPDATEChucvu}
                      sx={{ ml: 2 }}
                    >
                      Sửa
                    </Button>
                  </>
                )}
              </form>

              {datachucvu && datachucvu.length > 0 ? (
                <TableContainer className="mt-4" component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Mã Chức Vụ</TableCell>
                        <TableCell>Tên Chức Vụ</TableCell>
                        <TableCell>Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datachucvu.map((chucvu, index) => (
                        <TableRow key={index}>
                          <TableCell>{chucvu.MACHUCVU}</TableCell>
                          <TableCell>{chucvu.TENCHUCVU}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                handleDeleteChucvu(chucvu.MACHUCVU)
                              }
                            >
                              Xóa
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => handleUpdateChucvu(chucvu)}
                              sx={{ ml: 2 }}
                            >
                              Sửa
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <p>Không có dữ liệu</p>
              )}
            </Container>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalChucVu;
