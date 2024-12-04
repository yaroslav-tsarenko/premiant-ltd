export interface FooterProps {
    footerLinks?: { name: string, route: string }[];
    contacts: { label: string, value: string }[]
    children?: React.ReactNode;
}