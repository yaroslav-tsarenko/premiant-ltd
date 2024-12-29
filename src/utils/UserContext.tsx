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
    earnings: number;
    tariff: number;
    withdrawals: number;
};
export const UserContext = createContext<User | undefined>(undefined);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ user, children }: { user: User; children: React.ReactNode }) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
