import React from 'react';
import { GetServerSideProps } from 'next';
import { BACKEND_URL } from '@/constants/constants';
import { UserProvider, User } from '@/utils/UserContext';

interface DynamicWrapperProps {
    user: User;
    Component: React.ComponentType<any>;
    pageProps: any;
}

const DynamicWrapper: React.FC<DynamicWrapperProps> = ({ user, Component, pageProps }) => {
    return (
        <UserProvider user={user}>
            <Component {...pageProps} />
        </UserProvider>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const token = context.req.cookies.token || null;

        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        const response = await fetch(`${BACKEND_URL}/user/get-user`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status !== 200) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        const data = await response.json();

        return {
            props: {
                user: data.user || null,
            },
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
};

export default DynamicWrapper;