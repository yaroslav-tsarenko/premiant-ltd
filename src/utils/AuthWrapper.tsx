import { User, UserProvider } from './UserContext';
import { cookies } from 'next/headers';

export function authWrapper(Component: React.ComponentType<unknown>) {
    return async function WrappedComponent(props: Record<string, unknown>) {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('Failed to fetch user:', response.statusText);
            return (
                <UserProvider user={null as unknown as User}>
                    <Component {...props} />
                </UserProvider>
            );
        }

        const user = await response.json();

        return (
            <UserProvider user={user.user as User}>
                <Component {...props} />
            </UserProvider>
        );
    };
}