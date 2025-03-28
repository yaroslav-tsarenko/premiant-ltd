"use client";

import React from 'react';
import styles from './PartnerSystem.module.scss';
import Balance from "@/components/balance/Balance";
import ReferralProgramme from "@/components/referral-programme/ReferralProgramme";
import TransactionsTable from "@/components/transactions-table/TransactionsTable";
import Dashboard from "@/components/dashboard/Dashboard";
import { ReferralProvider } from "@/utils/ReferralContext";
import { useCurator } from "@/utils/CuratorContext";
import { useUsers } from "@/utils/UsersContext";
import { Transaction } from "@/types/transaction";

const PartnerSystem = () => {
    const { users } = useCurator();
    const { allUsers } = useUsers();
    const tableReferrals = ["Имя пользователя", "Куратор", "Дата регистрации", "Депозит", "Процент", "Выплачено", "Статус оплаты"];
    const tablePartners = ["Имя пользователя", "Тип транзакции", "Дата", "ЭПС", "Сумма", "Статус оплаты"];

    const mapStatus = (status: string): "В обработке" | "Выполнено" | "Отклонено" => {
        switch (status) {
            case 'pending':
                return 'В обработке';
            case 'applied':
                return 'Выполнено';
            case 'denied':
                return 'Отклонено';
            default:
                return 'В обработке';
        }
    };

    const randomUsers = allUsers ? allUsers.sort(() => 0.5 - Math.random()).slice(0, 10) : [];

    const referralsTransactions: Transaction[] = users.map(user => ({
        userName: user.name,
        curatorName: user.curator,
        date: new Date(user.createdAt).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', ''),
        amount: user.totalDeposit,
        percent: user.percent,
        paid: user.totalWithdrawal,
        status: mapStatus(user.averagePaymentStatus),
    }));

    const partnersTransactions: Transaction[] = randomUsers.map(user => ({
        userName: user.name,
        transactionType: mapStatus(user.averagePaymentStatus),
        date: new Date(user.createdAt).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', ''),
        eps: "Tether (TRC20)",
        amount: user.totalDeposit,
        status: mapStatus(user.averagePaymentStatus),
    }));

    return (
        <Dashboard>
            <ReferralProvider>
                <div className={styles.wrapperInner}>
                    <div className={styles.partnerSystemContent}>
                        <div className={styles.partnerSystem}>
                            <Balance />
                            <ReferralProgramme />
                        </div>
                        <div className={styles.transactions}>
                            <h1 className={styles.headline}>
                                Ваши рефералы
                            </h1>
                            <TransactionsTable headers={tableReferrals} transactions={referralsTransactions} />
                        </div>
                        <div className={styles.transactions}>
                            <h1 className={styles.headline}>
                               Недавние пользователи
                            </h1>
                            <TransactionsTable headers={tablePartners} transactions={partnersTransactions} />
                        </div>
                    </div>
                </div>
            </ReferralProvider>
        </Dashboard>
    );
};

export default PartnerSystem;