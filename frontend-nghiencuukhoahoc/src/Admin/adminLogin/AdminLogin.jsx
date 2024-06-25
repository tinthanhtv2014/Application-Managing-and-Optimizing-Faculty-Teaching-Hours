import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminLogin.scss';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import logoGG from "../../../src/public/logo/google.png"
const AdminLogin = () => {
    const [user, setUser] = useState(null);
    const [tokenGoogle, setTokenGoogle] = useState(null);
    const [tokenadmin, setTokenAdmin] = useState(null);


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
