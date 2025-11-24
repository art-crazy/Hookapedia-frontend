'use client';

import React from 'react';
import { Header, Footer, MouseSpotlight } from './Layout';
import { usePathname, useRouter } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const navigate = (path: string) => {
        router.push(path);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-text font-sans selection:bg-primary selection:text-white">
            <MouseSpotlight />
            <Header />

            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}
