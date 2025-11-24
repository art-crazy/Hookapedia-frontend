/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.tailwindcss.com',
            },
            {
                protocol: 'http',
                hostname: '109.205.56.225',
                port: '3001',
            },
        ],
    },
}

export default nextConfig;
