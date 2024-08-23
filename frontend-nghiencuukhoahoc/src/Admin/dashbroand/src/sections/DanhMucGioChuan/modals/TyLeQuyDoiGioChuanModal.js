import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CookiesAxios from "../../CookiesAxios";
import "./modals.scss";
const TyLeQuyDoiGioChuanModal = ({ open, handleClose }) => {
  const [quyDinhs, setQuyDinhs] = useState([]);
  const [tyLeQuyDoi, setTyLeQuyDoi] = useState([]);
  const [selectedQuyDinh, setSelectedQuyDinh] = useState("");
  const [tenQuyDoi, setTenQuyDoi] = useState("");
  const [tyLe, setTyLe] = useState("");
  const [trangThaiQuyDoi, setTrangThaiQuyDoi] = useState("");
  const [ghiChuQuyDoi, setGhiChuQuyDoi] = useState("");
  const [vienChucTruong, setVienChucTruong] = useState("");
  const [thucHienChuan, setThucHienChuan] = useState("");
  useEffect(() => {
    if (open) {
      fetchQuyDinhs();
      fetchTyLeQuyDoi();
    }
  }, [open]);

  const fetchQuyDinhs = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/quydinh`
      );
      setQuyDinhs(response.data.DT);
    } catch (error) {
      console.error("Error fetching quy dinhs:", error);
    }
  };

  const fetchTyLeQuyDoi = async () => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/tylequydoi`
      );
      setTyLeQuyDoi(response.data.DT);
    } catch (error) {
      console.error("Error fetching quy dinhs:", error);
    }
  };

  const handleAddTyLeQuyDoi = async () => {
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/tylequydoi`,
        {
          MA_QUY_DINH: selectedQuyDinh,
          TEN_QUY_DOI: tenQuyDoi,
          TY_LE: tyLe,
          TRANG_THAI_QUY_DOI: trangThaiQuyDoi,
          GHI_CHU_QUY_DOI: ghiChuQuyDoi,
          VIEN_CHUC_TRUONG: vienChucTruong,
          THUC_HIEN_CHUAN: thucHienChuan,
        }
      );
      console.log("check fetch setTyLeQuyDoi =>", response.data);
      setTyLeQuyDoi(response.data.DT);
    } catch (error) {
      console.error("Error fetching quy dinhs:", error);
    }
  };
  const handleEdiStatusTyLeQuyDoi = async (item) => {
    const TrangThai =
      item.TRANG_THAI_QUY_DOI === "Đang áp dụng"
        ? "Ngưng áp dụng"
        : "Đang áp dụng";
    try {
      const response = await CookiesAxios.put(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/tylequydoi/${item.MA_QUY_DOI}`,
        { TRANG_THAI_QUY_DOI: TrangThai }
      );
      console.log("check fetch setTyLeQuyDoi =>", response.data);
      if (response.data.EC === 1) {
        setTyLeQuyDoi(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching quy dinhs:", error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Tỷ lệ quy đổi giờ chuẩn</DialogTitle>
      <DialogContent>
        <DialogContentText>Nội dung Tỷ lệ quy đổi giờ chuẩn.</DialogContentText>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Chọn Quy Định</InputLabel>
              <Select
                value={selectedQuyDinh}
                onChange={(e) => setSelectedQuyDinh(e.target.value)}
              >
                {quyDinhs.map((qd) => (
                  <MenuItem key={qd.MA_QUY_DINH} value={qd.MA_QUY_DINH}>
                    {qd.TEN_QUY_DINH}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Tên Quy Đổi"
              fullWidth
              margin="normal"
              value={tenQuyDoi}
              onChange={(e) => setTenQuyDoi(e.target.value)}
            />
            <TextField
              label="Tỷ Lệ"
              fullWidth
              margin="normal"
              value={tyLe}
              onChange={(e) => setTyLe(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="vien-chuc-truong-label">
                Viên Chức Trường
              </InputLabel>
              <Select
                labelId="vien-chuc-truong-label"
                id="vien-chuc-truong-label"
                label="Viên Chức Trường"
                value={vienChucTruong}
                onChange={(e) => setVienChucTruong(e.target.value)}
              >
                <MenuItem value="Có">Có</MenuItem>
                <MenuItem value="Không">Không</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="thuc-hien-chuan-label">
                Thực Hiện Chuẩn
              </InputLabel>
              <Select
                labelId="thuc-hien-chuan-label"
                id="thuc-hien-chuan-label"
                label="Thực Hiện Chuẩn"
                value={thucHienChuan}
                onChange={(e) => setThucHienChuan(e.target.value)}
              >
                <MenuItem value="Có">Có</MenuItem>
                <MenuItem value="Không">Không</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Trạng Thái Quy Đổi"
              fullWidth
              margin="normal"
              value={trangThaiQuyDoi}
              onChange={(e) => setTrangThaiQuyDoi(e.target.value)}
            />
            <TextField
              label="Ghi Chú Quy Đổi"
              fullWidth
              margin="normal"
              value={ghiChuQuyDoi}
              onChange={(e) => setGhiChuQuyDoi(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            {tyLeQuyDoi && tyLeQuyDoi.length > 0 ? (
              <List>
                {tyLeQuyDoi.map((item) => (
                  <ListItem
                    key={item.MA_QUY_DOI}
                    sx={{
                      // Thay đổi kiểu dáng dựa trên TRANG_THAI_QUY_DOI
                      opacity:
                        item.TRANG_THAI_QUY_DOI === "Ngưng áp dụng" ? 0.5 : 1,
                      backgroundColor:
                        item.TRANG_THAI_QUY_DOI === "Ngưng áp dụng"
                          ? "#f0f0f0"
                          : "inherit",
                      borderBottom: "1px solid #131212", // Gạch ngang cho mỗi item
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          color={
                            item.TRANG_THAI_QUY_DOI === "Ngưng áp dụng"
                              ? "textDisabled"
                              : "textSecondary"
                          }
                        >
                          <Typography
                            component="span"
                            sx={{ fontWeight: "bold" }}
                          >
                            Tên Quy Đổi:
                          </Typography>
                          {` ${item.TEN_QUY_DOI}`}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          color={
                            item.TRANG_THAI_QUY_DOI === "Ngưng áp dụng"
                              ? "textDisabled"
                              : "textPrimary"
                          }
                        >
                          Tỷ Lệ: &nbsp;
                          <Typography
                            variant="body1"
                            component="span"
                            sx={{ color: "red", fontWeight: "bold" }}
                          >
                            {` ${item.TY_LE} `}
                          </Typography>
                          <br />
                          Ghi Chú: &nbsp;
                          <Typography
                            variant="body1"
                            component="span"
                            sx={{ color: "green", fontWeight: "bold" }}
                          >
                            {` ${item.GHI_CHU_QUY_DOI}`}
                          </Typography>
                          <br />
                          Viên Chức Trường: &nbsp;
                          <Typography
                            variant="body1"
                            component="span"
                            sx={{ color: "green" }}
                          >
                            {` ${item.VIEN_CHUC_TRUONG}`}
                          </Typography>
                          <br />
                          Thực Hiện Chuẩn: &nbsp;
                          <Typography
                            variant="body1"
                            component="span"
                            sx={{ color: "green" }}
                          >
                            {` ${item.THUC_HIEN_CHUAN}`}
                          </Typography>
                          <br />
                          Trạng Thái Quy Đổi: &nbsp;
                          <Typography
                            variant="body1"
                            component="span"
                            sx={{
                              color: `${
                                item.TRANG_THAI_QUY_DOI === "Đang áp dụng"
                                  ? `green`
                                  : `red`
                              }`,
                              fontWeight: "bold",
                            }}
                          >
                            {` ${item.TRANG_THAI_QUY_DOI}`}
                          </Typography>
                          &nbsp; &nbsp;
                          {item.TRANG_THAI_QUY_DOI === "Đang áp dụng" ? (
                            <i
                              className="fa-solid fa-arrow-down"
                              title="Tắt"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdiStatusTyLeQuyDoi(item)}
                            ></i>
                          ) : (
                            <i
                              title="Bật"
                              className="fa-solid fa-arrow-up"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdiStatusTyLeQuyDoi(item)}
                            ></i>
                          )}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography
                variant="body1"
                component="span"
                sx={{ color: "green", fontWeight: "bold" }}
              >
                Không Có Dữ Liệu
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
        <Button onClick={handleAddTyLeQuyDoi}>Thêm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TyLeQuyDoiGioChuanModal;
