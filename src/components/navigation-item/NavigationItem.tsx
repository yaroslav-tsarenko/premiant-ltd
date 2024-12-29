import React from 'react';
import { NavigationItemProps } from '@/types/NavigationItemProps';
import styles from './NavigationItem.module.scss';
import Link from 'next/link';

interface ExtendedNavigationItemProps extends NavigationItemProps {
    color?: 'ItemRed' | 'ItemGreen';
}

const NavigationItem: React.FC<ExtendedNavigationItemProps> = ({ title, icon, route, className, color }) => {
    const colorClass = color ? styles[color] : '';

    return (
        <Link href={route} legacyBehavior>
            <a className={`${styles.navigationItem} ${className || ''} ${colorClass}`}>
                <span className={styles.title}>{title}</span>
                <span className={styles.icon}>{icon}</span>
            </a>
        </Link>
    );
};

export default NavigationItem;