"use client"

import React, { FC } from 'react';
import styles from './Footer.module.scss';
import { FooterProps } from '@/types/footer';
import Link from 'next/link';
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

const Footer: FC<FooterProps> = ({ footerLinks = [], children, contacts = [] }) => {
    const router = useRouter();
    const firstPartLinks = footerLinks.slice(0, 3);
    const secondPartLinks = footerLinks.slice(3, 6);
    const firstPartContacts = contacts.slice(0, 2);
    const secondPartContacts = contacts.slice(2, 3);
    const handleNav = (route: string) => {
        router.push(route);
    }
    return (
        <footer className={styles.footer}>
            <div className={styles.desktop}>
                <nav className={styles.links}>
                    <ul>
                        {footerLinks.map((link, index) => (
                            <li key={index} className={styles.link}>
                                <Link href={link.route} legacyBehavior>
                                    <a>{link.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Button variant="hero" onClick={() => handleNav("/register")}>Начать инвестировать</Button>
                </nav>
                <div className={styles.content}>
                    <div className={styles.headline}>
                        <p className={styles.copyright}>
                            © PremiantLTD 2021-2024
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
                                    <a>{link.name}</a>
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
                <div className={styles.headline}>
                    <p className={styles.copyright}>
                        © PremiantLTD 2021-2024
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