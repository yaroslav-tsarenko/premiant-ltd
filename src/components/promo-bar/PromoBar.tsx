"use client";

import React, { FC } from 'react';
import { PromoBarProps } from "@/types/promoBar";
import Image from 'next/image';
import Link from "next/link";
import styles from './PromoBar.module.scss';
import {useTotalBalance} from "@/utils/TotalBalanceContext";

const PromoBar: FC<PromoBarProps> = ({ text, promoLink, arrowIcon }) => {
   const {totalBalance} = useTotalBalance();

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