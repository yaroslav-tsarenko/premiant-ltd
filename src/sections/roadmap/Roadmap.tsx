"use client"

import React, { useState } from 'react';
import scroll from '@/assets/images/scroll.svg';
import styles from './Roadmap.module.scss';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Image from 'next/image';

const Roadmap = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollAmount = 150;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => prevIndex - scrollAmount);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + scrollAmount);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h1 className={styles.title}>ДОРОЖНАЯ КАРТА</h1>
                <div className={styles.controllers}>
                    <GoArrowLeft className={styles.icon} onClick={handlePrev} />
                    <GoArrowRight className={styles.icon} onClick={handleNext} />
                </div>
            </div>
            <div className={styles.sliderContainer}>
                <Image src={scroll} alt="slider" className={styles.scroll} style={{ transform: `translateX(-${currentIndex}px)`, transition: 'transform 0.5s ease-in-out' }} />
            </div>
        </div>
    );
};

export default Roadmap;