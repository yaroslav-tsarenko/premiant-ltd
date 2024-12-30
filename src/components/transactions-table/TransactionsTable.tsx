"use client";

import React from "react";
import styles from "@/components/transactions-table/TransactionsTable.module.scss";

interface Transaction {
    [key: string]: string | undefined;
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
                <tr className={styles.idColumn}>
                    <th>ID</th>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td className={getStatusStyle(transaction.status || '')}>{index + 1}</td>
                        {Object.keys(transaction).map((key, idx) => (
                            <td key={idx} className={key === 'status' ? getStatusStyle(transaction[key] || '') : key === 'type' ? getTypeStyle(transaction[key] || '') : ''}>
                                {transaction[key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;