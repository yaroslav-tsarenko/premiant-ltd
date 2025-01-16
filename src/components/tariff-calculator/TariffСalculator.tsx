"use client";

import React, {FC, useState} from 'react';
import styles from './TariffСalculator.module.scss';
import TariffComponent from "@/components/tariff-component/TariffComponent";
import {TariffCalculatorProps} from "@/types/tariffCalculator";
import Image from 'next/image';
import Grid from '@/assets/images/grid.svg';
import Dot from "@/components/dot/Dot";
import CalculatorGradient from "@/assets/images/calculatorGradient.svg";
import Button from "@/components/button/Button";
import {useRouter} from "next/navigation";
import Alert from "@/components/alert/Alert";

const TariffCalculator: FC<TariffCalculatorProps> = ({ handleNav }) => {
    const router = useRouter();
    const [investment, setInvestment] = useState<number | null>(null);
    const [alert, setAlert] = useState<{ visible: boolean, message: string }>({ visible: false, message: '' });

    const handleNavigation = (str: string) => {
        router.push(str);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setInvestment(isNaN(value) ? null : value);
    }

    const handleButtonClick = () => {
        if (investment !== null && (investment < 100 || investment > 40000)) {
            setAlert({ visible: true, message: 'Не существует такого тарифа' });
        } else {
            setAlert({ visible: false, message: '' });
            handleNavigation("/register");
        }
    }

    return (
        <div className={styles.wrapper}>
            <Image src={CalculatorGradient} alt="Gradient" className={styles.gradient} />
            <div className={styles.beanie}>
                <Dot title="калькулятор" />
                <h1 className={styles.headline}>
                    ВОЗМОЖНЫЕ ТАРИФЫ ВАШЕГО УЧАСТИЯ
                </h1>
            </div>
            <div className={styles.calculatorContent}>
                <Image src={Grid} alt="Grid" className={styles.grid} />
                <div className={styles.calculatorInner}>
                    <aside className={styles.calculator}>
                        <div className={styles.head}>
                            <h2>
                                КАЛЬКУЛЯТОР
                            </h2>
                            <div className={styles.divingLine}></div>
                            <input type="text" placeholder="Укажите размер инвестиций" onChange={handleInputChange} />
                        </div>
                        <Button variant="calculator" onClick={handleButtonClick}>Начать инвестировать</Button>
                    </aside>
                    <section className={styles.tariffs}>
                        <TariffComponent onClick={()=> handleNavigation("/register")} headline="СТАРТ" variant="fullWidthClip" price="100" percent="2" term="28" active={investment !== null && investment >= 100 && investment < 2000} />
                        <TariffComponent onClick={()=> handleNavigation("/register")} headline="КОМФОРТ" variant="fullWidthClip" price="2 000" percent="3.35" term="24" active={investment !== null && investment >= 2000 && investment < 7000} />
                        <TariffComponent onClick={()=> handleNavigation("/register")} headline="ПРЕМИУМ" variant="fullWidthClip" price="7 000" percent="5.67" term="17" active={investment !== null && investment >= 7000 && investment < 15000} />
                        <TariffComponent onClick={()=> handleNavigation("/register")} headline="МАКСИМУМ" variant="fullWidthClip" price="15 000" percent="8.68" term="9" active={investment !== null && investment >= 15000 && investment < 40000} />
                        <TariffComponent onClick={()=> handleNavigation("/register")} headline="ЭКСКЛЮЗИВ" price="50 000" percent="12.34" variant="fullWidthClip" term="6" active={investment !== null && investment >= 40000} />
                    </section>
                </div>
            </div>
            {alert.visible && <Alert title="Упс!" description={alert.message} onClose={() => setAlert({ visible: false, message: '' })} />}
            <div className={styles.bottomApplication}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Инвестируйте уверенно с Premiant LTD
                    </h1>
                    <p className={styles.text}>
                        Выберите тарифный план, который идеально подходит для ваших целей, и начните управлять своими инвестициями уже сегодня
                    </p>
                    <Button variant="hero" onClick={handleNav}>
                        Оставить заявку
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TariffCalculator;