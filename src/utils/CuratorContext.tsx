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

interface CuratorContextProps {
    users: User[];
    fetchUsersByCurator: () => void;
}

interface CuratorProviderProps {
    children: ReactNode;
}

const CuratorContext = createContext<CuratorContextProps | undefined>(undefined);

export const useCurator = () => {
    const context = useContext(CuratorContext);
    if (!context) {
        throw new Error('useCurator must be used within a CuratorProvider');
    }
    return context;
};

export const CuratorProvider: React.FC<CuratorProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsersByCurator = async () => {
        try {
            const response = await newRequest.get('/user/get-all-users-by-curator');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users by curator:', error);
        }
    };

    useEffect(() => {
        fetchUsersByCurator();
    }, []);

    return (
        <CuratorContext.Provider value={{ users, fetchUsersByCurator }}>
            {children}
        </CuratorContext.Provider>
    );
};