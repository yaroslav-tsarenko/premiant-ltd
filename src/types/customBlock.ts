import styles from '../components/customBlock/CustomBlock.module.scss';

export interface CustomBlockProps {
    variant?: keyof typeof styles;
    children?: React.ReactNode;
}