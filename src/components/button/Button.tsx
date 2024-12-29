"use client";

import React, { FC } from 'react';
import { ButtonProps } from "@/types/button";
import styles from './Button.module.scss';

const Button: FC<ButtonProps> = ({ variant = 'default', children, onClick, type = 'button' }) => {
    const buttonClass = `${styles[variant] || styles.default}`;
    return (
        <button className={buttonClass} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;