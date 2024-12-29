'use client';
import axios from "axios"
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Callback() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {

            const searchParams = new URLSearchParams(window.location.search);
            const token = searchParams.get('token');
            console.log(searchParams);
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                router.push('/account');

            } catch (error) {
                console.error('Authorization error:', error);
                router.push('/login');
            }
        };

        handleAuthCallback();
    }, [router]);

    return <div>Processing...</div>;
}
