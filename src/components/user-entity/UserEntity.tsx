import React, { FC, useState } from 'react';
import styles from './UserEntity.module.scss';
import Button from "@/components/button/Button";
import { MdOutlineEmail } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import { GoCalendar } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import { GrStatusCriticalSmall } from "react-icons/gr";
import axios from 'axios';
import { BACKEND_URL } from "@/constants/constants";
import Alert from '@/components/alert/Alert';

interface UserEntityProps {
    name: string;
    userId: string;
    secondName: string;
    amount: number;
    date: string;
    walletAddress: string;
    email: string;
    status: string;
    id: number;
    type: 'deposit' | 'withdraw';
}

const UserEntity: FC<UserEntityProps> = ({ name, secondName, amount, date, walletAddress, status, email, type }) => {
    const [alert, setAlert] = useState<{ title: string, description: string } | null>(null);
    const formattedDate = new Date(date);
    const formattedStatus = status === 'pending' ? 'В обработке' : status === 'applied' ? 'Подтверждено' : 'Отклонено';
    const calendarDate = formattedDate.toLocaleDateString('en-GB').replace(/\//g, '.');
    const time = formattedDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const updateStatus = async (status: 'applied' | 'denied') => {
        try {
            const endpoint = type === 'deposit' ? 'deposit' : 'withdraw';
            await axios.put(`${BACKEND_URL}/${endpoint}/update-status/${email}`, { status });
            setAlert({ title: 'Статус обновлён', description: `Статус обновлён для ${email} на ${status === 'applied' ? 'Подтверждено' : 'Отклонено'}` });
        } catch (error) {
            console.error('Error updating status:', error);
            setAlert({ title: 'Error', description: 'Error updating status' });
        }
    };

    return (
        <>
            {alert && <Alert title={alert.title} description={alert.description} onClose={() => setAlert(null)} />}
            <div className={styles.wrapper}>
                <div className={styles.upper}>
                    <h2 className={styles.name}>
                        {name} {secondName}
                    </h2>
                    <div className={styles.amount}>
                        {amount}$
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.userCredentials}>
                        <span><MdOutlineEmail/>{email}</span>
                        <span><CiWallet/>{walletAddress}</span>
                        <span><GoCalendar/>{calendarDate}</span>
                        <span><IoTimeOutline/>{time}</span>
                        <span><GrStatusCriticalSmall/>{formattedStatus}</span>
                    </div>
                    <div className={styles.buttons}>
                        <Button variant="userApply" onClick={() => updateStatus('applied')}>Подтвердить</Button>
                        <Button variant="userDeny" onClick={() => updateStatus('denied')}>Отменить</Button>
                    </div>
                </div>
            </div>
            <hr className={styles.line} />
        </>
    );
};

export default UserEntity;