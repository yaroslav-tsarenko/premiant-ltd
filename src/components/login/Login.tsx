"use client";

import React, {FC, useState} from 'react';
import styles from './Login.module.scss';
import {AuthenticationProps} from '@/types/authentication';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {TbEyeClosed, TbEye} from "react-icons/tb";
import Link from "next/link";
import Button from "@/components/button/Button";
import Alert from '@/components/alert/Alert';
import {newRequest} from "@/utils/newRequest";
import {useUser} from "@/utils/UserContext";
import Validation from "@/components/validation-component/Validation";

const Login: FC<AuthenticationProps> = ({headline, greeting, linkRoute}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [processing, setProcessing] = useState(false);
    const user = useUser();
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);

    const validationSchema = Yup.object({
        email: Yup.string().email('Не верный E-mail').required('Введите E-mail'),
        password: Yup.string().min(6, 'Пароль должен быть минимум 6 символов').required('Введите пароль'),
    });

    const handleLogin = async (values: { email: string; password: string }) => {
        setProcessing(true);
        setAlert(null);
        try {
            const response = await newRequest.post('/auth/login', values);
            console.log(response.data);
            setAlert({title: 'Успех!', description: 'Вход выполнен успешно!'});
            setTimeout(() => {
                window.location.href = '/account';
            }, 2000);
        } catch (error) {
            console.error(error);
            setAlert({title: 'Ошибка', description: 'Неверные учетные данные'});
        }
    };

    return (
        <div className={styles.wrapper}>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)}/>}
            {user ?
               <Validation title="Вы уже авторизованы"/>
                :
                <div className={styles.loginContainer}>
                    <div className={styles.head}>
                        <h1 className={styles.headline}>{headline}</h1>
                        <p className={styles.greeting}>{greeting}</p>
                    </div>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        <Form className={styles.form}>
                            <div className={styles.inputGroup}>
                                <Field
                                    name="email"
                                    type="email"
                                    className={styles.input}
                                    placeholder="E-mail"
                                />
                                <ErrorMessage name="email" component="div" className={styles.error}/>
                            </div>
                            <div className={styles.inputGroup}>
                                <div className={styles.passwordWrapper}>
                                    <Field
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className={styles.input}
                                        placeholder="Пароль"
                                    />
                                    <span className={styles.icon} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <TbEye/> : <TbEyeClosed/>}
                                </span>
                                </div>
                                <ErrorMessage name="password" component="div" className={styles.error}/>
                            </div>
                            <Button type="submit" variant="authentication">
                                {processing ? 'Вход...' : 'Войти'}
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
                                Забыли пароль?
                                <Link href={"/forgot-password"} legacyBehavior>
                                    <a className={styles.linkName}>Восстановить пароль</a>
                                </Link>
                            </p>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Login;