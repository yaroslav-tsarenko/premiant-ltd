import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { authWrapper } from "@/utils/AuthWrapper";
import LenisScriptLoader from "@/utils/LenisScriptLoader";
import React from "react";

export const metadata: Metadata = {
    title: "Premiant LTD - Invest in technologies that deliver results | Traffic | Crypto | AI",
    description: "Invest in technologies that deliver results | Traffic | Crypto | AI",
};
type RootLayoutProps = {
    children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
        <body>
        <LenisScriptLoader/>
        <Header/>
        {children}
        <Footer
            footerLinks={[
                {name: "Главная", route: "/"},
                {name: "О Компании", route: "/about"},
                {name: "Инвесторам", route: "/#features"},
                {name: "FAQ", route: "/#faq"},
                {name: "Контакты", route: "/#address"},
            ]}
            contacts={[
                {label: "E-mail", value: "support@premiant.ltd"},
                {label: "Phone", value: "+44 781 3243472"},
                {label: "Telegram", value: "@PremiantLTD"},
            ]}
        />
        </body>
        </html>
    );
};

export default authWrapper(RootLayout);