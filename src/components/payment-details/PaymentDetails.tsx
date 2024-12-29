import React from 'react';
import styles from './PaymentDetails.module.scss';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Dot from "@/components/dot/Dot";

const PaymentDetails = () => {

    const validationSchema = Yup.object({
        trc20: Yup.string().required('Введите адрес кошелька TRC20 USDT'),
        perfectMoney: Yup.string().required('Введите адрес кошелька PerfectMoney'),
        payeer: Yup.string().required('Введите адрес кошелька Payeer'),
        bitcoin: Yup.string().required('Введите адрес кошелька Bitcoin'),
        ethereum: Yup.string().required('Введите адрес кошелька Ethereum'),
        visaMastercard: Yup.number().required('Введите номер карты Visa / Mastercard'),
    });

    return (
        <div className={styles.wrapper}>

            <Dot title={"Платежные реквизиты"}/>

            <Formik
                initialValues={{
                    trc20: '',
                    perfectMoney: '',
                    payeer: '',
                    bitcoin: '',
                    ethereum: '',
                    visaMastercard: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <Form className={styles.form}>
                    <div className={styles.userInfo}>
                        <div className={styles.formUserGroup}>
                            <Field name="trc20" type="text" placeholder="TRC20 USDT" className={styles.inputUserInfo}/>
                            <ErrorMessage name="trc20" component="div" className={styles.error}/>
                        </div>
                        <div className={styles.formUserGroup}>
                            <Field name="perfectMoney" type="text" placeholder="PerfectMoney"
                                   className={styles.inputUserInfo}/>
                            <ErrorMessage name="perfectMoney" component="div" className={styles.error}/>
                        </div>
                        <div className={styles.formUserGroup}>
                            <Field name="payeer" type="email" placeholder="Payeer" className={styles.inputUserInfo}/>
                            <ErrorMessage name="payeer" component="div" className={styles.error}/>
                        </div>
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.formUserGroup}>
                            <Field name="bitcoin" type="text" placeholder="Bitcoin" className={styles.inputUserInfo}/>
                            <ErrorMessage name="bitcoin" component="div" className={styles.error}/>
                        </div>
                        <div className={styles.formUserGroup}>
                            <Field name="ethereum" type="text" placeholder="Ethereum"
                                   className={styles.inputUserInfo}/>
                            <ErrorMessage name="ethereum" component="div" className={styles.error}/>
                        </div>
                        <div className={styles.formUserGroup}>
                            <Field name="visaMastercard" type="text" placeholder="Visa / Mastercard" className={styles.inputUserInfo}/>
                            <ErrorMessage name="visaMastercard" component="div" className={styles.error}/>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default PaymentDetails;