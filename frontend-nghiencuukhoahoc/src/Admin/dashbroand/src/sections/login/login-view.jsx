import { useState, useContext } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Cookies from 'js-cookie';

import "./login-view.css"
import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { AuthContext } from '../../../../../Authentication/AuthContext.js';
// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [UsernameAdminLogin, setUsernameAdminLogin] = useState("");
  const [PasswordAdminLogin, setPasswordAdminLogin] = useState("");
  // const { login } = useContext(AuthContext);
  const handleLogin = (event) => {
    console.log('ok')
    event.preventDefault();
    if (!UsernameAdminLogin || !PasswordAdminLogin) {
      toast.error("Vui lòng điền đầy đủ thông tin đăng nhập");
    } else {
      axios
        .post("http://localhost:3003/admin/v1/login", {
          username: UsernameAdminLogin,
          password: PasswordAdminLogin,
        })
        .then((response) => {
          console.log('check', response.data);
          console.log(response.data.data.token);


          // Trong hàm then của axios.post
          if (response.data.data.EC === 1) {
            toast.success("Đăng nhập thành công");

            Cookies.set('accessToken', response.data.data.token, { expires: 3 });
            // sessionStorage.setItem('accessToken', response.data.DT.access_token);
            // login(response.data.DT.access_token);
            navigate(`/dashboard`, { state: { accessToken: response.data.data.token } });

          } else {
            toast.error("Đăng nhập thất bại");
          }

        })
        .catch((error) => {
          // Xử lý lỗi nếu cần
        });
    }
  };



  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email"
          label="Username Admin"
          className='login-input-css'
          onChange={((event) => setUsernameAdminLogin(event.target.value))} />

        <TextField
          className='login-input-css'
          name="password"
          label="Password Admin"
          type={showPassword ? 'text' : 'password'}
          onChange={((event) => setPasswordAdminLogin(event.target.value))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLogin}
        id='btn-Login'
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Admin</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <img src={require('../../../public/assets/images/avatars/Untitled-1.png')}
                className='imglogo-changepass1' alt="" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <img src={require('../../../public/assets/images/avatars/iconlogo.png')}
                className='imglogo-changepass' alt="" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <img src={require('../../../public/assets/images/avatars/logoB.png')}
                className='imglogo-changepass1' alt="" />
              {/* <Iconify icon="eva:twitter-fill" color="#1C9CEA" /> */}

            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
