import React, {FC} from 'react';
import styles from './FeaturesInfo.module.scss';
import {FeaturesInfoProps} from "@/types/featuresInfo";
import Dot from "@/components/dot/Dot";

const FeaturesInfo: FC<FeaturesInfoProps> = ({title, modTitle, children}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>
                <Dot title="Арбитраж трафика"/>
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