import React, { FC } from 'react';
import styles from './Popup.module.scss';
import { PopupProps } from "@/types/popup";

const Popup: FC<PopupProps> = ({ title, description, secondChildren, firstChildren, onClose, type = 'default' }) => {

    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    };

    return (
        <div className={`${styles.wrapper} ${styles[type]}`} onClick={handleWrapperClick}>
            <div className={styles.mainContent}>
                <div className={styles.head}>
                    <h1 className={styles.headline}>
                        {title}
                    </h1>
                    <p className={styles.description}>
                        {description}
                    </p>
                </div>
                <div className={styles.buttonsContainer}>
                    {firstChildren}
                    {secondChildren}
                </div>
            </div>
        </div>
    );
};

export default Popup;