import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { MdModeEdit } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useForm } from 'react-hook-form';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { auth, setAuth } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const getCurrentDateInput = (date) => {

        const dateObj = new Date(date);
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const day = ("0" + dateObj.getDate()).slice(-2);
        const year = dateObj.getFullYear();

        const shortDate = `${year}-${month}-${day}`;

        return shortDate;
    };

    const onSubmit = async (data) => {
        try {
            console.log(data);

            const userData = {
                email: data.email,
                fullNameEnglish: data?.fullNameEnglish,
                fullNameArabic: data?.fullNameArabic,
                birthDate: data?.birthDate,
                phoneNumber: data?.phoneNumber
            }
            const response = await axiosPrivate.put('/api/Identity/update', userData);
            console.log(response.data);
            const responseData = { ...response.data, accessToken: auth().accessToken, refreshToken: auth().refreshToken };
            setAuth(responseData);
            setIsEditing(false);
        } catch (error) {
            console.error('Login error', error);
        }
    }

    const validateBirthDate = (value) => {
        const currentDate = new Date();
        const birthDate = new Date(value);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return age >= 18 || 'You must be at least 18 years old';
    };

    return (
        <div className='profile-container' dir={t('direction')}>
            <form className='profile' onSubmit={handleSubmit(onSubmit)}>
                <h1>{t('profileInfo')} {auth()?.provider ? <span>(Google Signin)</span> : null}</h1>
                <div>
                    <div>{!isEditing ?
                        <>
                            <h3>{t('fullNameEnglish')}</h3>
                            <p>{auth().fullNameEnglish}</p>
                        </> : <>
                            <label htmlFor="fullNameEnglish"><h3>{t('fullNameEnglish')}</h3></label>
                            <input
                                id="fullNameEnglish"
                                type="text"
                                name='fullNameEnglish'
                                defaultValue={auth().fullNameEnglish}
                                {...register('fullNameEnglish', {
                                    required: t('requiredField'),
                                    pattern: {
                                        value: /^[A-Za-z\s]{1,50}$/,
                                        message: 'Full name must be English letters only and up to 50 characters',
                                    },
                                })}
                            />
                            {errors.fullNameEnglish && <span className='error' >{errors.fullNameEnglish.message}</span>}
                        </>}
                    </div>
                    <div>{!isEditing ?
                        <>
                            <h3>{t('fullNameArabic')}</h3>
                            <p>{auth().fullNameArabic}</p>
                        </> : <>
                            <label htmlFor="fullNameArabic"><h3>{t('fullNameArabic')}</h3></label>
                            <input
                                id="fullNameArabic"
                                type="text"
                                name='fullNameArabic'
                                defaultValue={auth().fullNameArabic}
                                {...register('fullNameArabic', {
                                    required: t('requiredField'),
                                    pattern: {
                                        value: /^[\u0600-\u06FF\s]{1,50}$/,
                                        message: 'Full name must be Arabic letters only and up to 50 characters',
                                    },
                                })}
                            />
                            {errors.fullNameArabic && <span className='error' >{errors.fullNameArabic.message}</span>}
                        </>}
                    </div>
                    <div>{!isEditing ?
                        <>
                            <h3>{t('birthDate')}</h3>
                            <p>{getCurrentDateInput(auth().birthDate)}</p>
                        </> : <>
                            <label htmlFor="birthDate"><h3>{t('birthDate')}</h3></label>
                            <input
                                id="birthDate"
                                type="date"
                                name='birthDate'
                                defaultValue={new Date(auth().birthDate).toLocaleDateString("en-CA")}
                                {...register('birthDate', {
                                    required: t('requiredField'),
                                    validate: validateBirthDate,
                                })}
                            />
                            {errors.birthDate && <span className='error' >{errors.birthDate.message}</span>}
                        </>}
                    </div>
                    <div>{!isEditing ?
                        <>
                            <h3>{t('phoneNumber')}</h3>
                            <p>{auth().phoneNumber}</p>
                        </> : <>
                            <label htmlFor="phoneNumber"><h3>{t('phoneNumber')}</h3></label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                name='phoneNumber'
                                defaultValue={auth().phoneNumber}
                                {...register('phoneNumber', {
                                    required: t('requiredField'),
                                    pattern: {
                                        value: /^\d{1,12}$/,
                                        message: 'Phone number must be numbers only and up to 12 characters',
                                    },
                                })}
                            />
                            {errors.phoneNumber && <span className='error' >{errors.phoneNumber.message}</span>}
                        </>}
                    </div>
                    <div>{!isEditing ?
                        <>
                            <h3>{t('email')}</h3>
                            <p>{auth().email}</p>
                        </> : <>
                            <label htmlFor="email"><h3>{t('email')}</h3></label>
                            <input
                                id="email"
                                type="email"
                                name='email'
                                defaultValue={auth().email}
                                {...register('email', {
                                    required: t('requiredField'),
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: t('invalidEmail'),
                                    },
                                })
                                }
                            />
                            {errors.email && <span className='error' >{errors.email.message}</span>}
                        </>}
                    </div>
                </div>
                <div className='controls'>
                    {isEditing ? <div className='edit-controls'><button type='submit'>{t('save')}&nbsp;&nbsp;<MdModeEdit /></button>
                        <button onClick={() => setIsEditing(false)} className='cancel' >{t('cancel')}&nbsp;&nbsp;<MdOutlineCancel /></button></div>
                        :
                        <>{!auth()?.provider && <button onClick={() => setIsEditing(true)}>{t('edit')}&nbsp;&nbsp;<FaEdit /></button>}</>
                    }


                </div>
            </form>
        </div>
    );
};

export default Profile;