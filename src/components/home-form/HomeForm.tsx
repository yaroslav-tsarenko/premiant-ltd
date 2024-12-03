import React, {FC} from 'react';
import {FormProps} from "@/types/form";
import styles from './HomeForm.module.scss';
import Image from 'next/image';

const HomeForm: FC<FormProps> = ({item, headline, children, description}) => {
    return (
        <div className={styles.wrapper}>
            <Image src={item} alt="Form Item" className={styles.item}/>

            <form className={styles.form}>
                <h1 className={styles.headline}>{headline}</h1>
                <p className={styles.text}>{description}</p>

                <div className={styles.dividingLine}></div>

                <section className={styles.inputs}>
                    <input type="text" placeholder="Как к Вам обращаться?" className={styles.input}/>

                    <input type="email" placeholder="E-mail" className={styles.input}/>

                </section>

                {children}

            </form>

        </div>
    );
};

export default HomeForm;