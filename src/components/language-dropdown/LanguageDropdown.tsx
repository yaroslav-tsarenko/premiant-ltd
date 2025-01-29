"use client";

import React, { useState, useEffect } from 'react';
import styles from './LanguageDropdown.module.scss';
import Button from "@/components/button/Button";
import Popup from "@/components/popup/Popup";

const LanguageDropdown = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('RU');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }

        const addGoogleTranslateScript = () => {
            const script = document.createElement('script');
            script.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
            script.async = true;
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: 'ru', includedLanguages: 'en' },
                'google_translate_element'
            );
        };
        addGoogleTranslateScript();
    }, []);

    useEffect(() => {
        let hasReloaded = false;

        if (selectedLanguage === 'EN') {
            const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
            if (combo) {
                combo.value = 'en';
                combo.dispatchEvent(new Event('change'));
            }
        } else if (selectedLanguage === 'RU' && !hasReloaded) {
            hasReloaded = true;
        }
    }, [selectedLanguage]);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const language = event.target.value;
        if (language !== 'RU' && language !== 'EN') {
            setShowPopup(true);
        } else {
            setSelectedLanguage(language);
            localStorage.setItem('selectedLanguage', language);
            if (language === 'RU') {
                const script = document.querySelector('script[src*="translate.google.com"]');
                if (script) {
                    script.remove();
                }
            }
            setTimeout(() => {
                window.location.reload();
            }, 700);
        }
    };

    useEffect(() => {
        if (showPopup) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [showPopup]);

    return (
        <div className={styles.languageDropdown}>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="RU">{selectedLanguage === 'EN' ? "РУ" : "RU"}</option>
                <option value="EN">EN</option>
                <option value="ES">ES</option>
                <option value="DE">DE</option>
                <option value="FR">FR</option>
                <option value="IT">IT</option>
                <option value="ZH">ZH</option>
            </select>
            {showPopup && (
                <Popup
                    title="Этот язык недоступен"
                    description="К сожалению, данный язык пока не доступен. Выберите другой язык."
                    firstChildren={<Button variant="popupGrey" onClick={() => setShowPopup(false)}>Закрыть</Button>}
                    secondChildren={<Button variant="popupBlack" onClick={() => setShowPopup(false)}>Хорошо</Button>}
                />
            )}
            <div id="google_translate_element" style={{ display: selectedLanguage === 'RU' ? 'none' : 'block', position: "absolute", right: "-200%" }}></div>
        </div>
    );
};

export default LanguageDropdown;