import React, {FC} from 'react';
import styles from './PaymentBeanie.module.scss';
import {PaymentBeanieProps} from "@/types/paymentBeanie";
import Dot from "@/components/dot/Dot";
import Button from "@/components/button/Button";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const PaymentBeanie:FC<PaymentBeanieProps> = ({dotText, title, children}) => {
    return (
        <div className={styles.wrapper}>
            <Dot title={dotText}/>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
            </div>
            <div className={styles.actionPanel}>
                {children}
            </div>
        </div>
    );
};

export default PaymentBeanie;