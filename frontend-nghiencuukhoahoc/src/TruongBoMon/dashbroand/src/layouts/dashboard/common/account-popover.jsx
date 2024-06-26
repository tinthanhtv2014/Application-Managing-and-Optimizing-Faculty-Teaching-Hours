import { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { account } from '../../../_mock/account';
import { toast } from 'react-toastify';
import avat from "../../../../public/assets/images/avatars/lufy2.jpg";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const auth = Cookies.get("accessToken");
  const navigate = useNavigate()
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = (event) => {
    setOpen(!open)
  };
  const handleLogout = async () => {
    try {
      const token = Cookies.get('accessToken');

      if (!token) {
        toast.error('Không có token');
        return;
      }

      const response = await axios.post('http://localhost:3003/admin/v1/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.EC);
      if (response.data.EC === 0) {
        Cookies.remove('accessToken');
        navigate('/admin');
        toast.success(response.data.EM);
      } else {
        toast.error(response.data.EM);
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Đã xảy ra lỗi khi đăng xuất');
    }
  };

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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
