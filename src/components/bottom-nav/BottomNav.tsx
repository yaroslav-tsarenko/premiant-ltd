"use client";

import React, {FC} from 'react';
import Image from 'next/image';
import {BottomNavProps} from '@/types/bottomNav';
import styles from './BottomNav.module.scss';
import {useUser} from "@/utils/UserContext";
import {useRouter} from "next/navigation";
import {BACKEND_URL} from "@/constants/constants";

const BottomNav: FC<BottomNavProps> = ({logo, burgerIcon, links = []}) => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const user = useUser();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Logout successful');
                router.push('/');
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                const data = await response.json();
                console.error('Logout error:', data.message);
            }
        } catch (error) {
            console.error('Network error during logout:', error);
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