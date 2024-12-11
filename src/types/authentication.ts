export interface AuthenticationProps{
    headline: string;
    greeting: string;
    children: React.ReactNode;
    linkRoute: {name: string, route: string}[];
}