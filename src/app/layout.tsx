import type { Metadata } from "next";
import "./globals.css";
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
        <head>
            <title>Premiant LTD</title>
            <link rel="preload" href="../assets/fonts/gropled-bold.otf" as="font" type="font/otf"
                  crossOrigin="anonymous"/>
        </head>
        <body>
        <LenisScriptLoader/>
        <Header/>
        {children}
        <Footer
            footerLinks={[
                {name: 'Главная', route: '/'},
                {name: 'О Компании', route: '/about'},
                {name: 'Инвесторам', route: '/#features'},
                {name: 'FAQ', route: '/#faq'},
                {name: 'Контакты', route: '/#address'},
                {name: 'Поддержка', route: '/#address'},
            ]}
            contacts={[
                {label: 'E-mail', value: 'premiantltd@gmail.com'},
                {label: 'Phone', value: '+44 781 3243472'},
                {label: 'Telegram', value: '@PremiantLTD'},
            ]}>
        </Footer>
        </body>
        </html>
    );
};

export default authWrapper(RootLayout);