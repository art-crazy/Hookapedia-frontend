'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CollectionList, RecipeList } from '../components/RecipeComponents';
import { SeoHead } from '../components/SeoHead';
import { fetchRecipes, fetchCollections } from '../services/api';
import { Recipe, Collection } from '../types';
import { ArrowRight, Loader2 } from 'lucide-react';
import { generateRecipeSlug } from '@/utils/slug';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/utils/schema';
import { siteConfig } from '@/config/site';

export default function HomePage() {
    const router = useRouter();
    const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);
    const [collections, setCollections] = useState<{ popular: Collection[], flavors: Collection[], mood: Collection[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch 7 recipes to fill 2 rows (4 cols) with the "View All" card
                const { recipes } = await fetchRecipes(1, 7);
                setLatestRecipes(recipes);
                const cols = await fetchCollections();
                setCollections(cols);
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

            <section className="relative min-h-[500px] md:h-[550px] flex items-center justify-center overflow-hidden py-12 md:py-0">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=2000&auto=format&fit=crop"
                        alt="Hookah Smoke Background"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <div className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/20 text-sm font-semibold mb-6 animate-pulse">
                        #1 База знаний о кальянах
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight drop-shadow-2xl">
                        Искусство <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Вкуса</span>
                    </h2>
                    <p className="text-lg md:text-2xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed px-2">
                        Тысячи проверенных рецептов, умный поиск по ингредиентам и профессиональные советы по забивке.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href="/recepty"
                            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-rose-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2"
                        >
                            Найти рецепт <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {loading || !collections ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : (
                <>
                    {/* List 1: Standard Cards - Popular */}
                    <CollectionList
                        title="Популярные подборки"
                        subtitle="Выбор нашего сообщества на этой неделе"
                        collections={collections.popular}
                        variant="standard"
                        onSelect={(c) => console.log('Selected', c.name)}
                        onViewAll={handleViewAll}
                    />

                    {/* List 2: Compact Cards - Flavors */}
                    <CollectionList
                        title="Вкусовая палитра"
                        subtitle="Найдите идеальный вкус для вашего микса"
                        collections={collections.flavors}
                        variant="compact"
                        onSelect={(c) => console.log('Selected', c.name)}
                        onViewAll={handleViewAll}
                    />

                    {/* List 3: Featured/Large Cards - Mood */}
                    <CollectionList
                        title="Под настроение"
                        subtitle="Атмосферные коллекции для особых случаев"
                        collections={collections.mood}
                        variant="featured"
                        onSelect={(c) => console.log('Selected', c.name)}
                        onViewAll={handleViewAll}
                    />

                    <RecipeList
                        title="Свежие миксы"
                        subtitle="Новинки, добавленные нашими мастерами"
                        recipes={latestRecipes}
                        onSelect={(recipe) => router.push(`/recept/${generateRecipeSlug(recipe)}`)}
                        onViewAll={() => router.push('/recepty')}
                    />
                </>
            )}
        </>
    );
}
