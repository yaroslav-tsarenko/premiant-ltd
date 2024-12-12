import React from 'react';
import Register from "@/components/register/Register";
import Button from "@/components/button/Button";

const RegisterPage = () => {
    return (
        <>
            <Register
                headline="РЕГИСТРАЦИЯ"
                greeting="Добро пожаловать! Мы рады, что Вы решили присоединиться к нам. Надеемся, что наш сервис принесет Вам удовольствие и пользу!"
                linkRoute={[
                {name: 'войти', route: '#'},]}>
                <Button variant="authentication">Зарегистрироваться</Button>
            </Register>

        </>
    );
};

export default RegisterPage;