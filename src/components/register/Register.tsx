"use client";

import React, {FC, useState} from 'react';
import styles from './Register.module.scss';
import { AuthenticationProps } from '@/types/authentication';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TbEyeClosed, TbEye } from "react-icons/tb";
import Link from "next/link";

const Register: FC<AuthenticationProps> = ({ headline, greeting, linkRoute, children }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required('Введите имя'),
        secondName: Yup.string().required('Введите фамилию'),
        email: Yup.string().email('Неверный E-mail').required('Введите E-mail'),
        telegram: Yup.string().required('Введите Telegram'),
        password: Yup.string().min(6, 'Пароль должен быть минимум 8 символов').required('Введите пароль'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
            .required('Повторите пароль'),
        referralCode: Yup.string().required('Введите реферальный код'),
    });

    return (
        <div className={styles.wrapper}>
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
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
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
                                    placeholder="Реферальный код"
                                    className={styles.inputReferral}
                                />
                                <ErrorMessage name="referralCode" component="div" className={styles.error}/>
                            </div>
                        </div>
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

export default Register;