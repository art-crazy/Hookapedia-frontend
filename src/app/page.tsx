import React from 'react';
import { fetchRecipes, fetchCollections } from '@/services/api';
import { generateOrganizationSchema, generateWebSiteSchema, generateBreadcrumbSchema, generateItemListSchema } from '@/utils/schema';
import { siteConfig } from '@/config/site';
import { HomePageClient } from '@/components/pages/HomePageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `${siteConfig.brand.fullName} — Энциклопедия кальянных миксов`,
    description: "Самая полная база миксов для кальяна. Подборки по вкусам, крепости и брендам. Советы от профессионалов.",
};

export default async function HomePage() {
    // Server‑side data fetching
    const collectionsData = await fetchCollections();
    const recipesData = await fetchRecipes(1, 6);

    // Structured data for SEO
    const websiteSchema = generateWebSiteSchema(siteConfig.url.current, siteConfig.metadata.name);
    const organizationSchema = generateOrganizationSchema(siteConfig.url.current, siteConfig.metadata.name);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { label: 'Главная', path: '/' }
    ], siteConfig.url.current);
    const itemListSchema = generateItemListSchema(
        recipesData.recipes,
        'Свежие миксы',
        'Последние добавленные рецепты',
        siteConfig.url.current
    );

    return (
        <>
            {/* Website JSON‑LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
            {/* Organization JSON‑LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            {/* Breadcrumb JSON‑LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {/* ItemList JSON‑LD for fresh recipes */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

            {/* Hidden H1 for SEO */}
            <h1 className="sr-only">{siteConfig.brand.fullName} — Главная страница кальянных миксов</h1>

            <HomePageClient
                featuredCollections={collectionsData.mood}
                flavorCollections={collectionsData.flavors}
                popularCollections={collectionsData.popular}
                freshRecipes={recipesData.recipes}
            />
        </>
    );
}
