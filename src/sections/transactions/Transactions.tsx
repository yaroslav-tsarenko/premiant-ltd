import React from "react";
import styles from "@/sections/transactions/Transactions.module.scss";
import Navigation from "@/components/navigation/Navigation";
import SortTransactions from "@/components/sort-transactions/SortTransactions";
import TransactionsTable from "@/components/transactions-table/TransactionsTable";

const Transactions = () => {
    const tableHeaders = ["Тип транзакции", "Дата", "ЭПС", "Сумма", "Статус оплаты"];
    const transactions = [
        { type: "Снятие", date: "14.10.2024, 22:36", eps: "Tether (TRC20)", amount: "140,00$", status: "Выполнено" },
        { type: "Снятие", date: "14.10.2024, 22:36", eps: "Tether (TRC20)", amount: "140,00$", status: "Отклонено" },
        { type: "Начисление", date: "14.10.2024, 22:34", eps: "Tether (TRC20)", amount: "20,00$", status: "Выполнено" },
        { type: "Инвестиция", date: "13.10.2024, 22:34", eps: "Tether (TRC20)", amount: "20,00$", status: "Выполнено" },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperInner}>
                <Navigation />
                <div className={styles.transactionsContent}>
                    <SortTransactions />
                    <TransactionsTable headers={tableHeaders} transactions={transactions} />
                </div>
            </div>
        </div>
    );
};

export default Transactions;
