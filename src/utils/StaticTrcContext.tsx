import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { newRequest } from '@/utils/newRequest';

interface StaticTrcAddress {
    staticTrc: string;
}

interface StaticTRcContextProps {
    trcAddress: StaticTrcAddress;
    error: string | null;
}

const StaticTRcContext = createContext<StaticTRcContextProps | undefined>(undefined);

export const useStaticTRc = () => {
    const context = useContext(StaticTRcContext);
    if (!context) {
        throw new Error('useStaticTRc must be used within a StaticTRcProvider');
    }
    return context;
};

interface StaticTRcProviderProps {
    children: ReactNode;
}

export const StaticTRcProvider: React.FC<StaticTRcProviderProps> = ({ children }) => {
    const [trcAddress, setTrcAddress] = useState<StaticTrcAddress>({ staticTrc: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        newRequest.get('/get-trc/static-trc')
            .then(response => {
                setTrcAddress(response.data);
            })
            .catch(error => {
                console.error('Error fetching TRC address:', error);
                setError('Error fetching TRC address');
            });
    }, []);

    return (
        <StaticTRcContext.Provider value={{ trcAddress, error }}>
            {children}
        </StaticTRcContext.Provider>
    );
};