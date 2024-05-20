import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { GridLoader } from "react-spinners";
import { useTranslation } from 'react-i18next';


const Registration = () => {
    const { register, handleSubmit, formState: { errors }, watch, setError } = useForm();
    const { setAuth } = useAuth();
    const password = useRef({});
    password.current = watch('password', '');
    const REGISTER_URL = "/api/Identity/register";
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onSubmit = async (data) => {
        console.log(data);
        setIsLoading(true);


        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ ...data }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            console.log(response?.data);
            const accessToken = response?.data?.token;
            const returnData = { ...response?.data, accessToken: accessToken };
            delete returnData.token;
            setAuth(returnData);
            setTimeout(() => { setIsLoading(false) }, 1000);
            navigate('/welcomePage');
            console.log('User registered successfully');
        } catch (e) {
            const errorMessage = e.response?.data?.errors[0];
            if (errorMessage === "User with this email already exists") {
                setError("email", { message: "البريد الالكتروني مسجل مسبقا" });
            } else if (errorMessage === "Passwords must have at least one non alphanumeric character.") {
                setError("password", { message: "كلمة المرور يجب ان تحتوي على رمز واحد على الاقل" });
            } else if (errorMessage === "Passwords must be at least 6 characters.") {
                setError("password", { message: "كلمة المرور يجب ان تكون اطول من 5 خانات" });
            } else if (errorMessage === "Passwords must have at least one lowercase ('a'-'z').") {
                setError("password", { message: "كلمة المرور يجب ان تحتوي على حرف صغير (a-z)" });
            } else if (errorMessage === "Passwords must have at least one uppercase ('A'-'Z').") {
                setError("password", { message: "كلمة المرور يجب ان تحتوي على حرف كبير (A-Z)" });
            }
            setTimeout(() => { setIsLoading(false) }, 1000);
        }
    };


    const validateBirthDate = (value) => {
        const currentDate = new Date();
        const birthDate = new Date(value);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return age >= 18 || 'You must be at least 18 years old';
    };

    return (
        <div className='register-container' dir={t('direction')}>
            <div className='register' >
                <h1>{t('register')}</h1>
                {isLoading ? <div className='spinner'><GridLoader cssOverride={{}}></GridLoader></div>
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="fullNameEnglish">{t('fullNameEnglish')}</label>
                            <input
                                id="fullNameEnglish"
                                {...register('fullNameEnglish', {
                                    required: 'Full name in English is required',
                                    pattern: {
                                        value: /^[A-Za-z\s]{1,50}$/,
                                        message: 'Full name must be English letters only and up to 50 characters',
                                    },
                                })}
                            />
                            {errors.fullNameEnglish && <span className='error' >{errors.fullNameEnglish.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="fullNameArabic">{t('fullNameArabic')}</label>
                            <input
                                id="fullNameArabic"
                                {...register('fullNameArabic', {
                                    required: 'Full name in Arabic is required',
                                    pattern: {
                                        value: /^[\u0600-\u06FF\s]{1,50}$/,
                                        message: 'Full name must be Arabic letters only and up to 50 characters',
                                    },
                                })}
                            />
                            {errors.fullNameArabic && <span className='error' >{errors.fullNameArabic.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="birthDate">{t('birthDate')}</label>
                            <input
                                id="birthDate"
                                type="date"
                                name='birthDate'
                                {...register('birthDate', {
                                    required: 'Birth date is required',
                                    validate: validateBirthDate,
                                })}
                            />
                            {errors.birthDate && <span className='error' >{errors.birthDate.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">{t('phoneNumber')}</label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                name='phoneNumber'
                                {...register('phoneNumber', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^\d{1,12}$/,
                                        message: 'Phone number must be numbers only and up to 12 characters',
                                    },
                                })}
                            />
                            {errors.phoneNumber && <span className='error' >{errors.phoneNumber.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="email">{t('email')}</label>
                            <input
                                id="email"
                                type="email"
                                name='email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && <span className='error' >{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password">{t('password')}</label>
                            <input
                                id="password"
                                type="password"
                                name='password'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]{8,}$/,
                                        message: 'Password must include at least one letter, one number, and one symbol',
                                    },
                                })}
                            />
                            {errors.password && <span className='error' >{errors.password.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name='confirmPassword'
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: value => value === password.current || 'Passwords do not match',
                                })}
                            />
                            {errors.confirmPassword && <span className='error' >{errors.confirmPassword.message}</span>}
                        </div>
                        <button type="submit">{t('register')}</button>
                    </form>}
                <div className='register-footer'>
                    <p>{t('alreadyHaveAccount')}</p>
                    <a href='/login'>{t('login')}</a>
                </div>
            </div></div>
    );
};

export default Registration;
