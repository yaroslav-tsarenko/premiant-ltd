import React, { FC } from 'react';
import styles from './Popup.module.scss';
import { PopupProps } from "@/types/popup";

const Popup: FC<PopupProps> = ({ title, description, secondChildren, firstChildren, onClose, type = 'default', abilityToClose = true }) => {

    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (abilityToClose && e.target === e.currentTarget) {
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
                    <div className={styles.description}>
                        {Array.isArray(description) ? description.map((desc, index) => (
                            <p key={index}>{desc}</p>
                        )) : <p>{description}</p>}
                    </div>
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