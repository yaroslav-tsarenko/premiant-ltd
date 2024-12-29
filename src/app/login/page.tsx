import React from 'react';
import Login from "@/components/login/Login";

const LoginPage = () => {
    return (
        <>
            <Login
                headline="ВХОД В СИСТЕМУ"
                greeting="Приветствуем с возвращением! Мы рады видеть Вас снова и надеемся, что и в этот раз Вы останетесь довольны!"
                linkRoute={[
                    {name: 'зарегистрироваться', route: '/register'},]}>
            </Login>
        </>
    );
};

export default LoginPage;