"use client";

import React, { FC, useEffect, useState, useRef } from 'react';
import { PromoBarProps } from "@/types/promoBar";
import Image from 'next/image';
import Link from "next/link";
import styles from './PromoBar.module.scss';
import { BACKEND_URL } from "@/constants/constants";

const PromoBar: FC<PromoBarProps> = ({ text, promoLink, arrowIcon }) => {
    const [totalBalance, setTotalBalance] = useState<number | null>(() => {
        const savedBalance = localStorage.getItem('totalBalance');
        return savedBalance ? parseFloat(savedBalance) : null;
    });
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        wsRef.current = new WebSocket(`${protocol}://${BACKEND_URL.replace(/^https?:\/\//, '')}/ws`);

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTotalBalance((prevBalance) => {
                if (prevBalance !== data.totalBalance) {
                    if (data.totalBalance !== undefined && data.totalBalance !== null) {
                        localStorage.setItem('totalBalance', data.totalBalance.toString());
                    }
                    setIsFetching(false);
                    return data.totalBalance;
                }
                return prevBalance;
            });
        };

        wsRef.current.onclose = () => console.log('WebSocket connection closed');

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    return (
        <div className={styles.promoWrapper}>
            <div className={styles.promo}>
                <div>
                    <p className={styles.price}>
                        {isFetching ? (
                            'Идёт подсчёт...'
                        ) : (
                            totalBalance !== null && totalBalance !== undefined ? (
                                <span>+{totalBalance.toLocaleString('en-US').replace(/,/g, ' ')}$</span>
                            ) : (
                                'Идёт подсчёт...'
                            )
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