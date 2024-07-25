import React, { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import AppWidgetSummary from "../app-widget-summary";
import axios from "axios";
import imgThongKe from "../../../../public/assets/icons/glass/icon_BieuDo.png";
import imgDanhSach from "../../../../public/assets/icons/glass/DanhSach.png";

// ----------------------------------------------------------------------

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function TrangChu() {

  const token = Cookies.get("accessToken");
  const [TenDangNhap, setTenDangNhap] = useState(null);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const name = decodedToken.phanquyen; // Hoặc thuộc tính nào đó trong token
      setTenDangNhap(name);

      console.log("check", name);
    }
  }, [token]);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
          Hi, Welcome back 👋
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid lg={6} xs={12} sm={6} md={3} display="flex" justifyContent="center">
            <AppWidgetSummary
              title="Thống kê"
              icon={<img alt="icon" src={imgThongKe} />}
            />
          </Grid>

          <Grid lg={6} xs={12} sm={6} md={3} display="flex" justifyContent="center">
            <AppWidgetSummary
              title="Danh sách giảng viên"
              icon={<img alt="icon" src={imgDanhSach} />}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );

}

export default TrangChu;
