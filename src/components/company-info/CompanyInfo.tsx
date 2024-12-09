import React, {FC} from 'react';
import styles from './CompanyInfo.module.scss';
import {CompanyInfoProps} from "@/types/companyInfo";
import Image from 'next/image';
import Gradient from "@/assets/icons/gradient.svg";

const CompanyInfo: FC<CompanyInfoProps> = ({item, images = [], children}) => {
    return (
        <div className={styles.info}>

            <Image src={Gradient} alt="Gradient" className={styles.gradient}/>


            <Image src={item} alt="Company Info Item" className={styles.item}/>

            <div className={styles.textWrapper}>

                <span className={styles.modified}>PREMIANT LTD - ЭТО КОМПАНИЯ,</span>

                <div className={styles.textContainer}>
                    <h1 className={styles.headline}>
                        <span className={styles.highlight}> СПЕЦИАЛИЗИРУЮЩАЯСЯ</span> НА АРБИТРАЖЕ ИНТЕРНЕТ-ТРАФИКА И
                        КРИПТОВАЛЮТНЫХ АКТИВОВ
                    </h1>

                    <p className={styles.text}>Наша команда благодаря самым последним аналитическим инструментам и
                        алгоритмам в области
                        искусственного интеллекта и финансов, оценивает и перераспределяет потоки интернет-трафика из
                        различных источников для достижения наилучших результатов, обеспечивая нашим клиентам
                        максимальную
                        отдачу от инвестиций в краткие промежутки времени.</p>
                    <p className={styles.text}>Мы постоянно внедряем и тестируем новые стратегии и инструменты, чтобы
                        оставаться впереди
                        конкурентов
                        и предлагать нашим клиентам самые эффективные решения. Мы предлагаем нашим клиентам не только
                        эффективные решения для арбитража интернет-трафика, но и передовые инструменты для арбитража и
                        управления криптовалютными активами.</p>
                    <p className={styles.text}>Мы гордимся своей способностью адаптироваться к изменяющимся условиям
                        рынка и
                        предоставлять нашим
                        клиентам наилучшие возможности для роста и максимизации доходов клиентам наилучшие возможности
                        для
                        роста и максимизации доходов.
                    </p>
                </div>

                {children}

            </div>


            <div className={styles.images}>
                {images.map((image, index) => (
                    <Image key={index} src={image.image} alt={`Company Image ${index}`} className={styles.image}/>
                ))}
            </div>
        </div>
    );
};

export default CompanyInfo;