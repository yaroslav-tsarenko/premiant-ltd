import React, {FC} from 'react';
import styles from './Dashboard.module.scss';
import Navigation from "@/components/navigation/Navigation";
import {DashboardProps} from "@/types/dashboard";

const Dashboard:FC <DashboardProps> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperInner}>
                <Navigation type={"dashboard"}/>
                <div className={styles.dashboardContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;