'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CollectionList, RecipeList } from '../components/RecipeComponents';
import { SeoHead } from '../components/SeoHead';
import { fetchRecipes, fetchCollections } from '../services/api';
import { Recipe, Collection } from '../types';
import { Loader2 } from 'lucide-react';
import { generateRecipeSlug } from '@/utils/slug';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/utils/schema';
import { siteConfig } from '@/config/site';
import { HeroSection } from '@/components/home/HeroSection';

export default function HomePage() {
    const router = useRouter();
    const [featuredCollections, setFeaturedCollections] = useState<Collection[]>([]);
    const [flavorCollections, setFlavorCollections] = useState<Collection[]>([]);
    const [popularCollections, setPopularCollections] = useState<Collection[]>([]);
    const [freshRecipes, setFreshRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const collectionsData = await fetchCollections();
                const recipesData = await fetchRecipes(1, 6);

                setFeaturedCollections(collectionsData.mood);
                setFlavorCollections(collectionsData.flavors);
                setPopularCollections(collectionsData.popular);
                setFreshRecipes(recipesData.recipes);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Website and Organization Schemas
    const websiteSchema = generateWebSiteSchema(siteConfig.url.current, siteConfig.metadata.name);
    const organizationSchema = generateOrganizationSchema(siteConfig.url.current, siteConfig.metadata.name);

    const handleViewAll = () => {
        router.push('/recepty');
    };

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

            <HeroSection
                badge="#1 База знаний о кальянах"
                title="Искусство Вкуса"
                highlightedWord="Вкуса"
                subtitle="Тысячи проверенных рецептов, умный поиск по ингредиентам и профессиональные советы по забивке."
                ctaText="Найти рецепт"
                ctaLink="/recepty"
                backgroundImage="https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=2000&auto=format&fit=crop"
            />

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : (
                <>
                    {/* List 1: Featured/Large Cards - Mood */}
                    <CollectionList
                        title="Под настроение"
                        subtitle="Атмосферные коллекции для особых случаев"
                        collections={featuredCollections}
                        variant="featured"
                        onSelect={(c) => console.log('Selected', c.name)}
                        onViewAll={handleViewAll}
                    />

                    {/* List 2: Compact Cards - Flavors */}
                    <CollectionList
                        title="Вкусовая палитра"
                        subtitle="Найдите идеальный вкус для вашего микса"
                        collections={flavorCollections}
                        variant="compact"
                        onSelect={(c) => console.log('Selected', c.name)}
                        onViewAll={handleViewAll}
                    />

                    {/* List 3: Standard Cards - Popular */}
                    <CollectionList
                        title="Популярные подборки"
                        subtitle="Выбор нашего сообщества на этой неделе"
                        collections={popularCollections}
                        variant="standard"
                        onSelect={(c) => console.log('Selected', c.name)}
                        onViewAll={handleViewAll}
                    />

                    <RecipeList
                        title="Свежие миксы"
                        subtitle="Новинки, добавленные нашими мастерами"
                        recipes={freshRecipes}
                        onSelect={(recipe) => router.push(`/recept/${generateRecipeSlug(recipe)}`)}
                        onViewAll={() => router.push('/recepty')}
                    />
                </>
            )}
        </>
    );
}
