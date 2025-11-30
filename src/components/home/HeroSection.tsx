'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
    badge?: string;
    title: string;
    highlightedWord?: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
}

export function HeroSection({
    badge,
    title,
    highlightedWord,
    subtitle,
    ctaText,
    ctaLink,
    backgroundImage
}: HeroSectionProps) {
    const renderTitle = () => {
        if (!highlightedWord) return title;

        const parts = title.split(highlightedWord);
        return (
            <>
                {parts[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                    {highlightedWord}
                </span>
                {parts[1]}
            </>
        );
    };

    return (
        <section className="relative min-h-[500px] md:h-[550px] flex items-center justify-center overflow-hidden py-12 md:py-0 -mt-16">
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center pt-16">
                {badge && (
                    <div className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/20 text-sm font-semibold mb-6 animate-pulse">
                        {badge}
                    </div>
                )}
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight drop-shadow-2xl">
                    {renderTitle()}
                </h2>
                <p className="text-lg md:text-2xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed px-2">
                    {subtitle}
                </p>
                <div className="flex justify-center">
                    <Link
                        href={ctaLink}
                        className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-rose-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2"
                    >
                        {ctaText} <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
