import { ReactNode } from 'react';

export interface NavigationItemProps {
    title: string;
    icon: ReactNode;
    route: string;
    type?: string;
}