"use client"

import React from 'react';
import styles from './WithdrawalList.module.scss';
import { useWithdrawals } from '@/utils/WithdrawalsContext';
import { Withdrawal } from '@/types/withdrawal';
import UserEntity from '@/components/user-entity/UserEntity';

const WithdrawalList: React.FC = () => {
    const { withdrawals } = useWithdrawals();

    return (
        <div className={styles.withdrawalList}>
            {withdrawals.map((withdrawal: Withdrawal, index: number) => (
                <div key={index} className={styles.withdrawalItem}>
                    <UserEntity
                        type={'deposit'}
                        id={index}
                        userId={withdrawal.userId}
                        name={withdrawal.name}
                        secondName={withdrawal.secondName}
                        amount={withdrawal.amount}
                        date={withdrawal.date}
                        status={withdrawal.status}
                        walletAddress={withdrawal.walletAddress}
                        email={withdrawal.email}
                    />
                </div>
            ))}
        </div>
    );
};

export default WithdrawalList;