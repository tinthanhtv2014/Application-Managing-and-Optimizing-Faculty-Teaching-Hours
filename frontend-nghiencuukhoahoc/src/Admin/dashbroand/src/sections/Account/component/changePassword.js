import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import CookiesAxios from "../../CookiesAxios";
import { toast } from "react-toastify";

const ChangePasswordForm = ({ data_user }) => {
  const [matKhauCu, setMatKhauCu] = useState(null);
  const [nhapLaiMatKhauMoi, setNhapLaiMatKhauMoi] = useState(null);
  const [matKhauMoi, setMatKhauMoi] = useState(null);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");
  console.log("check data_user =>", data_user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nhapLaiMatKhauMoi === matKhauMoi &&
      data_user.taikhoan &&
      matKhauCu &&
      email === data_user.taikhoan
    ) {
      try {
        const response = await CookiesAxios.put(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/taikhoan/sua/${data_user.taikhoan}`,
          {
            matKhaucu: matKhauCu,
            phanQuyen: data_user.phanquyen,
            matKhaumoi: matKhauMoi,
          }
        );
        console.log(response.data);
        if (response.data.EC === 1) {
          alert("Thay đổi mật khẩu thành công!");
        } else {
          setError("Thay đổi mật khẩu thất bại. Vui lòng kiểm tra lại.");
        }
      } catch (error) {
        setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } else {
      setError("Mật Khẩu Của Bạn Có Vấn Đề Hihi");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 4, px: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Thay đổi mật khẩu
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Bạn có thể thay đổi mật khẩu của bản thân bằng cách thay đổi mật
            khẩu.
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography>Email:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography>Mật khẩu cũ:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  type="password"
                  value={matKhauCu}
                  onChange={(e) => setMatKhauCu(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography>Mật khẩu mới:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  type="password"
                  value={matKhauMoi}
                  onChange={(e) => setMatKhauMoi(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography>Nhập lại mật khẩu mới:</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  type="password"
                  value={nhapLaiMatKhauMoi}
                  onChange={(e) => setNhapLaiMatKhauMoi(e.target.value)}
                  required
                />
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Box sx={{ color: "red", mt: 2 }}>{error}</Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Đổi mật khẩu
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChangePasswordForm;
