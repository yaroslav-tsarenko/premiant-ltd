"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { newRequest } from '@/utils/newRequest';
import { Transaction } from '@/types/transaction';

interface TransactionContextProps {
    transactions: Transaction[];
    fetchTransactions: () => void;
}

interface TransactionProviderProps {
    children: ReactNode;
}

const TransactionContext = createContext<TransactionContextProps | undefined>(undefined);

export const useTransaction = () => {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error('useTransaction must be used within a TransactionProvider');
    }
    return context;
};

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const fetchTransactions = async () => {
        try {
            const response = await newRequest.get('/transaction/get-all-transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionContext.Provider value={{ transactions, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};