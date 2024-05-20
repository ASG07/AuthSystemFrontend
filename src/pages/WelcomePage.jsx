import React from 'react';
import useAuth from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { auth } = useAuth();
    const { t } = useTranslation();


    return (
        <div className='home-container' dir={t('direction')}>
            <div className='home'>
                <h1>{t('welcome')} {auth()?.fullNameEnglish}</h1>
                <h2>{t('welcomeDescription')}:</h2>
                <h3>{auth()?.email}</h3>
            </div>
        </div>
    );
};

export default Home;