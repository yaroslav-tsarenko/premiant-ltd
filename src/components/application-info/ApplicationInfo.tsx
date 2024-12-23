import React, { FC } from 'react';
import styles from './ApplicationInfo.module.scss';
import { ApplcationInfoProps } from "@/types/applicationInfo";

const ApplicationInfo: FC<ApplcationInfoProps> = ({ texts = [] }) => {
    return (
        <div className={styles.applicationInfo}>
            {texts.map((textObj, index) => (
                <p key={index} className={styles.text}>
                    {textObj.text}
                </p>
            ))}

            <div className={styles.farewell}>
                <p className={styles.text}>
                    С уважением,
                </p>
                <p className={styles.appeal}>
                    Администрация сайта.
                </p>
            </div>
        </div>
    );
};

export default ApplicationInfo;