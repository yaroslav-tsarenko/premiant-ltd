"use client";

import React from 'react';
import styles from './Settings.module.scss';
import StepButtons from "@/components/step-buttons/StepButtons";
import MainInformation from "@/components/main-information/MainInformation";
import PaymentDetails from "@/components/payment-details/PaymentDetails";
import Dashboard from "@/components/dashboard/Dashboard";

const Settings = () => {
    const clearInputs = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });
        });
    };

    const saveChanges = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                console.log(input.value);
            });
        });
    };

    return (
        <Dashboard>
            <div className={styles.wrapperInner}>
                <div className={styles.settingsContent}>
                    <div className={styles.beanie}>
                        <h1 className={styles.headline}>
                            Настройки
                        </h1>
                        <div className={styles.stepButtons}>
                            <StepButtons
                                onNext={clearInputs}
                                onPrev={saveChanges}
                                firstButtonContent={"Отмена"}
                                secondButtonContent={"Применить изменения"}
                            />
                        </div>
                    </div>

                    <div className={styles.divingLine}></div>

                    <div className={styles.informationForms}>
                        <MainInformation/>
                        <PaymentDetails/>
                    </div>
                    <div className={styles.stepButtonsBottom}>
                        <StepButtons
                            onNext={clearInputs}
                            onPrev={saveChanges}
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
