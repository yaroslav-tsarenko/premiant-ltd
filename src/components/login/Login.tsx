"use client";

import React, { FC, useState } from 'react';
import styles from './Login.module.scss';
import { AuthenticationProps } from '@/types/authentication';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TbEyeClosed } from "react-icons/tb";
import { TbEye } from "react-icons/tb";
import Link from "next/link";

const Login: FC<AuthenticationProps> = ({ headline, greeting, linkRoute, children }) => {
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email('Не верный E-mail').required('Введите E-mail'),
        password: Yup.string().min(6, 'Пароль должен быть минимум 6 символов').required('Введите пароль'),
    });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginContainer}>
                <div className={styles.head}>
                    <h1 className={styles.headline}>{headline}</h1>
                    <p className={styles.greeting}>{greeting}</p>
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    <Form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <Field
                                name="email"
                                type="email"
                                className={styles.input}
                                placeholder="E-mail"
                            />
                            <ErrorMessage name="email" component="div" className={styles.error} />
                        </div>
                        <div className={styles.inputGroup}>
                            <div className={styles.passwordWrapper}>
                                <Field
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={styles.input}
                                    placeholder="Пароль"
                                />
                                <span className={styles.icon} onClick={togglePasswordVisibility}>
                                    {showPassword ? <TbEye /> : <TbEyeClosed />}
                                </span>
                            </div>
                            <ErrorMessage name="password" component="div" className={styles.error} />
                        </div>

                        <Link href="/forgot-password" legacyBehavior className={styles.forgotPassword}>
                            <a className={styles.forgotPassword}>Забыли пароль?</a>
                        </Link>
                    </Form>
                </Formik>
                <div className={styles.bottomContainer}>
                    {children}
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

export default Login;
