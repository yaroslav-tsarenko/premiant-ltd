import React, { FC, useEffect, useState } from 'react';
import styles from "./CopyCodePopup.module.scss";
import { PiCopySimple } from "react-icons/pi";
import Alert from '@/components/alert/Alert';

interface CopyCodePopupProps {
    code?: string;
    onClose: () => void;
}

const CopyCodePopup: FC<CopyCodePopupProps> = ({ code, onClose }) => {
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);

    useEffect(() => {
        document.body.classList.add(styles.noScroll);
        return () => {
            document.body.classList.remove(styles.noScroll);
        };
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(code || '');
        setAlert({ title: 'Код скопирован!', description: 'Удачной регистрации!' });
        setTimeout(onClose, 2000);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h1>ВНИМАНИЕ!</h1>
                <p>Вы перешли по реферальное ссылке! Для того что-бы продолжить вам нужно скопировать код ниже и использовать его при регистрации</p>
                <div className={styles.codeContainer}>
                    {code}
                    <PiCopySimple className={styles.copyIcon} onClick={handleCopy} />
                </div>
                {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
            </div>
        </div>
    );
};

export default CopyCodePopup;