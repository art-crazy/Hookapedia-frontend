import React from 'react';
import { SeoHead } from '@/components/SeoHead';
import { Breadcrumbs } from '@/components/Layout';
import { fetchRecipes } from '@/services/api';
import CatalogPageClient from '@/components/pages/CatalogPageClient';

export default async function ReceptyPage() {
    // Server-side initial data fetch
    const { recipes } = await fetchRecipes(1, 100);

    return (
        <div className="container mx-auto px-4 py-8">
            <SeoHead
                title="Рецепты кальянных миксов - Hookapedia"
                description="Подбор кальянных миксов по крепости, вкусу, наличию мяты и холодка. Огромная база рецептов."
            />

            <Breadcrumbs items={[
                { label: 'Главная', path: '/' },
                { label: 'Рецепты' }
            ]} />

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Рецепты Миксов</h1>

            <CatalogPageClient initialRecipes={recipes} />
        </div>
    );
}
