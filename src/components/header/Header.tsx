"use client"

import React, {FC} from 'react';
import Image from 'next/image';
import Link from "next/link";
import logo from "@/assets/images/logo.svg";
import styles from './Header.module.scss';
import {HeaderProps} from "@/types/header";
import LanguageDropdown from '../language-dropdown/LanguageDropdown';

const Header: FC<HeaderProps> = ({headerLinks = [], children}) => {
    const firstPartLinks = headerLinks.slice(0, 3);
    const secondPartLinks = headerLinks.slice(3);

    const handleScrollToFAQ = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const faqElement = document.getElementById('faq');
        if (faqElement) {
            faqElement.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <>

            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <nav className={styles.links}>
                        <ul>
                            {firstPartLinks.map((link, index) => (
                                <li key={index} className={styles.link}>
                                    <Link href={link.route} legacyBehavior>
                                        <a>{link.name}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Link href="/" legacyBehavior>
                        <Image src={logo} alt="Логотип" className={styles.logo}/>
                    </Link>
                    <nav className={styles.links}>
                        <ul>
                            {secondPartLinks.map((link, index) => (
                                <li key={index} className={styles.link}>
                                    <Link href={link.route} legacyBehavior>
                                        <a onClick={link.name === 'FAQ' ? handleScrollToFAQ : undefined}>{link.name}</a>
                                    </Link>
                                </li>
                            ))}
                            <LanguageDropdown/>
                            {children}
                        </ul>
                        <div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;