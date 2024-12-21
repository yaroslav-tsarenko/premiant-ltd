import React from 'react';
import styles from './BalanceWithdraw.module.scss';

const BalanceWithdraw = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.headline}>
                Доступ к выводу
            </h1>
            <p className={styles.balance}>
                200,00$
            </p>
        </div>
    );
};

export default BalanceWithdraw;