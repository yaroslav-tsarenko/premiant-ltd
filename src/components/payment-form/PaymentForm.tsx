import React, {FC} from 'react';
import {PaymentFormProps} from "@/types/paymentForm";
import {ErrorMessage, Field, Form, Formik} from "formik";
import styles from "@/sections/payment/Payment.module.scss";
import * as Yup from "yup";

const PaymentForm: FC<PaymentFormProps> = ({ placeholders = [], options = [] }) => {
    const validationSchema = Yup.object({
        amount: Yup.number().required('Сумма обязательна').positive('Сумма должна быть положительной'),
        wallet: Yup.string().required('Кошелек обязателен')
    });

    return (
        <Formik
            initialValues={{ amount: '', wallet: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <Form className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                    <Field
                        type="text"
                        name="amount"
                        placeholder={placeholders.find(p => p.label === "amount")?.label || "Введите сумму вывода"}
                        className={styles.input}
                    />
                    <ErrorMessage name="amount" component="div" className={styles.error} />
                </div>
                <div className={styles.inputGroup}>
                    <Field as="select" name="wallet" className={styles.input}>
                        <option value="" label={placeholders.find(p => p.label === "wallet")?.label || "Выберите кошелек"} />
                        {options.map(option => (
                            <option key={option.value} value={option.value} label={option.label} />
                        ))}
                    </Field>
                    <ErrorMessage name="wallet" component="div" className={styles.error} />
                </div>
            </Form>
        </Formik>
    );
};

export default PaymentForm;
