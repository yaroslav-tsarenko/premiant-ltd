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
                        <TariffComponent buttonClass={"clipPathOff"} headline="СТАРТ" price="100" percent="2" variant="minWidth" term="28" picked={currentTariff === "start"}  alwaysHighlighted={true}/>
                        <TariffComponent buttonClass={"clipPathOff"} headline="КОМФОРТ" price="2 000" percent="3.35" variant="fullWidth" term="24" picked={currentTariff === "comfort"} currentTariff={currentTariff}/>
                        <TariffComponent buttonClass={"clipPathOff"} headline="ПРЕМИУМ" price="7 000" percent="5.67" variant="minWidth" term="17" picked={currentTariff === "premium"}/>
                    </div>
                    <div className={styles.tariffsContent}>
                        <div className={styles.emptyTariff}>
                            <p>В РАЗРАБОТКЕ PREMIANT VIP INVEST</p>
                        </div>
                        <TariffComponent buttonClass={"clipPathOff"} headline="МАКСИМУМ" price="15 000" percent="154" variant="fullWidth" term="9" picked={currentTariff === "maximum"}/>
                    </div>
                </div>
                <TariffComponent buttonClass={"clipPathOff"} headline="ЭКСКЛЮЗИВ" price="40 000" percent="172" variant="fullHeight" term="6" picked={currentTariff === "exclusive"}/>
            </div>
            <div className={styles.responsiveTariffs}>
                <div className={styles.groupTariffs}>
                    <TariffComponent buttonClass={"clipPathOff"} headline="СТАРТ" price="100" percent="2" variant="fullWidth" term="28"          picked={currentTariff === "start"}/>
                    <TariffComponent buttonClass={"clipPathOff"} headline="КОМФОРТ" price="2 000" percent="3.35" variant="fullWidth" term="24"   picked={currentTariff === "comfort"}/>
                    <TariffComponent buttonClass={"clipPathOff"} headline="ПРЕМИУМ" price="7 000" percent="5.67" variant="fullWidth" term="17"   picked={currentTariff === "premium"}/>
                    <TariffComponent buttonClass={"clipPathOff"} headline="МАКСИМУМ" price="15 000" percent="154" variant="fullWidth" term="9"  picked={currentTariff === "maximum"}/>
                    <TariffComponent buttonClass={"clipPathOff"} headline="ЭКСКЛЮЗИВ" price="40 000" percent="172" variant="fullWidth" term="6" picked={currentTariff === "exclusive"}/>
                </div>
            </div>
        </div>
    );
};

export default Tariff;