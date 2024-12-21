import React from 'react';
import Button from "@/components/button/Button";
import {HiOutlineArrowLongLeft} from "react-icons/hi2";
import styles from './StepButtons.module.scss';

interface StepButtonsProps {
    onNext: () => void;
    onPrev: () => void;
}

const StepButtons: React.FC<StepButtonsProps> = ({ onNext, onPrev }) => {
    return (
        <div className={styles.controllers}>
            <Button onClick={onPrev} variant="backButton">
                <HiOutlineArrowLongLeft />
            </Button>
            <Button onClick={onNext} variant="defBlackButton">
                Продолжить
            </Button>
        </div>
    );
};

export default StepButtons;