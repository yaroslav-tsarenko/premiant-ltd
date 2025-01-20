import React from 'react';
import Dashboard from "@/components/dashboard/Dashboard";
import AdminBeanie from "@/components/admin-beanie/AdminBeanie";
import DepositList from "@/components/deposit-list/DepositList";
import {DepositProvider} from "@/utils/DepositsContext";

const AdminDeposits = () => {
    return (
        <DepositProvider>
            <Dashboard>
                <AdminBeanie title="Транзакции Пополнения"/>
                <DepositList/>
            </Dashboard>
        </DepositProvider>
    );
};

export default AdminDeposits;