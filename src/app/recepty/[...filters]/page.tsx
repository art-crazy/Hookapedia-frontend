import React from 'react';
import { SeoHead } from '@/components/SeoHead';
import { Breadcrumbs } from '@/components/Layout';
import { fetchRecipes } from '@/services/api';
import {
    getStrengthBySlug,
    getFlavorBySlug,
    getCoolingBySlug,
    getMintBySlug
} from '@/services/categories';
import { FilterState } from '@/types';
import CatalogPageClient from '@/components/pages/CatalogPageClient';

interface ReceptyFilteredPageProps {
    params: {
        filters: string[];
    };
}

export default async function ReceptyFilteredPage({ params }: ReceptyFilteredPageProps) {
    const { filters: filterParams } = await params;
    const filters = filterParams || [];

    // Parse filters from URL on server
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

    const initialFilter = parseFiltersFromUrl();

    // Server-side data fetch with filters
    const { recipes } = await fetchRecipes(1, 100, initialFilter);

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

            <CatalogPageClient
                initialRecipes={recipes}
                initialFilter={initialFilter}
            />
        </div>
    );
}
