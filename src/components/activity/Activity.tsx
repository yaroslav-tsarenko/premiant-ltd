import React, {FC} from 'react';
import {ActivityProps} from '@/types/activity';
import styles from './Activity.module.scss';
import Dot from "@/components/dot/Dot";
import CheckGradient from "@/assets/images/checkGradient.svg";
import Image from 'next/image';
import CheckDocument from "@/assets/images/checkDocument.svg";

const Activity: FC<ActivityProps> = ({children, childrenBtn, headDescription, title, modTitle}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>
                <Dot title="КТО МЫ?"/>
                <div className={styles.headline}>
                    <div className={styles.modifiedContainer}>
                        <span className={styles.title}>
                        {title}
                        </span>
                        <h1 className={styles.modifiedTitle}>
                            {modTitle}
                        </h1>
                    </div>
                    <p className={styles.headDescription}>{headDescription}</p>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.activityContent}>
                    <div className={styles.scheme}>
                        {children}
                    </div>
                    <p className={styles.schemeText}>
                        Premiant LTD работает с ведущими рекламными сетями и платформами по всему миру. Мы применяем
                        методы машинного обучения для достижения высокой рентабельности
                    </p>
                </div>

                <div className={styles.checkCompany}>
                    <p className={styles.checkText}>
                        Мы постоянно совершенствуем свои услуги, включая арбитраж интернет-трафика и криптовалютных
                        активов, чтобы обеспечивать клиентам конкурентные преимущества и максимальную прибыль
                    </p>

                    <div className={styles.checkContainer}>
                        <Image src={CheckGradient} alt="Check Gradient" className={styles.gradient}/>
                        <Image src={CheckDocument} alt="Check Gradient" className={styles.document}/>
                        {childrenBtn}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activity;