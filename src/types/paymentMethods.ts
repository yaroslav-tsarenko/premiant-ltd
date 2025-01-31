export interface PaymentMethodsProps {
    icon: string;
    name: string;
    currency: string;
    description: string;
    children?: React.ReactNode;
    selected?: boolean;
    onSelect?: (name: string) => void;}