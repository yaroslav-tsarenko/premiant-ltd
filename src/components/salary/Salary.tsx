import React from 'react';
import styles from './Salary.module.scss';
import Diagram from "@/components/diagram/Diagram";

const Salary = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.diagram}>
                <Diagram value={34} size={200} strokeWidth={30}/>
            </div>
            <div className={styles.currentSalary}>
                <div className={styles.sumContent}>
                    <p className={styles.title}>
                        Ваш текущий зароботок
                    </p>
                    <p className={styles.sum}>
                        562,45$
                    </p>
                </div>
                <div className={styles.rest}>
                    <p className={styles.title}>
                        Осталось:
                    </p>
                    <p className={styles.title}>
                        1238,55$, 15 дней
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Salary;