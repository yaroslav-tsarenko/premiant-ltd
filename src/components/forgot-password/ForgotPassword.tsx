"use client";

import React, {useState} from "react";
import styles from "./ForgotPassword.module.scss";
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {TbEye, TbEyeClosed} from "react-icons/tb";

type FormData = {
    email: string;
    verificationCode: string;
    newPassword: string;
    confirmPassword: string;
};

const ForgotPassword = () => {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        verificationCode: "",
        newPassword: "",
        confirmPassword: "",
    });

    const validationSchemas = [
        Yup.object({
            email: Yup.string().email("Такой E-mail не заригестрирован на нашем сервисе").required("Введите E-mail "),
        }),
        Yup.object({
            verificationCode: Yup.string().required("Введите код, который мы отправили Вам на E-mail"),
        }),
        Yup.object({
            newPassword: Yup.string()
                .min(8, "Новый пароль должен содержать минимум 8 символов")
                .required("Введите новый пароль"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Пароли должны совпадать ")
                .required("Подтвердите новый пароль"),
        }),
    ];

    const handleNextStep = (values: Partial<FormData>) => {
        setFormData({...formData, ...values});
        setStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setStep((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("/api/reset-password", formData);
            console.log("Password reset successful:", response.data);
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className={styles.wrapper}>
            <Formik
                initialValues={formData}
                validationSchema={validationSchemas[step - 1]}
                onSubmit={(values) => {
                    if (step < 3) {
                        handleNextStep(values);
                    } else {
                        handleSubmit();
                    }
                }}
            >
                {() => (
                    <Form>
                        {step === 1 && (
                            <div className={styles.step}>
                                <div className={styles.head}>
                                    <h1 className={styles.headline}>ЗАБЫЛИ ПАРОЛЬ</h1>
                                    <p className={styles.greeting}>
                                        Не переживайте, такое случается! Введите ваш email, и мы поможем с
                                        восстановлением доступа. Все просто и быстро!
                                    </p>
                                </div>

                                <div className={styles.inputGroup}>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        className={styles.input}
                                    />
                                    <ErrorMessage name="email" component="div" className={styles.error}/>
                                </div>

                                <div className={styles.bottomSection}>
                                    <button type="submit" className={styles.button}>
                                        Восстановить пароль
                                    </button>

                                    <p className={styles.bottomText}>
                                        Или {" "}
                                        <button
                                            type="button"
                                            className={styles.link}
                                        >
                                            вернуться назад
                                        </button>
                                    </p>
                                </div>

                            </div>
                        )}

                        {step === 2 && (
                            <div className={styles.step}>
                                <div className={styles.head}>
                                    <h1 className={styles.headline}>ЗАБЫЛИ ПАРОЛЬ</h1>
                                    <p className={styles.greeting}>
                                        Проверьте ваш электронный ящик, мы уже отправили код для восстановления доступа.
                                        Если письмо не приходит, проверьте папку &quot;Спам&quot; или попробуйте еще раз
                                    </p>
                                </div>

                                <div className={styles.groups}>
                                    <div className={styles.inputGroup}>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="E-mail"
                                            className={styles.input}
                                            readOnly
                                        />
                                        <ErrorMessage name="email" component="div" className={styles.error}/>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <Field
                                            type="text"
                                            name="verificationCode"
                                            placeholder="Код с E-mail"
                                            className={styles.input}
                                        />
                                        <ErrorMessage
                                            name="verificationCode"
                                            component="div"
                                            className={styles.error}
                                        />
                                    </div>
                                </div>

                                <div className={styles.bottomSection}>
                                    <button type="submit" className={styles.button}>
                                        Восстановить пароль
                                    </button>

                                    <p className={styles.bottomText}>
                                        Или {" "}
                                        <button
                                            type="button"
                                            onClick={handlePreviousStep}
                                            className={styles.link}
                                        >
                                            вернуться назад
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className={styles.step}>
                                <div className={styles.head}>
                                    <h1 className={styles.headline}>ЗАБЫЛИ ПАРОЛЬ</h1>
                                    <p className={styles.greeting}>
                                        Проверьте ваш электронный ящик, мы уже отправили код для восстановления доступа.
                                        Если письмо не приходит, проверьте папку &quot;Спам&quot; или попробуйте еще раз
                                    </p>
                                </div>
                                <div className={styles.groups}>
                                    <div className={styles.inputGroup}>
                                        <div className={styles.passwordWrapper}>
                                            <Field
                                                name="newPassword"
                                                type={showNewPassword ? 'text' : 'password'}
                                                className={styles.input}
                                                placeholder="Новый пароль"
                                            />
                                            <span className={styles.icon} onClick={toggleNewPasswordVisibility}>
                                                {showNewPassword ? <TbEye/> : <TbEyeClosed/>}</span>
                                        </div>
                                        <ErrorMessage name="newPassword" component="div" className={styles.error}/>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <div className={styles.passwordWrapper}>
                                            <Field
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                placeholder="Повторите новый пароль"
                                                className={styles.input}
                                            />
                                            <span className={styles.icon} onClick={toggleConfirmPasswordVisibility}>
                                                {showConfirmPassword ? <TbEye/> : <TbEyeClosed/>}</span>
                                        </div>
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className={styles.error}
                                        />
                                    </div>
                                </div>
                                <div className={styles.bottomSection}>
                                    <button type="submit" className={styles.button}>
                                        Восстановить пароль
                                    </button>

                                    <p className={styles.bottomText}>
                                        Или {" "}
                                        <button
                                            type="button"
                                            onClick={handlePreviousStep}
                                            className={styles.link}
                                        >
                                            вернуться назад
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;