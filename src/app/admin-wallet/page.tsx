"use client"

import React from 'react';
import Dashboard from "@/components/dashboard/Dashboard";
import {StaticTRcProvider} from "@/utils/StaticTrcContext";
import AdminStaticTRC from "@/components/admin-wrapper/AdminStaticTRC";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import BottomNav from "@/components/bottom-nav/BottomNav";

const AdminWallet = () => {
    return (
        <StaticTRcProvider>
            <Dashboard>
                <AdminStaticTRC/>
            </Dashboard>
            <BottomNav
                logo={BottomNuvLogo}
                links={[
                    { name: 'Депозиты', route: '/admin-deposits' },
                    { name: 'Выводы', route: '/admin-withdrawals' },
                    { name: 'Мой кошелёк', route: '/admin-wallet' },
                ]}
                burgerIcon={<GiHamburgerMenu />}
            />
        </StaticTRcProvider>
    );
};

export default AdminWallet;