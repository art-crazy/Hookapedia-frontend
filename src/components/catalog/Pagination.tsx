'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    searchParams?: Record<string, any>;
}

export function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    searchParams = {}
}: PaginationProps) {
    const createPageUrl = (page: number) => {
        const params = new URLSearchParams();

        // Preserve all existing search params
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value.toString());
            }
        });

        // Add or update page number
        if (page > 1) {
            params.set('page', page.toString());
        } else {
            params.delete('page');
        }

        const queryString = params.toString();
        return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // First page with ellipsis
        if (startPage > 1) {
            pages.push(
                <Link
                    key="first"
                    href={createPageUrl(1)}
                    className="min-w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                    1
                </Link>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="first-ellipsis" className="min-w-10 h-10 flex items-center justify-center text-muted">
                        ...
                    </span>
                );
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Link
                    key={i}
                    href={createPageUrl(i)}
                    className={`min-w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                        i === currentPage
                            ? 'bg-primary border-primary text-white font-bold'
                            : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    }`}
                >
                    {i}
                </Link>
            );
        }

        // Last page with ellipsis
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="last-ellipsis" className="min-w-10 h-10 flex items-center justify-center text-muted">
                        ...
                    </span>
                );
            }
            pages.push(
                <Link
                    key="last"
                    href={createPageUrl(totalPages)}
                    className="min-w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                    {totalPages}
                </Link>
            );
        }

        return pages;
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav className="flex justify-center items-center gap-2 my-8" aria-label="Pagination">
            {currentPage > 1 && (
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className="min-w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                    aria-label="Previous page"
                >
                    <ChevronLeft size={18} />
                </Link>
            )}

            {renderPageNumbers()}

            {currentPage < totalPages && (
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className="min-w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                    aria-label="Next page"
                >
                    <ChevronRight size={18} />
                </Link>
            )}
        </nav>
    );
}
