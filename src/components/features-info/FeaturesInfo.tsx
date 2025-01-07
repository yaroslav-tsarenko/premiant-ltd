import React, {FC} from 'react';
import styles from './FeaturesInfo.module.scss';
import {FeaturesInfoProps} from "@/types/featuresInfo";
import Dot from "@/components/dot/Dot";
import Image from "next/image";


const FeaturesInfo: FC<FeaturesInfoProps> = ({title, modTitle, dotText, mainImg, mobImg}) => {
    return (
        <div className={styles.wrapper} id="features">
            <Dot title={dotText} absolute/>
            <div className={styles.scheme}>
                <h1 className={styles.headline}>
                    {title}
                    <span className={styles.modTitle}>{modTitle}</span>
                </h1>
                <Image src={mainImg} alt="img" width={1380} height={1082} className={styles.keyBenefits}/>
                <Image src={mobImg} alt="img" width={389} height={1100} className={styles.keyBenefitsMob}/>
            </div>
        </div>
    );
};

export default FeaturesInfo;