import React, { FC, useRef, useEffect } from 'react';
import { PaymentFormProps } from "@/types/paymentForm";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import styles from "@/sections/payment/Payment.module.scss";
import * as Yup from "yup";

const isValidTRCAddress = (address: string) => {
    const trcAddressRegex = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
    return trcAddressRegex.test(address);
};

const PaymentForm: FC<PaymentFormProps> = ({ placeholders = [], initialValues, onSubmit, submitForm }) => {
    const formikRef = useRef<FormikProps<{ amount: string; wallet: string }>>(null);

    useEffect(() => {
        if (submitForm) {
            submitForm(() => {
                if (formikRef.current) {
                    formikRef.current.submitForm();
                }
            });
        }
    }, [submitForm]);

    const validationSchema = Yup.object({
        amount: Yup.number()
            .required('Сумма обязательна')
            .positive('Сумма должна быть положительной')
            .typeError('Сумма должна быть числом'),
        wallet: Yup.string()
            .required('Кошелек обязателен')
            .test('is-valid-trc-address', 'Введите действительный TRC адрес', isValidTRCAddress)
    });

    return (
        <Formik
            initialValues={{
                amount: initialValues.amount || '',
                wallet: initialValues.wallet || '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formikRef}
        >
            <Form className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                    <Field
                        type="number"
                        name="amount"
                        placeholder={placeholders.find(p => p.label === "Введите сумму пополнения")?.label || "Введите сумму вывода"}
                        className={styles.input}
                    />
                    <ErrorMessage name="amount" component="div" className={styles.error}/>
                </div>
                <div className={styles.inputGroup}>
                    <Field
                        type="text"
                        name="wallet"
                        placeholder={placeholders.find(p => p.label === "Введите адрес кошелька")?.label || "Введите адрес кошелька"}
                        className={styles.input}
                    />
                    <ErrorMessage name="wallet" component="div" className={styles.error}/>
                </div>
                <button type="submit" className={styles.submitButton}>Продолжить</button>
            </Form>
        </Formik>
    );
};

export default PaymentForm;