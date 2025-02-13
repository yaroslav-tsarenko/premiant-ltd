import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import {authWrapper} from "@/utils/AuthWrapper";
import React from "react";
import type {Metadata} from "next";
import Head from "next/head";

type RootLayoutProps = {
    children: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Premiant LTD - Invest in technologies that deliver results | Traffic | Crypto | AI",
    description: "Invest in technologies that deliver results | Traffic | Crypto | AI",
    authors: [{name: "Premiant LTD"}],
};


const RootLayout: React.FC<RootLayoutProps> = ({children}) => {
    return (
        <html lang="en">
        <Head>
            <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
            <meta name="googlebot" content="noarchive"/>
            <meta property="og:title" content="Premiant LTD - Invest in technologies that deliver results"/>
            <meta property="og:description" content="Invest in AI, Traffic, and Crypto innovations."/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="Premiant LTD - Invest in technologies that deliver results"/>
            <meta name="twitter:description" content="Leading technology investments in AI and crypto."/>
        </Head>
        <body>
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
            ]}/>
        </body>
        </html>
    );
};

export default authWrapper(RootLayout);
