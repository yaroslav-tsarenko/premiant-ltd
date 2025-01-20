import React, { FC } from 'react';
import styles from "./Dot.module.scss";
import { DotProps } from "@/types/dot";

const Dot: FC<DotProps> = ({ title, absolute = false, textTransform = 'uppercase' }) => {
    return (
        <div className={`${styles.item} ${absolute ? styles.absolute : ''}`}>
            <span></span>
            <p style={{ textTransform }}>{title}</p>
        </div>
    );
};

export default Dot;