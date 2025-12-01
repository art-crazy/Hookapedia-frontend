import React from 'react';
import { Breadcrumbs } from '@/components/Layout';
import { fetchRecipes } from '@/services/api';
import { generateItemListSchema } from '@/utils/schema';
import { siteConfig } from '@/config/site';
import { CatalogPageClient } from '@/components/pages/CatalogPageClient';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';
import { RECIPES_PER_PAGE } from '@/config/pagination';

export const metadata: Metadata = buildMetadata({
    title: `Рецепты кальянных миксов - ${siteConfig.brand.name}`,
    description: "Подбор кальянных миксов по крепости, вкусу, наличию мяты и холодка. Огромная база рецептов.",
    url: `${siteConfig.url.current}/recepty`,
});

type SearchParams = Promise<{
    page?: string;
}>;

export default async function ReceptyPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams.page) || 1;

    // Server-side initial data fetch
    const { recipes, total } = await fetchRecipes(currentPage, RECIPES_PER_PAGE);

    // ItemList schema for catalog
    const itemListSchema = generateItemListSchema(
        recipes,
        'Рецепты кальянных миксов',
        'Подбор кальянных миксов по крепости, вкусу, наличию мяты и холодка',
        siteConfig.url.current
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* ItemList Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />

            <Breadcrumbs items={[
                { label: 'Главная', path: '/' },
                { label: 'Рецепты' }
            ]} />

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Рецепты Миксов</h1>

            <CatalogPageClient
                initialRecipes={recipes}
                initialTotal={total}
                initialPage={currentPage}
            />
        </div>
    );
}
