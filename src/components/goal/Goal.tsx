import React, {FC} from 'react';
import {GoalProps} from '@/types/goal';
import styles from './Goal.module.scss'

const Goal:FC<GoalProps> = ({date, text}) => {
    return (
        <div className={styles.goal}>
            <h1 className={styles.date}>{date}</h1>
            <p className={styles.description}>{text}</p>
        </div>
    );
};

export default Goal;