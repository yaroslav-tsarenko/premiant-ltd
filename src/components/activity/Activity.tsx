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
                <Dot title="КТО МЫ?" absolute/>
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
                        Мы предлагаем комплексные решения, которые помогают нашим клиентам эффективно управлять
                        инвестициями и рекламными кампаниями. Наши специалисты анализируют потоки трафика из разных
                        источников, таких как социальные сети, поисковые системы и мобильные приложения, обеспечивая
                        максимальные результаты.

                        Мы используем передовые технологии и алгоритмы, включая методы машинного обучения и аналитики.
                        Это позволяет оптимизировать рекламные кампании и инвестиционные стратегии, достигая высокой
                        рентабельности и стабильной прибыли.
                    </p>
                </div>
                <div className={styles.checkCompany}>
                    <p className={styles.checkText}>
                        Мы нацелены на долгосрочный успех наших клиентов, постоянно совершенствуя наши услуги и внедряя
                        современные технологии. Благодаря гибкому подходу и оперативной адаптации к изменениям на рынке,
                        мы помогаем клиентам достигать поставленных целей.

                        Наша компания гарантирует прозрачность и доверие, предоставляя детализированные отчеты и
                        контроль на каждом этапе сотрудничества. Это позволяет нашим клиентам уверенно управлять своими
                        инвестициями и видеть реальные результаты.
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