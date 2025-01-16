import styles from "@/components/tariff-component/TariffComponent.module.scss";

export interface TariffComponentProps {
    headline: string;
    price?: string;
    percent?: string;
    tariffLink?: string;
    link?: string;
    fullWidth?: boolean;
    active?: boolean;
    variant?: keyof typeof styles;
    term?: string
    currentTariff?: string;
    alwaysHighlighted?: boolean;
    buttonClass?: string
    picked?: boolean;
    onClick?: () => void;
}