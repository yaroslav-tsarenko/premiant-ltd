import React, {FC} from 'react';
import styles from './TariffСalculator.module.scss';
import TariffComponent from "@/components/tariff-component/TariffComponent";
import {TariffCalculatorProps} from "@/types/tariffCalculator";
import Image from 'next/image';
import Grid from '@/assets/images/grid.svg';
import Dot from "@/components/dot/Dot";

const TariffCalculator: FC<TariffCalculatorProps> = ({primaryButton, secondaryButton}) => {
    return (
        <div className={styles.wrapper}>
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
                        {primaryButton}
                    </aside>
                    <section className={styles.tariffs}>
                        <TariffComponent headline="СТАРТ" price="100" percent="2"/>
                        <TariffComponent headline="КОМФОРТ" price="2 000" percent="3.35"/>
                        <TariffComponent headline="ПРЕМИУМ" price="7 000" percent="5.67"/>
                        <TariffComponent headline="МАКСИМУМ" price="15 000" percent="8.68"/>
                        <TariffComponent headline="ЕКСКЛЮЗИВ" price="40 000" percent="12.34" fullWidth/>
                    </section>
                </div>
            </div>
            <div className={styles.bottomApplication}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        ОСТАЛИСЬ ВОПРОСЫ?
                    </h1>
                    <p className={styles.text}>
                        Тогда можете нажать волшебную кнопку и связаться с нами
                    </p>
                    {secondaryButton}
                </div>
            </div>
        </div>
    );
};

export default TariffCalculator;