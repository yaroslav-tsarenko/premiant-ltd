import { StaticImageData } from "next/image";

export interface FeaturesInfoProps {
    title?: string;
    modTitle?: string;
    dotText?: string;
    children?: React.ReactNode;
    mainImg: StaticImageData;
    mobImg: StaticImageData;
}