"use client"

import React, { useEffect } from 'react';
import Metrics from "@/sections/metrics/Metrics";
import Dashboard from "@/components/dashboard/Dashboard";
import CustomBlock from "@/components/custom-block/CustomBlock";
import FeaturesInfo from "@/components/features-info/FeaturesInfo";
import Tariff from "@/sections/tariff/Tariff";

const DashboardAccount = () => {
    useEffect(() => {
        if (!sessionStorage.getItem('reloaded')) {
            sessionStorage.setItem('reloaded', 'true');
            window.location.reload();
        }
    }, []);

    return (
        <Dashboard>
            <Metrics/>
            <Tariff/>
            <FeaturesInfo
                title="ОСНОВНЫЕ ОСОБЕННОСТИ"
                modTitle="ЗАРАБОТКА">
                <CustomBlock variant="featureScheme">
                    <div>
                        <h2>01</h2>
                        <p>Максимизация прибыли через трафик</p>
                    </div>
                    <p>
                        Premiant LTD повышает конверсии и рентабельность рекламных кампаний, обеспечивая клиентам
                        высокую отдачу от инвестиций.
                    </p>
                </CustomBlock>
                <CustomBlock variant="featureScheme">
                    <div>
                        <h2>02</h2>
                        <p>Глобальный охват аудитории</p>
                    </div>

                    <p>
                        Сотрудничество с крупными сетями позволяет привлекать трафик со всего мира, увеличивая конверсии
                        и доходы.
                    </p>
                </CustomBlock>
                <CustomBlock variant="featureScheme">
                    <div>
                        <h2>03</h2>
                        <p>Гибкость и адаптивность</p>
                    </div>
                    <p>
                        Premiant LTD быстро реагирует на изменения рынка, повышая точность таргетинга и эффективность
                        рекламы.
                    </p>
                </CustomBlock>
                <CustomBlock variant="featureScheme">
                    <div>
                        <h2>04</h2>
                        <p>Инновации для оптимизации</p>
                    </div>
                    <p>
                        Современные алгоритмы и машинное обучение делают Premiant LTD лидером в сфере арбитража
                        интернет-трафика.
                    </p>
                </CustomBlock>
                <CustomBlock variant="modified">
                    <div>
                        <h2>05</h2>
                        <p>Прозрачность и контроль</p>
                    </div>
                    <p>
                        Подробные отчеты обеспечивают полное понимание расходов и результатов кампаний.
                    </p>
                </CustomBlock>
            </FeaturesInfo>
        </Dashboard>
    );
};

export default DashboardAccount;