import React from 'react';
import Dashboard from "@/components/dashboard/Dashboard";
import AdminBeanie from "@/components/admin-beanie/AdminBeanie";
import {WithdrawalProvider} from "@/utils/WithdrawalsContext";
import WithdrawalList from "@/components/withdrawal-list/WithdrawalList";

const AdminWithdrawals = () => {
    return (
        <WithdrawalProvider>
            <Dashboard>
                <AdminBeanie title="Транзакции Вывода"/>
                <WithdrawalList/>
            </Dashboard>
        </WithdrawalProvider>
    );
};

export default AdminWithdrawals;