"use client";

import React, {useRef, useState} from 'react';
import styles from './Deposit.module.scss';
import BalanceWithdraw from "@/components/balance-withdraw/BalanceWithdraw";
import PaymentSteps from "@/components/payment-steps/PaymentSteps";
import PaymentBeanie from "@/components/payment-beanie/PaymentBeanie";
import StepButtons from "@/components/step-buttons/StepButtons";
import PaymentMethods from "@/components/payment-methods/PaymentMethods";
import Tether from "@/assets/icons/tetherIcon.svg";
import PerfectMoney from "@/assets/icons/perfectMoneyIcon.svg";
import Payeer from "@/assets/icons/payeerIcon.svg";
import Bitcoin from "@/assets/icons/bitcoinIcon.svg";
import Alert from "@/components/alert/Alert";
import Etherium from "@/assets/icons/etherium.svg";
import Visa from "@/assets/icons/visaIcon.svg";
import ApplicationInfo from "@/components/application-info/ApplicationInfo";
import PaymentForm from "@/components/payment-form/PaymentForm";
import ArrowLeft from "@/assets/icons/arrowLeft.svg";
import Image from 'next/image';
import Dashboard from "@/components/dashboard/Dashboard";
import {useUser} from "@/utils/UserContext";
import {BACKEND_URL} from "@/constants/constants";

const Deposit = () => {
    const [step, setStep] = useState<number>(1);
    const user = useUser();
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const [depositId, setDepositId] = useState<string>('');
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);

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
        const depositId = Math.floor(1000000 + Math.random() * 9000000).toString();
        setDepositId(depositId);

        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch(`${BACKEND_URL}/deposit/create-deposit`, {
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
                    depositId: depositId
                })
            });
            console.log('Response:', response);
            handleNextStep();
            setAlert({
                title: 'Успех!',
                description: 'Заявка на вывод оформленна успешно!.'
            });
        } catch (error) {
            console.error('Error creating deposit:', error);
        }
    };

    return (
        <Dashboard>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)}/>}
            <div className={styles.wrapperInner}>
                {step === 1 && (
                    <div className={styles.depositContent}>
                        <div className={styles.withdrawalInfo}>
                            <BalanceWithdraw/>
                            <div className={styles.steps}>
                                <PaymentSteps
                                    step={1}
                                    title="Способ пополнения"
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
                        <div className={styles.depositContainer}>
                            <PaymentBeanie
                                dotText="Способ пополнения"
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
                    <div className={styles.depositContent}>
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
                        <div className={styles.depositContainer}>
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
                                    {label: "Введите сумму пополнения"},
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
                                submitForm={(submit) => {
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
                    <div className={styles.depositContent}>
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
                                />
                            </div>
                        </div>
                        <div className={styles.depositContainer}>
                            <PaymentBeanie
                                dotText="Ожидайте получения"
                                title={`Заявка №${depositId} в обработке`}
                            >
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}
                                             firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                             secondButtonContent={"Начало"}/>
                            </PaymentBeanie>

                            <ApplicationInfo texts={[
                                {text: `Заявка №${depositId} в обработке`},
                                {text: 'Пожалуйста, дождитесь завершения операции — это займет немного времени'}
                            ]}/>
                            <div className={styles.bottomButtons}>
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}
                                             firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                             secondButtonContent={"Начало"}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Dashboard>
    );
};

export default Deposit;