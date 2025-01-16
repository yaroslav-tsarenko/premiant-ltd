"use client";

import React, { useState, useEffect } from 'react';
import styles from './LanguageDropdown.module.scss';

const LanguageDropdown = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('RU');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
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

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const language = event.target.value;
        if (language !== 'RU' && language !== 'EN') {
            setShowPopup(true);
        } else {
            setSelectedLanguage(language);
            if (language === 'EN') {
                document.querySelector('.goog-te-combo')?.setAttribute('value', 'en');
                const event = new Event('change');
                document.querySelector('.goog-te-combo')?.dispatchEvent(event);
            }
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
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
                <option value="RU">RU</option>
                <option value="EN">EN</option>
                <option value="ES">ES</option>
                <option value="DE">DE</option>
                <option value="FR">FR</option>
                <option value="IT">IT</option>
                <option value="ZH">ZH</option>
            </select>
            {showPopup && (
                <div className={styles.overlay} onClick={handleClosePopup}>
                    <div className={styles.content}>
                        <h1>Ошибка</h1>
                        <p>Этот язык пока недоступен</p>
                    </div>
                </div>
            )}
            <div id="google_translate_element" style={{ display: 'none' }}></div>
        </div>
    );
};

export default LanguageDropdown;