import React from 'react';
import styles from './BalanceWithdraw.module.scss';
import {useUser} from "@/utils/UserContext";

const BalanceWithdraw = () => {
    const user = useUser();
    return (
        <div className={styles.wrapper}>
            <h5 className={styles.headline}>
                Доступно к выводу
            </h5>
            <p className={styles.balance}>
                {user?.balance.toFixed(2)}$
            </p>
        </div>
    );
};

export default BalanceWithdraw;