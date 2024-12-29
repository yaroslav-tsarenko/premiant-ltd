import React from 'react';
import Register from "@/components/register/Register";

const RegisterPage = () => {
    return (
        <>
            <Register
                headline="РЕГИСТРАЦИЯ"
                greeting="Добро пожаловать! Мы рады, что Вы решили присоединиться к нам. Надеемся, что наш сервис принесет Вам удовольствие и пользу!"
                linkRoute={[
                {name: 'войти', route: '/login'},]}>
            </Register>
        </>
    );
};

export default RegisterPage;