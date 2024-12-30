"use client"

import React, { useState, useEffect } from 'react';
import Goal from "@/components/goal/Goal";
import styles from './Roadmap.module.scss';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Line from "@/assets/images/line.svg";
import Image from 'next/image';

const Roadmap = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(4);

    const goals = [
        { date: "МАР 2021", description: "Запуск платформы Skylex LTD. Skylex LTD официально запускает свою платформу.. В первые месяцы работы мы привлекли значительное количество пользователей и установили первые партнерские связи" },
        { date: "СЕН 2022", description: "Мы внедрили передовые алгоритмы машинного обучения для оптимизации рекламных кампаний. Это позволило значительно повысить эффективность и рентабельность наших услуг." },
        { date: "ЯНВ 2023", description: "Skylex LTD заключает соглашения с ведущими рекламными сетями и платформами. Это расширение позволяет привлекать более качественный трафик и улучшать результаты для наших клиентов." },
        { date: "ИЮЛ 2024", description: "Мы открыли новые офисы в Европе и Азии для поддержки нашего глобального роста. Это обеспечивает лучшую локальную поддержку и расширяет наши возможности на международных рынках." },
        { date: "МАЙ 2025", description: "Мы открыли новые офисы в Европе и Азии для поддержки нашего глобального роста. Это обеспечивает лучшую локальную поддержку и расширяет наши возможности на международных рынках." },
        { date: "ДЕК 2025", description: "Мы открыли новые офисы в Европе и Азии для поддержки нашего глобального роста. Это обеспечивает лучшую локальную поддержку и расширяет наши возможности на международных рынках." },
    ];

    const itemWidth = 100 / visibleItems;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, goals.length - visibleItems));
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setVisibleItems(1);
            } else if (window.innerWidth <= 1024) {
                setVisibleItems(2);
            } else {
                setVisibleItems(4);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                <div
                    className={styles.goals}
                    style={{
                        transform: `translateX(-${currentIndex * itemWidth}%)`,
                    }}
                >
                    {goals.map((goal, index) => (
                        <div
                            className={`${styles.goalItem} ${index === currentIndex + visibleItems ? styles.dimmed : ""}`}
                            key={index}
                        >
                            <Goal data={goal.date} description={goal.description} />
                        </div>
                    ))}
                </div>
                <Image src={Line} alt={"Line"} />
            </div>
        </div>
    );
};

export default Roadmap;