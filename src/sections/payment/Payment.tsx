"use client"

import React, {useRef, useState} from 'react';
import styles from './Payment.module.scss';
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
import PaymentForm from "@/components/payment-form/PaymentForm";
import ApplicationInfo from "@/components/application-info/ApplicationInfo";
import Image from "next/image";
import ArrowLeft from "@/assets/icons/arrowLeft.svg";
import Dashboard from "@/components/dashboard/Dashboard";
import Alert from "@/components/alert/Alert";
import {useUser} from "@/utils/UserContext";
import {BACKEND_URL} from "@/constants/constants";

const Payment = () => {
    const [step, setStep] = useState<number>(1);
    const user = useUser();
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [withdrawId, setWithdrawId] = useState<string>('');
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);
    console.log(loading)
    const handleNextStep = () => {
        setStep((prev) => (prev < 3 ? prev + 1 : 1));
    };

    const handlePreviousStep = () => {
        setStep((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const submitFormRef = useRef<() => void>();
    const handleButtonClick = () => {
        if (submitFormRef.current) {
            submitFormRef.current();
        }
    };

    const handlePaymentMethodClick = (paymentMethod: string) => {
        setSelectedPayment(paymentMethod);
        handleNextStep();
    };

    const handleFormSubmit = async (values: { amount: string; wallet: string }) => {
        setLoading(true);
        const withdrawId = Math.floor(1000000 + Math.random() * 9000000).toString();
        setWithdrawId(withdrawId);

        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch(`${BACKEND_URL}/withdraw/create-withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: user?._id,
                    email: user?.email,
                    amount: values.amount,
                    walletType: selectedPayment,
                    walletAddress: values.wallet,
                    status: 'pending',
                    withdrawId: withdrawId
                })
            });

            if (response.status === 200) {
                handleNextStep();
                setAlert({
                    title: 'Успех!',
                    description: 'Заява на вывод оформленна успешно'
                });
            }
        } catch (error) {
            console.error('Error creating withdraw:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dashboard>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)}/>}
            <div className={styles.wrapperInner}>
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
                                <StepButtons
                                    onNext={handleNextStep}
                                    onPrev={handlePreviousStep}
                                    firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                    secondButtonContent={"Продолжить"}/>
                            </PaymentBeanie>
                            <div className={styles.methods}>
                                <PaymentMethods
                                    icon={Tether.src}
                                    name="Tether"
                                    currency="TRC"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Tether"}
                                />
                                <PaymentMethods
                                    icon={PerfectMoney.src}
                                    name="PerfectMoney"
                                    currency="USD"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "PerfectMoney"}
                                />
                                <PaymentMethods
                                    icon={Payeer.src}
                                    name="Payeer"
                                    currency="USD"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Payeer"}
                                />
                                <PaymentMethods
                                    icon={Bitcoin.src}
                                    name="Bitcoin"
                                    currency="BTC"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Bitcoin"}
                                />
                                <PaymentMethods
                                    icon={Etherium.src}
                                    name="Etherium"
                                    currency="ETC"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Etherium"}
                                />
                                <PaymentMethods
                                    icon={Visa.src}
                                    name="Visa"
                                    currency="RUB"
                                    description="Выберите удобный для вас метод оплаты из доступных вариантов"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Visa"}
                                />
                            </div>
                            <div className={styles.bottomButtons}>
                                <StepButtons
                                    onNext={handleNextStep}
                                    onPrev={handlePreviousStep}
                                    firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                    secondButtonContent={"Продолжить"}/>
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
                                dotText="Введите сумму"
                                title="Введите сумму и подтвердите операцию"
                            >
                                <StepButtons onNext={handleButtonClick} onPrev={handlePreviousStep}
                                             firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                             secondButtonContent={"Продолжить"}/>
                            </PaymentBeanie>

                            <PaymentForm
                                placeholders={[
                                    {label: "Введите сумму вывода"},
                                    {label: "Выберите кошелек"}
                                ]}
                                options={[
                                    {value: "tether", label: "Tether"},
                                    {value: "perfectMoney", label: "PerfectMoney"},
                                    {value: "payeer", label: "Payeer"},
                                    {value: "bitcoin", label: "Bitcoin"},
                                    {value: "etherium", label: "Etherium"},
                                    {value: "visa", label: "Visa"}
                                ]}
                                initialValues={{amount: '', wallet: selectedPayment}}
                                onSubmit={handleFormSubmit}
                                submitForm={(submit: () => void) => {
                                    submitFormRef.current = submit;
                                }}
                            />
                            <div className={styles.bottomButtons}>
                                <StepButtons onNext={handleButtonClick} onPrev={handlePreviousStep}
                                             firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                             secondButtonContent={"Продолжить"}/>
                            </div>
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
                                title={`Заявка №${withdrawId} в обработке`}
                            >
                                <StepButtons
                                    onNext={handleNextStep}
                                    onPrev={handlePreviousStep}
                                    firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                    secondButtonContent={"Начало"}/>
                            </PaymentBeanie>
                            <ApplicationInfo texts={
                                [
                                    {text: "Благодарим за ваш запрос. После проверки и обработки заявки средства будут перечислены на указанный вами счёт или кошелёк в течение 5-15 минут."},
                                    {text: "Вы можете отслеживать статус вашей заявки через личный кабинет. Мы обновляем информацию в режиме реального времени, чтобы вы всегда были в курсе."},
                                    {text: "Пожалуйста, убедитесь, что указанные реквизиты верны и актуальны. Это позволит избежать задержек или ошибок при переводе средств."},
                                    {text: "Если у вас возникнут вопросы или потребуется дополнительная информация, наша техническая поддержка всегда готова вам помочь. Мы ценим ваше доверие и стараемся сделать процесс вывода максимально быстрым и удобным."}
                                ]
                            }/>
                            <div className={styles.bottomButtons}>
                                <StepButtons
                                    onNext={handleNextStep}
                                    onPrev={handlePreviousStep}
                                    firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                    secondButtonContent={"Продолжить"}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Dashboard>
    );
};

export default Payment;