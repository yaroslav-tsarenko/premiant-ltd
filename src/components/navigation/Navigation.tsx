import React from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import { IoSettingsOutline } from "react-icons/io5";
import {GrHomeRounded} from 'react-icons/gr';
import {LuUsersRound} from "react-icons/lu";
import {PiArrowsDownUp} from "react-icons/pi";

const Navigation = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h1 className={styles.headline}>
                    LTD
                </h1>
                <div className={styles.buttonsContainer}>
                    <Link href="#" legacyBehavior>
                        <a className={styles.link}>
                            <GrHomeRounded/>
                        </a>
                    </Link>
                    <Link href="#" legacyBehavior>
                        <a className={styles.link}>
                            <PiArrowsDownUp/>
                        </a>
                    </Link>
                    <Link href="#" legacyBehavior>
                        <a className={styles.link}>
                            <LuUsersRound/>
                        </a>
                    </Link>
                </div>
            </div>
            <Link href="#" legacyBehavior>
                <a className={styles.link}>
                    <IoSettingsOutline/>
                </a>
            </Link>
        </div>
    );
};

export default Navigation;