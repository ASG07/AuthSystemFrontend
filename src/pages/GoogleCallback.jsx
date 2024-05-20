import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const GoogleCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setAuth, auth } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('token');
        const refreshToken = params.get('refreshToken');
        const email = params.get('email');
        const fullNameArabic = params.get('fullNameArabic');
        const fullNameEnglish = params.get('fullNameEnglish');
        const phoneNumber = params.get('phoneNumber');
        const provider = params.get('provider');
        const emailConfirmed = true;

        if (accessToken && refreshToken) {
            setAuth({ accessToken, refreshToken, email, fullNameArabic, fullNameEnglish, emailConfirmed, phoneNumber, provider });
            console.log(auth())
            navigate('/');
        } else {
            console.error('No token found in the response');
        }
    }, [location, navigate]);

    return <div>Loading...</div>;
};

export default GoogleCallback;