import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'iplogger.com',
                port: '',
                pathname: '/**',
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