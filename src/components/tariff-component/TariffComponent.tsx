import React, {FC, useState} from 'react';
import styles from './TariffComponent.module.scss';
import {TariffComponentProps} from '@/types/tariffComponent';
import Alert from '@/components/alert/Alert';
import {newRequest} from "@/utils/newRequest";
import {useUser} from "@/utils/UserContext";

const TariffComponent: FC<TariffComponentProps> = ({
                                                       onClick = () => {
                                                       },
                                                       headline,
                                                       price,
                                                       percent,
                                                       variant = 'wrapper',
                                                       term,
                                                       currentTariff,
                                                       alwaysHighlighted,
                                                       active,
                                                       buttonClass,
                                                       picked
                                                   }) => {
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);
    const user = useUser();
    const userBalance = user?.balance;
    const componentClass = `${styles[variant] || styles.wrapper} ${currentTariff === headline.toLowerCase() ? styles.highlight : ''} ${alwaysHighlighted ? styles.alwaysHighlight : ''} ${active ? styles.active : ''} ${picked ? `${styles.picked} ${styles.opacity100}` : ''}`;
    const btnClass = `${styles[buttonClass || styles.btn] || styles.btn} ${picked ? styles.pickedButton : ''}`;

    const handleClick = async () => {
        if (picked) {
            setAlert({title: 'Внимание!', description: 'Вы уже на этом тарифе'});
        } else if (currentTariff && currentTariff !== headline.toLowerCase() && currentTariff === 'comfort' && headline.toLowerCase() === 'start') {
            setAlert({title: 'Упс!', description: 'Этот тариф уже недоступен'});
        } else {
            try {
                const userResponse = await newRequest.get('/user/get-user');
                const user = userResponse.data.user;
                const priceValue = price ? parseFloat(price.replace(/\s/g, '')) : 0;

                if (user.balance < priceValue) {
                    setAlert({title: 'Ошибка', description: 'У вас недостаточно средств'});
                    return;
                }

                if (user.tariff !== 'none' && user.balance >= priceValue) {
                    setAlert({title: 'Упс!', description: 'Вы можете приобрести только один тариф'});
                    return;
                }

                const response = await newRequest.put(`/user/update-tariff`, {price: userBalance});

                if (response.status === 200) {
                    setAlert({title: 'Успех!', description: 'Тариф успешно куплен'});
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    setAlert({title: 'Ошибка', description: 'Не удалось купить тариф'});
                }
            } catch (error) {
                setAlert({title: 'Ошибка', description: 'У вас недостаточно средств'});
                console.log(error)
            }
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