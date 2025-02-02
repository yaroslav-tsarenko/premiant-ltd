"use client"

import React, { FC, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import Navigation from "@/components/navigation/Navigation";
import { DashboardProps } from "@/types/dashboard";
import { useUser } from "@/utils/UserContext";
import Warning from "@/components/warning/Warning";
import { useRouter } from 'next/navigation';

const Dashboard: FC<DashboardProps> = ({ children }) => {
    const user = useUser();
    const router = useRouter();
    const showWarning = !user?.usdtWallet && !user?.btcWallet && !user?.perfectMoneyWallet && !user?.ethereumWallet && !user?.payeerWallet && !user?.card;
    const showAlert = user?.balance === 0;

    useEffect(() => {
        let token = "";
        if (typeof document !== "undefined") {
            token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1] || "";
        }
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperInner}>
                <Navigation userType={user?.role ?? 'user'} />
                <div className={styles.dashboardContent}>
                    {user?.role !== 'admin' && (
                        <>
                            {showAlert && (
                                <Warning type="green" description="Пополните баланс что бы перейти на тариф и начать зарабатывать" link="/deposit" button="Пополнить баланс" />
                            )}
                            {showWarning && (
                                <Warning type="red" description="Укажите свои платежные данные в настройках аккаунта" link="/settings" button="Перейти в настройки" />
                            )}
                        </>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;