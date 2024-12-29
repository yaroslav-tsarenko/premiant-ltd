import React, { FC } from 'react';
import styles from './PaymentSteps.module.scss';
import { PaymentStepsProps } from "@/types/paymentSteps";

const PaymentSteps: FC<PaymentStepsProps> = ({ step, title, description, line, isActive }) => {
    return (
        <div className={`${styles.wrapper} ${isActive ? styles.active : ''}`}>
            <div className={styles.step}>
                <h1 className={styles.stepNumber}>0{step}</h1>
                <div className={styles.stepInfo}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
            {line && <div className={styles.line}></div>}
        </div>
    );
};

export default PaymentSteps;