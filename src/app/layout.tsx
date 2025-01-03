import type { Metadata } from "next";
import "./globals.css";
import Button from "@/components/button/Button";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { authWrapper } from "@/utils/AuthWrapper";
import LenisScriptLoader from "@/utils/LenisScriptLoader";

export const metadata: Metadata = {
    title: "Premiant LTD",
    description: "ИНВЕСТИРУЙТЕ С НАМИ И ПРИУМНОЖАЙТЕ СВОЙ КАПИТАЛ",
};

type RootLayoutProps = {
    children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
        <body>
        <LenisScriptLoader />
        <Header
            headerLinks={[
                { name: 'Главная', route: '/' },
                { name: 'О Компании', route: '/about' },
                { name: 'Инвесторам/Партнерам', route: '#' },
                { name: 'FAQ', route: '#' },
                { name: 'Контакты', route: '/contacts' },
            ]}
        />
        {children}
        <Footer
            footerLinks={[
                { name: 'Главная', route: '#' },
                { name: 'О Компании', route: '/about' },
                { name: 'Инвесторам/Партнерам', route: '#' },
                { name: 'FAQ', route: '#' },
                { name: 'Контакты', route: '#' },
                { name: 'Поддержка', route: '#' },
            ]}
            contacts={[
                { label: 'E-mail', value: 'premiantltd@gmail.com' },
                { label: 'Phone', value: '+38 888 88 88 888' },
                { label: 'Telegram', value: '@ltdpr' },
            ]}
        >
            <Button variant="hero">Начать инвестировать</Button>
        </Footer>
        </body>
        </html>
    );
};

export default authWrapper(RootLayout);