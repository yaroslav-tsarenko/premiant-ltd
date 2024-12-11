export interface ContainerWrapperProps {
    children: React.ReactNode;
    display?: 'flex' | 'block' | 'column' | 'inline-block' | 'grid';
    noPadding?: boolean;
}