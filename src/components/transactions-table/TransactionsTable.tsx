"use client";

import React from "react";
import styles from "@/components/transactions-table/TransactionsTable.module.scss";

interface Transaction {
    type: string;
    date: string;
    eps: string;
    amount: string;
    status: string;
    percent?: string;
}

interface TransactionsTableProps {
    headers: string[];
    transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ headers, transactions }) => {
    const getStatusStyle = (status: string) => {
        return status === "Отклонено" ? styles.redText : styles.greenText;
    };

    const getTypeStyle = (type: string) => {
        return type === "Снятие"
            ? styles.redText
            : type === "Инвестиция"
                ? styles.blueText
                : styles.greenText;
    };

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td className={getStatusStyle(transaction.status)}>{transactions.length - index}</td>
                        <td className={getTypeStyle(transaction.type)}>{transaction.type}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.eps}</td>
                        <td>{transaction.amount}</td>
                        <td className={getStatusStyle(transaction.status)}>{transaction.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;