import React from 'react';
import styles from './Balance.module.scss';

const Balance = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h1 className={styles.title}>Ваш текущий баланс</h1>
                <p className={styles.currentSum}>
                    200,00$
                </p>
            </div>
            <div className={styles.info}>
                <div className={styles.details}>
                    <p className={styles.headline}>доступно</p>
                    <p className={styles.sum}>200$</p>
                </div>
                <div className={styles.details}>
                    <p className={styles.headline}>выведено</p>
                    <p className={styles.sum}>12 328$</p>
                </div>
            </div>
        </div>
    );
};

export default Balance;