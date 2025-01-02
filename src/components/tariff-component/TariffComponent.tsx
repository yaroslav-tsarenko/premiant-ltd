import React, { FC } from 'react';
import styles from './TariffComponent.module.scss';
import { TariffComponentProps } from '@/types/tariffComponent';
import Link from 'next/link';

const TariffComponent: FC<TariffComponentProps> = ({ headline, price, percent, variant = 'wrapper', term, currentTariff, alwaysHighlighted }) => {
    const buttonClass = `${styles[variant] || styles.wrapper} ${currentTariff === headline.toLowerCase() ? styles.highlight : ''} ${alwaysHighlighted ? styles.alwaysHighlight : ''}`;

    return (
        <div className={buttonClass}>
            <div className={styles.content}>
                <h2 className={styles.headline}>
                    {headline}
                </h2>
                <div className={styles.divingLine}></div>
                <div className={styles.info}>
                    <div className={styles.prices}>
                        <p>Инвестиции:</p>
                        <p>от {price}$</p>
                    </div>
                    <div className={styles.prices}>
                        <p>Процент:</p>
                        <p>{percent}% в день</p>
                    </div>
                    {term && (
                        <div className={styles.prices}>
                            <p>Срок</p>
                            <p>{term} дней</p>
                        </div>
                    )}
                </div>
            </div>
            <Link href="#" legacyBehavior>
                <a className={styles.btn}>Выбрать тариф</a>
            </Link>
        </div>
    );
};

export default TariffComponent;