import styles from '../components/button/Button.module.scss';

export interface ButtonProps {
    variant?: keyof typeof styles;
    onClick?: () => void;
    children?: React.ReactNode;
}