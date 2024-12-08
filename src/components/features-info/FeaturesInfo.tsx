import React, {FC} from 'react';
import styles from './FeaturesInfo.module.scss';
import {FeaturesInfoProps} from "@/types/featuresInfo";

const FeaturesInfo: FC<FeaturesInfoProps> = ({item, title, modTitle, children}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>

                <div className={styles.item}>
                    <span className={styles.dot}></span>
                    <p>{item}</p>
                </div>

                <h1 className={styles.headline}>
                    {title} <span className={styles.modTitle}>{modTitle}</span>
                </h1>
            </div>

            <div className={styles.scheme}>
                {children}
            </div>

        </div>
    );
};

export default FeaturesInfo;