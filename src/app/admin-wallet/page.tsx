"use client"

import React from 'react';
import Dashboard from "@/components/dashboard/Dashboard";
import {StaticTRcProvider} from "@/utils/StaticTrcContext";
import AdminStaticTRC from "@/components/admin-wrapper/AdminStaticTRC";

const AdminWallet = () => {
    return (
        <StaticTRcProvider>
            <Dashboard>
                <AdminStaticTRC/>
            </Dashboard>
        </StaticTRcProvider>
    );
};

export default AdminWallet;