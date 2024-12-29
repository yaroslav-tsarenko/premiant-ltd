"use client"

import React, { useEffect } from 'react';
import { usePopupStore } from "@/store/popupStore";
import Popup from "@/components/popup/Popup";
import Button from "@/components/button/Button";

const CookiePopup = () => {
    const { showPopup, setShowPopup } = usePopupStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [setShowPopup]);

    if (!showPopup) return null;

    return (
        <Popup
            type="cookie"
            title="Использование файлов cookie"
            description="Мы используем cookie для обеспечения работы сайта, анализа данных и улучшения вашего опыта. Продолжая пользоваться сайтом, вы автоматически соглашаетесь с их использованием."
            firstChildren={
                <Button variant="authentication" onClick={() => setShowPopup(false)}>
                    Продолжить
                </Button>
            }
        />
    );
};

export default CookiePopup;