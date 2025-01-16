import React, { FC, useState } from 'react';
import styles from './TariffComponent.module.scss';
import { TariffComponentProps } from '@/types/tariffComponent';
import Alert from '@/components/alert/Alert';

const TariffComponent: FC<TariffComponentProps> = ({ onClick = () => {}, headline, price, percent, variant = 'wrapper', term, currentTariff, alwaysHighlighted, active, buttonClass, picked }) => {
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);

    const componentClass = `${styles[variant] || styles.wrapper} ${currentTariff === headline.toLowerCase() ? styles.highlight : ''} ${alwaysHighlighted ? styles.alwaysHighlight : ''} ${active ? styles.active : ''} ${picked ? `${styles.picked} ${styles.opacity100}` : ''}`;
    const btnClass = `${styles[buttonClass || styles.btn] || styles.btn} ${picked ? styles.pickedButton : ''}`;

    const handleClick = () => {
        if (picked) {
            setAlert({ title: 'Внимание!', description: 'Вы уже на этом тарифе' });
        } else if (currentTariff && currentTariff !== headline.toLowerCase() && currentTariff === 'comfort' && headline.toLowerCase() === 'start') {
            setAlert({ title: 'Упс!', description: 'Этот тариф уже недоступен' });
        } else {
            setAlert({ title: 'Упс!', description: 'Что-бы перейти на следующий тариф, вам нужно пополнить баланс' });
        }
        onClick();
    };

    return (
        <>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)}/>}
            <div className={componentClass}>
                <div className={styles.content}>
                    <h2 className={styles.headline}>
                        {headline}
                    </h2>
                    <div className={styles.divingLine}></div>
                    <div className={styles.info}>
                        <div className={styles.prices}>
                            <p>Инвестиции:</p>
                            <p>от {price}$</p>
                        </div>
                        <div className={styles.prices}>
                            <p>Процент:</p>
                            <p>{percent}% в день</p>
                        </div>
                        {term && (
                            <div className={styles.prices}>
                                <p>Срок</p>
                                <p>{term} дней</p>
                            </div>
                        )}
                    </div>
                </div>
                <a className={btnClass} onClick={handleClick}>{picked ? 'Активный тариф' : 'Выбрать тариф'}</a>
            </div>
        </>
    );
};

export default TariffComponent;