"use client"

import React from 'react';
import styles from './Balance.module.scss';
import {useUser} from "@/utils/UserContext";

const Balance = () => {
    const user = useUser();
    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h1 className={styles.title}>Ваш текущий баланс</h1>
                <p className={styles.currentSum}>
                    {user?.balance}$
                </p>
            </div>
            <div className={styles.info}>
                <div className={styles.details}>
                    <p className={styles.headline}>доступно</p>
                    <p className={styles.sum}>{user?.balance}$</p>
                </div>
                <div className={styles.details}>
                    <p className={styles.headline}>выведено</p>
                    <p className={styles.sum}>{user?.withdrawals}$</p>
                </div>
            </div>
        </div>
    );
};

export default Balance;