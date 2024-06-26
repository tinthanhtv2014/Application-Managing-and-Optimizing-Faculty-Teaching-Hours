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
import "./login-view.css"
import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { AuthContext } from '../../../../../Authentication/AuthContext.js';
// ----------------------------------------------------------------------

const ChangePassword = () => {
    const theme = useTheme();
    const tokenSetStorage = sessionStorage.getItem("accessToken");


    const axiosWithCredentials = axios.create({
        withCredentials: true, // Bật sử dụng cookie trong yêu cầu
        headers: {
            Authorization: `Bearer ${tokenSetStorage}`, // Thay yourToken bằng token của bạn
        },
    });
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [UsernameAdminUpdate, setUsernameAdminUpdate] = useState("");
    const [PasswordAdminUpdateNew, setPasswordAdminUpdateNew] = useState("");
    const [PasswordAdminOld, setPasswordAdminUpdateOld] = useState("");
    const [passwordLevertwo, setpasswordLevertwo] = useState("");
    const [PasswordAdminUpdateNew2, setPasswordAdminUpdateNew2] = useState("");
    const { login } = useContext(AuthContext);
    const handleUpdatePassword = async (event) => {
        event.preventDefault();

        if (PasswordAdminUpdateNew2 !== PasswordAdminUpdateNew) {
            toast.error('Mật khẩu Không Trùng Khớp');
            return;
        }

        // console.log('check UsernameAdminUpdate', UsernameAdminUpdate);
        // console.log('check PasswordAdminUpdateNew', PasswordAdminUpdateNew);
        // console.log('check PasswordAdminOld', PasswordAdminOld);
        // console.log('check passwordLevertwo', passwordLevertwo);
        // console.log('check PasswordAdminUpdateNew2', PasswordAdminUpdateNew2);

        if (!UsernameAdminUpdate || !PasswordAdminUpdateNew || !PasswordAdminOld || !passwordLevertwo || !PasswordAdminUpdateNew2) {
            toast.error("Vui lòng điền đầy đủ thông tin đăng nhập");
            return;
        }

        try {
            const response = await axiosWithCredentials.put("http://localhost:3003/api/v1/admin/info/update/password/", {
                username: UsernameAdminUpdate,
                password: PasswordAdminOld,
                newpassword: PasswordAdminUpdateNew,
                password2: passwordLevertwo,
            });

            console.log('check', response.data);
            console.log(response.data.EC);

            if (response.data.EC === 1) {
                toast.success("Update thành công");
                console.log(response.data.DT.access_token);
            } else {
                toast.error("Đăng nhập thất bại");
            }
        } catch (error) {
            console.error("Lỗi trong quá trình cập nhật mật khẩu:", error);
            toast.error("Có lỗi xảy ra trong quá trình cập nhật mật khẩu. Vui lòng thử lại sau.");
        }
    };




    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField name="email"
                    label="Username Admin"
                    className='login-input-css'
                    value={UsernameAdminUpdate}
                    onChange={((event) => setUsernameAdminUpdate(event.target.value))} />

                <TextField
                    className='login-input-css'
                    name="password"
                    label="Nhập Mật Khẩu Cũ"
                    value={PasswordAdminOld}
                    type={showPassword ? 'text' : 'password'}
                    onChange={((event) => setPasswordAdminUpdateOld(event.target.value))}
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
                <TextField
                    className='login-input-css'
                    name="password"
                    label="Nhập Mật Khẩu Cấp 2 "
                    value={passwordLevertwo}
                    type={showPassword ? 'text' : 'password'}
                    onChange={((event) => setpasswordLevertwo(event.target.value))}
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
                <TextField
                    className='login-input-css'
                    name="password"
                    label="Nhập Mật Khẩu Mới"
                    value={PasswordAdminUpdateNew}
                    type={showPassword ? 'text' : 'password'}
                    onChange={((event) => setPasswordAdminUpdateNew(event.target.value))}
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
                <TextField
                    className='login-input-css'
                    name="password"
                    label="Nhập Lại Mật Khẩu Mới"
                    type={showPassword ? 'text' : 'password'}
                    value={PasswordAdminUpdateNew2}

                    onChange={((event) => setPasswordAdminUpdateNew2(event.target.value))}
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
                onClick={handleUpdatePassword}
                id='btn-Login'
            >
                Update Password
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
                    <Typography variant="h4">Change Password Admin</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Bạn muốn đổi mật khẩu thật hả?

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
export default ChangePassword