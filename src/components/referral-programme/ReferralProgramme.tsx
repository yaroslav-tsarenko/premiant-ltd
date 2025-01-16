"use client";

import { transliterate } from 'transliteration';
import React, {useState} from 'react';
import styles from './ReferralProgramme.module.scss';
import { PiCopySimple } from "react-icons/pi";
import { useUser } from "@/utils/UserContext";
import Alert from "@/components/alert/Alert";
import {useReferral} from "@/utils/ReferralContext";
import {FRONTEND_URL} from "@/constants/constants";

const ReferralProgramme = () => {
    const user = useUser();
    const referral = useReferral();
    const referralLink = `${FRONTEND_URL}/${user?.referralCode}`;
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setAlert({ title: 'сыллка скопирована!', description: 'Скорее делись с ней с друзями и начинайте зарабатывать!' });
        }).catch(err => {
            console.error('Failed to copy: ', err);
            setAlert({ title: 'Error', description: 'Failed to copy referral link.' });
        });
    };

    const transliterateToRussian = (curator: string): string => {
        const [name, secondName] = curator.split('.');
        const transliteratedName = transliterate(name);
        const transliteratedSecondName = transliterate(secondName);
        return `${transliteratedName} ${transliteratedSecondName}`;
    };

    const curatorName = user?.curator
        ? transliterateToRussian(user.curator)
        : `${user?.name || 'Нет имени'} ${user?.secondName || 'Нет фамилии'}`;

    return (
        <div className={styles.wrapper}>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
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
                        {curatorName}
                    </h2>
                </div>
            </div>
            <div className={styles.referralLinkInfo}>
                <div className={styles.linkContainer}>
                    <p className={styles.text}>
                        Ваша реферальная ссылка
                    </p>
                    <div className={styles.link} onClick={copyToClipboard}>
                        <p className={styles.linkText}>
                            {user?.referralCode ? referralLink : 'Ваша ссылка генерируеться, это может занять 5 минут'}
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
                            {referral?.clicks || 0}
                        </p>
                    </div>
                    <div className={styles.activity}>
                        <p className={styles.text}>
                            Активные
                        </p>
                        <p className={styles.value}>
                            {referral?.active || 0}
                        </p>
                    </div>
                    <div className={styles.activity}>
                        <p className={styles.text}>
                            Неактивные
                        </p>
                        <p className={styles.value}>
                            {referral?.unActive || 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralProgramme;