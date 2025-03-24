import { UserProvider } from "./UserContext";
import { cookies } from "next/headers";
import { newRequest } from "@/utils/newRequest";
import { ComponentType, ReactNode } from "react";

interface WrappedComponentProps {
    children?: ReactNode;
}

export function authWrapper<T extends WrappedComponentProps>(Component: ComponentType<T>) {
    return async function WrappedComponent(props: T) {
        let user = null;
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get("token")?.value;

            if (!token) {
                console.warn("No token found in cookies.");
            }

            const response = await newRequest.get("/user/get-user", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status !== 200) {
                console.error("Fetch failed:", response.statusText);
            }

            user = response.data.user;
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
