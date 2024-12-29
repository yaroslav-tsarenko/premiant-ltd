import { UserProvider } from './UserContext';
import { cookies } from 'next/headers';

export function authWrapper(Component: React.ComponentType<any>) {
    return async function WrappedComponent(props: unknown | any) {
        let user = null;

        try {
            const cookieStore = await cookies();
            const token = cookieStore.get('token')?.value;

            if (!token) {
                console.warn("No token found in cookies.");
                throw new Error("Authentication token missing.");
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user`, {
                headers: { Authorization: `Bearer ${token}` },
                cache: 'no-store',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Fetch failed:", errorText);
                throw new Error(`Fetch error! Status: ${response.status}`);
            }

            const data = await response.json();
            user = data.user;
        } catch (error) {
            console.error("Error fetching user:", error);
        }

        return (
            <UserProvider user={user}>
                <Component {...props} />
            </UserProvider>
        );
    };
}
