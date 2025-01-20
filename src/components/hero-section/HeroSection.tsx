"use client";

import React, { FC, useEffect, useState } from 'react';
import { HeroSectionProps } from "@/types/heroSection";
import styles from './HeroSection.module.scss';
import Image from "next/image";
import dashboardDemo from "@/assets/images/dashboard-demo.svg";
import dashboardDemo2 from "@/assets/images/hero-bg-mobile.png";
import dashboardDemoEn from "@/assets/images/dashboard-demo-eng.svg";
import dashboardDemo2En from "@/assets/images/dashboard-demo-eng-mobile.svg";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

const HeroSection: FC<HeroSectionProps> = ({ headline, text }) => {
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState('RU');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }
    }, []);

    const handleNav = (str: string) => {
        router.push(str);
    };

    return (
        <div className={styles.heroWrapper}>
            <div className={styles.heroSection}>
                <div className={styles.content}>
                    <h1 className={styles.headline}>{headline}</h1>
                    <p className={styles.text}>{text}</p>
                    <Button variant="hero" onClick={() => handleNav("/register")}>Начать инвестировать</Button>
                </div>
                {selectedLanguage === 'EN' ? (
                    <>
                        <Image className={styles.image} src={dashboardDemoEn} alt="Image" width={1320} height={291} />
                        <Image className={styles.image2} src={dashboardDemo2En} alt="Image" width={348} height={429} />
                    </>
                ) : (
                    <>
                        <Image className={styles.image} src={dashboardDemo} alt="Image" width={1320} height={291} />
                        <Image className={styles.image2} src={dashboardDemo2} alt="Image" width={348} height={429} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HeroSection;