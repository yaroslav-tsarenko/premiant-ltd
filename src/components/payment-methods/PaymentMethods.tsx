import React, { FC } from "react";
import styles from "./PaymentMethods.module.scss";
import { PaymentMethodsProps } from "@/types/paymentMethods";
import Button from "@/components/button/Button";
import Image from "next/image";

const PaymentMethods: FC<PaymentMethodsProps> = ({ icon, name, currency, description, onSelect, selected }) => {
    const handleClick = () => {
        if (onSelect) onSelect(name);
    };

    return (
        <div className={styles.methodWrapper}>
            <div className={styles.beanie}>
                <div className={styles.platform}>
                    <Image src={icon} alt={name} width={30} height={30} />
                    <p className={styles.platformName}>{name}</p>
                </div>
                <p className={styles.currency}>{currency}</p>
            </div>
            <p className={styles.description}>{description}</p>
            <Button
                variant="payment"
                onClick={handleClick}>
                {selected ? "Выбрано" : "Выбрать способ выплаты"}
            </Button>
        </div>
    );
};

export default PaymentMethods;