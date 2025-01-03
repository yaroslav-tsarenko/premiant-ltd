"use client";

import React, {FC} from 'react';
import Image from 'next/image';
import {BottomNavProps} from '@/types/bottomNav';
import styles from './BottomNav.module.scss';

const BottomNav: FC<BottomNavProps> = ({logo, burgerIcon, links = []}) => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className={styles.bottomNav}>
            {isNavOpen && <div className={styles.overlay} onClick={handleNavToggle}></div>}
            <nav className={styles.nav}>
                {isNavOpen && (
                    <ul className={styles.links}>
                        {links.map((link, index) => (
                            <li key={index} className={styles.link}>
                                <a href={link.route}>{link.name}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
            <div className={styles.bottomBurgerMenu}>
                {logo && <Image src={logo} alt="logo" className={styles.logo}/>}
                <button className={styles.burgerIcon} onClick={handleNavToggle}>
                    {burgerIcon}
                </button>
            </div>
        </div>
    );
};

export default BottomNav;