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

import AdminLogin from '../../../../adminLogin/AdminLogin.jsx'
import "./login-view.scss"
import { useRouter } from '../../routes/hooks';
// import 'dotenv/config'
import { bgGradient } from '../../theme/css';
import Cookies from 'js-cookie';
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { AuthContext } from '../../../../../Authentication/AuthContext.js';

import { jwtDecode } from "jwt-decode";
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
    console.log('Server URL:', process.env.REACT_APP_URL_SERVER);
    event.preventDefault();
    if (!UsernameAdminLogin || !PasswordAdminLogin) {
      toast.error("Vui lòng điền đầy đủ thông tin đăng nhập");


    } else {
      axios
        .post(`${process.env.REACT_APP_URL_SERVER}/api/v1/admin/taikhoan/login`, {
          tendangnhap: UsernameAdminLogin,
          matkhau: PasswordAdminLogin,
        })
        .then((response) => {
          console.log('check', response.data);
          console.log(response.data.DT.access_token);


          // Trong hàm then của axios.post
          if (response.data.EC === 1) {
            toast.success("Đăng nhập thành công");

            Cookies.set('accessToken', response.data.DT.access_token, { expires: 3, path: '/' });

            try {
              const decoded = jwtDecode(response.data.DT.access_token);
              console.log(decoded.phanquyen);
              if (decoded.phanquyen == "admin") {
                navigate("/admin")
              }
              if (decoded.phanquyen == "giangvien") {
                navigate("/giang-vien")
              }
              if (decoded.phanquyen == "truongkhoa") {
                navigate("/truongkhoa")
              }
              if (decoded.phanquyen == "truongbomon") {
                navigate("/truong-bm")
              }

            } catch (err) {
              console.error('Error decoding token:', err);
            }

          } else {
            toast.error("Đăng nhập thất bại");
          }

        })
        .catch((error) => {
          console.log(error)
        });
    }
  };



  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email"
          label="Email "
          className='login-input-css'
          onChange={((event) => setUsernameAdminLogin(event.target.value))} />

        <TextField
          className='login-input-css'
          name="password"
          label="Mật khẩu"
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
        <Link className='text-login' variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        // color="inherit"
        onClick={handleLogin}
        id='btn-Login'
      >
        Đăng Nhập
      </LoadingButton>

    </>
  );

  return (
    <div className='container-login'>
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
            <Typography variant="h4" ><p className='sign-in-toAdmin'>Sign in</p></Typography>

            <Typography className='text-login' variant="body2" sx={{ mt: 2, mb: 5 }}>
              Welcome to <span className='text-login-color'>Khoa Kĩ Thuật Công Nghệ TVU</span>

            </Typography>
            <div className="center-content">
              <AdminLogin />
            </div>
            <Stack direction="row" spacing={3}>


            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography className='text-login' variant="body2" sx={{ color: 'text.secondary' }}>
                Hoặc đăng nhập với email
              </Typography>
            </Divider>

            {renderForm}
          </Card>
        </Stack>
      </Box>
    </div>
  );
}
