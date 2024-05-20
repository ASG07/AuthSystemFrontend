import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { GridLoader } from "react-spinners";

const ConfirmEmail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const message = queryParams.get('message');
    const { setAuth, auth } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    if (status === "success") {
        const updatedData = { ...auth(), emailConfirmed: true }
        setAuth(updatedData);
        setTimeout(() => {
            setIsLoading(false)

        }, 3000);
        setTimeout(() => { navigate('/'); }, 5000);

    }


    return (

        <div className='confirm-email-container'>
            <div className='confirm-email'>
                {isLoading ? (<div className='spinner'><GridLoader cssOverride={{}}></GridLoader></div>)
                    :
                    (<>
                        <h1>Email Confirmation Status</h1>
                        {status === 'success' ? (
                            <div style={{ color: 'green' }}>
                                <h2>{message}</h2>
                            </div>
                        ) : (
                            <div style={{ color: 'red' }}>
                                <h2>{message}</h2>
                            </div>
                        )}
                    </>)}
            </div>
        </div>
    );
};

export default ConfirmEmail;