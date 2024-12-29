import React, { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SimpleRegister: FC = () => {
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
        try {
            const response = await axios.post(`http://localhost:8080/register`, values, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
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
                onSubmit={handleRegister}
            >
                <Form>
                    <div>
                        <Field name="name" type="text" placeholder="Имя" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <Field name="secondName" type="text" placeholder="Фамилия" />
                        <ErrorMessage name="secondName" component="div" />
                    </div>
                    <div>
                        <Field name="email" type="email" placeholder="E-mail" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <Field name="telegram" type="text" placeholder="Telegram" />
                        <ErrorMessage name="telegram" component="div" />
                    </div>
                    <div>
                        <Field name="password" type="password" placeholder="Пароль" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <Field name="confirmPassword" type="password" placeholder="Повторите пароль" />
                        <ErrorMessage name="confirmPassword" component="div" />
                    </div>
                    <div>
                        <Field name="referralCode" type="text" placeholder="Реферальный код (не обязательно)" />
                        <ErrorMessage name="referralCode" component="div" />
                    </div>
                    <button type="submit">Зарегистрироваться</button>
                </Form>
            </Formik>
        </div>
    );
};

export default SimpleRegister;