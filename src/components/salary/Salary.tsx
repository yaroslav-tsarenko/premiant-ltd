"use client";

import React from 'react';
import styles from './Salary.module.scss';
import Diagram from "@/components/diagram/Diagram";
import { useUser } from "@/utils/UserContext";

const Salary = () => {
    const user = useUser();

    const earnings = user?.earnings ?? 0;
    const balance = user?.balance ?? 0;
    const difference = earnings - balance;
    const percentage = balance ? Math.floor((difference / balance) * 100) : 0;

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
                        {earnings}$
                    </p>
                </div>
                <div className={styles.rest}>
                    <p className={styles.title}>
                        Осталось:
                    </p>
                    <p className={styles.title}>
                        {percentage}%, 15 дней
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Salary;