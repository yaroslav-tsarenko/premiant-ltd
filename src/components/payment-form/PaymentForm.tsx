import React, { FC, useRef, useEffect } from 'react';
import { PaymentFormProps } from "@/types/paymentForm";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import styles from "@/sections/payment/Payment.module.scss";
import * as Yup from "yup";

const PaymentForm: FC<PaymentFormProps> = ({ placeholders = [], options = [], initialValues, onSubmit, submitForm }) => {
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
        amount: Yup.number().required('Сумма обязательна').positive('Сумма должна быть положительной'),
        wallet: Yup.string().required('Кошелек обязателен')
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
                        type="text"
                        name="amount"
                        placeholder={placeholders.find(p => p.label === "Введите сумму пополнения")?.label || "Введите сумму вывода"}
                        className={styles.input}
                    />
                    <ErrorMessage name="amount" component="div" className={styles.error} />
                </div>
                <div className={styles.inputGroup}>
                    <Field as="select" name="wallet" className={styles.input}>
                        <option value="" label={placeholders.find(p => p.label === "Выберите кошелек")?.label || "Выберите кошелек"} />
                        {options.map(option => (
                            <option key={option.value} value={option.value} label={option.label} />
                        ))}
                    </Field>
                    <ErrorMessage name="wallet" component="div" className={styles.error} />
                </div>
                <button type="submit" className={styles.submitButton}>Продолжить</button>
            </Form>
        </Formik>
    );
};

export default PaymentForm;