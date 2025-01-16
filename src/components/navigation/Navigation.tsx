import React from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import { IoSettingsOutline } from "react-icons/io5";
import {GrHomeRounded} from 'react-icons/gr';
import {LuUsersRound} from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import {PiArrowsDownUp} from "react-icons/pi";
import {BACKEND_URL} from "@/constants/constants";
import {useRouter} from "next/navigation";

const Navigation = () => {

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

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h1 className={styles.headline}>
                    <Link href="/">
                        LTD
                    </Link>
                </h1>
                <div className={styles.buttonsContainer}>
                    <Link href="/account" legacyBehavior>
                        <a className={styles.link}>
                            <GrHomeRounded/>
                        </a>
                    </Link>
                    <Link href="/transactions" legacyBehavior>
                        <a className={styles.link}>
                            <PiArrowsDownUp/>
                        </a>
                    </Link>
                    <Link href="/partner-system" legacyBehavior>
                        <a className={styles.link}>
                            <LuUsersRound/>
                        </a>
                    </Link>
                </div>
            </div>
            <div>
                <Link href="/settings" legacyBehavior>
                    <a className={styles.link}>
                        <IoSettingsOutline/>
                    </a>
                </Link>
                    <button className={styles.link} onClick={handleLogout}>
                        <CiLogout/>
                    </button>
            </div>
        </div>
    );
};

export default Navigation;