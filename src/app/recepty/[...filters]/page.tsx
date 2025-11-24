'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SeoHead } from '@/components/SeoHead';
import { Breadcrumbs } from '@/components/Layout';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { RecipeGrid } from '@/components/catalog/RecipeGrid';
import { fetchRecipes } from '@/services/api';
import {
    getStrengthBySlug,
    getFlavorBySlug,
    getCoolingBySlug,
    getMintBySlug
} from '@/services/categories';
import { Recipe, FilterState } from '@/types';

export default function ReceptyFilteredPage() {
    const router = useRouter();
    const params = useParams();
    const filters = (params.filters as string[]) || [];

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Parse filters from URL
    const parseFiltersFromUrl = (): FilterState => {
        const state: FilterState = {
            search: '',
            strength: null,
            flavorCategory: null,
            mintCategory: null,
            coolingCategory: null
        };

        filters.forEach(slug => {
            if (slug === 'all') return;

            // Check each category
            if (getStrengthBySlug(slug)) {
                // Map strength slug to numeric value
                if (slug === 'legkaya-krepost') state.strength = 3;
                else if (slug === 'srednyaya-krepost') state.strength = 6;
                else if (slug === 'krepkaya-krepost') state.strength = 9;
            } else if (getFlavorBySlug(slug)) {
                state.flavorCategory = slug;
            } else if (getCoolingBySlug(slug)) {
                state.coolingCategory = slug;
            } else if (getMintBySlug(slug)) {
                state.mintCategory = slug;
            }
        });

        return state;
    };

    const [filter, setFilter] = useState<FilterState>(parseFiltersFromUrl());

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
        const currentPath = `/recepty/${filters.join('/')}`;

        if (newPath !== currentPath) {
            router.push(newPath);
        }
    }, [filter, router, filters]);

    useEffect(() => {
        const loadCatalog = async () => {
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

        const timeoutId = setTimeout(loadCatalog, 400);
        return () => clearTimeout(timeoutId);
    }, [filter]);

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
        <div className="container mx-auto px-4 py-8">
            <SeoHead
                title="Рецепты кальянных миксов - Хукапедия"
                description="Подбор кальянных миксов по крепости, вкусу, наличию мяты и холодка. Огромная база рецептов."
            />

            <Breadcrumbs items={[
                { label: 'Главная', path: '/' },
                { label: 'Рецепты' }
            ]} />

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Рецепты Миксов</h1>

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
        </div>
    );
}
