import React from 'react';
import { NavigationItemProps } from '@/types/NavigationItemProps';
import styles from './NavigationItem.module.scss';
import Link from 'next/link';

const NavigationItem: React.FC<NavigationItemProps> = ({ title, icon, route, className }) => {
    return (
        <Link href={route} legacyBehavior>
            <a className={`${styles.navigationItem} ${className || ''}`}>
                <span className={styles.title}>{title}</span>
                <span className={styles.icon}>{icon}</span>
            </a>
        </Link>
    );
};

export default NavigationItem;