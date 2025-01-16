import React, {FC, useRef, useEffect, useState} from 'react';
import {PaymentFormProps} from "@/types/paymentForm";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import styles from "@/sections/payment/Payment.module.scss";
import * as Yup from "yup";
import axios from "axios";
import {BACKEND_URL} from "@/constants/constants";
import Alert from "@/components/alert/Alert";
import {PiCopySimple} from "react-icons/pi";

const isValidTRCAddress = (address: string) => {
    const trcAddressRegex = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
    return trcAddressRegex.test(address);
};

const PaymentForm: FC<PaymentFormProps> = ({
                                               placeholders = [],
                                               initialValues,
                                               onSubmit,
                                               submitForm,
                                               type = 'withdraw'
                                           }) => {
    const formikRef = useRef<FormikProps<{ amount: string; wallet: string }>>(null);
    const [trcAddress, setTrcAddress] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

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
            .min(100, 'Минимальная сума 100$')
            .typeError('Сумма должна быть числом'),
        wallet: type === 'deposit' ? Yup.string() : Yup.string()
            .required('Кошелек обязателен')
            .test('is-valid-trc-address', 'Введите действительный TRC адрес', isValidTRCAddress)
    });

    useEffect(() => {
        axios.get(`${BACKEND_URL}/trc/get-trc`)
            .then(response => {
                setTrcAddress(response.data.address);
                console.log("Static trc:", response.data);
            })
            .catch(error => {
                console.error('Error fetching TRC address:', error);
            });
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(trcAddress).then(() => {
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000);
        });
    };

    const initialFormValues = {
        amount: initialValues.amount || '',
        wallet: type === 'deposit' ? trcAddress || '' : initialValues.wallet || '',
    };

    return (
        <>
            {alertVisible && (
                <Alert
                    title="АДРЕСС СКОПИРОВАН!"
                    description="После оплаты на адресс деньги будут зачислены как только система их обработает"
                    onClose={() => setAlertVisible(false)}
                />
            )}
            <Formik
                initialValues={initialFormValues}
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
                    {type === 'deposit' ? (
                        <div className={styles.inputGroup}>
                            <div className={styles.input}>
                                {trcAddress || 'Загрузка...'}
                                <button type="button" className={styles.copyButton} onClick={handleCopy}><PiCopySimple/>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.inputGroup}>
                            <Field
                                type="text"
                                name="wallet"
                                placeholder={placeholders.find(p => p.label === "Введите адрес кошелька")?.label || "Введите адрес кошелька"}
                                className={styles.input}
                            />
                            <ErrorMessage name="wallet" component="div" className={styles.error}/>
                        </div>
                    )}
                    <button type="submit" className={styles.submitButton}>Продолжить</button>
                </Form>
            </Formik>
        </>
    );
};

export default PaymentForm;