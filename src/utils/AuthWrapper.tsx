import { useEffect, useState } from 'react';
import { User, UserProvider } from './UserContext';
import { cookies } from 'next/headers';

export function authWrapper<P extends object>(Component: React.ComponentType<P>) {
    return function WrappedComponent(props: P) {
        const [user, setUser] = useState<User | null>(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const cookieStore = await cookies();
                    const token = cookieStore.get('token')?.value;

                    if (!token) {
                        console.error('No token found');
                        setUser(null);
                        setLoading(false);
                        return;
                    }

                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        cache: 'no-store',
                    });

                    if (!response.ok) {
                        console.error('Failed to fetch user:', response.statusText);
                        setUser(null);
                        setLoading(false);
                        return;
                    }

                    const userData = await response.json();
                    setUser(userData.user as User);
                } catch (error) {
                    console.error('Error in authWrapper:', error);
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }, []);

        if (loading) {
            return <div>Loading...</div>;
        }

        const defaultUser: User = {
            _id: '',
            name: '',
            secondName: '',
            email: '',
            telegram: '',
            referralCode: '',
            balance: 0,
            earnings: 0,
            tariff: 0,
            withdrawals: 0,
        };

        return (
            <UserProvider user={user || defaultUser}>
                <Component {...props} />
            </UserProvider>
        );
    };
}