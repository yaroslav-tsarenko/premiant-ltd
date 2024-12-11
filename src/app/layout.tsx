import type { Metadata } from "next";
import "./globals.css";
import Button from "@/components/button/Button";
import Header from "@/components/header/Header";
import React from "react";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Premiant LTD",
  description: "ИНВЕСТИРУЙТЕ С НАМИ И ПРИУМНОЖАЙТЕ СВОЙ КАПИТАЛ",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
      <Header
          headerLinks={[
              {name: 'Главная', route: '#'},
              {name: 'О Компании', route: '/about'},
              {name: 'Инвесторам/Партнерам', route: '#'},
              {name: 'FAQ', route: '#'},
              {name: 'Контакты', route: '/contacts'},
          ]}
      >
          <Button variant="headerSign">Войти</Button>
          <Button variant="outline">Регистрация</Button>
      </Header>
      {children}
      <Footer
          footerLinks={[
              {name: 'Главная', route: '#'},
              {name: 'О Компании', route: '#'},
              {name: 'Инвесторам/Партнерам', route: '#'},
              {name: 'FAQ', route: '#'},
              {name: 'Контакты', route: '#'},
              {name: 'Поддержка', route: '#'},
          ]}
          contacts={[
              {label: 'E-mail', value: 'premiantltd@gmail.com'},
              {label: 'Phone', value: '+38 888 88 88 888'},
              {label: 'Telegram', value: '@ltdpr'},
          ]}
      >

          <Button variant="hero">Начать инвестировать</Button>

      </Footer>
      </body>
      </html>
  );
}