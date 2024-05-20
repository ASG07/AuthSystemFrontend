import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from "react-spinners";
import useAuth from "../hooks/useAuth"
import GoogleButton from '../components/GoogleButton';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { setAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleGoogleLogin = () => {
        window.location.href = 'https://localhost:3002/api/Identity/google-login';
    };


    const login = async (data) => {
        try {
            const response = await axios.post("/api/Identity/login",
                JSON.stringify({ email: data.email, password: data.password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                })

            console.log(response?.data);
            const accessToken = response?.data?.token;
            const responseData = { ...response?.data, accessToken: accessToken };
            delete responseData.token;
            setAuth(responseData);
            navigate('/welcomePage');
        } catch (e) {
            console.log(e)
            if (e.response?.data?.errors[0] === "User/Password combination is wrong") {
                setError("password", {
                    message: "خطأ في البريد الالكتروني او كلمة المرور"
                })
            }


        };
    }

    const onSubmit = (data) => {
        setIsLoading(true);
        login(data);
        setTimeout(() => { setIsLoading(false) }, 3000);
    }

    return (
        <div className='login-container' dir={t('direction')}>
            <div className='login'>

                <div className='login-form'>
                    <h1>{t('login')}</h1>
                    {isLoading ? <div className='spinner'><GridLoader cssOverride={{}}></GridLoader></div>
                        :
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group">
                                <label htmlFor="email">
                                    {t('email')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    {...register("email", {
                                        required: "الحقل مطلوب",
                                        pattern: {
                                            value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "البريد الالكتروني غير صحيح"
                                        }
                                    })} />
                                {errors.email && <span className='error'>{errors.email.message}</span>}
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">
                                    {t('password')}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    {...register("password", {
                                        required: "الحقل مطلوب",
                                        minLength: {
                                            value: 5,
                                            message: "كلمة المرور قصيرة"
                                        },

                                    })} />
                                {errors.password && <span className='error'>{errors.password.message}</span>}
                            </div>
                            <button type='submit'>{t('login')}</button>
                        </form>}
                    <div style={{ textAlign: "center" }} onClick={handleGoogleLogin}><GoogleButton /></div>
                    <div className='login-footer'>
                        <div><p>{t('forgotPassword')}</p> &nbsp;&nbsp;
                            <Link to='/requestResetPassword'>{t('resetPassword')}</Link></div>
                        <div><p>{t('dontHaveAccount')}</p> &nbsp;&nbsp;
                            <Link to='/registeration'>{t('register')}</Link></div>

                    </div>

                </div>
            </div>
        </div >
    )
}
export default Login
