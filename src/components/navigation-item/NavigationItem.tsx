import React from 'react';
import { NavigationItemProps } from '@/types/NavigationItemProps';
import styles from './NavigationItem.module.scss';
import Link from 'next/link';

const NavigationItem: React.FC<NavigationItemProps> = ({ title, icon, route, type }) => {
    const className = `${styles.navigationItem} ${type === 'ItemGreen' ? styles.ItemGreen : ''} ${type === 'ItemRed' ? styles.ItemRed : ''}`;

    return (
        <Link href={route} legacyBehavior>
            <a className={`${styles.wrapper} ${className}`}>
                <span className={styles.title}>{title}</span>
                <span className={styles.icon}>{icon}</span>
            </a>
        </Link>
    );
};

export default NavigationItem;
