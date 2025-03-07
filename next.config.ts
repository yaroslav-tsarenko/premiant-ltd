import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "iplogger.com",
                pathname: "/**",
            },
        ],
    },

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
