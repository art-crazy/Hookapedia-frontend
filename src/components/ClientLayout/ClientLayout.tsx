'use client';

import React from 'react';
import { Header, Footer, MouseSpotlight } from '@/components/Layout';
import { usePathname, useRouter } from 'next/navigation';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

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
