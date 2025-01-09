"use client";

import React, {useState} from 'react';
import styles from './LanguageDropdown.module.scss';

const LanguageDropdown = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('RU');

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <div className={styles.languageDropdown}>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="RU">RU</option>
                <option value="EN">EN</option>
            </select>
        </div>
    );
};

export default LanguageDropdown;