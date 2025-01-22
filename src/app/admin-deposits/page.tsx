import React from 'react';
import Dashboard from "@/components/dashboard/Dashboard";
import AdminBeanie from "@/components/admin-beanie/AdminBeanie";
import DepositList from "@/components/deposit-list/DepositList";
import {DepositProvider} from "@/utils/DepositsContext";
import BottomNav from "@/components/bottom-nav/BottomNav";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";

const AdminDeposits = () => {
    return (
        <DepositProvider>
            <Dashboard>
                <AdminBeanie title="Транзакции Пополнения"/>
                <DepositList/>
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
        </DepositProvider>
    );
};

export default AdminDeposits;