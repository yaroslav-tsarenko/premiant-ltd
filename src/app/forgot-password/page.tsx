"use client"

import React, {useEffect} from 'react';
import ForgotPassword from "@/components/forgot-password/ForgotPassword";

const ForgotPasswordPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <ForgotPassword/>
        </>
    );
};

export default ForgotPasswordPage;