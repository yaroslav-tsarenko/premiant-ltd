import React from 'react';
import Button from "@/components/button/Button";
import styles from './StepButtons.module.scss';

interface StepButtonsProps {
    onNext?: () => void;
    onPrev?: () => void;
    onSubmit?: (values: { amount: string; wallet: string }) => void;
    firstButtonContent: React.ReactNode;
    secondButtonContent: React.ReactNode;
}

const StepButtons: React.FC<StepButtonsProps> = ({ onNext, onPrev, onSubmit, firstButtonContent, secondButtonContent }) => {
    const handleNextClick = () => {
        if (onSubmit) {
            onSubmit({ amount: '', wallet: '' });
        } else if (onNext) {
            onNext();
        }
    };

    return (
        <div className={styles.controllers}>
            <Button onClick={onPrev} variant="backButton">
                {firstButtonContent}
            </Button>
            <Button onClick={handleNextClick} variant="defBlackButton">
                {secondButtonContent}
            </Button>
        </div>
    );
};

export default StepButtons;