"use client";

import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.svg";
import styles from "./Header.module.scss";
import LanguageDropdown from "../language-dropdown/LanguageDropdown";
import Button from "@/components/button/Button";
import { FaRegUserCircle } from "react-icons/fa";
import { useUser } from "@/utils/UserContext";
import { usePathname } from "next/navigation";

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

const Header: FC = () => {
    const pathname = usePathname();
    const hideHeaderRoutes = ["/account", "/transactions", "/settings", "/partner-system", "/deposit", "/payment"];
    const user = useUser();
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const handleLinkClick = (route: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (route.startsWith("/#")) {
            const id = route.substring(2);
            window.location.href = route; // Redirect to the route
            setTimeout(() => smoothScrollTo(id), 100); // Scroll to the section after redirection
        }
    };
    return (
        <>
            {!hideHeaderRoutes.includes(pathname) && (
                <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
                    <div className={styles.headerInner}>
                        <nav className={styles.links}>
                            <ul>
                                <li className={styles.link}>
                                    <Link href="/" legacyBehavior>
                                        <a>Главная</a>
                                    </Link>
                                </li>
                                <li className={styles.link}>
                                    <Link href="/about" legacyBehavior>
                                        <a>О Компании</a>
                                    </Link>
                                </li>
                                <li className={styles.link}>
                                    <Link href="/#features" legacyBehavior>
                                        <a onClick={handleLinkClick("/#features")}>Инвесторам</a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <Link href="/" legacyBehavior>
                            <Image src={logo} alt="Логотип" className={styles.logo} width={382}/>
                        </Link>
                        <nav className={styles.links}>
                            <ul>
                                <li className={styles.link}>
                                    <Link href="/#faq" legacyBehavior>
                                        <a onClick={handleLinkClick("/#faq")}>FAQ</a>
                                    </Link>
                                </li>
                                <li className={styles.link}>
                                    <Link href="/#address" legacyBehavior>
                                        <a onClick={handleLinkClick("/#address")}>Контакты</a>
                                    </Link>
                                </li>
                                <LanguageDropdown />
                                {user ? (
                                    <Link href="/account" className={styles.accountButton}>
                                        <FaRegUserCircle />
                                        <p>
                                            {user.name}
                                            <span>{user.secondName}</span>
                                        </p>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="headerSign">Вход</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="outline">Регистрация</Button>
                                        </Link>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;
