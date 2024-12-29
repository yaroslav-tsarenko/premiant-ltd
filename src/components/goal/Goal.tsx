import React, {FC} from 'react';
import styles from './Goal.module.scss';
import {GoalProps} from "@/types/goal";

const Goal: FC<GoalProps> = ({data, description}) => {
    return (
        <div className={styles.goal}>
            <h1 className={styles.data}>{data}</h1>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default Goal;