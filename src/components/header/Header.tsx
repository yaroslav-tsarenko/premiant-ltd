"use client";

import React, { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import logo from "@/assets/images/logo.svg";
import styles from './Header.module.scss';
import { HeaderProps } from "@/types/header";
import LanguageDropdown from '../language-dropdown/LanguageDropdown';
import Button from "@/components/button/Button";
import { FaRegUserCircle } from "react-icons/fa";
import { useUser } from "@/utils/UserContext";
import { usePathname } from "next/navigation";

const Header: FC<HeaderProps> = ({ headerLinks = [] }) => {
    const pathname = usePathname();
    const hideHeaderRoutes = ['/account', '/transactions', '/settings', '/partner-system', '/deposit', '/payment'];
    const user = useUser();
    const firstPartLinks = headerLinks.slice(0, 3);
    const secondPartLinks = headerLinks.slice(3);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {!hideHeaderRoutes.includes(pathname) && (
                <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
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
                            <Image src={logo} alt="Логотип" className={styles.logo} />
                        </Link>
                        <nav className={styles.links}>
                            <ul>
                                {secondPartLinks.map((link, index) => (
                                    <li key={index} className={styles.link}>
                                        <Link href={link.route} legacyBehavior>
                                            <a>{link.name}</a>
                                        </Link>
                                    </li>
                                ))}
                                <LanguageDropdown />
                                {user ? <>
                                        <Link href="/account" className={styles.accountButton}>
                                            <FaRegUserCircle/>
                                            <p>
                                                {user.name}
                                                <span>
                                                  {user.secondName}
                                                </span>
                                            </p>
                                        </Link>
                                    </>
                                    : <>
                                        <Link href="/login">
                                            <Button variant="headerSign">Вход</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="outline">Регистрация</Button>
                                        </Link>
                                    </>}
                            </ul>
                            <div>
                            </div>
                        </nav>
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;