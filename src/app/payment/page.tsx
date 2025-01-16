
"use client";

import React, {useEffect} from 'react';
import Payment from "@/sections/payment/Payment";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import BottomNav from "@/components/bottom-nav/BottomNav";

const PaymentPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Payment/>
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
        </>

    );
};

export default PaymentPage;