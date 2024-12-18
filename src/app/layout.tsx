import type { Metadata } from "next";
import "./globals.css";
import Button from "@/components/button/Button";
import Header from "@/components/header/Header";
import React from "react";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

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
              {name: 'Главная', route: '/'},
              {name: 'О Компании', route: '/about'},
              {name: 'Инвесторам/Партнерам', route: '#'},
              {name: 'FAQ', route: '#'},
              {name: 'Контакты', route: '/contacts'},
          ]}
      >
          <Link href="/login">
              <Button variant="headerSign">Войти</Button>
          </Link>
          <Link href="/register">
              <Button variant="outline">Регистрация</Button>
          </Link>
      </Header>
      {children}
      <Footer
          footerLinks={[
              {name: 'Главная', route: '#'},
              {name: 'О Компании', route: '/about'},
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