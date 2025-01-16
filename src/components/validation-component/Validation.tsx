"use client";

import React, {FC} from 'react';
import styles from "./Validation.module.scss"
import Button from "@/components/button/Button";
import {useRouter} from "next/navigation";

interface ValidationProps {
    title: string;
}

const Validation:FC<ValidationProps> = ({title}) => {

    const router = useRouter();

    const handleNav = (str: string) => {
        router.push(str);
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.headline}>{title}</h1>
            <Button variant="outline" onClick={() => handleNav("/account")}>Перейти в личный кабинет</Button>
        </div>
    );
};

export default Validation;