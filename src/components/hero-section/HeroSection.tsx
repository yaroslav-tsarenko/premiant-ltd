import React, { FC } from 'react';
import { HeroSectionProps } from "@/types/heroSection";
import styles from './HeroSection.module.scss';

const HeroSection: FC<HeroSectionProps> = ({headline, text, children }) => {
    return (
        <div className={styles.heroSection}>

            <div className={styles.content}>
                <h1 className={styles.headline}>{headline}</h1>
                <p className={styles.text}>{text}</p>
                {children}
            </div>
        </div>
    );
};

export default HeroSection;
