"use client";

import React, {useRef, useState} from 'react';
import styles from './Settings.module.scss';
import StepButtons from "@/components/step-buttons/StepButtons";
import MainInformation from "@/components/main-information/MainInformation";
import PaymentDetails from "@/components/payment-details/PaymentDetails";
import Dashboard from "@/components/dashboard/Dashboard";
import {useUser} from "@/utils/UserContext";
import Alert from "@/components/alert/Alert";
import axios from "axios";
import {BACKEND_URL} from "@/constants/constants";

interface MainInformationRef {
    getData: () => {
        name: string;
        secondName: string;
        email: string;
        telegram: string;
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    };
    setData: (data: {
        name: string;
        secondName: string;
        email: string;
        telegram: string;
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => void;
}

interface PaymentDetailsRef {
    getData: () => {
        trc20: string;
        perfectMoney: string;
        payeer: string;
        bitcoin: string;
        ethereum: string;
        visaMastercard: string;
    };
    setData: (data: {
        trc20: string;
        perfectMoney: string;
        payeer: string;
        bitcoin: string;
        ethereum: string;
        visaMastercard: string;
    }) => void;
}

const Settings = () => {
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);
    const mainInfoRef = useRef<MainInformationRef>(null);
    const paymentDetailsRef = useRef<PaymentDetailsRef>(null);
    const user = useUser();
    const onPrev = () => {
        window.location.href = '/account';
    }

    const saveChanges = async () => {
        const mainInfoData = mainInfoRef.current ? mainInfoRef.current.getData() : {};
        const paymentDetailsData = paymentDetailsRef.current ? paymentDetailsRef.current.getData() : {};
        const formData = {...mainInfoData, ...paymentDetailsData};
        console.log("user id:", user?._id);
        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([, value]) => value !== undefined && value !== '')
        );

        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1] || "";

        try {
            const response = await axios.put(`${BACKEND_URL}/user/update-user/${user?._id}`, filteredFormData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setAlert({title: 'Успех!', description: 'Данные обновлены!'});
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error('Error updating user:', error);
            setAlert({title: 'Ой', description: `Что-то пошло не так...`});
        }
    };

    return (
        <Dashboard>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)}/>}
            <div className={styles.wrapperInner}>
                <div className={styles.settingsContent}>
                    <div className={styles.beanie}>
                        <h1 className={styles.headline}>
                            Настройки
                        </h1>
                        <div className={styles.stepButtons}>
                            <StepButtons
                                onNext={saveChanges}
                                onPrev={onPrev}
                                firstButtonContent={"Отмена"}
                                secondButtonContent={"Применить изменения"}
                            />
                        </div>
                    </div>
                    <div className={styles.divingLine}></div>
                    <div className={styles.informationForms}>
                        <MainInformation ref={mainInfoRef}/>
                        <PaymentDetails ref={paymentDetailsRef}/>
                    </div>
                    <div className={styles.stepButtonsBottom}>
                        <StepButtons
                            onNext={saveChanges}
                            onPrev={onPrev}
                            firstButtonContent={"Отмена"}
                            secondButtonContent={"Применить изменения"}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Settings;