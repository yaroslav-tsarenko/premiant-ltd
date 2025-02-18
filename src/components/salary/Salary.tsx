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
    const tariff = user?.tariff ?? "";
    const [alert, setAlert] = useState<{ title: string; description: string } | null>(null);
    const [term, setTerm] = useState(tariffs[user?.tariff || ""]?.term);

    useEffect(() => {
        const ws = new WebSocket(`${BACKEND_URL.replace(/^http/, "ws")}`);

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

    const baseValue = (tariff: TariffKey) => {
        return tariffs[tariff]?.next || 100;
    };

    const calculatePercentage = (tariffBalance: number, baseValue: number) => {
        const result = (tariffBalance / baseValue) * 100;
        return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    };

    const [percentage, setPercentage] = useState(() => {
        return calculatePercentage(tariffBalance, baseValue(user?.tariff || ""));
    });

    useEffect(() => {
        const increment = 100 / (term * 24 * 60);

        const interval = setInterval(() => {
            setPercentage((prev) => {
                const newValue = prev + increment;
                return newValue > 100 ? 100 : parseFloat(newValue.toFixed(2));
            });
        }, 60000);

        return () => clearInterval(interval);
    }, [term]);

    const handleWithdraw = async () => {
        if (user?.tariffBalance === 0) {
            setAlert({ title: "Ошибка!", description: "У вас пустой баланс тарифа на снятие" });
            return;
        }

        const currentDate = new Date();
        const tariffExpirationDate = new Date(user?.tariffExpirationDate ?? "");

        if (tariffExpirationDate > currentDate) {
            setAlert({ title: "Ошибка!", description: "Вы не можете вывести деньги до конца тарифа" });
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

    // function calculateDays(balance: number, tariff: TariffKey): number {
    //     const currentTariff = tariffs[tariff];
    //     if (!currentTariff || !currentTariff.next) {
    //         return NaN;
    //     }
    //
    //     const dailyRate = currentTariff.rate;
    //     const targetBalance = currentTariff.next;
    //     const remainingAmount = targetBalance - balance;
    //
    //     if (remainingAmount <= 0) {
    //         return 0;
    //     }
    //
    //     const days = Math.ceil(Math.log(targetBalance / balance) / Math.log(1 + dailyRate));
    //     return days;
    // }

    // const remainingDays = calculateDays(user?.tariffBalance || 0, user?.tariff || "");

    return (
        <>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
            <div className={styles.wrapper}>
                <div className={styles.diagram}>
                    <Diagram value={percentage} size={200} strokeWidth={30} />
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
                            {term ? `${term} ${getDaysLabel(term)}` : "Данные отсутствуют"}
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
