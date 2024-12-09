import React, {FC} from 'react';
import { ActivityProps } from '@/types/activity';
import styles from './Activity.module.scss';

const Activity: FC<ActivityProps> = ({item, children, childrenBtn, headDescription, title, modTitle}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>
                <div className={styles.item}>
                    <span className={styles.dot}></span>
                    <p>{item}</p>
                </div>
                <h1 className={styles.headline}>
                    {title} <span className={styles.modTitle}>{modTitle}</span>
                </h1>
                <p className={styles.headDescription}>{headDescription}</p>
            </div>
            <div className={styles.scheme}>
                {children}
            </div>
            <div className={styles.btn}>
                {childrenBtn}
            </div>
            
        </div>
    );
};

export default Activity;