import React, { FC } from 'react';
import styles from "./Dot.module.scss";
import { DotProps } from "@/types/dot";

const Dot: FC<DotProps> = ({ title, absolute = false }) => {
    return (
        <div className={`${styles.item} ${absolute ? styles.absolute : ''}`}>
            <span></span>
            <p>{title}</p>
        </div>
    );
};

export default Dot;