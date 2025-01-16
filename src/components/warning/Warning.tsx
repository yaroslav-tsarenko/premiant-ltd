import React, { FC } from 'react';
import styles from './Warning.module.scss';
import alertIcon from "../../assets/icons/alert.svg";
import arrowRight from "../../assets/icons/arrowRight.svg";
import Link from "next/link";
import Image from "next/image";

interface WarningProps {
    description: string;
    link: string;
    button: string;
    type: 'red' | 'green';
}

const Warning: FC<WarningProps> = ({ description, type, link, button }) => {
    return (
        <div className={`${styles.wrapper} ${type === 'red' ? styles.red : styles.green}`}>
            <div className={styles.warning}>
                <Image src={alertIcon} alt="icon" width={5} height={16} />
                <p>{description}</p>
                <Image src={alertIcon} alt="icon" width={5} height={16} />
            </div>
            <Link href={link} className={styles.nav}>
                {button}
                <Image src={arrowRight} alt="icon" width={62} height={25} />
            </Link>
        </div>
    );
};

export default Warning;