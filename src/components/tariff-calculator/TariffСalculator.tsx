"use client";

import React, {FC} from 'react';
import styles from './TariffСalculator.module.scss';
import TariffComponent from "@/components/tariff-component/TariffComponent";
import {TariffCalculatorProps} from "@/types/tariffCalculator";
import Image from 'next/image';
import Grid from '@/assets/images/grid.svg';
import Dot from "@/components/dot/Dot";
import CalculatorGradient from "@/assets/images/calculatorGradient.svg";
import Button from "@/components/button/Button";
import {useRouter} from "next/navigation";

const TariffCalculator: FC<TariffCalculatorProps> = ({handleNav}) => {
    const router = useRouter();

    const handleNavigation = (str: string) => {
        router.push(str);
    }

    return (
        <div className={styles.wrapper}>
            <Image src={CalculatorGradient} alt="Gradient" className={styles.gradient}/>
            <div className={styles.beanie}>
                <Dot title="калькулятор"/>
                <h1 className={styles.headline}>
                    ВОЗМОЖНЫЕ ТАРИФЫ ВАШЕГО УЧАСТИЯ
                </h1>
            </div>
            <div className={styles.calculatorContent}>
                <Image src={Grid} alt="Grid" className={styles.grid}/>
                <div className={styles.calculatorInner}>
                    <aside className={styles.calculator}>
                        <div className={styles.head}>
                            <h2>
                                КАЛЬКУЛЯТОР
                            </h2>
                            <div className={styles.divingLine}></div>
                            <input type="text" placeholder="Укажите размер инвестиций"/>
                        </div>
                        <Button variant="calculator" onClick={() => handleNavigation("/register")}>Начать
                            инвестировать</Button>
                    </aside>
                    <section className={styles.tariffs}>
                        <TariffComponent headline="СТАРТ" variant="fullWidthClip" price="100" percent="2" term="28"/>
                        <TariffComponent headline="КОМФОРТ" variant="fullWidthClip" price="2 000" percent="3.35"
                                         term="24"/>
                        <TariffComponent headline="ПРЕМИУМ" variant="fullWidthClip" price="7 000" percent="5.67"
                                         term="17"/>
                        <TariffComponent headline="МАКСИМУМ" variant="fullWidthClip" price="15 000" percent="8.68"
                                         term="9"/>
                        <TariffComponent headline="ЕКСКЛЮЗИВ" price="40 000" percent="12.34" variant="fullWidthClip"
                                         term="6"/>
                    </section>
                </div>
            </div>
            <div className={styles.bottomApplication}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Инвестируйте уверенно с Premiant LTD
                    </h1>
                    <p className={styles.text}>
                        Выбери тарифный план, который идеально подходит для ваших целей, и начните управлять своими
                        инвестициями уже сегодня
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