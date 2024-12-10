import React, {FC} from 'react';
import {ActivityProps} from '@/types/activity';
import styles from './Activity.module.scss';
import CheckCompany from "@/assets/images/checkCompany.svg";
import Image from "next/image";
import CheckGradient from "@/assets/images/checkGradient.svg";

const Activity: FC<ActivityProps> = ({item, children, childrenBtn, headDescription, title, modTitle}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>
                <div className={styles.item}>
                    <span className={styles.dot}></span>
                    <p>{item}</p>
                </div>
                <div className={styles.text}>
                    <div>
                        <h1 className={styles.headline}>
                            {title}
                        </h1>
                        <span className={styles.modTitle}>{modTitle}</span>
                    </div>

                    <p className={styles.headDescription}>{headDescription}</p>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.scheme}>
                    {children}
                    <p className={styles.schemeText}>Premiant LTD работает с ведущими рекламными сетями и платформами по
                        всему миру. Мы применяем методы машинного обучения для достижения высокой рентабельности</p>
                </div>

                <div className={styles.checkCompany}>
                    <p className={styles.checkText}>
                        Мы постоянно совершенствуем свои услуги, включая арбитраж интернет-трафика и криптовалютных
                        активов, чтобы обеспечивать клиентам конкурентные преимущества и максимальную прибыль
                    </p>
                    <div className={styles.documentContainer}>
                        <Image src={CheckCompany} alt="Check Company" className={styles.document}/>

                        <Image src={CheckGradient} alt="Check Gradient" className={styles.gradient}/>

                        {childrenBtn}
                    </div>

                    <p className={styles.checkTextAfter}>
                        Мы постоянно совершенствуем свои услуги, включая арбитраж интернет-трафика и криптовалютных
                        активов, чтобы обеспечивать клиентам конкурентные преимущества и максимальную прибыль
                    </p>
                </div>
            </div>


        </div>
    );
};

export default Activity;