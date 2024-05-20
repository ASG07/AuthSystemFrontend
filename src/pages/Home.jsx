import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className='home-container' dir={t('direction')}>
            <div className='home'>
                <h1>{t('homeHeader')}</h1>
                <h2>{t('homeDescription')}</h2>
            </div>
        </div>
    );
};

export default Home;