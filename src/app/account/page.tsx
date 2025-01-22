"use client"

import React from 'react';
import Metrics from "@/sections/metrics/Metrics";
import Dashboard from "@/components/dashboard/Dashboard";
import Tariff from "@/sections/tariff/Tariff";
import account from "@/assets/images/accountDesk.svg"
import accountMob from "@/assets/images/accountMob.svg"
import BottomNav from "@/components/bottom-nav/BottomNav";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import FeaturesInfoAccount from "@/components/features-info-account/FeaturesInfoAccount";

const DashboardAccount = () => {

    const customBlocksImage = {
        ru: account,
        en: account
    };

    const customBlocksImageMob = {
        ru: accountMob,
        en: accountMob
    };

    return (
        <Dashboard>
            <Metrics/>
            <Tariff/>
            <FeaturesInfoAccount
                dotText="арбитраж трафика"
                title="ОСНОВНЫЕ ОСОБЕННОСТИ"
                modTitle="ЗАРАБОТКА"
                mainImg={customBlocksImage}
                mobImg={customBlocksImageMob}
            >
            </FeaturesInfoAccount>
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