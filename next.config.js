/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'cdn.tailwindcss.com'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '109.205.56.225',
                port: '3001',
            },
        ],
    },
}

export default nextConfig;
