import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';
import { useTranslation } from 'react-i18next';

const RequestResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();
    const onSubmit = async data => {
        try {
            await axios.post('/api/Identity/generate-reset-password-token', { email: data.email });
            alert(`If the email is registered, we've sent a reset link to: ${data.email}`);
        } catch (error) {
            alert('Failed to send reset link.');
        }
    };

    return (
        <div className='requestResetPassword-container' dir={t('direction')}>
            <div className='requestResetPassword'>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>{t('email')}:</label> <br />
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
                    <button type="submit" >{t('sendResetLink')}</button>
                </form>
            </div>
        </div>
    );
};

export default RequestResetPassword;