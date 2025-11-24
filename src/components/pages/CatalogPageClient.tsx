'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { RecipeGrid } from '@/components/catalog/RecipeGrid';
import { fetchRecipes } from '@/services/api';
import { Recipe, FilterState } from '@/types';

interface CatalogPageClientProps {
    initialRecipes: Recipe[];
    initialFilter?: FilterState;
}

export default function CatalogPageClient({ initialRecipes, initialFilter }: CatalogPageClientProps) {
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [loading, setLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filter, setFilter] = useState<FilterState>(initialFilter || {
        search: '',
        strength: null,
        flavorCategory: null,
        mintCategory: null,
        coolingCategory: null
    });

    // Update URL when filters change
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

    // Fetch recipes when filters change
    useEffect(() => {
        // Skip initial fetch if we're using server-provided data
        const isInitialLoad = JSON.stringify(filter) === JSON.stringify(initialFilter || {
            search: '',
            strength: null,
            flavorCategory: null,
            mintCategory: null,
            coolingCategory: null
        });

        if (isInitialLoad) {
            return;
        }

        const loadRecipes = async () => {
            setLoading(true);
            try {
                const { recipes: apiRecipes } = await fetchRecipes(1, 100, filter);
                setRecipes(apiRecipes);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(loadRecipes, 400);
        return () => clearTimeout(timeoutId);
    }, [filter, initialFilter]);

    const resetFilters = () => {
        setFilter({
            search: '',
            strength: null,
            flavorCategory: null,
            mintCategory: null,
            coolingCategory: null
        });
    };

    const hasActiveFilters = Boolean(filter.flavorCategory || filter.mintCategory || filter.coolingCategory || filter.strength !== null);

    return (
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
    );
}
