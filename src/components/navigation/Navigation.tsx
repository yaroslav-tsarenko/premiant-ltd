import React, {FC} from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import {IoSettingsOutline} from "react-icons/io5";
import {GrHomeRounded} from 'react-icons/gr';
import {LuUsersRound} from "react-icons/lu";
import {CiCreditCard1, CiLogout} from "react-icons/ci";
import {PiArrowsDownUp} from "react-icons/pi";
import {BACKEND_URL} from "@/constants/constants";
import {useRouter} from "next/navigation";
import axios from "axios";
import {GoArrowDownLeft, GoArrowUpRight} from "react-icons/go";

type NavigationProps = {
    userType: string;
};

const Navigation: FC<NavigationProps> = ({userType}) => {

    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/logout`, {}, {withCredentials: true});
            if (response.status === 200) {
                console.log('Logout successful');
                router.push('/');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                console.error('Logout error:', response.data.message);
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
                    {userType === 'user' ? (
                        <>
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
                            <Link href="/settings" legacyBehavior>
                                <a className={styles.link}>
                                    <IoSettingsOutline/>
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/admin-deposits" legacyBehavior>
                                <a className={styles.link}>
                                    <GoArrowDownLeft />
                                </a>
                            </Link>
                            <Link href="/admin-withdrawals" legacyBehavior>
                                <a className={styles.link}>
                                    <GoArrowUpRight />
                                </a>
                            </Link>
                            <Link href="/admin-wallet" legacyBehavior>
                                <a className={styles.link}>
                                    <CiCreditCard1 />
                                </a>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div>
                <button className={styles.link} onClick={handleLogout}>
                    <CiLogout/>
                </button>
            </div>
        </div>
    );
};

export default Navigation;