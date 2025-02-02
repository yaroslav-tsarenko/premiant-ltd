"use client";

import React, { FC, useEffect, useState } from 'react';
import { PromoBarProps } from "@/types/promoBar";
import Image from 'next/image';
import Link from "next/link";
import styles from './PromoBar.module.scss';
import { BACKEND_URL } from "@/constants/constants";

const PromoBar: FC<PromoBarProps> = ({ text, promoLink, arrowIcon }) => {
    const [totalBalance, setTotalBalance] = useState<number | null>(null);

    useEffect(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const ws = new WebSocket(`${protocol}://${BACKEND_URL.replace(/^https?:\/\//, '')}/ws`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTotalBalance(data.totalBalance);
        };

        ws.onclose = () => console.log('WebSocket connection closed');

        return () => ws.close();
    }, []);

    return (
        <div className={styles.promoWrapper}>
            <div className={styles.promo}>
                <div>
                    <p className={styles.price}>
                        {totalBalance !== null && totalBalance !== undefined ? (
                            <span>+{totalBalance.toLocaleString('en-US').replace(/,/g, ' ')}$</span>
                        ) : (
                            'Идёт подсчёт...'
                        )}
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