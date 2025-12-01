import React from 'react';
import { notFound } from 'next/navigation';
import { RecipeDetailView } from '@/components/RecipeComponents';
import { SeoHead } from '@/components/SeoHead';
import { Breadcrumbs } from '@/components/Layout';
import { fetchRecipeById, fetchSimilarRecipes } from '@/services/api';
import { extractIdFromSlug } from '@/utils/slug';
import { generateRecipeSchema } from '@/utils/schema';
import { siteConfig } from '@/config/site';
import { RecipePageClient } from '@/components/pages/RecipePageClient';

interface RecipePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
    const { slug } = await params;
    const recipeId = extractIdFromSlug(slug);

    if (!recipeId) {
        notFound();
    }

    // Server-side data fetching
    const recipe = await fetchRecipeById(recipeId);

    console.log('recipe', recipe)
    if (!recipe) {
        notFound();
    }

    const similarRecipes = await fetchSimilarRecipes(recipe.id);

    // Structured Data for Recipe (Google/Yandex Snippet)
    const recipeSchema = generateRecipeSchema(recipe, siteConfig.url.current);

    return (
        <div className="container mx-auto px-4 py-8">
            <SeoHead
                title={`${recipe.title} - рецепт кальяна`}
                description={`Как забить ${recipe.title}. Состав: ${recipe.ingredients.map(i => i.name).join(', ')}. Крепость: ${recipe.strength}/10.`}
                image={recipe.imageMain}
                type="article"
                schema={recipeSchema}
            />

            <Breadcrumbs items={[
                { label: 'Главная', path: '/' },
                { label: 'Рецепты', path: '/recepty' },
                { label: recipe.title }
            ]} />

            {/* Hidden H1 for SEO, visible title is in the DetailView component usually, but we ensure H1 structure here */}
            <h1 className="sr-only">{recipe.title} - рецепт микса для кальяна</h1>

            <RecipeDetailView recipe={recipe} />

            {similarRecipes.length > 0 && (
                <RecipePageClient similarRecipes={similarRecipes} />
            )}
        </div>
    );
}
