import React, { FC, useEffect, useState } from 'react';
import styles from './FeaturesInfoAbout.module.scss';
import { FeaturesInfoProps } from "@/types/featuresInfo";
import Dot from "@/components/dot/Dot";
import Image from "next/image";

const FeaturesInfoAbout: FC<FeaturesInfoProps> = ({ title, modTitle, dotText, mainImg, mobImg }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('RU');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <Dot title={dotText} absolute />
            <div className={styles.scheme}>
                <h1 className={styles.headline}>
                    {title}
                    <span className={styles.modTitle}>{modTitle}</span>
                </h1>
                <Image src={mainImg[selectedLanguage.toLowerCase()]} alt="img" width={1380} height={1082} className={styles.keyBenefits} />
                <Image src={mobImg[selectedLanguage.toLowerCase()]} alt="img" width={389} height={1100} className={styles.keyBenefitsMob} />
            </div>
        </div>
    );
};

export default FeaturesInfoAbout;