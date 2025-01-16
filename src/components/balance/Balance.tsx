"use client"

import React from 'react';
import styles from './Balance.module.scss';
import {useUser} from "@/utils/UserContext";

const Balance = () => {
    const user = useUser();
    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h5 className={styles.title}>Ваш текущий баланс</h5>
                <p className={styles.currentSum}>
                    {user?.balance.toFixed(2)}$
                </p>
            </div>
            <div className={styles.info}>
                <div className={styles.details}>
                    <p className={styles.headline}>доступно</p>
                    <p className={styles.sum}>{user?.balance.toFixed(2)}$</p>
                </div>
                <div className={styles.details}>
                <p className={styles.headline}>выведено</p>
                    <p className={styles.sum}>{user?.withdrawals.toFixed(2)}$</p>
                </div>
            </div>
        </div>
    );
};

export default Balance;