import React from 'react';
import styles from './ReferralProgramme.module.scss';
import {PiCopySimple} from "react-icons/pi";

const ReferralProgramme = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.referralProgrammeInfo}>
                <div className={styles.statistics}>
                    <p className={styles.text}>
                        Ваша реферальная програма
                    </p>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>8%</th>
                            <th>4%</th>
                            <th>2%</th>
                            <th>1%</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className={styles.curator}>
                    <p className={styles.text}>
                        Ваш куратор
                    </p>
                    <h2 className={styles.value}>
                        Корсов Даниил
                    </h2>
                </div>
            </div>
            <div className={styles.referralLinkInfo}>
                <div className={styles.linkContainer}>
                    <p className={styles.text}>
                        Ваша реферальная ссылка
                    </p>
                    <div className={styles.link}>
                        <p className={styles.linkText}>
                            https://premiant-ltd.com/daniil.kurs
                        </p>
                        <PiCopySimple className={styles.copyIcon}/>
                    </div>
                </div>
                <div className={styles.linkActivity}>
                    <div className={styles.activity}>
                        <p className={styles.text}>
                            Клики по ссылке
                        </p>
                        <p className={styles.value}>
                            2456
                        </p>
                    </div>
                    <div className={styles.activity}>
                        <p className={styles.text}>
                            Активные
                        </p>
                        <p className={styles.value}>
                            26
                        </p>
                    </div>
                    <div className={styles.activity}>
                        <p className={styles.text}>
                            Неактивные
                        </p>
                        <p className={styles.value}>
                            567
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralProgramme;