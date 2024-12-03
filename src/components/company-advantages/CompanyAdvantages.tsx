import React, {FC} from 'react';
import styles from './CompanyAdvantages.module.scss';
import {CompanyAdvantagesProps} from "@/types/companyAdvantages";
import Image from 'next/image';

const CompanyAdvantages: FC<CompanyAdvantagesProps> = ({item, headline, content = []}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>
                <Image src={item} alt="Company Advantages Item" className={styles.item}/>
                <h2 className={styles.headline}>{headline}</h2>
            </div>

            <div className={styles.content}>
                {content.map(({paragraph, text}, index) => (
                    <div key={index} className={styles.paragraph}>
                        <h3 className={styles.paragraphHeadline}>
                            <span className={styles.icon}></span>
                            {paragraph}
                        </h3>
                        <p className={styles.paragraphText}>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyAdvantages;