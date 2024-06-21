import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminLogin.scss';
import { GoogleLogin } from '@react-oauth/google';
const AdminLogin = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('/profile')
            .then(response => {
                setUser(response.data);
            })
            .catch(() => {
                setUser(null);
            });
    }, []);

    const handleLogin = () => {
        window.location.href = '/auth/google';
    };

    const handleLogout = () => {
        axios.get('/logout').then(() => {
            setUser(null);
        });
    };

    return (
        <div className="admin-login">
            {user ? (
                <div>
                    <h1>Welcome, {user.displayName}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}><GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />;</button>
            )}
        </div>
    );
}

export default AdminLogin;
