"use client";

import React, {FC} from 'react';
import styles from './CustomBlock.module.scss';
import {CustomBlockProps} from "@/types/customBlock";

const CustomBlock:FC<CustomBlockProps> = ({variant = 'default', children}) => {
    const blockClass = `${styles[variant] || styles.default}`;

    return (
        <div className={blockClass}>
            {children}
        </div>
    );
};

export default CustomBlock;