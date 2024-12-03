import styles from '../components/button/Button.module.scss';

export interface ButtonProps {
    variant?: keyof typeof styles;
    children?: React.ReactNode;
}