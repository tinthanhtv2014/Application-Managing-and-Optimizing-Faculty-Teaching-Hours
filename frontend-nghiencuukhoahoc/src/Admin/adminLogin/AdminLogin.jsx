import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminLogin.scss';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import logoGG from "../../../src/public/logo/google.png"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const [user, setUser] = useState(null);
    const [tokenGoogle, setTokenGoogle] = useState(null);
    const [tokenadmin, setTokenAdmin] = useState(null);
    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('Token Response:', tokenResponse);
            setTokenGoogle(tokenResponse.access_token);

            // Lấy thông tin người dùng từ Google API
            try {
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                setUser(userInfo.data);
                console.log(userInfo.data)
                console.log('User Info:', userInfo.data);

            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
        onError: error => {
            console.error('Login Failed:', error);
        },
    });

    useEffect(() => {

        if (user) {
            console.log('check user =>', user.email)
            const FectData = async () => {
                const response = await axios.post(`${process.env.REACT_APP_URL_SERVER}/api/v1/admin/taikhoan/dangnhapgoogle`, { tendangnhap: user.email })
                console.log(response.data.DT.access_token)
                if (response.data.EC === 1) {
                    Cookies.set('accessToken', response.data.DT.access_token)
                    navigate('/admin')
                }

            }
            FectData();
        }
    }, [user])
    const handleLogout = () => {

        setUser(null);
        setTokenGoogle(null);
    };

    return (
        <div className="admin-login">
            {user ? (
                <div>
                    <h1>Welcome, {user.displayName}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <button className='Button-gg' onClick={() => login()}><img src={logoGG} alt="Logo" className='logo-gg' /> <p>Sign in with Google</p></button>
                </div>
            )}
        </div>
    );
}

export default AdminLogin;
