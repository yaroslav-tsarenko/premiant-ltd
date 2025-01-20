'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/constants/constants';
import {Deposit} from "@/types/deposit";

interface DepositContextType {
    deposits: Deposit[];
    fetchDeposits: () => void;
}

interface DepositProviderProps {
    children: ReactNode;
}

const DepositContext = createContext<DepositContextType | undefined>(undefined);

export const useDeposits = () => {
    const context = useContext(DepositContext);
    if (!context) {
        throw new Error('useDeposits must be used within a DepositProvider');
    }
    return context;
};

export const DepositProvider: React.FC<DepositProviderProps> = ({ children }) => {
    const [deposits, setDeposits] = useState<Deposit[]>([]);

    const fetchDeposits = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/get-all-users-deposits`);
            setDeposits(response.data);
        } catch (error) {
            console.error('Error fetching deposits:', error);
        }
    };

    useEffect(() => {
        fetchDeposits();
    }, []);

    return (
        <DepositContext.Provider value={{ deposits, fetchDeposits }}>
            {children}
        </DepositContext.Provider>
    );
};