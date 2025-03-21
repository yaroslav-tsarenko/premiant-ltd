'use client';

import React, { createContext, useContext } from 'react';
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
export const UserContext = createContext<User | undefined>(undefined);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ user, children }: { user: User; children: React.ReactNode }) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
