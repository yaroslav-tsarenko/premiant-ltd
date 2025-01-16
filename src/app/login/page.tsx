"use client"

import React, {useEffect} from 'react';
import Login from "@/components/login/Login";

const LoginPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Login
                headline="ВХОД В СИСТЕМУ"
                greeting="Приветствуем с возвращением! Мы рады видеть Вас снова и надеемся, что и в этот раз Вы останетесь довольны!"
                linkRoute={[
                    {name: 'Зарегистрироваться', route: '/register'},]}>
            </Login>
        </>
    );
};

export default LoginPage;