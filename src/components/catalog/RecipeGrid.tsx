'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { RecipeCard } from '@/components/RecipeComponents';
import { Loader2, Search, Filter } from 'lucide-react';
import { Recipe } from '@/types';
import { generateRecipeSlug } from '@/utils/slug';

interface RecipeGridProps {
    recipes: Recipe[];
    loading: boolean;
    onReset?: () => void;
    showMobileFilterToggle?: boolean;
    isFilterOpen?: boolean;
    onToggleFilter?: () => void;
}

export function RecipeGrid({
    recipes,
    loading,
    onReset,
    showMobileFilterToggle = false,
    isFilterOpen = false,
    onToggleFilter
}: RecipeGridProps) {
    const router = useRouter();

    return (
        <div className="lg:w-3/4">
            {/* Mobile Filter Toggle */}
            {showMobileFilterToggle && onToggleFilter && (
                <button
                    className="lg:hidden w-full mb-6 py-4 bg-surface border border-white/10 rounded-xl flex items-center justify-center gap-2 text-white font-bold hover:bg-white/5 transition-colors active:scale-[0.98]"
                    onClick={onToggleFilter}
                >
                    <Filter size={20} /> {isFilterOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
                </button>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : recipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onClick={() => router.push(`/recept/${generateRecipeSlug(recipe)}`)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-surface rounded-2xl border border-white/5">
                    <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                        <Search size={40} className="text-muted" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                    <p className="text-muted">Попробуйте изменить параметры фильтров</p>
                    {onReset && (
                        <button onClick={onReset} className="mt-4 text-primary font-bold hover:underline">
                            Сбросить все фильтры
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
