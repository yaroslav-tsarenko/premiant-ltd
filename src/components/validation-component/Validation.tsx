"use client";

import React, { FC, useEffect } from 'react';
import styles from "./Validation.module.scss";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/utils/UserContext";

interface ValidationProps {
    title: string;
    button?: boolean;
    redirect?: boolean;
}

const Validation: FC<ValidationProps> = ({ title, button = true, redirect = false }) => {
    const router = useRouter();
    const user = useUser();

    const handleNav = (str: string) => {
        router.push(str);
    };

    useEffect(() => {
        if (redirect && user) {
            router.push("/account");
        }
    }, [redirect, user, router]);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.headline}>{title}</h2>
            {button && (
                <Button variant="outline" onClick={() => handleNav("/account")}>
                    Перейти в личный кабинет
                </Button>
            )}
        </div>
    );
};

export default Validation;