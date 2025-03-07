import React from 'react';
import styles from './Diagram.module.scss';
import {useUser} from "@/utils/UserContext";

interface DiagramProps {
    value?: number;
    size: number;
    strokeWidth: number;
    backgroundStrokeWidth?: number;
}

const Diagram: React.FC<DiagramProps> = ({size, strokeWidth, backgroundStrokeWidth}) => {
    const user = useUser();
    const now = new Date();
    const expirationDate = new Date(user?.tariffExpirationDate ?? "");
    const diffInMs = expirationDate.getTime() - now.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const calculateValueByRemainingDays = parseFloat((diffInDays / 100 / 24 / 60).toFixed(3));
    const validValue = isNaN(calculateValueByRemainingDays) ? 0 : Math.min(100, Math.max(0, calculateValueByRemainingDays));
    const validSize = isNaN(size) ? 400 : size;
    const validStrokeWidth = isNaN(strokeWidth) ? 10 : strokeWidth;
    const validBackgroundStrokeWidth = backgroundStrokeWidth !== undefined && !isNaN(backgroundStrokeWidth) ? backgroundStrokeWidth : validStrokeWidth / 2;
    const radius = (validSize - validStrokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (validValue / 100) * circumference;

    const valuePerMinute = (100 / diffInDays / 24 / 60).toFixed(3);

    return (
        <svg
            viewBox={`0 0 ${validSize} ${validSize}`}
            className={styles.circle}
            preserveAspectRatio="xMidYMid meet"
        >
            <circle
                className={styles.background}
                strokeWidth={validBackgroundStrokeWidth}
                r={radius}
                cx="50%"
                cy="50%"
            />
            <circle
                className={styles.progress}
                strokeWidth={validStrokeWidth}
                r={radius}
                cx="50%"
                cy="50%"
                style={{strokeDasharray: circumference, strokeDashoffset: offset}}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                className={styles.value}
            >
                {valuePerMinute}%
            </text>
        </svg>
    );
};

export default Diagram;