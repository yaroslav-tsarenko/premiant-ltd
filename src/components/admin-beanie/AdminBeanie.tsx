"use client"

import React, { FC } from 'react';
import styles from './AdminBeanie.module.scss';
import Button from "@/components/button/Button";
import Alert from "@/components/alert/Alert";

interface AdminBeanieProps {
    title: string;
    onApplyChanges?: () => void;
}

const AdminBeanie: FC<AdminBeanieProps> = ({ title, onApplyChanges }) => {
    const [alert, setAlert] = React.useState({ title: '', description: '' });

    const handleDenyChanges = () => {
        setAlert({ title: 'Отмена изменений', description: 'Изменения были отменены' });
    }

    return (
        <>
            {alert.title && <Alert title={alert.title} description={alert.description} onClose={() => setAlert({ title: '', description: '' })} />}
            <div className={styles.wrapper}>
                <h3>{title}</h3>
                <div className={styles.buttons}>
                    <Button variant="backButton" onClick={() => handleDenyChanges()}>
                        Отмена
                    </Button>
                    <Button variant="defBlackButton" onClick={onApplyChanges}>
                        Применить изменения
                    </Button>
                </div>
            </div>
            <hr className={styles.line} />
        </>
    );
};

export default AdminBeanie;