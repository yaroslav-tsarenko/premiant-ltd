import React, {FC} from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import { IoSettingsOutline } from "react-icons/io5";
import {GrHomeRounded} from 'react-icons/gr';
import {LuUsersRound} from "react-icons/lu";
import {PiArrowsDownUp} from "react-icons/pi";
import { PiUserLight } from "react-icons/pi";

interface NavigationType {
    type?: string;
}

const Navigation:FC<NavigationType> = ({type}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h1 className={styles.headline}>
                    LTD
                </h1>
                <div className={styles.buttonsContainer}>
                    <Link href="/" legacyBehavior>
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

            {type === 'dashboard' ? (
                <Link href="/settings" legacyBehavior>
                    <a className={styles.link}>
                        <IoSettingsOutline/>
                    </a>
                </Link>
            ) : (
                <Link href="/dashboard-account" legacyBehavior>
                    <a className={styles.link}>
                        <PiUserLight/>
                    </a>
                </Link>
            )}


        </div>
    );
};

export default Navigation;