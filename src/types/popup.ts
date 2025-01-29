export interface PopupProps {
    type?: string;
    title: string;
    description: string | string[];
    firstChildren?: React.ReactNode;
    secondChildren?: React.ReactNode;
    onClose?: () => void;
    abilityToClose?: boolean;
}