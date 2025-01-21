"use client";

import React, {useEffect, useRef, useState} from 'react';
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
import Popup from "@/components/popup/Popup";
import Button from "@/components/button/Button";
import {useRouter} from "next/navigation";
import axios from "axios";

const Deposit = () => {
    const [step, setStep] = useState<number>(1);
    const user = useUser();
    const router = useRouter();
    const [popup, setPopup] = useState<boolean>(false);
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const [depositId, setDepositId] = useState<string>('');
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);
    const [alertPopup, setAlertPopup] = useState<boolean>(false);
    const [trcAddress, setTrcAddress] = useState<string>('');
    const submitFormRef = useRef<() => void>();

    const handleNextStep = () => {
        setStep((prev) => (prev < 3 ? prev + 1 : 1));
    };

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

    const handleNextStepAndClosePopup = () => {
        setStep((prev) => (prev < 3 ? prev + 1 : 1));
        setPopup(false)
    }

    const handlePreviousStep = () => {
        setStep((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleReturnToDashboard = () => {
        router.push('/account');
    }

    const handleButtonClick = () => {
        if (submitFormRef.current) {
            submitFormRef.current();
        }
    };

    useEffect(() => {

    }, []);

    const handlePaymentMethodClick = (paymentMethod: string) => {
        if (paymentMethod !== "Tether") {
            setPopup(true);
        } else {
            setSelectedPayment(paymentMethod);
            handleNextStep();
        }
    };

    const handleFormSubmit = async (values: { amount: string }) => {
        const amount = parseFloat(values.amount);
        if (amount < 100) {
            setAlert({
                title: 'Упс!',
                description: 'Минимальная сумма пополнения 100$'
            });
            return;
        }

        await new Promise<void>((resolve) => {
            const observer = setInterval(() => {
                if (!alertPopup) {
                    clearInterval(observer);
                    resolve();
                }
            }, 1000);
        });

        if (
            !user?.usdtWallet ||
            !user?.btcWallet ||
            !user?.perfectMoneyWallet ||
            !user?.ethereumWallet ||
            !user?.payeerWallet ||
            !user?.card
        ) {
            setAlert({
                title: 'Упс!',
                description: 'Вы не указали платежные данные'
            });
            return;
        }

        const depositId = Math.floor(1000000 + Math.random() * 9000000).toString();
        setDepositId(depositId);

        try {
            const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch(`${BACKEND_URL}/deposit/create-deposit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: user?._id,
                    name: user?.name,
                    secondName: user?.secondName,
                    email: user?.email,
                    amount: values.amount,
                    walletType: selectedPayment,
                    status: 'pending',
                    depositId: depositId
                })
            });

            console.log('Response:', response);
            handleNextStep();
            setAlert({
                title: 'Успех!',
                description: 'Заявка на депозит оформленна успешно!'
            });
        } catch (error) {
            console.error('Error creating deposit:', error);
        }
    };

    useEffect(() => {
        if (step === 2) {
            setTimeout(() => setAlertPopup(true), 2000);
        }
    }, [step]);

    return (
        <Dashboard>
            {popup && (
                <Popup
                    title="Этот способ недоступен"
                    description="К сожалению, данный способ выплаты сейчас недоступен в связи с техническим обслуживанием. Пожалуйста, выберите Tether (USDT), который доступен и работает стабильно!"
                    onClose={() => setAlert(null)}
                    firstChildren={<Button variant="popupGrey" onClick={() => setPopup(false)}>Отменить</Button>}
                    secondChildren={<Button variant="popupBlack" onClick={handleNextStepAndClosePopup}>Использовать
                        Tether
                        (TRC-20)</Button>}
                />
            )}
            {alertPopup && (
                <Popup
                    title="Проверьте перевод и данные"
                    description="Вы уверены, что совершаете перевод в сети TRC-20 на указанный нами кошелёк? Проверьте его на корректность! Т.к. средства могут быть утеряны при неправильном вводе адреса или сети перевода! Также, в случае, если средства не поступят, мы не сможем зачислить их на ваш баланс. Пожалуйста, убедитесь в правильности перевода!"
                    onClose={() => setAlert(null)}
                    firstChildren={<Button variant="popupGrey" onClick={() => setAlertPopup(false)}>Отменить</Button>}
                    secondChildren={<Button variant="popupBlack" onClick={() => setAlertPopup(false)}>Я уверен,
                        продолжить</Button>}
                />
            )}
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
                                    onPrev={handleReturnToDashboard}
                                    firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                    secondButtonContent={"Продолжить"}/>
                            </PaymentBeanie>
                            <div className={styles.methods}>
                                <PaymentMethods
                                    icon={Tether.src}
                                    name="Tether"
                                    currency="USDT"
                                    type="deposit"
                                    description="Криптовалюта Tether (USDT) на сети TRC-20, с низкими комиссиями и быстрыми транзакциями"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Tether"}
                                />
                                <PaymentMethods
                                    icon={PerfectMoney.src}
                                    name="PerfectMoney"
                                    currency="USD"
                                    type="deposit"
                                    description="Система международных переводов с мин. комиссиями, предоставляющая возможности для мгновенных выплат"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "PerfectMoney"}
                                />
                                <PaymentMethods
                                    icon={Payeer.src}
                                    name="Payeer"
                                    currency="USD"
                                    type="deposit"
                                    description="Универсальная система с различными способами пополнения и вывода средств"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Payeer"}
                                />
                                <PaymentMethods
                                    icon={Bitcoin.src}
                                    name="Bitcoin"
                                    currency="BTC"
                                    type="deposit"
                                    description="Известная криптовалюта для безопасных и децентрализованных переводов"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Bitcoin"}
                                />
                                <PaymentMethods
                                    icon={Etherium.src}
                                    name="Etherium"
                                    currency="ETH"
                                    type="deposit"
                                    description="Криптовалюта для быстрых транзакций и смарт-контрактов"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Etherium"}
                                />
                                <PaymentMethods
                                    icon={Visa.src}
                                    name="Visa"
                                    currency="RUB"
                                    type="deposit"
                                    description="Удобный способ вывода средств на банковские карты"
                                    onSelect={handlePaymentMethodClick}
                                    selected={selectedPayment === "Visa"}
                                />
                            </div>
                            <div className={styles.bottomButtons}>
                                <StepButtons
                                    onNext={handleNextStep}
                                    onPrev={handleReturnToDashboard}
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
                                    title="Способ пополнения"
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
                                             secondButtonContent={"Я оплатил"}/>
                            </PaymentBeanie>
                            <PaymentForm
                                placeholders={[
                                    {label: "Введите сумму пополнения"},
                                ]}
                                options={[]}
                                type={'deposit'}
                                initialValues={{amount: '', wallet: trcAddress}}
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
                                title={`Заявка №${depositId} в обработке`}>
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}
                                             firstButtonContent={<Image src={ArrowLeft} alt="Arrow Left"/>}
                                             secondButtonContent={"Начало"}/>
                            </PaymentBeanie>
                            <ApplicationInfo texts={[
                                {text: `Благодарим за ваш запрос!`},
                                {text: '\n' + 'После проверки и обработки заявки средства будут перечислены на выбранный вами способ оплаты в течение 5-15 минут.'},
                                {text: "Вы можете отслеживать статус вашей заявки через личный кабинет. Мы обновляем информацию в режиме реального времени, чтобы вы всегда были в курсе."},
                                {text: "Пожалуйста, убедитесь, что указанные реквизиты верны и актуальны. Это позволит избежать задержек или ошибок при переводе средств"},
                                {text: "Если у вас возникнут вопросы или потребуется дополнительная информация, наша техническая поддержка всегда готова вам помочь. Мы ценим ваше доверие и стараемся сделать процесс вывода максимально быстрым и удобным."},

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