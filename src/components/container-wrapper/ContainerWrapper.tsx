import React, {FC} from 'react';
import {ContainerWrapperProps} from "@/types/containerWrapper";
import styles from './ContainerWrapper.module.scss';

const ContainerWrapper: FC<ContainerWrapperProps> = ({children, display = 'block', noPadding = false}) => {
    return (
        <div className={`${styles.container} ${noPadding ? styles.noPadding : ''}`} style={{display}}>
            {children}
        </div>
    );
};

export default ContainerWrapper;