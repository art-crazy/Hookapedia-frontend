'use client';

import React, { useState } from 'react';
import { Header, Footer, MouseSpotlight } from '@/components/Layout';
import { Galaga } from '@/components/Galaga';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isGameOpen, setIsGameOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-background text-text font-sans selection:bg-primary selection:text-white">
            <MouseSpotlight />
            <Header onGameOpen={() => setIsGameOpen(true)} />

            <main className="flex-grow pt-16">
                {children}
            </main>

            <Footer />

            {/* Galaga Game Modal */}
            {isGameOpen && <Galaga onClose={() => setIsGameOpen(false)} />}
        </div>
    );
}
