import React from 'react';
import styles from './Metrics.module.scss';
import Balance from '@/components/balance/Balance';
import Salary from '@/components/salary/Salary';
import NavigationItem from '@/components/navigation-item/NavigationItem';
import {PiArrowsDownUp} from 'react-icons/pi';
import {PiCreditCardLight} from 'react-icons/pi';
import {GoArrowDownLeft} from 'react-icons/go';
import {GoArrowUpRight} from 'react-icons/go';

const Metrics = () => {
    return (
        <div className={styles.wrapper}>
            <Balance/>
            <Salary/>
            <div className={styles.navigation}>
                <div className={styles.navigationGroup}>
                    <NavigationItem
                        title="Транзакции"
                        icon={<PiArrowsDownUp/>}
                        route="/transactions"/>
                    <NavigationItem
                        title="Реквизиты"
                        icon={<PiCreditCardLight/>}
                        route="#"/>
                </div>
                <div className={styles.navigationGroup}>
                    <NavigationItem
                        title="Пополнение"
                        icon={<GoArrowDownLeft/>}
                        route="/deposit"
                        type={"ItemGreen"}
                    />
                    <NavigationItem
                        title="Вывод"
                        icon={<GoArrowUpRight/>}
                        route="/payment"
                        type={"ItemRed"}
                    />
                </div>


            </div>
        </div>
    );
};

export default Metrics;