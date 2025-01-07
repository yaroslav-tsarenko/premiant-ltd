import React, {FC} from 'react';
import styles from './CompanyInfo.module.scss';
import {CompanyInfoProps} from "@/types/companyInfo";
import Image from 'next/image';
import Gradient from "@/assets/icons/gradient.svg";
import Dot from "@/components/dot/Dot";
import ContainerWrapper from "@/components/container-wrapper/ContainerWrapper";

const CompanyInfo: FC<CompanyInfoProps> = ({images = []}) => {
    return (
        <ContainerWrapper noPadding={true}>
            <div className={styles.info}>
                <Image src={Gradient} alt="Gradient" className={styles.gradient}/>
                <Dot title="о нас" absolute/>
                <div className={styles.textWrapper}>
                    <span className={styles.modified}>PREMIANT LTD - ЭТО КОМПАНИЯ,</span>
                    <div className={styles.textContainer}>
                        <h1 className={styles.headline}>
                            <span className={styles.highlight}>  специализирующаяся на арбитраже интернет-трафика и криптовалютных активов при помощи Искуственного Интеллекта</span>
                        </h1>
                        <p className={styles.text}>Наша команда благодаря самым последним аналитическим инструментам и
                            алгоритмам в области
                            искусственного интеллекта и финансов, оценивает и перераспределяет потоки интернет-трафика
                            из
                            различных источников для достижения наилучших результатов, обеспечивая нашим клиентам
                            максимальную
                            отдачу от инвестиций в краткие промежутки времени.</p>
                        <p className={styles.text}>Мы постоянно внедряем и тестируем новые стратегии и инструменты,
                            чтобы
                            оставаться впереди
                            конкурентов
                            и предлагать нашим клиентам самые эффективные решения. Мы предлагаем нашим клиентам не
                            только
                            эффективные решения для арбитража интернет-трафика, но и передовые инструменты для арбитража
                            и
                            управления криптовалютными активами.</p>
                        <p className={styles.text}>Мы гордимся своей способностью адаптироваться к изменяющимся условиям
                            рынка и
                            предоставлять нашим
                            клиентам наилучшие возможности для роста и максимизации доходов клиентам наилучшие
                            возможности
                            для
                            роста и максимизации доходов.
                        </p>
                    </div>
                </div>
                <div className={styles.images}>
                    {images.map((image, index) => (
                        <Image key={index} src={image.image} alt={`Company Image ${index}`}
                               className={styles.image}/>
                    ))}
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default CompanyInfo;