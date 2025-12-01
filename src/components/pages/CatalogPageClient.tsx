'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { RecipeGrid } from '@/components/catalog/RecipeGrid';
import { Pagination } from '@/components/catalog/Pagination';
import { fetchRecipes } from '@/services/api';
import { Recipe, FilterState } from '@/types';
import { RECIPES_PER_PAGE } from '@/config/pagination';

interface CatalogPageClientProps {
    initialRecipes: Recipe[];
    initialFilter?: FilterState;
    initialTotal?: number;
    initialPage?: number;
}

export function CatalogPageClient({
    initialRecipes,
    initialFilter,
    initialTotal = 0,
    initialPage = 1
}: CatalogPageClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [total, setTotal] = useState(initialTotal);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filter, setFilter] = useState<FilterState>(initialFilter || {
        search: '',
        strength: null,
        flavorCategory: null,
        mintCategory: null,
        coolingCategory: null
    });

    const totalPages = Math.ceil(total / RECIPES_PER_PAGE);

    // Update page from URL
    useEffect(() => {
        const page = Number(searchParams.get('page')) || 1;
        setCurrentPage(page);
    }, [searchParams]);

    // Update URL when filters change (reset to page 1)
    useEffect(() => {
        const buildFilterPath = (): string => {
            const segments: string[] = [];

            // Add strength
            if (filter.strength !== null) {
                if (filter.strength <= 3) segments.push('legkaya-krepost');
                else if (filter.strength <= 6) segments.push('srednyaya-krepost');
                else segments.push('krepkaya-krepost');
            }

            // Add flavor
            if (filter.flavorCategory) segments.push(filter.flavorCategory);

            // Add cooling
            if (filter.coolingCategory) segments.push(filter.coolingCategory);

            // Add mint
            if (filter.mintCategory) segments.push(filter.mintCategory);

            return segments.length > 0 ? `/recepty/${segments.join('/')}` : '/recepty';
        };

        const newPath = buildFilterPath();
        const currentPath = window.location.pathname;

        if (newPath !== currentPath) {
            router.push(newPath);
        }
    }, [filter, router]);

    // Fetch recipes when filters or page changes
    useEffect(() => {
        // Skip initial fetch if we're using server-provided data
        const isInitialLoad =
            JSON.stringify(filter) === JSON.stringify(initialFilter || {
                search: '',
                strength: null,
                flavorCategory: null,
                mintCategory: null,
                coolingCategory: null
            }) && currentPage === initialPage;

        if (isInitialLoad) {
            return;
        }

        const loadRecipes = async () => {
            setLoading(true);
            try {
                const { recipes: apiRecipes, total: apiTotal } = await fetchRecipes(
                    currentPage,
                    RECIPES_PER_PAGE,
                    filter
                );
                setRecipes(apiRecipes);
                setTotal(apiTotal);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(loadRecipes, 400);
        return () => clearTimeout(timeoutId);
    }, [filter, currentPage, initialFilter, initialPage]);

    const resetFilters = () => {
        setFilter({
            search: '',
            strength: null,
            flavorCategory: null,
            mintCategory: null,
            coolingCategory: null
        });
        setCurrentPage(1);
    };

    const hasActiveFilters = Boolean(filter.flavorCategory || filter.mintCategory || filter.coolingCategory || filter.strength !== null);

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8">
                <FilterSidebar
                    filter={filter}
                    setFilter={setFilter}
                    isOpen={isFilterOpen}
                    hasActiveFilters={hasActiveFilters}
                    onReset={resetFilters}
                />

                <RecipeGrid
                    recipes={recipes}
                    loading={loading}
                    onReset={resetFilters}
                    showMobileFilterToggle={true}
                    isFilterOpen={isFilterOpen}
                    onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
                />
            </div>

            <div className="lg:ml-[calc(25%+2rem)]">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl="/recepty"
                    searchParams={{
                        ...(filter.search && { search: filter.search }),
                        ...(filter.strength !== null && { strength: filter.strength }),
                        ...(filter.flavorCategory && { flavorCategory: filter.flavorCategory }),
                        ...(filter.mintCategory && { mintCategory: filter.mintCategory }),
                        ...(filter.coolingCategory && { coolingCategory: filter.coolingCategory }),
                    }}
                />
            </div>
        </>
    );
}
