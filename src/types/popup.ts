export interface PopupProps{
    type?: string;
    title: string;
    description: string;
    firstChildren: React.ReactNode;
    secondChildren?: React.ReactNode;
    onClose?: () => void;
}