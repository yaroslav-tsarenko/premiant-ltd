import React, {FC} from 'react';
import styles from './Footer.module.scss';
import {FooterProps} from "@/types/footer";
import Link from "next/link";

const Footer: FC<FooterProps> = ({footerLinks = [], children, contacts = []}) => {
    return (
        <footer className={styles.footer}>

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

                {children}
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
                            <span className={styles.label}>{contact.label}</span>
                            <span className={styles.value}>{contact.value}</span>
                        </div>
                    ))}
                </div>

            </div>


        </footer>
    );
};

export default Footer;