"use client";

import React, { FC, useEffect, useState } from 'react';
import { PromoBarProps } from "@/types/promoBar";
import Image from 'next/image';
import Link from "next/link";
import styles from './PromoBar.module.scss';
import {BACKEND_URL} from "@/constants/constants";

const PromoBar: FC<PromoBarProps> = ({ text, promoLink, arrowIcon }) => {
    const [totalBalance, setTotalBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchTotalBalance = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/total-balance/get-total-balance`);
                const data = await response.json();
                setTotalBalance(data.totalBalance);
            } catch (error) {
                console.error('Error fetching total balance:', error);
            }
        };

        fetchTotalBalance();
    }, []);

    return (
        <div className={styles.promoWrapper}>
            <div className={styles.promo}>
                <div>
                    <p className={styles.price}>
                        {totalBalance !== null ? `${totalBalance.toLocaleString('en-US').replace(/,/g, ' ')}$` : 'Идёт подсчёт...'}
                    </p>
                    <p className={styles.text}>{text}</p>
                </div>
                <Link href={promoLink.route} legacyBehavior>
                <a className={styles.links}>
                        <span className={styles.link}>
                            {promoLink.name}
                        </span>
                        {arrowIcon && <Image src={arrowIcon} alt="Arrow" />}
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default PromoBar;