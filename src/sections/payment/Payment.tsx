"use client"

import React, {useState} from 'react';
import styles from './Payment.module.scss';
import Navigation from "@/components/navigation/Navigation";
import BalanceWithdraw from "@/components/balance-withdraw/BalanceWithdraw";
import PaymentSteps from "@/components/payment-steps/PaymentSteps";
import PaymentBeanie from "@/components/payment-beanie/PaymentBeanie";
import PaymentMethods from "@/components/payment-methods/PaymentMethods";
import Tether from "@/assets/icons/tetherIcon.svg";
import Bitcoin from "@/assets/icons/bitcoinIcon.svg";
import Etherium from "@/assets/icons/etherium.svg";
import Payeer from "@/assets/icons/payeerIcon.svg";
import PerfectMoney from "@/assets/icons/perfectMoneyIcon.svg";
import Visa from "@/assets/icons/visaIcon.svg";
import StepButtons from "@/components/step-buttons/StepButtons";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const Payment = () => {
    const [step, setStep] = useState<number>(1);

    const handleNextStep = () => {
        setStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setStep((prev) => prev - 1);
    };

    const validationSchema = Yup.object({
        amount: Yup.number().required('Сумма обязательна').positive('Сумма должна быть положительной'),
        wallet: Yup.string().required('Кошелек обязателен')
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperInner}>
                <Navigation/>

                {step === 1 && (
                    <div className={styles.paymentContent}>
                        <div className={styles.withdrawalInfo}>
                            <BalanceWithdraw/>
                            <div className={styles.steps}>
                                <PaymentSteps
                                    step={1}
                                    title="Способ выплаты"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                    line={true}
                                    isActive={step === 1}
                                />
                                <PaymentSteps
                                    step={2}
                                    title="Введите сумму"
                                    description="Укажите желаемую сумму и выберите кошелек для проведения операции"
                                    line={true}
                                />
                                <PaymentSteps
                                    step={3}
                                    title="Ожидайте получения"
                                    description="Пожалуйста, дождитесь завершения операции — это займет немного времени"
                                />
                            </div>
                        </div>

                        <div className={styles.paymentContainer}>
                            <PaymentBeanie
                                dotText="Способ выплаты"
                                title="Выберите платежную систему"
                            >
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
                            </PaymentBeanie>
                            <div className={styles.methods}>
                                <PaymentMethods
                                    icon={Tether.src}
                                    name="Tether"
                                    currency="TRC"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                />
                                <PaymentMethods
                                    icon={PerfectMoney.src}
                                    name="PerfectMoney"
                                    currency="USD"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                />
                                <PaymentMethods
                                    icon={Payeer.src}
                                    name="Payeer"
                                    currency="USD"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                />
                                <PaymentMethods
                                    icon={Bitcoin.src}
                                    name="Bitcoin"
                                    currency="BTC"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                />
                                <PaymentMethods
                                    icon={Etherium.src}
                                    name="Etherium"
                                    currency="ETC"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                />
                                <PaymentMethods
                                    icon={Visa.src}
                                    name="Visa"
                                    currency="RUB"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                />
                            </div>
                            <div className={styles.bottomButtons}>
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
                            </div>
                        </div>

                    </div>
                )}

                {step === 2 && (
                    <div className={styles.paymentContent}>
                        <div className={styles.withdrawalInfo}>
                            <BalanceWithdraw/>
                            <div className={styles.steps}>
                                <PaymentSteps
                                    step={1}
                                    title="Способ выплаты"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                    line={true}
                                />
                                <PaymentSteps
                                    step={2}
                                    title="Введите сумму"
                                    description="Укажите желаемую сумму и выберите кошелек для проведения операции"
                                    line={true}
                                    isActive={step === 2}
                                />
                                <PaymentSteps
                                    step={3}
                                    title="Ожидайте получения"
                                    description="Пожалуйста, дождитесь завершения операции — это займет немного времени"
                                />
                            </div>
                        </div>
                        <div className={styles.paymentContainer}>
                            <PaymentBeanie
                                dotText="Способ выплаты"
                                title="Введите сумму и кошелек"
                            >
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
                            </PaymentBeanie>

                            <Formik
                                initialValues={{amount: '', wallet: ''}}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                            >
                                <Form className={styles.inputContainer}>
                                    <div className={styles.inputGroup}>
                                        <Field type="text" name="amount" placeholder="Введите сумму вывода"
                                               className={styles.input}/>
                                        <ErrorMessage name="amount" component="div" className={styles.error}/>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <Field as="select" name="wallet" className={styles.input}>
                                            <option value="" label="Выберите кошелек"/>
                                            <option value="tether" label="Tether"/>
                                            <option value="perfectMoney" label="PerfectMoney"/>
                                            <option value="payeer" label="Payeer"/>
                                            <option value="bitcoin" label="Bitcoin"/>
                                            <option value="etherium" label="Etherium"/>
                                            <option value="visa" label="Visa"/>
                                        </Field>
                                        <ErrorMessage name="wallet" component="div" className={styles.error}/>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        <div className={styles.bottomButtons}>
                            <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className={styles.paymentContent}>
                        <div className={styles.withdrawalInfo}>
                            <BalanceWithdraw/>
                            <div className={styles.steps}>
                                <PaymentSteps
                                    step={1}
                                    title="Способ выплаты"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                    line={true}
                                />
                                <PaymentSteps
                                    step={2}
                                    title="Введите сумму"
                                    description="Укажите желаемую сумму и выберите кошелек для проведения операции"
                                    line={true}

                                />
                                <PaymentSteps
                                    step={3}
                                    title="Ожидайте получения"
                                    description="Пожалуйста, дождитесь завершения операции — это займет немного времени"
                                    isActive={step === 3}
                                />
                            </div>
                        </div>
                        <div className={styles.applicationContent}>
                            <PaymentBeanie
                                dotText="Способ выплаты"
                                title="Заявка №3827483 в обработке"
                            >
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
                            </PaymentBeanie>

                            <div className={styles.applicationInfo}>
                                <p className={styles.text}>
                                    Благодарим за ваш запрос. После проверки и обработки заявки средства будут
                                    перечислены
                                    на указанный вами счёт или кошелёк в течение 5-15 минут.
                                </p>
                                <p className={styles.text}>
                                    Вы можете отслеживать статус вашей заявки через личный кабинет. Мы обновляем
                                    информацию
                                    в режиме реального времени, чтобы вы всегда были в курсе.
                                </p>
                                <p className={styles.text}>
                                    Пожалуйста, убедитесь, что указанные реквизиты верны и актуальны. Это позволит
                                    избежать
                                    задержек или ошибок при переводе средств.
                                </p>
                                <p className={styles.text}>
                                    Если у вас возникнут вопросы или потребуется дополнительная информация, наша
                                    техническая
                                    поддержка всегда готова вам помочь. Мы ценим ваше доверие и стараемся сделать
                                    процесс
                                    вывода максимально быстрым и удобным.
                                </p>
                                <div className={styles.farewell}>
                                    <p className={styles.text}>
                                        С уважением,
                                    </p>
                                    <p className={styles.appeal}>
                                        Администрация сайта.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottomButtons}>
                            <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;