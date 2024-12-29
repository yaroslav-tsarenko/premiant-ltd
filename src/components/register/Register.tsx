"use client";

import React, { FC, useState } from 'react';
import styles from './Register.module.scss';
import { AuthenticationProps } from '@/types/authentication';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TbEyeClosed, TbEye } from "react-icons/tb";
import Link from "next/link";
import Button from "@/components/button/Button";
import Alert from '@/components/alert/Alert';
import {newRequest} from "@/utils/newRequest";
import RotatingLinesLoader from "@/components/loader/RotatingLinesLoader";
import {useRouter} from "next/navigation";

const Register: FC<AuthenticationProps> = ({ headline, greeting, linkRoute }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);

    const validationSchema = Yup.object({
        name: Yup.string().required('Введите имя'),
        secondName: Yup.string().required('Введите фамилию'),
        email: Yup.string().email('Неверный E-mail').required('Введите E-mail'),
        telegram: Yup.string().required('Введите Telegram'),
        password: Yup.string().min(6, 'Пароль должен быть минимум 8 символов').required('Введите пароль'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
            .required('Повторите пароль'),
        referralCode: Yup.string(),
    });

    const handleRegister = async (values: {
        name: string;
        secondName: string;
        email: string;
        telegram: string;
        password: string;
        confirmPassword: string;
        referralCode?: string;
    }) => {
        setProcessing(true);
        setAlert(null);
        try {
            const response = await newRequest.post('/auth/register', values);
            console.log(response.data);
            document.cookie = `token=${response.data.token}; path=/;`;
            newRequest.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            setAlert({ title: 'Успех!', description: 'Спасибо за регистрацию!' });
            setTimeout(() => {
                setTimeout(() => {
                    setRedirect(true);
                    router.push('/login');
                }, 1000);
            }, 300);
        } catch (error) {
            console.error(error);
            if (error) {
                setAlert({ title: 'Упс!', description: "Пользователь существует" });
            } else {
                setAlert({ title: 'Error', description: 'Register Failure' });
            }
        }
        setProcessing(false);
    };

    return (
        <div className={styles.wrapper}>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
            <div className={styles.registerContainer}>
                <div className={styles.head}>
                    <h1 className={styles.headline}>{headline}</h1>
                    <p className={styles.greeting}>{greeting}</p>
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        secondName: '',
                        email: '',
                        telegram: '',
                        password: '',
                        confirmPassword: '',
                        referralCode: '',
                        balance: 0,
                        referrals: '',
                        tariff: 0,
                        earnings: 0,
                        withdrawals: 0
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form className={styles.form}>
                        <div className={styles.gridContainer}>
                            <div className={styles.formGroup}>
                                <Field name="name" type="text" placeholder="Имя" className={styles.input}/>
                                <ErrorMessage name="name" component="div" className={styles.error}/>
                            </div>
                            <div className={styles.formGroup}>
                                <Field name="secondName" type="text" placeholder="Фамилия" className={styles.input}/>
                                <ErrorMessage name="secondName" component="div" className={styles.error}/>
                            </div>
                            <div className={styles.formGroup}>
                                <Field name="email" type="email" placeholder="E-mail" className={styles.input}/>
                                <ErrorMessage name="email" component="div" className={styles.error}/>
                            </div>
                            <div className={styles.formGroup}>
                                <Field name="telegram" type="text" placeholder="Telegram" className={styles.input}/>
                                <ErrorMessage name="telegram" component="div" className={styles.error}/>
                            </div>
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
                                    {showPassword ? <TbEye/> : <TbEyeClosed/>}
                                </div>
                                <ErrorMessage name="password" component="div" className={styles.error}/>
                            </div>
                            <div className={styles.formGroup}>
                                <Field
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Повторите пароль"
                                    className={styles.input}
                                />
                                <div
                                    className={styles.icon}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <TbEye/> : <TbEyeClosed/>}
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className={styles.error}/>
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <Field
                                    name="referralCode"
                                    type="text"
                                    placeholder="Реферальный код (не обязательно)"
                                    className={styles.inputReferral}
                                />
                                <ErrorMessage name="referralCode" component="div" className={styles.error}/>
                            </div>
                        </div>
                        <Button type="submit" variant="authentication">
                            {processing ? (
                                redirect ? <RotatingLinesLoader title="Переадресация..." /> : <RotatingLinesLoader title="Обработка..." />
                            ) : 'Зарегистрироваться'}
                        </Button>
                    </Form>
                </Formik>
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
        </div>
    );
};

export default Register;