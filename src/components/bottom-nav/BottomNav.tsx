"use client";

import React, {FC} from 'react';
import Image from 'next/image';
import {BottomNavProps} from '@/types/bottomNav';
import styles from './BottomNav.module.scss';
import {useUser} from "@/utils/UserContext";
import {useRouter} from "next/navigation";
import {BACKEND_URL} from "@/constants/constants";
import axios from "axios";
import Cookies from "js-cookie";

const BottomNav: FC<BottomNavProps> = ({logo, burgerIcon, links = []}) => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const user = useUser();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
            if (response.status === 200) {
                console.log('Logout successful');
                Object.keys(Cookies.get()).forEach(cookieName => {
                    Cookies.remove(cookieName);
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                router.push('/');
            } else {
                console.error('Logout error:', response.data.message);
                Object.keys(Cookies.get()).forEach(cookieName => {
                    Cookies.remove(cookieName);
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                router.push('/');
            }
        } catch (error) {
            console.error('Network error during logout:', error);
            Object.keys(Cookies.get()).forEach(cookieName => {
                Cookies.remove(cookieName);
            });
        }
    };

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className={styles.bottomNav}>
            {isNavOpen && <div className={styles.overlay} onClick={handleNavToggle}></div>}
            <nav className={styles.nav}>
                {isNavOpen && (
                    <ul className={styles.links}>
                       {/* {user ? (
                            <Link href="/account" className={styles.accountButton}>
                                <p>
                                    Мой аккаунт
                                </p>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className={styles.accountButton}>
                                    <p>
                                       Логин
                                    </p>
                                </Link>
                                <Link href="/register" className={styles.accountButton}>
                                    <p>
                                       Регистрация
                                    </p>
                                </Link>
                            </>
                        )}*/}
                        {links.map((link, index) => (
                            <li key={index} className={styles.link}>
                                <a href={link.route}>{link.name}</a>
                            </li>
                        ))}
                        {user ? (
                            <a onClick={handleLogout} className={styles.accountButton}>
                                <p>
                                    Выйти с аккаунта
                                </p>
                            </a>
                        ) : (
                            <></>
                        )}

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