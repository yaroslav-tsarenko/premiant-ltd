"use client";

import React, { useEffect, useState } from "react";
import Register from "@/components/register/Register";
import { usePathname, useSearchParams } from "next/navigation";
import { newRequest } from "@/utils/newRequest";
import CopyCodePopup from "@/components/copy-code-popup/CopyCodePopup";
import { BACKEND_URL } from "@/constants/constants";
import suspense from "@/components/suspense/SuspenseWrapper";

const RegisterPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [referral, setReferral] = useState<string>("");
    const [referralCode, setReferralCode] = useState<string>("");
    const [popup, setPopup] = useState<boolean>(false);
    const [referralClickCounted, setReferralClickCounted] = useState<boolean>(false);

    const countReferralClick = async (code: string | null) => {
        try {
            if (code && !referralClickCounted) {
                const response = await newRequest.put(`/referral/referral-click/${code}`);
                console.log('Referral click counted:', response.data);
                setReferralClickCounted(true);
            }
        } catch (error) {
            console.error('Error counting referral click:', error);
        }
    };

    const getRefferral = async (code: string | null) => {
        try {
            const response = await fetch(`${BACKEND_URL}/referral/get-referral/${code}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setReferralCode(data.referralCode);
            console.log("Referal code:" + referralCode);
        } catch (error) {
            console.error('Error fetching referral:', error);
        }
    };

    useEffect(() => {
        const referralCode = searchParams.get("referralCode");
        if (referralCode && referralCode !== "register") {
            setReferral(referralCode);
        } else {
            const segments = pathname.split("/").filter(Boolean);
            const potentialReferralCode = segments[0];
            if (potentialReferralCode && potentialReferralCode !== "register") {
                setReferral(potentialReferralCode);
            }
        }
        if (pathname !== "/register") {
            setPopup(true);
        }
    }, [searchParams, pathname]);

    useEffect(() => {
        if (referral) {
            getRefferral(referral);
            countReferralClick(referral);
        }
    }, [referral]);

    return (
        <>
            {popup &&
                <CopyCodePopup code={referralCode} onClose={() => setPopup(false)} />
            }
            <Register
                headline="РЕГИСТРАЦИЯ"
                referralCode={referralCode}
                greeting="Добро пожаловать! Мы рады, что Вы решили присоединиться к нам. Надеемся, что наш сервис принесет Вам удовольствие и пользу!"
                linkRoute={[
                    { name: "войти", route: "/login" },
                ]}
            />
        </>
    );
};

export default suspense(RegisterPage);