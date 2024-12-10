"use client"

import React, {useRef, useState} from 'react';
import styles from './RoadMap.module.scss';
import Goal from '@/components/goal/Goal';
import {FaArrowRight} from "react-icons/fa";
import {FaArrowLeft} from "react-icons/fa";

const RoadMap = () => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollLeft = () => {
        if (scrollContainer.current) {
            const newScrollPosition = Math.max(scrollPosition - 1, 0);
            const scrollWidth = scrollContainer.current.offsetWidth / 4.5;
            scrollContainer.current.scrollTo({
                left: newScrollPosition * scrollWidth,
                behavior: "smooth"
            });
            setScrollPosition(newScrollPosition);
        }
    };

    const scrollRight = () => {
        if (scrollContainer.current) {
            const totalGoals = scrollContainer.current.children.length;
            const newScrollPosition = Math.min(scrollPosition + 1, totalGoals - 4.5);
            const scrollWidth = scrollContainer.current.offsetWidth / 4.5;
            scrollContainer.current.scrollTo({
                left: newScrollPosition * scrollWidth,
                behavior: "smooth"
            });
            setScrollPosition(newScrollPosition);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h1 className={styles.headline}>ДОРОЖНАЯ КАРТА</h1>
                <div className={styles.controlling}>
                    <FaArrowLeft className={styles.arrow} onClick={scrollLeft}/>
                    <FaArrowRight className={styles.arrow} onClick={scrollRight}/>
                </div>
            </div>

            <section className={styles.goals} ref={scrollContainer}>
                <Goal date="МАР 2021"
                      text="Запуск платформы Skylex LTD. Skylex LTD официально запускает свою платформу.
                   В первые месяцы работы мы привлекли значительное количество пользователей и установили первые
                    партнерские связи"
                />
                <Goal date="СЕН 2022"
                      text="Мы внедрили передовые алгоритмы машинного обучения для оптимизации рекламных кампаний.
                   Это позволило значительно повысить эффективность и рентабельность наших услуг."
                />
                <Goal date="ЯНВ 2023"
                      text="Skylex LTD заключает соглашения с ведущими рекламными сетями и платформами.
                  Это расширение позволяет привлекать более качественный трафик и улучшать результаты для наших клиентов."
                />
                <Goal date="ИЮЛ 2024"
                      text="Мы открыли новые офисы в Европе и Азии для поддержки нашего глобального роста.
                  Это обеспечивает лучшую локальную поддержку и расширяет наши возможности на международных рынках."
                />
                <Goal date="МАЙ 2025"
                      text="Мы открыли новые офисы в Европе и Азии для поддержки нашего глобального роста.
                  Это обеспечивает лучшую локальную поддержку и расширяет наши возможности на международных рынках."
                /><Goal date="МАЙ 2025"
                        text="Мы открыли новые офисы в Европе и Азии для поддержки нашего глобального роста.
                  Это обеспечивает лучшую локальную поддержку и расширяет наши возможности на международных рынках."
            /><Goal date="МАЙ 2025"
                    text="Мы открыли новые офисы в Европе и Азии для поддержки нашего глобального роста.
                  Это обеспечивает лучшую локальную поддержку и расширяет наши возможности на международных рынках."
            /><Goal date="МАЙ 2025"
                    text="Мы открыли новые офисы в Европе и Азии для поддержки нашего глобального роста.
                  Это обеспечивает лучшую локальную поддержку и расширяет наши возможности на международных рынках."
            />
            </section>
        </div>
    );
};

export default RoadMap;
