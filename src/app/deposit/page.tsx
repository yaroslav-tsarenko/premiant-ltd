
"use client"

import React, {useEffect} from 'react';
import Deposit from "@/sections/deposit/Deposit";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import BottomNav from "@/components/bottom-nav/BottomNav";
import {StaticTRcProvider} from "@/utils/StaticTrcContext";

const DepositPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <StaticTRcProvider>
            <Deposit/>
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
        </StaticTRcProvider>
    );
};

export default DepositPage;