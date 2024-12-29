import React from 'react';
import Button from "@/components/button/Button";
import styles from './StepButtons.module.scss';

interface StepButtonsProps {
    onNext: () => void;
    onPrev: () => void;
    firstButtonContent: React.ReactNode;
    secondButtonContent: React.ReactNode;
    onSecondButtonClick?: () => void;
}

const StepButtons: React.FC<StepButtonsProps> = ({ onNext, onPrev, secondButtonContent, firstButtonContent}) => {
    return (
        <div className={styles.controllers}>
            <Button onClick={onPrev} variant="backButton">
                {firstButtonContent}
            </Button>
            <Button onClick={onNext} variant="defBlackButton">
                {secondButtonContent}
            </Button>
        </div>
    );
};

export default StepButtons;