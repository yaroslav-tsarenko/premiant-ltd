'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/constants/constants';
import {Withdrawal} from "@/types/withdrawal";

interface WithdrawalContextType {
    withdrawals: Withdrawal[];
    fetchWithdrawals: () => void;
}

interface WithdrawalProviderProps {
    children: ReactNode;
}

const WithdrawalContext = createContext<WithdrawalContextType | undefined>(undefined);

export const useWithdrawals = () => {
    const context = useContext(WithdrawalContext);
    if (!context) {
        throw new Error('useWithdrawals must be used within a WithdrawalProvider');
    }
    return context;
};

export const WithdrawalProvider: React.FC<WithdrawalProviderProps> = ({ children }) => {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

    const fetchWithdrawals = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/get-all-users-withdrawals`);
            setWithdrawals(response.data);
        } catch (error) {
            console.error('Error fetching withdrawals:', error);
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    return (
        <WithdrawalContext.Provider value={{ withdrawals, fetchWithdrawals }}>
            {children}
        </WithdrawalContext.Provider>
    );
};