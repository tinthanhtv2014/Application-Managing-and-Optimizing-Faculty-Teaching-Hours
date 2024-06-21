import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminLogin.scss';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const AdminLogin = () => {
    const [user, setUser] = useState(null);
    const [tokenGoogle, setTokenGoogle] = useState(null);
    const [tokenadmin, setTokenAdmin] = useState(null);


    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => setTokenGoogle(tokenResponse),
    // });


    useEffect(() => {
        if (tokenGoogle) {
            const decoded = jwtDecode(tokenGoogle);
            console.log('Decoded Token:', decoded);
            setTokenAdmin(decoded)
            // You can send the token to your backend if needed
            axios.post('/api/google-login', { token: tokenGoogle })
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error during backend token validation:', error);
                });
        }
    }, [tokenGoogle]);

    const handleLogout = () => {
        axios.get('/logout').then(() => {
            setUser(null);
            setTokenGoogle(null);
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
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        setTokenGoogle(credentialResponse.credential);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            )}
        </div>
    );
}

export default AdminLogin;
