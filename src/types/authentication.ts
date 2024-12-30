export interface AuthenticationProps{
    headline: string;
    greeting: string;
    referralCode?: string;
    linkRoute: {name: string, route: string}[];
}