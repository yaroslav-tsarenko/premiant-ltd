import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/:referralCode",
                destination: "/register?referralCode=:referralCode",
            },
        ];
    },
};

export default nextConfig;
