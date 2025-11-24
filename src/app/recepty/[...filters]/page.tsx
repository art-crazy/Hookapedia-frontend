'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { RecipeCard } from '@/components/RecipeComponents';
import { SeoHead } from '@/components/SeoHead';
import { Breadcrumbs } from '@/components/Layout';
import { fetchRecipes } from '@/services/api';
import {
    getMintOptions,
    getFlavorOptions,
    getCoolingOptions,
    getStrengthBySlug,
    getFlavorBySlug,
    getCoolingBySlug,
    getMintBySlug
} from '@/services/categories';
import { Recipe, FilterState } from '@/types';
import { Search, Loader2, Filter } from 'lucide-react';
import { generateRecipeSlug } from '@/utils/slug';

export default function ReceptyFilteredPage() {
    const router = useRouter();
    const params = useParams();
    const filters = (params.filters as string[]) || [];

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Parse filters from URL
    const parseFiltersFromUrl = (): FilterState => {
        const state: FilterState = {
            search: '',
            strength: null,
            flavorCategory: null,
            mintCategory: null,
            coolingCategory: null
        };

        filters.forEach(slug => {
            if (slug === 'all') return;

            // Check each category
            if (getStrengthBySlug(slug)) {
                // Map strength slug to numeric value
                if (slug === 'legkaya-krepost') state.strength = 3;
                else if (slug === 'srednyaya-krepost') state.strength = 6;
                else if (slug === 'krepkaya-krepost') state.strength = 9;
            } else if (getFlavorBySlug(slug)) {
                state.flavorCategory = slug;
            } else if (getCoolingBySlug(slug)) {
                state.coolingCategory = slug;
            } else if (getMintBySlug(slug)) {
                state.mintCategory = slug;
            }
        });

        return state;
    };

    const [filter, setFilter] = useState<FilterState>(parseFiltersFromUrl());

    // Update URL when filters change
    useEffect(() => {
        const buildFilterPath = (): string => {
            const segments: string[] = [];

            // Add strength
            if (filter.strength !== null) {
                if (filter.strength <= 3) segments.push('legkaya-krepost');
                else if (filter.strength <= 6) segments.push('srednyaya-krepost');
                else segments.push('krepkaya-krepost');
            }

            // Add flavor
            if (filter.flavorCategory) segments.push(filter.flavorCategory);

            // Add cooling
            if (filter.coolingCategory) segments.push(filter.coolingCategory);

            // Add mint
            if (filter.mintCategory) segments.push(filter.mintCategory);

            return segments.length > 0 ? `/recepty/${segments.join('/')}` : '/recepty';
        };

        const newPath = buildFilterPath();
        const currentPath = `/recepty/${filters.join('/')}`;

        if (newPath !== currentPath) {
            router.push(newPath);
        }
    }, [filter, router, filters]);

    useEffect(() => {
        const loadCatalog = async () => {
            setLoading(true);
            try {
                const { recipes: apiRecipes } = await fetchRecipes(1, 100, filter);
                setRecipes(apiRecipes);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(loadCatalog, 400);
        return () => clearTimeout(timeoutId);
    }, [filter]);

    const resetFilters = () => {
        setFilter({
            search: '',
            strength: null,
            flavorCategory: null,
            mintCategory: null,
            coolingCategory: null
        });
    };

    const hasActiveFilters = filter.flavorCategory || filter.mintCategory || filter.coolingCategory || filter.strength !== null;

    return (
        <div className="container mx-auto px-4 py-8">
            <SeoHead
                title="Рецепты кальянных миксов - Хукапедия"
                description="Подбор кальянных миксов по крепости, вкусу, наличию мяты и холодка. Огромная база рецептов."
            />

            <Breadcrumbs items={[
                { label: 'Главная', path: '/' },
                { label: 'Рецепты' }
            ]} />

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Рецепты Миксов</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className={`lg:w-1/4 space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-lg lg:shadow-none">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-white flex items-center gap-2"><Filter size={18} /> Фильтры</h3>
                            {hasActiveFilters && (
                                <button onClick={resetFilters} className="text-xs text-primary hover:underline">Сбросить</button>
                            )}
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <label className="text-xs text-muted uppercase font-bold mb-2 block">Поиск</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-muted" size={16} />
                                <input
                                    type="text"
                                    placeholder="Название..."
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary"
                                    value={filter.search}
                                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Strength Slider */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs text-muted uppercase font-bold block">Крепость</label>
                                <span className="text-xs font-bold text-primary">
                                    {filter.strength !== null ? `${filter.strength}/10` : 'Любая'}
                                </span>
                            </div>
                            <div className="space-y-4 px-1">
                                <div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        step="1"
                                        value={filter.strength || 5}
                                        onChange={(e) => setFilter({ ...filter, strength: parseInt(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-[10px] text-muted mt-2">
                                        <span>Легкий (1)</span>
                                        <span>Крепкий (10)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Flavor */}
                        <div className="mb-6">
                            <label className="text-xs text-muted uppercase font-bold mb-2 block">Вкус</label>
                            <div className="space-y-2">
                                {getFlavorOptions().map(cat => (
                                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer group p-1">
                                        <input
                                            type="radio"
                                            name="flavor"
                                            className="accent-primary w-4 h-4"
                                            checked={filter.flavorCategory === cat.id}
                                            onChange={() => setFilter({ ...filter, flavorCategory: cat.id })}
                                        />
                                        <span className={`text-sm ${filter.flavorCategory === cat.id ? 'text-white font-medium' : 'text-muted group-hover:text-white'}`}>{cat.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Mint */}
                        <div className="mb-6">
                            <label className="text-xs text-muted uppercase font-bold mb-2 block">Мята</label>
                            <div className="flex flex-wrap gap-2">
                                {getMintOptions().map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFilter({ ...filter, mintCategory: filter.mintCategory === cat.id ? null : cat.id })}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium border text-center flex-grow transition-colors cursor-pointer ${filter.mintCategory === cat.id ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/5 text-muted hover:bg-white/10'}`}
                                    >
                                        {cat.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cooling */}
                        <div>
                            <label className="text-xs text-muted uppercase font-bold mb-2 block">Холод</label>
                            <div className="flex flex-wrap gap-2">
                                {getCoolingOptions().map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFilter({ ...filter, coolingCategory: filter.coolingCategory === cat.id ? null : cat.id })}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium border text-center flex-grow transition-colors cursor-pointer ${filter.coolingCategory === cat.id ? 'bg-blue-500/20 border-blue-500/50 text-blue-200' : 'bg-white/5 border-white/5 text-muted hover:bg-white/10'}`}
                                    >
                                        {cat.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:w-3/4">
                    {/* Mobile Filter Toggle */}
                    <button
                        className="lg:hidden w-full mb-6 py-4 bg-surface border border-white/10 rounded-xl flex items-center justify-center gap-2 text-white font-bold hover:bg-white/5 transition-colors active:scale-[0.98]"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <Filter size={20} /> {isFilterOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
                    </button>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-primary" size={40} />
                        </div>
                    ) : recipes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} onClick={() => router.push(`/recept/${generateRecipeSlug(recipe)}`)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-surface rounded-2xl border border-white/5">
                            <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                                <Search size={40} className="text-muted" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                            <p className="text-muted">Попробуйте изменить параметры фильтров</p>
                            <button onClick={resetFilters} className="mt-4 text-primary font-bold hover:underline">
                                Сбросить все фильтры
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
