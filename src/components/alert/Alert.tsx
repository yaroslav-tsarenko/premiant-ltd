import React, { FC, useEffect, useState } from 'react';
import styles from './Alert.module.scss';

interface AlertProps {
    title: string;
    description: string;
    bottomText?: string;
    onClose: () => void;
}

const Alert: FC<AlertProps> = ({ title, description, bottomText, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            handleClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`${styles.alert} ${visible ? styles.show : styles.hide}`}>
            <h2 className={styles.headline}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <h4 className={styles.bottomText}>{bottomText}</h4>
            <button className={styles.closeButton} onClick={handleClose}>×</button>
        </div>
    );
};

export default Alert;