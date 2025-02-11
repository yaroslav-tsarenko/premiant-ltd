import { UserProvider } from './UserContext';
import { cookies } from 'next/headers';
import {BACKEND_URL} from "@/constants/constants";

export function authWrapper(Component: React.ComponentType<any>) {
    return async function WrappedComponent(props: unknown | any) {
        let user = null;

        try {
            const cookieStore = await cookies();
            const token = cookieStore.get('token')?.value;

            const response = await fetch(`${BACKEND_URL}/user/get-user`, {
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
