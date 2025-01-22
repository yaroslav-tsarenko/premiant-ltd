import React from 'react';
import Dashboard from "@/components/dashboard/Dashboard";
import AdminBeanie from "@/components/admin-beanie/AdminBeanie";
import {WithdrawalProvider} from "@/utils/WithdrawalsContext";
import WithdrawalList from "@/components/withdrawal-list/WithdrawalList";
import BottomNav from "@/components/bottom-nav/BottomNav";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";

const AdminWithdrawals = () => {
    return (
        <WithdrawalProvider>
            <Dashboard>
                <AdminBeanie title="Транзакции Вывода"/>
                <WithdrawalList/>
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
        </WithdrawalProvider>
    );
};

export default AdminWithdrawals;