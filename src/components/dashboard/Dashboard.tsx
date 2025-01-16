import React, {FC} from 'react';
import styles from './Dashboard.module.scss';
import Navigation from "@/components/navigation/Navigation";
import {DashboardProps} from "@/types/dashboard";
import {useUser} from "@/utils/UserContext";
import Warning from "@/components/warning/Warning";

const Dashboard: FC<DashboardProps> = ({children}) => {
    const user = useUser();

    const showWarning = !user?.usdtWallet && !user?.btcWallet && !user?.perfectMoneyWallet && !user?.ethereumWallet && !user?.payeerWallet && !user?.card;
    const showAlert = user?.tariff === 'none';

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperInner}>
                <Navigation/>
                <div className={styles.dashboardContent}>
                    {showAlert &&
                        <Warning type="green" description="Пополните баланс что бы перейти на тариф и начать зарабатывать" link="/deposit" button="Пополнить баланс"/>}
                    {showWarning &&
                        <Warning type="red" description="Укажите свои платежные данные в настройках аккаунта" link="/settings" button="Перейти в настройки"/>}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;