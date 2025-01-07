import React, { FC, useState } from 'react';
import { FormProps } from "@/types/form";
import styles from './HomeForm.module.scss';
import Dot from "@/components/dot/Dot";
import Button from "@/components/button/Button";
import Alert from "@/components/alert/Alert";
import { newRequest } from "@/utils/newRequest";

const HomeForm: FC<FormProps> = ({ headline, description }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await newRequest.post('/form/create-form', { name, email });
            console.log(response);
            setAlert({ title: 'Успех', description: "Форма успешно сохранена!" });
            setName('');
            setEmail('');
        } catch (error) {
            setAlert({ title: 'Упс!', description: 'Вы не ввели нужные данные или ошибка насервере' });
            console.error(error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <Dot title="форма" absolute />
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.headline}>{headline}</h1>
                <p className={styles.text}>{description}</p>
                <div className={styles.dividingLine}></div>
                <section className={styles.inputs}>
                    <input
                        type="text"
                        placeholder="Как к Вам обращаться?"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </section>
                <Button variant="form" type="submit">Отправить</Button>
            </form>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
        </div>
    );
};

export default HomeForm;