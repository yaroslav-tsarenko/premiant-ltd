"use client"

import React, {useEffect} from 'react';
import Metrics from "@/sections/metrics/Metrics";
import Dashboard from "@/components/dashboard/Dashboard";
import FeaturesInfo from "@/components/features-info/FeaturesInfo";
import Tariff from "@/sections/tariff/Tariff";
import account from "@/assets/images/accountDesk.svg"
import accountMob from "@/assets/images/accountMob.svg"
import BottomNav from "@/components/bottom-nav/BottomNav";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";

const DashboardAccount = () => {
    useEffect(() => {
        if (!sessionStorage.getItem('reloaded')) {
            sessionStorage.setItem('reloaded', 'true');
            window.location.reload();
        }
    }, []);

    return (
        <Dashboard>
            <Metrics/>
            <Tariff/>
            <FeaturesInfo
                dotText="арбитраж трафика"
                title="ОСНОВНЫЕ ОСОБЕННОСТИ"
                modTitle="ЗАРАБОТКА"
                mainImg={account}
                mobImg={accountMob}
            >
            </FeaturesInfo>
            <BottomNav
                logo={BottomNuvLogo}
                links={[
                    {name: 'Аккаунт', route: '/account'},
                    {name: 'Рефералы', route: '/partner-system'},
                    {name: 'Транзакции', route: '/transactions'},
                    {name: 'Настройки', route: '/settings'},
                    {name: 'Главная Страница', route: '/'},
                ]}
                burgerIcon={<GiHamburgerMenu/>}
            />
        </Dashboard>
    );
};

export default DashboardAccount;