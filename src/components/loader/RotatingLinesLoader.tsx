import React, {FC} from 'react';
import {RotatingLines} from "react-loader-spinner";
import styles from "./RotatingLinesLoader.module.scss";
import {LoaderProps} from "@/types/loader";

const RotatingLinesLoader: FC<LoaderProps> = ({title}) => {
    return (
        <div className={styles.rotatingLinesLoader}>
            <RotatingLines
                visible={true}
                width="20"
                strokeColor={"#fff"}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
            <span>{title}</span>
        </div>
    );
};

export default RotatingLinesLoader;