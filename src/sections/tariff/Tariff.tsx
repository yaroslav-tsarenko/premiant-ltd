import React from 'react';
import styles from './Tariff.module.scss';
import Dot from "@/components/dot/Dot";
import TariffComponent from "@/components/tariff-component/TariffComponent";
import { useUser } from '@/utils/UserContext';

const Tariff = () => {
    const user = useUser();
    const currentTariff = user?.tariff.toLowerCase();

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <Dot title="ТАРИФНЫЕ ПЛАНЫ"/>
                <div className={styles.headline}>
                    <h1 className={styles.title}>МЫ АВТОМАТИЧЕСКИ ПОСТАВИМ НУЖНЫЙ ВАМ ТАРИФ</h1>
                </div>
            </div>
            <div className={styles.tariffs}>
                <div className={styles.tariffsContainer}>
                    <div className={styles.tariffsContent}>
                        <TariffComponent headline="СТАРТ" price="100" percent="2" variant="minWidth" term="5" currentTariff={currentTariff} alwaysHighlighted={true}/>
                        <TariffComponent headline="КОМФОРТ" price="2 000" percent="3.35" variant="fullWidth" term="5" currentTariff={currentTariff}/>
                        <TariffComponent headline="ПРЕМИУМ" price="7 000" percent="5.67" variant="minWidth" term="5" currentTariff={currentTariff}/>
                    </div>
                    <div className={styles.tariffsContent}>
                        <div className={styles.emptyTariff}>
                            <p>ДАЛЕЕ БУДЕТ...</p>
                        </div>
                        <TariffComponent headline="МАКСИМУМ" price="15 000" percent="154" variant="fullWidth" term="5" currentTariff={currentTariff}/>
                    </div>
                </div>
                <TariffComponent headline="ЕКСКЛЮЗИВ" price="40 000" percent="172" variant="fullHeight" term="5" currentTariff={currentTariff}/>
            </div>

            <div className={styles.responsiveTariffs}>
                <div className={styles.groupTariffs}>
                    <TariffComponent headline="СТАРТ" price="100" percent="2" variant="fullWidth" term="5" currentTariff={currentTariff}/>
                    <TariffComponent headline="КОМФОРТ" price="2 000" percent="3.35" variant="fullWidth" term="5" currentTariff={currentTariff}/>
                    <TariffComponent headline="ПРЕМИУМ" price="7 000" percent="5.67" variant="fullWidth" term="5" currentTariff={currentTariff}/>
                    <TariffComponent headline="МАКСИМУМ" price="15 000" percent="154" variant="fullWidth" term="5" currentTariff={currentTariff}/>
                    <TariffComponent headline="ЕКСКЛЮЗИВ" price="40 000" percent="172" variant="fullWidth" term="5" currentTariff={currentTariff}/>
                </div>
            </div>
        </div>
    );
};

export default Tariff;