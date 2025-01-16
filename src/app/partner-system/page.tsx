import React from 'react';
import PartnerSystem from "@/sections/partner-system/PartnerSystem";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import BottomNav from "@/components/bottom-nav/BottomNav";
import {CuratorProvider} from "@/utils/CuratorContext";
import {UsersProvider} from "@/utils/UsersContext";

const PartnerSystemPage = () => {
    return (
        <>
            <UsersProvider>
                <CuratorProvider>
                    <PartnerSystem/>
                </CuratorProvider>
            </UsersProvider>
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

export default PartnerSystemPage;