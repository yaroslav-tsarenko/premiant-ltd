import React, {useState} from 'react';
import styles from './MainInformation.module.scss';
import Dot from "@/components/dot/Dot";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {TbEye, TbEyeClosed} from "react-icons/tb";
import * as Yup from "yup";

const MainInformation = () => {

    const [passwordVisibility, setPasswordVisibility] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    type PasswordField = 'oldPassword' | 'newPassword' | 'confirmPassword';

    const togglePasswordVisibility = (field: PasswordField) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Введите имя'),
        secondName: Yup.string().required('Введите фамилию'),
        email: Yup.string().email('Неверный E-mail').required('Введите E-mail'),
        telegram: Yup.string().required('Введите Telegram'),
        oldPassword: Yup.string().min(6, 'Пароль должен быть минимум 8 символов').required('Введите пароль'),
        newPassword: Yup.string().min(6, 'Пароль должен быть минимум 8 символов').required('Введите пароль'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
            .required('Повторите пароль'),
    });

    return (
        <div className={styles.wrapper}>
            <Dot title={"Основная информация"}/>
            <Formik
                initialValues={{
                    name: '',
                    secondName: '',
                    email: '',
                    telegram: '',
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <Form className={styles.form}>
                    <div className={styles.userInfo}>
                        <div className={styles.formUserGroup}>
                            <Field name="name" type="text" placeholder="Имя" className={styles.inputUserInfo}/>
                            <ErrorMessage name="name" component="div" className={styles.error}/>
                        </div>
                        <div className={styles.formUserGroup}>
                            <Field name="secondName" type="text" placeholder="Фамилия"
                                   className={styles.inputUserInfo}/>
                            <ErrorMessage name="secondName" component="div" className={styles.error}/>
                        </div>
                        <div className={styles.formUserGroup}>
                            <Field name="email" type="email" placeholder="E-mail" className={styles.inputUserInfo}/>
                            <ErrorMessage name="email" component="div" className={styles.error}/>
                        </div>
                        <div className={styles.formUserGroup}>
                            <Field name="telegram" type="text" placeholder="Telegram" className={styles.inputUserInfo}/>
                            <ErrorMessage name="telegram" component="div" className={styles.error}/>
                        </div>
                    </div>

                    <div className={styles.passwordContainer}>
                        <div className={styles.formGroup}>
                            <Field
                                name="oldPassword"
                                type={passwordVisibility.oldPassword ? 'text' : 'password'}
                                placeholder="Пароль"
                                className={styles.input}
                            />
                            <div
                                className={styles.icon}
                                onClick={() => togglePasswordVisibility('oldPassword')}
                            >
                                {passwordVisibility.oldPassword ? <TbEye/> : <TbEyeClosed/>}
                            </div>
                            <ErrorMessage name="oldPassword" component="div" className={styles.error}/>
                        </div>
                        <div className={styles.formGroup}>
                            <Field
                                name="newPassword"
                                type={passwordVisibility.newPassword ? 'text' : 'password'}
                                placeholder="Новый пароль"
                                className={styles.input}
                            />
                            <div
                                className={styles.icon}
                                onClick={() => togglePasswordVisibility('newPassword')}
                            >
                                {passwordVisibility.newPassword ? <TbEye/> : <TbEyeClosed/>}
                            </div>
                            <ErrorMessage name="newPassword" component="div" className={styles.error}/>
                        </div>
                        <div className={styles.formGroup}>
                            <Field
                                name="confirmPassword"
                                type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                                placeholder="Повторите пароль"
                                className={styles.input}
                            />
                            <div
                                className={styles.icon}
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                            >
                                {passwordVisibility.confirmPassword ? <TbEye/> : <TbEyeClosed/>}
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" className={styles.error}/>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default MainInformation;