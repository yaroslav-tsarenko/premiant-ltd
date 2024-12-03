import { ReactElement } from 'react';

export interface BottomNavProps {
    logo?: string;
    burgerIcon?: string | ReactElement;
    links?: { name: string; route: string }[];
}