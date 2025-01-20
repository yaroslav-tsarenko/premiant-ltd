'use client';

import React from 'react';
import styles from './DepositList.module.scss';
import { useDeposits } from '@/utils/DepositsContext';
import UserEntity from '@/components/user-entity/UserEntity';
import {Deposit} from "@/types/deposit";

const DepositList: React.FC = () => {
    const { deposits } = useDeposits();

    return (
        <div className={styles.depositList}>
            {deposits.map((deposit: Deposit, index: number) => (
                <div key={index} className={styles.depositItem}>
                    <UserEntity
                        id={index}
                        type={'deposit'}
                        name={deposit.name}
                        userId={deposit.userId}
                        secondName={deposit.secondName}
                        amount={deposit.amount}
                        date={deposit.date}
                        status={deposit.status}
                        walletAddress={deposit.walletAddress}
                        email={deposit.email}
                    />
                </div>
            ))}
        </div>
    );
};

export default DepositList;