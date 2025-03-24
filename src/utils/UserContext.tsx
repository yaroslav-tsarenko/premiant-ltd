'use client';

import React, { createContext, useContext, ReactNode } from 'react';

export type User = {
    _id: string;
    name: string;
    secondName: string;
    email: string;
    telegram: string;
    referralCode: string;
    balance: number;
    curator: string;
    earnings: number;
    tariffBalance: number;
    tariffFirstDeposit: number;
    tariff: string;
    withdrawals: number;
    role: string;
    usdtWallet: string;
    btcWallet: string;
    perfectMoneyWallet: string;
    ethereumWallet: string;
    date: string;
    tariffExpirationDate: string;
    payeerWallet: string;
    card: string;
    remainingDays: number;
    percentPerMinute: number;
};

interface UserProviderProps {
    user: User | null;
    children: ReactNode;
}

const UserContext = createContext<User | null>(null);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ user, children }: UserProviderProps) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}