import React, {FC} from 'react';
import styles from './FeaturesInfo.module.scss';
import {FeaturesInfoProps} from "@/types/featuresInfo";
import Image from 'next/image';
import FeaturesScheme from "@/assets/images/featuresScheme.svg";

const FeaturesInfo: FC<FeaturesInfoProps> = ({item}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>
                <Image src={item} alt="Features Item" className={styles.item}/>

                <h1 className={styles.headline}>
                    ОСНОВНЫЕ ОСОБЕННОСТИ <span className={styles.highlight}>ЗАРАБОТКА</span>
                </h1>
            </div>

            <Image src={FeaturesScheme} alt="Features Scheme" className={styles.scheme}/>

        </div>
    );
};

export default FeaturesInfo;