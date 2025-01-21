"use client"

import React, { FC } from 'react';
import styles from './Footer.module.scss';
import { FooterProps } from '@/types/footer';
import Link from 'next/link';
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = document.querySelector("header")?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    } else {
        setTimeout(() => smoothScrollTo(id), 100);
    }
};

const Footer: FC<FooterProps> = ({ footerLinks = [], children, contacts = [] }) => {
    const router = useRouter();
    const firstPartLinks = footerLinks.slice(0, 3);
    const secondPartLinks = footerLinks.slice(3, 6);
    const firstPartContacts = contacts.slice(0, 2);
    const secondPartContacts = contacts.slice(2, 3);
    const handleNav = (route: string) => {
        router.push(route);
    }
    const handleLinkClick = (route: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (route.startsWith("/#")) {
            const id = route.substring(2);
            window.location.href = route;
            setTimeout(() => smoothScrollTo(id), 100);
        } else {
            window.location.href = route;
        }
    };
    return (
        <footer className={styles.footer}>
            <div className={styles.desktop}>
                <nav className={styles.links}>
                    <ul>
                        {footerLinks.map((link, index) => (
                            <li key={index} className={styles.link}>
                                <Link href={link.route} onClick={handleLinkClick(link.route)} legacyBehavior>
                                    <a onClick={handleLinkClick(link.route)}>{link.name}</a>
                                </Link>
                            </li>
                        ))}
                        <li className={styles.link}>
                            <a href="mailto:support@gmail.com">Поддержка</a>
                        </li>
                    </ul>
                    <Button variant="hero" onClick={() => handleNav("/register")}>Начать инвестировать</Button>
                </nav>
                <div className={styles.content}>
                    <div className={styles.headline}>
                        <p className={styles.copyright}>
                            © PremiantLTD 2019-2025
                        </p>
                        <h1 className={styles.logo}>
                            PREMIANT LTD
                        </h1>
                    </div>

                    <div className={styles.contacts}>
                        {contacts.map((contact, index) => (
                            <div key={index} className={styles.contact}>
                                <p className={styles.label}>{contact.label}</p>
                                <p className={styles.value}>
                                    {contact.label === 'E-mail' && <a href={`mailto:${contact.value}`}>{contact.value}</a>}
                                    {contact.label === 'Phone' && <a href={`tel:${contact.value}`}>{contact.value}</a>}
                                    {contact.label === 'Telegram' && <a href={`https://t.me/${contact.value.replace('@', '')}`} target="_blank" rel="noopener noreferrer">{contact.value}</a>}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.mobile}>
                <nav className={styles.linksMob}>
                    <ul>
                        {firstPartLinks.map((link, index) => (
                            <li key={index} className={styles.link}>
                                <Link href={link.route} legacyBehavior>
                                    <a onClick={handleLinkClick(link.route)}>{link.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {secondPartLinks.map((link, index) => (
                            <li key={index} className={styles.link}>
                                <Link href={link.route} legacyBehavior>
                                    <a>{link.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className={styles.contactsMob}>
                    <div className={styles.contactMob}>
                        {firstPartContacts.map((contact, index) => (
                            <div key={index} className={styles.contact}>
                                <p className={styles.label}>{contact.label}</p>
                                <p className={styles.value}>
                                    {contact.label === 'E-mail' && <a href={`mailto:${contact.value}`}>{contact.value}</a>}
                                    {contact.label === 'Phone' && <a href={`tel:${contact.value}`}>{contact.value}</a>}
                                    {contact.label === 'Telegram' && <a href={`https://t.me/${contact.value.replace('@', '')}`} target="_blank" rel="noopener noreferrer">{contact.value}</a>}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.telegram}>
                        {secondPartContacts.map((contact, index) => (
                            <div key={index} className={styles.contact}>
                                <p className={styles.label}>{contact.label}</p>
                                <p className={styles.value}>
                                    {contact.label === 'E-mail' && <a href={`mailto:${contact.value}`}>{contact.value}</a>}
                                    {contact.label === 'Phone' && <a href={`tel:${contact.value}`}>{contact.value}</a>}
                                    {contact.label === 'Telegram' && <a href={`https://t.me/${contact.value.replace('@', '')}`} target="_blank" rel="noopener noreferrer">{contact.value}</a>}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {children}
                <div className={styles.headlбіьine}>
                    <p className={styles.copyright}>
                        © PremiantLTD 2019-2025
                    </p>
                    <h1 className={styles.logo}>
                        PREMIANT LTD
                    </h1>
                </div>
            </div>
        </footer>
    );
};

export default Footer;