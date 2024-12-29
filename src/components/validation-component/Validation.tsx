import React, {FC} from 'react';
import styles from "./Validation.module.scss"

interface ValidationProps {
    title: string;
}

const Validation:FC<ValidationProps> = ({title}) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.headline}>{title}</h1>
        </div>
    );
};

export default Validation;