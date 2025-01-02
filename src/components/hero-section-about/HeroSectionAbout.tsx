import React from 'react';
import styles from './HeroSectionAbout.module.scss';
import {TfiMouseAlt} from "react-icons/tfi";

const HeroSectionAbout = () => {
    return (
        <div className={styles.heroBanner}>
            <h1 className={styles.headline}>
                О КОМПАНИИ
            </h1>
            <div className={styles.scrollDown}>
                <TfiMouseAlt className={styles.icon}/>
                <p className={styles.text}>Прокрутите вниз</p>
            </div>
        </div>

    );
};

export default HeroSectionAbout;