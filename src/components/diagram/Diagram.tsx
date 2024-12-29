import React from 'react';
import styles from './Diagram.module.scss';

interface DiagramProps {
    value: number;
    size: number;
    strokeWidth: number;
    backgroundStrokeWidth?: number;
}

const Diagram: React.FC<DiagramProps> = ({value, size, strokeWidth, backgroundStrokeWidth}) => {
    const validSize = isNaN(size) ? 400 : size;
    const validStrokeWidth = isNaN(strokeWidth) ? 10 : strokeWidth;
    const validBackgroundStrokeWidth = backgroundStrokeWidth !== undefined && !isNaN(backgroundStrokeWidth) ? backgroundStrokeWidth : validStrokeWidth / 2;
    const validValue = isNaN(value) ? 0 : Math.min(100, Math.max(0, value));
    const radius = (validSize - validStrokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (validValue / 100) * circumference;

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
                {validValue}%
            </text>
        </svg>

    );
};

export default Diagram;