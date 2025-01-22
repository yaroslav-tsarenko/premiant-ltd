import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { authWrapper } from "@/utils/AuthWrapper";
import LenisScriptLoader from "@/utils/LenisScriptLoader";
import Head from "next/head";
import React from "react";

type RootLayoutProps = {
    children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
        <Head>
            <title>Premiant LTD - Invest in technologies that deliver results | Traffic | Crypto | AI</title>
            <meta
                name="description"
                content="Invest in technologies that deliver results | Traffic | Crypto | AI"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
        <LenisScriptLoader />
        <Header />
        {children}
        <Footer
            footerLinks={[
                { name: "Главная", route: "/" },
                { name: "О Компании", route: "/about" },
                { name: "Инвесторам", route: "/#features" },
                { name: "FAQ", route: "/#faq" },
                { name: "Контакты", route: "/#address" },
            ]}
            contacts={[
                { label: "E-mail", value: "support@premiant.ltd" },
                { label: "Phone", value: "+44 781 3243472" },
                { label: "Telegram", value: "@PremiantLTD" },
            ]}
        />
        </body>
        </html>
    );
};

export default authWrapper(RootLayout);
