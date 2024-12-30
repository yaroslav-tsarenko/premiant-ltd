import styles from "@/components/tariff-component/TariffComponent.module.scss";

export interface TariffComponentProps {
    headline: string;
    price?: string;
    percent?: string;
    link?: string;
    fullWidth?: boolean;
    variant?: keyof typeof styles;
    term?: string
    currentTariff?: string;
}