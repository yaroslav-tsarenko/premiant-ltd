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

    const calculatePercentage = (tariff: string, tariffBalance: number) => {
        let baseValue = 0;

        switch (tariff) {
            case 'start':
                baseValue = 100;
                break;
            case 'comfort':
                baseValue = 2000;
                break;
            case 'premium':
                baseValue = 7000;
                break;
            case 'maximum':
                baseValue = 15000;
                break;
            case 'exclusive':
                baseValue = 40000;
                break;
            default:
                return 0;
        }

        const difference = tariffBalance - baseValue;
        return Math.floor((difference / baseValue) * 100);
    };

    const percentage = calculatePercentage(tariff, tariffBalance);

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

    const calculateRemainingDays = (tariff: string) => {
        let daysDiff = 0;

        switch (tariff) {
            case 'start':
                daysDiff = 28;
                break;
            case 'comfort':
                daysDiff = 24;
                break;
            case 'premium':
                daysDiff = 17;
                break;
            case 'maximum':
                daysDiff = 9;
                break;
            case 'exclusive':
                daysDiff = 6;
                break;
            default:
                return "Неизвестно";
        }

        return daysDiff;
    };

    const remainingDays = calculateRemainingDays(tariff);
    const remainingMoney = parseFloat(remainingMoneyForNextTariff(tariff, tariffBalance)).toFixed(2);

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
                            {remainingDays !== "Неизвестно" ? `${remainingDays} дней` : "Данные отсутствуют"}
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