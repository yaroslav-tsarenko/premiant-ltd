"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { newRequest } from '@/utils/newRequest';

export type Referral = {
    userId: string;
    email: string;
    referralCode: string;
    clicks: number;
    active: number;
    unActive: number;
};

const ReferralContext = createContext<Referral | undefined>(undefined);

export function useReferral() {
    return useContext(ReferralContext);
}

export function ReferralProvider({ children }: { children: React.ReactNode }) {
    const [referral, setReferral] = useState<Referral | undefined>(undefined);

    useEffect(() => {
        const fetchReferral = async () => {
            try {
                const response = await newRequest.get('/referral/current-referral');
                setReferral(response.data);
            } catch (error) {
                console.error('Failed to fetch referral:', error);
            }
        };

        fetchReferral();
    }, []);

    return (
        <ReferralContext.Provider value={referral}>
            {children}
        </ReferralContext.Provider>
    );
}