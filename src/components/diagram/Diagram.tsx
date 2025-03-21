import React from "react";
import styles from "./Diagram.module.scss";
import { useUser } from "@/utils/UserContext";

interface DiagramProps {
    size: number;
    strokeWidth: number;
    percentPerMinute?: number;
}

const Diagram: React.FC<DiagramProps> = ({ size, strokeWidth, percentPerMinute: initialPercent }) => {
    const user = useUser();
    const percentPerMinute = initialPercent ?? user?.percentPerMinute ?? 0;

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentPerMinute / 100) * circumference;

    const formatPercent = (percent: number) => {
        if (percent === 0) {
            return "0";
        } else if (percent < 10) {
            return percent.toFixed(3);
        } else {
            return percent.toFixed(2);
        }
    };

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className={styles.circle}>
            <circle className={styles.background} strokeWidth={strokeWidth / 2} r={radius} cx="50%" cy="50%" />
            <circle
                className={styles.progress}
                strokeWidth={strokeWidth}
                r={radius}
                cx="50%"
                cy="50%"
                style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
            />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" className={styles.value}>
                {formatPercent(percentPerMinute)}%
            </text>
        </svg>
    );
};

export default Diagram;