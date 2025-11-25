'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { RecipeCard } from '@/components/RecipeComponents';
import { Recipe } from '@/types';
import { generateRecipeSlug } from '@/utils/slug';

interface RecipePageClientProps {
    similarRecipes: Recipe[];
}

export function RecipePageClient({ similarRecipes }: RecipePageClientProps) {
    const router = useRouter();

    return (
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
    );
}
