'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CollectionList, RecipeList } from '@/components/RecipeComponents';
import { HeroSection } from '@/components/home/HeroSection';
import { Recipe, Collection } from '@/types';
import { generateRecipeSlug } from '@/utils/slug';

interface HomePageClientProps {
    featuredCollections: Collection[];
    flavorCollections: Collection[];
    popularCollections: Collection[];
    freshRecipes: Recipe[];
}

export function HomePageClient({
    featuredCollections,
    flavorCollections,
    popularCollections,
    freshRecipes
}: HomePageClientProps) {
    const router = useRouter();

    const handleViewAll = () => {
        router.push('/recepty');
    };

    return (
        <>
            <HeroSection
                badge="#1 База знаний о кальянах"
                title="Искусство Вкуса"
                highlightedWord="Вкуса"
                subtitle="Тысячи проверенных рецептов и профессиональные советы по забивке."
                ctaText="Найти рецепт"
                ctaLink="/recepty"
                backgroundImage="/images/collections/hookah-session-summer.jpg"
            />

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
    );
}
