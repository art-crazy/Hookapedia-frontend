'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { RecipeCard, RecipeDetailView } from '@/components/RecipeComponents.tsx';
import { SeoHead } from '@/components/SeoHead.tsx';
import { Breadcrumbs } from '@/components/Layout.tsx';
import { fetchRecipeById, fetchSimilarRecipes } from '@/services/api.ts';
import { Recipe } from '@/types.ts';
import { extractIdFromSlug, generateRecipeSlug } from '@/utils/slug.ts';
import { Loader2 } from 'lucide-react';
import { generateRecipeSchema } from '@/utils/schema';
import { siteConfig } from '@/config/site';

export default function RecipePage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    const recipeId = extractIdFromSlug(slug);

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!recipeId) return;

            setLoading(true);
            try {
                const currentRecipe = await fetchRecipeById(recipeId);
                setRecipe(currentRecipe);

                if (currentRecipe) {
                    const similar = await fetchSimilarRecipes(currentRecipe.id);
                    setSimilarRecipes(similar);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [recipeId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    if (!recipe) return <div className="p-20 text-center text-white">Рецепт не найден</div>;

    // Structured Data for Recipe (Google/Yandex Snippet)
    const recipeSchema = generateRecipeSchema(recipe, siteConfig.url.current);

    return (
        <div className="container mx-auto px-4 py-8">
            <SeoHead
                title={`${recipe.title} - рецепт кальяна`}
                description={`Как забить ${recipe.title}. Состав: ${recipe.ingredients.map(i => i.name).join(', ')}. Крепость: ${recipe.strength}/10.`}
                image={recipe.imageUrl}
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
                <section className="mt-16 border-t border-white/10 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-6">Похожие миксы</h2>
                    <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
                        {similarRecipes.map(r => (
                            <RecipeCard
                                key={r.id}
                                recipe={r}
                                onClick={() => router.push(`/recept/${generateRecipeSlug(r)}`)}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
