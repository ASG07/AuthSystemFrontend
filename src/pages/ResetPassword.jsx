import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useTranslation } from 'react-i18next';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const token = query.get('token');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();


    const onSubmit = async data => {

        try {
            await axios.post('/api/Identity/resetpassword', { email: data.email, resetCode: token, newPassword: data.newPassword });
            alert('Password has been reset successfully.');
            navigate("/login")
        } catch (error) {

            alert('Error resetting password.');
        }
    };

    return (
        <div className='resetPassword-container' dir={t('direction')}>
            <div className='resetPassword'>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>{t('email')}:</label>
                        <input
                            id="email"
                            type="email"
                            name='email'
                            {...register('email', {
                                required: t('requiredField'),
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: t('invalidEmail'),
                                },
                            })}
                        />
                        {errors.email && <span className='error'>{errors.email.message}</span>}
                    </div>
                    <div>
                        <label>{t('password')}:</label>
                        <input
                            id="newPassword"
                            type="password"
                            name='newPassword'
                            {...register('newPassword', {
                                required: t('requiredField'),
                                minLength: {
                                    value: 8,
                                    message: t('password8Chars'),
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]{8,}$/,
                                    message: t('passwordCriteria'),
                                },
                            })}
                        />
                        {errors.newPassword && <span className='error'>{errors.newPassword.message}</span>}
                    </div>
                    <button type="submit">{t('resetPassword')}</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
