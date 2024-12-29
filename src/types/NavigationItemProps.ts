import { ReactNode } from 'react';

export interface NavigationItemProps {
    title: string;
    icon: ReactNode;
    route: string;
    className?: string;
    type?: string;
}