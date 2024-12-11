import React, {FC} from 'react';
import styles from "./Dot.module.scss";
import {DotProps} from "@/types/dot";

const Dot: FC<DotProps> = ({title}) => {
    return (
        <div className={styles.item}>
            <span></span>
            <p>{title}</p>
        </div>
    );
};

export default Dot;