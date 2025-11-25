'use client';

import React from 'react';
import Link from 'next/link';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    showViewAll?: boolean;
    viewAllLink?: string;
}

export function SectionHeader({
    title,
    subtitle,
    showViewAll = false,
    viewAllLink = '/recepty'
}: SectionHeaderProps) {
    return (
        <div className="flex justify-between items-end mb-4 md:mb-6">
            <div>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">{title}</h2>
                {subtitle && <p className="text-xs md:text-base text-muted">{subtitle}</p>}
            </div>
            {showViewAll && (
                <Link href={viewAllLink} className="text-primary hover:text-white transition-colors text-xs md:text-sm font-medium whitespace-nowrap ml-4">
                    Смотреть все
                </Link>
            )}
        </div>
    );
}
