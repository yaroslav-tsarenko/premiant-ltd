"use client";

import React, {FC, useEffect, useState} from 'react';
import styles from './Register.module.scss';
import { AuthenticationProps } from '@/types/authentication';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TbEyeClosed, TbEye } from "react-icons/tb";
import Link from "next/link";
import Button from "@/components/button/Button";
import Alert from '@/components/alert/Alert';
import RotatingLinesLoader from "@/components/loader/RotatingLinesLoader";
import Validation from "@/components/validation-component/Validation";
import { useUser } from "@/utils/UserContext";
import { BACKEND_URL } from "@/constants/constants";
import { useLocation } from "@/hooks/useLocation";

const Register: FC<AuthenticationProps> = ({ headline, greeting, linkRoute, referralCode }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);
    const [step, setStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    const [registrationData, setRegistrationData] = useState<any>(null);
    const user = useUser();
    const { location, error } = useLocation();
    if (error) {
        console.error('Error:', error);
        return null;
    }
    const scrollPage = (direction: 'top' | 'bottom') => {
        if (direction === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (direction === 'bottom') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };
    useEffect(() => {
        setTimeout(() => {
            scrollPage("top")
        }, 300)
    }, []);
    const validationSchema = Yup.object({
        name: Yup.string().required('Введите имя'),
        secondName: Yup.string().required('Введите фамилию'),
        email: Yup.string().email('Неверный E-mail').required('Введите E-mail'),
        telegram: Yup.string()
            .matches(/^@[a-zA-Z0-9]+$/, 'Telegram должен начинаться с @ и содержать только латинские буквы и цифры')
            .required('Введите Telegram'),
        curator: Yup.string().optional(),
        password: Yup.string().min(6, 'Пароль должен быть минимум 8 символов').required('Введите пароль'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
            .required('Повторите пароль'),
        referralCode: Yup.string().optional(),
    });

    const handleRegister = async (values: {
        name: string;
        secondName: string;
        email: string;
        telegram: string;
        password: string;
        confirmPassword: string;
        curator?: string;
        idAddress?: string;
        referralCode?: string;
        fullLocationName?: string;
    }) => {
        setProcessing(true);
        setAlert(null);
        try {
            const fullLocation = `${location?.country}, ${location?.city}, ${location?.state}, ${location?.address}, ${location?.apartment}, ${location?.postalCode}`;
            const response = await fetch(`${BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, fullLocationName: fullLocation, ipAddress: location?.ip }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setRegistrationData(values);
            setStep(2);
        } catch (error) {
            console.error(error);
            setAlert({ title: 'Упс!', description: 'Пользователь уже существует или произошла ошибка на сервере' });
        } finally {
            setProcessing(false);
        }
    };

    const handleVerifyCode = async () => {
        setProcessing(true);
        setAlert(null);
        try {
            const response = await fetch(`${BACKEND_URL}/auth/verify-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: registrationData.email, verificationCode }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            document.cookie = `token=${data.token}; path=/;`;
            setAlert({ title: 'Успех!', description: 'Спасибо за регистрацию!' });
            setTimeout(() => {
                window.location.href = '/login';
            });
        } catch (error) {
            console.error(error);
            setAlert({ title: 'Упс!', description: 'Неверный код подтверждения или произошла ошибка на сервере' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
            {user ?
                <Validation title="Вы уже зарегистрированы, спасибо за регистрацию!" />
                :
                <div className={styles.registerContainer}>
                    {step === 1 ? (
                        <div className={styles.head}>
                            <h1 className={styles.headline}>{headline}</h1>
                            <p className={styles.greeting}>{greeting}</p>
                        </div>
                    ) : (
                        <div className={styles.head}>
                            <h1 className={styles.headline}>Подтвердите вашу почту</h1>
                            <p className={styles.greeting}>Проверьте вашу электронную почту, мы уже отправили код для подтверждения почты. Если письмо не пришло, пожалуйста, проверьте папку "Спам" или попробуйте еще раз!</p>
                        </div>
                    )}
                    {step === 1 ? (
                        <Formik
                            initialValues={{
                                name: '',
                                secondName: '',
                                email: '',
                                telegram: '',
                                password: '',
                                confirmPassword: '',
                                referralCode: referralCode || '',
                                curator: referralCode || '',
                                idAddress: '',
                                balance: 0,
                                referrals: '',
                                tariff: 0,
                                earnings: 0,
                                withdrawals: 0,
                                fullLocationName: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleRegister}
                        >
                            <Form className={styles.form}>
                                <div className={styles.gridContainer}>
                                    <div className={styles.formGroup}>
                                        <Field name="name" type="text" placeholder="Имя" className={styles.input} />
                                        <ErrorMessage name="name" component="div" className={styles.error} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <Field name="secondName" type="text" placeholder="Фамилия" className={styles.input} />
                                        <ErrorMessage name="secondName" component="div" className={styles.error} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <Field name="email" type="email" placeholder="E-mail" className={styles.input} />
                                        <ErrorMessage name="email" component="div" className={styles.error} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <Field name="telegram" type="text" placeholder="Telegram" className={styles.input} />
                                        <ErrorMessage name="telegram" component="div" className={styles.error} />
                                    </div>
                                    <div>
                                        <div className={styles.formGroup}>
                                            <Field
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Пароль"
                                                className={styles.input}
                                            />
                                            <div
                                                className={styles.icon}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <TbEye /> : <TbEyeClosed />}
                                            </div>
                                        </div>
                                        <ErrorMessage name="password" component="div" className={styles.error} />
                                    </div>
                                    <div>
                                        <div className={styles.formGroup}>
                                            <Field
                                                name="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder="Повторите пароль"
                                                className={styles.input}
                                            />
                                            <div
                                                className={styles.icon}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? <TbEye /> : <TbEyeClosed />}
                                            </div>
                                        </div>
                                        <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
                                    </div>
                                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                        <Field
                                            name="curator"
                                            type="text"
                                            placeholder="Реферальный код (не обязательно)"
                                            className={styles.inputReferral}
                                        />
                                        <ErrorMessage name="curator" component="div" className={styles.error} />
                                    </div>
                                </div>
                                <Button type="submit" variant="authentication">
                                    {processing ?
                                        <RotatingLinesLoader title="Регистрация..." />
                                        :
                                        'Зарегистрироваться'}
                                </Button>
                            </Form>
                        </Formik>
                    ) : (
                        <div className={styles.verificationContainer}>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="Код с E-mail"
                                className={styles.input}
                            />
                            <Button onClick={handleVerifyCode} variant="authentication">
                                {processing ?
                                    <RotatingLinesLoader title="Проверка..." />
                                    :
                                    'Подтвердить'}
                            </Button>
                        </div>
                    )}
                    <div className={styles.bottomContainer}>
                        {linkRoute.map((link, index) => (
                            <p key={index} className={styles.link}>
                                Или
                                <Link href={link.route} legacyBehavior>
                                    <a className={styles.linkName}>{link.name}</a>
                                </Link>
                            </p>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Register;