import React from 'react';
import styles from './PartnerSystem.module.scss';
import Balance from "@/components/balance/Balance";
import ReferralProgramme from "@/components/referral-programme/ReferralProgramme";
import TransactionsTable from "@/components/transactions-table/TransactionsTable";
import Dashboard from "@/components/dashboard/Dashboard";

const PartnerSystem = () => {

    const tableReferrals = ["Имя пользователя", "Куратор", "Дата регистрации", "Депозит", "Процент", "Выплачено", "Статус оплаты"];
    const referralsTransactions = [
        {userName: "kornopatiy", curatorName: "james.bond", date: "14.10.2024, 22:36", deposit: "140,00$", percent: "8%", paid: "140,00$", status: "Выполнено"},
        {userName: "kornopatiy", curatorName: "james.bond", date: "14.10.2024, 22:36", deposit: "140,00$", percent: "8%", paid: "140,00$", status: "Отклонено"},
        {userName: "kornopatiy", curatorName: "james.bond", date: "14.10.2024, 22:36", deposit: "140,00$", percent: "8%", paid: "140,00$", status: "Выполнено"},
        {userName: "kornopatiy", curatorName: "james.bond", date: "14.10.2024, 22:36", deposit: "140,00$", percent: "8%", paid: "140,00$", status: "Выполнено"},
    ];

    const tablePartners = ["Имя пользователя", "Тип транзакции", "Дата", "ЭПС", "Сумма", "Статус оплаты"];
    const partnersTransactions = [
        {userName: "kornopatiy", type: "Снятие", date: "14.10.2024, 22:36", eps: "Tether (TRC20)", amount: "140,00$", status: "Выполнено"},
        {userName: "kornopatiy", type: "Снятие", date: "14.10.2024, 22:36", eps: "Tether (TRC20)", amount: "140,00$", status: "Отклонено"},
        {userName: "kornopatiy", type: "Начисление", date: "14.10.2024, 22:34", eps: "Tether (TRC20)", amount: "20,00$", status: "Выполнено"},
        {userName: "kornopatiy", type: "Инвестиция", date: "13.10.2024, 22:34", eps: "Tether (TRC20)", amount: "20,00$", status: "Выполнено"},
    ];

    return (
        <Dashboard>
            <div className={styles.wrapperInner}>
                <div className={styles.partnerSystemContent}>
                    <div className={styles.partnerSystem}>
                        <Balance/>
                        <ReferralProgramme/>
                    </div>
                    <div className={styles.transactions}>
                        <h1 className={styles.headline}>
                            Ваши рефералы
                        </h1>
                        <TransactionsTable headers={tableReferrals} transactions={referralsTransactions}/>
                    </div>
                    <div className={styles.transactions}>
                        <h1 className={styles.headline}>
                            ТРАНЗАКЦИИ партнеров
                        </h1>
                        <TransactionsTable headers={tablePartners} transactions={partnersTransactions}/>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default PartnerSystem;