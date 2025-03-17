import React, { useState, useEffect } from "react";
import styles from "./Salary.module.scss";
import Diagram from "@/components/diagram/Diagram";
import { useUser } from "@/utils/UserContext";
import { FaArrowRight } from "react-icons/fa6";
import { newRequest } from "@/utils/newRequest";
import Alert from "@/components/alert/Alert";
import { BACKEND_URL } from "@/constants/constants";

type TariffKey = 'start' | 'comfort' | 'premium' | 'maximum' | 'exclusive' | string;

const Salary = () => {
    const tariffs: Record<TariffKey, { rate: number; min: number; next: number | null; term: number }> = {
        start: { rate: 2 / 100, min: 100, next: 2000, term: 28 },
        comfort: { rate: 3.35 / 100, min: 2000, next: 7000, term: 24 },
        premium: { rate: 5.67 / 100, min: 5000, next: 15000, term: 17 },
        maximum: { rate: 154 / 100, min: 10000, next: 40000, term: 9 },
        exclusive: { rate: 172 / 100, min: 40000, next: null, term: 6 },
    };

    const user = useUser();
    const [tariffBalance, setTariffBalance] = useState(user?.tariffBalance ?? 0);
    const [percentPerMinute, setPercentPerMinute] = useState(user?.percentPerMinute ?? 0);
    const tariff = user?.tariff ?? "";
    const [alert, setAlert] = useState<{ title: string; description: string } | null>(null);
    const [term, setTerm] = useState(tariffs[user?.tariff || ""]?.term);

    useEffect(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const ws = new WebSocket(`${protocol}://${BACKEND_URL.replace(/^https?:\/\//, '')}/ws`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.userId === user?._id) {
                if (data.tariffBalance !== undefined) {
                    setTariffBalance(data.tariffBalance);
                }
                if (data.percentPerMinute !== undefined) {
                    setPercentPerMinute(data.percentPerMinute);
                }

            }
        };

        ws.onclose = () => console.log("WebSocket connection closed");

        return () => {
            ws.close();
        };
    }, [user?._id]);

    useEffect(() => {
        const savedTerm = localStorage.getItem('term');
        const initialTerm = savedTerm ? parseInt(savedTerm, 10) : term;
        setTerm(initialTerm);

        const dailyInterval = setInterval(() => {
            setTerm((prevTerm) => {
                const newTerm = prevTerm > 0 ? prevTerm - 1 : 0;
                localStorage.setItem('term', newTerm.toString());
                return newTerm;
            });
        }, 24 * 60 * 60 * 1000);

        return () => {
            clearInterval(dailyInterval);
        };
    }, []);

    const remainingMoneyForNextTariff = (tariff: TariffKey, tariffBalance: number) => {
        const nextLevel = tariffs[tariff]?.next;
        if (!nextLevel) return "Данные отсутствуют";
        return `${(nextLevel - tariffBalance).toFixed(2)}$`;
    };

    const handleWithdraw = async () => {
        if (user?.tariffBalance === 0) {
            setAlert({ title: "Ошибка!", description: "У вас пустой баланс тарифа на снятие" });
            return;
        }

        try {
            const response = await newRequest.put("/user/update-balance");
            if (response.status === 200) {
                setAlert({ title: "Успех!", description: "Деньги успешно переведены на личный баланс" });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setAlert({ title: "Ошибка!", description: "У вас пустой баланс тарифа на снятие" });
            }
        } catch (error) {
            setAlert({ title: "Упс!", description: "Произошла ошибка на сервере" });
            console.log(error);
        }
    };

    const remainingMoney = parseFloat(remainingMoneyForNextTariff(tariff, tariffBalance)).toFixed(2);

    const getDaysLabel = (days: number): string => {
        if (days % 10 === 1 && days % 100 !== 11) return "день";
        if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return "дня";
        return "дней";
    };

    return (
        <>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
            <div className={styles.wrapper}>
                <div className={styles.diagram}>
                    <Diagram size={200} strokeWidth={30} percentPerMinute={percentPerMinute} />
                </div>
                <div className={styles.currentSalary}>
                    <div className={styles.sumContent}>
                        <p className={styles.title}>Ваш текущий заработок</p>
                        <p className={styles.sum}>
                            {tariffBalance ? `${tariffBalance.toFixed(2)}$` : "0.00$"}
                        </p>
                    </div>
                    <div className={styles.rest}>
                        <p className={styles.title}>След. тариф через:</p>
                        <p className={styles.title}>
                            {tariffBalance ? `${remainingMoney}$` : "Данные отсутствуют"}
                        </p>
                    </div>
                    <div className={styles.rest}>
                        <p className={styles.title}>До конца тарифа осталось:</p>
                        <p className={styles.title}>
                            {user?.remainingDays === 0 ?  "Данные отсутствуют" : `${user?.remainingDays} ${getDaysLabel(user?.remainingDays || 0)}`}
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