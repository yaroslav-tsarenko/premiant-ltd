import React from 'react';
import Header from '@/components/header/Header';
import Footer from "@/components/footer/Footer";
import Button from "@/components/button/Button";
import Login from "@/components/login/Login";

const LoginPage = () => {
    return (
        <>
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

            <Login
                headline="ВХОД В СИСТЕМУ"
                greeting="Приветствуем с возвращением! Мы рады видеть Вас снова и надеемся, что и в этот раз Вы останетесь довольны!"
                linkRoute={[
                    {name: 'зарегистрироваться', route: '#'},
                ]}>

                <Button variant="authentication">Войти</Button>
            </Login>

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

        </>
    );
};

export default LoginPage;