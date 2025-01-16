"use client";

import React, { useState, useEffect } from "react";
import styles from "@/sections/transactions/Transactions.module.scss";
import SortTransactions from "@/components/sort-transactions/SortTransactions";
import TransactionsTable from "@/components/transactions-table/TransactionsTable";
import Dashboard from "@/components/dashboard/Dashboard";
import { useTransaction } from "@/utils/TransactionContext";
import { Transaction } from "@/types/transaction";

const Transactions = () => {
    const tableHeaders = ["Тип транзакции", "Дата", "ЭПС", "Сумма", "Статус оплаты"];
    const { transactions } = useTransaction();
    const [sortedTransactions, setSortedTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const filteredTransactions = transactions.map(({ transactionType, date, walletType, amount, status }) => ({
            transactionType: transactionType === "withdraw" ? "Снятие" : transactionType === "deposit" ? "Пополнение" : "Неизвестно",
            date,
            walletType,
            amount,
            status: status === "applied" ? "Принято" : status === "denied" ? "Отклонено" : "В обработке"
        }));
        setSortedTransactions(filteredTransactions as Transaction[]);
    }, [transactions]);

    const handleSort = (sortKey: string) => {
        const sorted = [...sortedTransactions].sort((a, b) => {
            if (sortKey === "date") {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (sortKey === "amount") {
                return a.amount - b.amount;
            }
            return 0;
        });
        setSortedTransactions(sorted);
    };

    return (
        <Dashboard>
            <div className={styles.wrapperInner}>
                <div className={styles.transactionsContent}>
                    <SortTransactions onSort={handleSort} />
                    <TransactionsTable headers={tableHeaders} transactions={sortedTransactions} />
                </div>
            </div>
        </Dashboard>
    );
};

export default Transactions;