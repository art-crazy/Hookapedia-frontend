import React from 'react';
import { SeoHead } from '@/components/SeoHead';
import { fetchRecipes, fetchCollections } from '@/services/api';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/utils/schema';
import { siteConfig } from '@/config/site';
import HomePageClient from '@/components/pages/HomePageClient';

export default async function HomePage() {
    // Server-side data fetching
    const collectionsData = await fetchCollections();
    const recipesData = await fetchRecipes(1, 6);

    // Website and Organization Schemas
    const websiteSchema = generateWebSiteSchema(siteConfig.url.current, siteConfig.metadata.name);
    const organizationSchema = generateOrganizationSchema(siteConfig.url.current, siteConfig.metadata.name);

    return (
        <>
            <SeoHead
                title="Хукапедия - Энциклопедия кальянных вкусов и рецептов"
                description="Самая полная база миксов для кальяна. Подборки по вкусам, крепости и брендам. Советы по забивке от профессионалов."
                schema={websiteSchema}
            />

            {/* Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            {/* Hidden H1 for SEO */}
            <h1 className="sr-only">Хукапедия — Главная страница кальянных миксов</h1>

            <HomePageClient
                featuredCollections={collectionsData.mood}
                flavorCollections={collectionsData.flavors}
                popularCollections={collectionsData.popular}
                freshRecipes={recipesData.recipes}
            />
        </>
    );
}
