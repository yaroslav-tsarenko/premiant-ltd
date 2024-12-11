import React, {FC} from 'react';
import {PromoBarProps} from "@/types/promoBar";
import Image from 'next/image';
import Link from "next/link";
import styles from './PromoBar.module.scss';

const PromoBar: FC<PromoBarProps> = ({text, promoLink, arrowIcon}) => {
    return (
        <div className={styles.promoWrapper}>
            <div className={styles.promo}>
                <div>
                    <p className={styles.price}>
                        180 000$
                    </p>
                    <p className={styles.text}>{text}</p>
                </div>
                <Link href={promoLink.route} legacyBehavior>
                    <a className={styles.links}>
            <span className={styles.link}>
                {promoLink.name}
            </span>
                        {arrowIcon && <Image src={arrowIcon} alt="Arrow"/>}
                    </a>
                </Link>
            </div>
        </div>

    );
};

export default PromoBar;