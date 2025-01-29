import React, { useImperativeHandle, forwardRef } from 'react';
import styles from './PaymentDetails.module.scss';
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import Dot from "@/components/dot/Dot";
import { useUser } from "@/utils/UserContext";

interface PaymentDetailsProps {
    trc20: string;
    perfectMoney: string;
    payeer: string;
    bitcoin: string;
    ethereum: string;
    visaMastercard: string;
}

const PaymentDetails = forwardRef((props, ref) => {
    const user = useUser();

    const validationSchema = Yup.object({
        trc20: Yup.string().required('Введите адрес кошелька TRC20 USDT'),
        perfectMoney: Yup.string().required('Введите адрес кошелька PerfectMoney'),
        payeer: Yup.string().required('Введите адрес кошелька Payeer'),
        bitcoin: Yup.string().required('Введите адрес кошелька Bitcoin'),
        ethereum: Yup.string().required('Введите адрес кошелька Ethereum'),
        visaMastercard: Yup.string()
            .matches(/^(?:\d{4} ){3}\d{4}$/, 'Неверный номер карты Visa / Mastercard')
            .required('Введите номер карты Visa / Mastercard')
            .test('len', 'Номер карты должен содержать минимум 16 цифр', val => (val ? val.replace(/\s/g, '').length >= 16 : false)),
    });

    const formatCardNumber = (value: string) => {
        return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    return (
        <div className={styles.wrapper}>
            <Dot title={"Платежные реквизиты"} />
            <Formik
                initialValues={{
                    trc20: user?.usdtWallet || '',
                    perfectMoney: user?.perfectMoneyWallet || '',
                    payeer: user?.payeerWallet || '',
                    bitcoin: user?.btcWallet || '',
                    ethereum: user?.ethereumWallet || '',
                    visaMastercard: user?.card || '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {(formik: FormikProps<PaymentDetailsProps>) => {
                    useImperativeHandle(ref, () => ({
                        setData: (data: PaymentDetailsProps) => {
                            formik.setValues(data);
                        },
                        getData: () => {
                            return formik.values;
                        }
                    }));
                    return (
                        <Form className={styles.form}>
                            <div className={styles.userInfo}>
                                <div className={styles.formUserGroup}>
                                    <Field name="trc20" type="text" placeholder="TRC20 USDT" className={styles.inputUserInfo} />
                                    <ErrorMessage name="trc20" component="div" className={styles.error} />
                                </div>
                                <div className={styles.formUserGroup}>
                                    <Field name="perfectMoney" type="text" placeholder="PerfectMoney" className={styles.inputUserInfo} />
                                    <ErrorMessage name="perfectMoney" component="div" className={styles.error} />
                                </div>
                                <div className={styles.formUserGroup}>
                                    <Field name="payeer" type="text" placeholder="Payeer" className={styles.inputUserInfo} />
                                    <ErrorMessage name="payeer" component="div" className={styles.error} />
                                </div>
                            </div>
                            <div className={styles.userInfo}>
                                <div className={styles.formUserGroup}>
                                    <Field name="bitcoin" type="text" placeholder="Bitcoin" className={styles.inputUserInfo} />
                                    <ErrorMessage name="bitcoin" component="div" className={styles.error} />
                                </div>
                                <div className={styles.formUserGroup}>
                                    <Field name="ethereum" type="text" placeholder="Ethereum" className={styles.inputUserInfo} />
                                    <ErrorMessage name="ethereum" component="div" className={styles.error} />
                                </div>
                                <div className={styles.formUserGroup}>
                                    <Field
                                        name="visaMastercard"
                                        type="text"
                                        placeholder="Visa / Mastercard"
                                        className={styles.inputUserInfo}
                                        maxLength={19} // 16 digits + 3 spaces
                                        onChange={(e: any) => {
                                            const formattedValue = formatCardNumber(e.target.value);
                                            formik.setFieldValue('visaMastercard', formattedValue);
                                        }}
                                    />
                                    <ErrorMessage name="visaMastercard" component="div" className={styles.error} />
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
});

export default PaymentDetails;