import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { account } from "../../../_mock/account";
import { toast } from "react-toastify";
import avat from "../../../../public/assets/images/avatars/lufy2.jpg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CookiesAxios from "../../../sections/CookiesAxios";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Trang Chủ",
    icon: "eva:home-fill",
  },
  {
    label: "Hồ Sơ",
    icon: "eva:person-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [dataProfileGiangvien, setdataProfileGiangvien] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = Cookies.get("accessToken");
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (label) => {
    setOpen(null);
    if (label === "Hồ Sơ") {
      navigate("/admin/tai-khoan-giangvien/thong-tin");
    } else if (label === "Trang Chủ") {
      navigate("/admin/");
    }
  };

  useEffect(() => {
    if (auth) {
      const decoded = jwtDecode(auth);
      const fetchData = async () => {
        try {
          const response = await CookiesAxios.get(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${decoded.taikhoan}`,
            { withCredentials: true }
          );

          if (response.data.EC === 1) {
            setdataProfileGiangvien(response.data.DT);
          }
          setLoading(false);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [auth]);

  const handleLogout = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("Không có token");
      return;
    }

    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/taikhoan/dangxuat`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.EC === 0) {
        Cookies.remove("accessToken");
        navigate("/login");
        toast.success(response.data.EM);
      } else {
        toast.error(response.data.EM);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Đã xảy ra lỗi khi đăng xuất");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={avat}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {dataProfileGiangvien.TENGV}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {dataProfileGiangvien.TENDANGNHAP}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => handleClose(option.label)}
          >
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Đăng Xuất
        </MenuItem>
      </Popover>
    </>
  );
}
