import React, { createContext, useContext, useEffect, useState } from 'react';
import { newRequest } from '@/utils/newRequest';

interface TotalBalanceContextProps {
    totalBalance: number | null;
}

const TotalBalanceContext = createContext<TotalBalanceContextProps>({ totalBalance: null });

export const useTotalBalance = () => useContext(TotalBalanceContext);

export const TotalBalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [totalBalance, setTotalBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchTotalBalance = async () => {
            try {
                const response = await newRequest.get('/total-balance/get-total-balance');
                if (response.status === 200) {
                    setTotalBalance(response.data.totalBalance);
                } else {
                    console.error('Failed to fetch total balance:', response.data);
                }
            } catch (error) {
                console.error('Error fetching total balance:', error);
            }
        };

        fetchTotalBalance();
    }, []);

    return (
        <TotalBalanceContext.Provider value={{ totalBalance }}>
            {children}
        </TotalBalanceContext.Provider>
    );
};