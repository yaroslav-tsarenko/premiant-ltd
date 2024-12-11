import React, {FC} from 'react';
import styles from './CompanyAdvantages.module.scss';
import {CompanyAdvantagesProps} from "@/types/companyAdvantages";
import Dot from "@/components/dot/Dot";
import ContainerWrapper from "@/components/container-wrapper/ContainerWrapper";

const CompanyAdvantages: FC<CompanyAdvantagesProps> = ({ headline, content = []}) => {
    return (
        <ContainerWrapper>
            <div className={styles.wrapper}>
                <div className={styles.beanie}>
                    <Dot title="вам понравится"/>
                    <h2 className={styles.headline}>{headline}</h2>
                </div>

                <div className={styles.content}>
                    {content.map(({paragraph, text}, index) => (
                        <div key={index} className={styles.paragraph}>

                            <div>
                                <span className={styles.icon}></span>

                                <h3 className={styles.paragraphHeadline}>
                                    {paragraph}
                                </h3>
                            </div>

                            <p className={styles.paragraphText}>{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default CompanyAdvantages;