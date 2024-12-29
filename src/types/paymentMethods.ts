export interface PaymentMethodsProps {
    icon: string;
    name: string;
    currency: string;
    description: string;
    children?: React.ReactNode;
    onSelect?: (name: string) => void;}