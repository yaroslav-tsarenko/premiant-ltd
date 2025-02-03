"use client";

import React, { useState, useEffect } from 'react';
import styles from './Salary.module.scss';
import Diagram from "@/components/diagram/Diagram";
import { useUser } from "@/utils/UserContext";
import { FaArrowRight } from "react-icons/fa6";
import { newRequest } from "@/utils/newRequest";
import Alert from "@/components/alert/Alert";
import { BACKEND_URL } from "@/constants/constants";

const Salary = () => {
    const tariffs = {
        start: { rate: 2 / 100, min: 100, next: 2000 },
        comfort: { rate: 3.35 / 100, min: 2000, next: 5000 },
        premium: { rate: 5.67 / 100, min: 5000, next: 10000 },
        maximum: { rate: 154 / 100, min: 10000, next: 50000 },
        exclusive: { rate: 172 / 100, min: 50000, next: null },
    };

    const user = useUser();
    const [tariffBalance, setTariffBalance] = useState(user?.tariffBalance ?? 0);
    const tariff = user?.tariff ?? '';
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);
    useEffect(() => {
        const ws = new WebSocket(`${BACKEND_URL.replace(/^http/, 'ws')}`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.userId === user?._id && data.tariffBalance !== undefined) {
                setTariffBalance(data.tariffBalance);
            }
        };

        return () => {
            ws.close();
        };
    }, [user?._id]);

    const remainingMoneyForNextTariff = (tariff: string, tariffBalance: number) => {
        switch (tariff) {
            case 'start':
                return `${2000 - tariffBalance}$`;
            case 'comfort':
                return `${7000 - tariffBalance}$`;
            case 'premium':
                return `${15000 - tariffBalance}$`;
            case 'maximum':
                return `${40000 - tariffBalance}$`;
            case 'exclusive':
                return "Данные отсутствуют";
            default:
                return "Данные отсутствуют";
        }
    };

    const baseValue = (tariff: string) =>{
        switch (tariff){
            case "start":
             return 2000
            case "comfort":
                return 7000
            case "premium":
                return 15000
            case "maximum":
                return 40000
            case "exclusive":
                return 50000
            default:
                return 100
        }
    };


    const calculatePercentage = (tariffBalance: number, baseValue: number) => {
        return Math.floor((tariffBalance / baseValue) * 100);
    };

    const percentage = calculatePercentage(tariffBalance, baseValue(user?.tariff || ""));

    const handleWithdraw = async () => {
        if (user?.tariffBalance === 0) {
            setAlert({ title: 'Ошибка!', description: 'У вас пустой баланс тарифа на снятие' });
            return;
        }

        const currentDate = new Date();
        const tariffExpirationDate = new Date(user?.tariffExpirationDate ?? '');

        if (tariffExpirationDate > currentDate) {
            setAlert({ title: 'Ошибка!', description: 'Вы не можете вывести деньги до конца тарифа' });
            return;
        }

        try {
            const response = await newRequest.put('/user/update-balance');
            if (response.status === 200) {
                setAlert({ title: 'Успех!', description: 'Деньги успешно переведены на личный баланс' });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setAlert({ title: 'Ошибка!', description: 'У вас пустой баланс тарифа на снятие' });
            }
        } catch (error) {
            setAlert({ title: 'Упс!', description: 'Произошла ошибка на сервере' });
            console.log(error)
        }
    };
    const remainingMoney = parseFloat(remainingMoneyForNextTariff(tariff, tariffBalance)).toFixed(2);

    const getDaysLabel = (days: number): string => {
        if (days % 10 === 1 && days % 100 !== 11) return "день";
        if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return "дня";
        return "дней";
    };

    const calculateDays = (balance: number, tariff: string): string => {
        if (!(tariff in tariffs)) return "Данные отсутствуют";

        const { rate, min, next } = tariffs[tariff as keyof typeof tariffs];
        if (!next) return "Вы уже на максимальном тарифе";
        if (balance < min) return `Минимальная сумма для ${tariff} — ${min}$`;

        let days = 0;
        let currentBalance = balance;

        while (currentBalance < next) {
            currentBalance += currentBalance * rate;
            days++;
        }
        return `${days} ${getDaysLabel(days)}`;
    };

    const remainingDays = calculateDays(user?.tariffBalance || 0, user?.tariff || "");


    return (
        <>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
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
                            {tariffBalance ? `${tariffBalance.toFixed(2)}$` : "0.00$"}
                        </p>
                    </div>
                    <div className={styles.rest}>
                        <p className={styles.title}>
                            След. тариф через:
                        </p>
                        <p className={styles.title}>
                            {tariffBalance ? `${remainingMoney}$` : "Данные отсутствуют"}
                        </p>
                    </div>
                    <div className={styles.rest}>
                        <p className={styles.title}>
                            До конца тарифа осталось:
                        </p>
                        <p className={styles.title}>
                            {remainingDays !== "Неизвестно" ? `${remainingDays}` : "Данные отсутствуют"}
                        </p>
                    </div>
                </div>
                <button className={styles.widthdrawButton} onClick={handleWithdraw}>
                    Снять деньги <FaArrowRight />
                </button>
            </div>
        </>
    );
};

export default Salary;