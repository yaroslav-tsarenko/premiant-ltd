import React, {FC} from 'react';
import {PromoBarProps} from "@/types/promoBar";
import Image from 'next/image';
import Link from "next/link";
import styles from './PromoBar.module.scss';

const PromoBar: FC<PromoBarProps> = ({price, text, promoLink, arrowIcon}) => {
    return (
        <div className={styles.promo}>
            <section>
                <Image src={price} alt="Price"/>
                <p className={styles.text}>{text}</p>
            </section>

            <Link href={promoLink.route} legacyBehavior>
                <a className={styles.links}>
            <span className={styles.link}>
                {promoLink.name}
            </span>
                    {arrowIcon && <Image src={arrowIcon} alt="Arrow"/>}
                </a>
            </Link>


        </div>
    );
};

export default PromoBar;