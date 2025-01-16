// src/utils/UsersContext.tsx

"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { newRequest } from '@/utils/newRequest';

export interface User {
    _id: string;
    name: string;
    secondName: string;
    email: string;
    telegram: string;
    referralCode: string;
    balance: number;
    curator: string;
    earnings: number;
    totalDeposit: number;
    totalWithdrawal: number;
    percent: number;
    averagePaymentStatus: string;
    tariff: string;
    withdrawals: number;
    usdtWallet: string;
    btcWallet: string;
    perfectMoneyWallet: string;
    ethereumWallet: string;
    date: string;
    payeerWallet: string;
    card: string;
    ipAddress: string;
    fullLocationName: string;
    createdAt: Date;
}

interface UsersContextProps {
    allUsers: User[];
    fetchUsers: () => void;
}

interface UsersProviderProps {
    children: ReactNode;
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsers must be used within a UsersProvider');
    }
    return context;
};

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await newRequest.get('/user/get-all');
            setAllUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UsersContext.Provider value={{ allUsers: allUsers, fetchUsers }}>
            {children}
        </UsersContext.Provider>
    );
};