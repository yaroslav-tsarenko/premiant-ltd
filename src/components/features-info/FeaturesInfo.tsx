import React, {FC} from 'react';
import styles from './FeaturesInfo.module.scss';
import {FeaturesInfoProps} from "@/types/featuresInfo";
import Dot from "@/components/dot/Dot";
import Image from "next/image";
import customBlocksImage from "@/assets/images/key-benefits.svg"
import customBlocksImageMob from "@/assets/images/key-benefits-mob.svg"

const FeaturesInfo: FC<FeaturesInfoProps> = ({item, title, modTitle}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>
                <Dot title={item}/>
                <h1 className={styles.headline}>
                    {title} <span className={styles.modTitle}>{modTitle}</span>
                </h1>
            </div>
            <div className={styles.scheme}>
                <Image src={customBlocksImage} alt="img" width={1380} height={1082} className={styles.keyBenefits}/>
                <Image src={customBlocksImageMob} alt="img" width={389} height={1100} className={styles.keyBenefitsMob}/>
            </div>
        </div>
    );
};

export default FeaturesInfo;