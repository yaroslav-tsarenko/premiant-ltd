"use client";

import React from 'react';
import styles from './Salary.module.scss';
import Diagram from "@/components/diagram/Diagram";
import { useUser } from "@/utils/UserContext";

const Salary = () => {
    const user = useUser();
    const earnings = user?.earnings ?? 0;
    const balance = user?.balance ?? 0;
    const tariff = user?.tariff ?? '';
    const difference = earnings - balance;
    const percentage = balance ? Math.floor((difference / balance) * 100) : 0;

    const remainingMoneyForNextTariff = (str: string, money: number) => {
        switch (str) {
            case 'start':
                return `${2000 - money}$`;
            case 'comfort':
                return `${7000 - money}$`;
            case 'premium':
                return `${15000 - money}$`;
            case 'maximum':
                return `${40000 - money}$`;
            default:
                return "Данные отсутствуют";
        }
    };

    const calculateRemainingDays = (tariff: string, expirationDate: string) => {
        const currentDate = new Date();
        const expiration = new Date(expirationDate);
        const timeDiff = expiration.getTime() - currentDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        switch (tariff) {
            case 'start':
                return daysDiff <= 28 ? daysDiff : 28;
            case 'comfort':
                return daysDiff <= 24 ? daysDiff : 24;
            case 'premium':
                return daysDiff <= 17 ? daysDiff : 17;
            case 'maximum':
                return daysDiff <= 9 ? daysDiff : 9;
            case 'exclusive':
                return daysDiff <= 6 ? daysDiff : 6;
            default:
                return "Неизвестно ";
        }
    };

    const remainingDays = calculateRemainingDays(tariff, user?.tariffExpirationDate ?? '');

    return (
        <div className={styles.wrapper}>
            <div className={styles.diagram}>
                <Diagram value={percentage} size={200} strokeWidth={30} />
            </div>
            <div className={styles.currentSalary}>
                <div className={styles.sumContent}>
                    <p className={styles.title}>
                        Ваш текущий зароботок
                    </p>
                    <p className={styles.sum}>
                        {earnings ? `${earnings.toFixed(2)}$` : "0.00$"}
                    </p>
                </div>
                <div className={styles.rest}>
                    <p className={styles.title}>
                        След. тариф через:
                    </p>
                    <p className={styles.title}>
                        {earnings ? `${remainingMoneyForNextTariff(tariff, earnings)}` : "Данные отсутствуют"}
                    </p>
                </div>
                <div className={styles.rest}>
                    <p className={styles.title}>
                        До конца тарифа осталось:
                    </p>
                    <p className={styles.title}>
                        {remainingDays !== "Неизвестно " ? `${remainingDays} дней` : "Данные отсутствуют"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Salary;