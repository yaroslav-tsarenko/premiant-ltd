"use client";

import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { newRequest } from "@/utils/newRequest";
import Alert from "@/components/alert/Alert";
import RotatingLinesLoader from "@/components/loader/RotatingLinesLoader";

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
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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

    const handleNextStep = async (values: Partial<FormData>) => {
        setFormData({ ...formData, ...values });
        setLoading(true);
        if (step === 1) {
            try {
                await newRequest.post("/user/request-password-reset", { email: values.email });
                setStep((prev) => prev + 1);
            } catch (error) {
                console.error("Error requesting password reset:", error);
            } finally {
                setLoading(false);
            }
        } else if (step === 2) {
            try {
                await newRequest.post("/user/verify-code", { email: formData.email, verificationCode: values.verificationCode });
                setStep((prev) => prev + 1);
            } catch (error) {
                console.error("Error verifying code:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handlePreviousStep = () => {
        setStep((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await newRequest.post("/user/reset-password", { email: formData.email, newPassword: formData.newPassword });
            setAlert({ title: "Success", description: "Password reset successful" });
        } catch (error) {
            console.error("Error resetting password:", error);
        } finally {
            setLoading(false);
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
                                    <ErrorMessage name="email" component="div" className={styles.error} />
                                </div>

                                <div className={styles.bottomSection}>
                                    <button type="submit" className={styles.button} disabled={loading}>
                                        {loading ? <RotatingLinesLoader title="Processing..." /> : "Восстановить пароль"}
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
                                        <ErrorMessage name="email" component="div" className={styles.error} />
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
                                    <button type="submit" className={styles.button} disabled={loading}>
                                        {loading ? <RotatingLinesLoader title="Processing..." /> : "Восстановить пароль"}
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
                                                {showNewPassword ? <TbEye /> : <TbEyeClosed />}</span>
                                        </div>
                                        <ErrorMessage name="newPassword" component="div" className={styles.error} />
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
                                                {showConfirmPassword ? <TbEye /> : <TbEyeClosed />}</span>
                                        </div>
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className={styles.error}
                                        />
                                    </div>
                                </div>
                                <div className={styles.bottomSection}>
                                    <button type="submit" className={styles.button} disabled={loading}>
                                        {loading ? <RotatingLinesLoader title="Processing..." /> : "Восстановить пароль"}
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
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
        </div>
    );
};

export default ForgotPassword;