import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Toggle } from "../components/Toggle";

const NavBar = (props) => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    var showWarning = false;


    if (!auth()?.emailConfirmed && auth()) {
        showWarning = true;
    }

    const { t } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    //console.log(auth());
    const resendConfirmation = async () => {
        const response = await axiosPrivate.post("/api/Identity/sendconfirmation");
        console.log(response);
    }

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.setItem('user', '')
        navigate("/");
    };

    return (<>
        {showWarning ?
            <div className="confirmation-container" dir={t('direction')}>
                <div className="confirmation-warning">
                    <h4>{t('resetPasswordLinkSentDescription')}</h4> &nbsp;&nbsp;&nbsp;
                    <button onClick={() => resendConfirmation()}>{t('resendConfirmationEmail')}</button>
                </div>
            </div>
            : null}
        <div className="nav-container" dir={t('direction')} >
            <div className="nav">


                <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>{t('authSystem')}</h2>
                <div className="language-dropdown">
                    <select onChange={(e) => changeLanguage(e.target.value)}>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                    </select>
                </div>

                {auth() ? (
                    <div className="authorized">

                        <div style={{ marginInlineEnd: "30px", color: "white" }}>Welcome {auth()?.fullNameEnglish}</div>
                        <button onClick={() => handleLogout()}>{t('logout')}</button>
                        <button onClick={() => navigate("/profile")}>{t('profile')}</button>
                    </div>
                ) : (
                    <div className="guest">

                        <button onClick={() => navigate("/login")}>{t('login')}</button>
                        <button onClick={() => navigate("/registeration")}>{t('register')}</button>
                    </div>
                )}
            </div>
        </div></>
    );
};

export default NavBar;