"use client";

import React, {useState} from 'react';
import styles from './Deposit.module.scss';
import Navigation from "@/components/navigation/Navigation";
import BalanceWithdraw from "@/components/balance-withdraw/BalanceWithdraw";
import PaymentSteps from "@/components/payment-steps/PaymentSteps";
import PaymentBeanie from "@/components/payment-beanie/PaymentBeanie";
import StepButtons from "@/components/step-buttons/StepButtons";
import PaymentMethods from "@/components/payment-methods/PaymentMethods";
import Tether from "@/assets/icons/tetherIcon.svg";
import PerfectMoney from "@/assets/icons/perfectMoneyIcon.svg";
import Payeer from "@/assets/icons/payeerIcon.svg";
import Bitcoin from "@/assets/icons/bitcoinIcon.svg";
import Etherium from "@/assets/icons/etherium.svg";
import Visa from "@/assets/icons/visaIcon.svg";
import ApplicationInfo from "@/components/application-info/ApplicationInfo";
import PaymentForm from "@/components/payment-form/PaymentForm";

const Deposit = () => {

    const [step, setStep] = useState<number>(1);

    const handleNextStep = () => {
        setStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setStep((prev) => prev - 1);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperInner}>
                <Navigation/>

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
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
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
                            />
                            <div className={styles.bottomButtons}>
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
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
                                    isActive={step === 3}
                                />
                            </div>
                        </div>
                        <div className={styles.applicationContent}>
                            <PaymentBeanie
                                dotText="Ожидайте получения"
                                title="Заявка №3827483 в обработке"
                            >
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
                            </PaymentBeanie>

                            <ApplicationInfo texts={
                                [
                                    {text: "Благодарим за ваше обращение. После поступления средств на наш счёт, заявка будет обработана в течение 5-15 минут. Средства будут переведены на указанный вами кошелёк или счёт."},
                                    {text: "Вы можете отслеживать статус заявки через ваш личный кабинет, где информация обновляется в реальном времени."},
                                    {
                                        text: "Обратите внимание: пожалуйста, убедитесь, что вы не только нажали кнопку \"Я оплатил\", но и действительно " +
                                            "завершили перевод средств на наш счёт. Это поможет нам избежать задержек в обработке вашей заявки."
                                    },
                                    {
                                        text: "Если у вас возникнут какие-либо вопросы или произойдёт задержка обмена, не стесняйтесь обращаться в " +
                                            "нашу техническую поддержку. Мы всегда готовы помочь и сделать процесс максимально удобным для вас."
                                    }
                                ]
                            }/>
                            <div className={styles.bottomButtons}>
                                <StepButtons onNext={handleNextStep} onPrev={handlePreviousStep}/>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Deposit;