import React, { FC } from "react";
import styles from "./PaymentMethods.module.scss";
import { PaymentMethodsProps } from "@/types/paymentMethods";
import Button from "@/components/button/Button";
import Image from "next/image";

interface ExtendedPaymentMethodsProps extends PaymentMethodsProps {
    type: "deposit" | "withdraw";
}

const PaymentMethods: FC<ExtendedPaymentMethodsProps> = ({ icon, name, currency, description, onSelect, selected, type }) => {
    const handleClick = () => {
        if (onSelect) onSelect(name);
    };

    const buttonText = selected ? "Выбрано" : type === "deposit" ? "Выбрать способ пополнения" : "Выбрать способ выплаты";

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
                {buttonText}
            </Button>
        </div>
    );
};

export default PaymentMethods;