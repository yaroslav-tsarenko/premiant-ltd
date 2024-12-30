"use client";

import React, { useState } from "react";
import styles from "@/sections/transactions/Transactions.module.scss";
import SortTransactions from "@/components/sort-transactions/SortTransactions";
import TransactionsTable from "@/components/transactions-table/TransactionsTable";
import Dashboard from "@/components/dashboard/Dashboard";

const Transactions = () => {
    const tableHeaders = ["Тип транзакции", "Дата", "ЭПС", "Сумма", "Статус оплаты"];
    const initialTransactions = [
        { type: "Снятие", date: "14.10.2024, 22:36", eps: "Tether (TRC20)", amount: "140,00$", status: "Выполнено" },
        { type: "Снятие", date: "14.10.2024, 22:36", eps: "Tether (TRC20)", amount: "140,00$", status: "Отклонено" },
        { type: "Начисление", date: "14.10.2024, 22:34", eps: "Tether (TRC20)", amount: "20,00$", status: "Выполнено" },
        { type: "Инвестиция", date: "13.10.2024, 22:34", eps: "Tether (TRC20)", amount: "20,00$", status: "Выполнено" },
    ];

    const [transactions, setTransactions] = useState(initialTransactions);

    const handleSort = (sortKey: string) => {
        const sortedTransactions = [...transactions].sort((a, b) => {
            if (sortKey === "date") {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (sortKey === "amount") {
                return parseFloat(a.amount.replace(/[^0-9.-]+/g, "")) - parseFloat(b.amount.replace(/[^0-9.-]+/g, ""));
            }
            return 0;
        });
        setTransactions(sortedTransactions);
    };

    return (
        <Dashboard>
            <div className={styles.wrapperInner}>
                <div className={styles.transactionsContent}>
                    <SortTransactions onSort={handleSort} />
                    <TransactionsTable headers={tableHeaders} transactions={transactions} />
                </div>
            </div>
        </Dashboard>
    );
};

export default Transactions;