'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FilterState } from '@/types';
import { getMintOptions, getFlavorOptions, getCoolingOptions } from '@/services/categories';

interface FilterSidebarProps {
    filter: FilterState;
    setFilter: (filter: FilterState) => void;
    isOpen: boolean;
    hasActiveFilters: boolean;
    onReset: () => void;
}

export function FilterSidebar({
    filter,
    setFilter,
    isOpen,
    hasActiveFilters,
    onReset
}: FilterSidebarProps) {
    return (
        <div className={`lg:w-1/4 space-y-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-lg lg:shadow-none">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        <Filter size={18} /> Фильтры
                    </h3>
                    {hasActiveFilters && (
                        <button onClick={onReset} className="text-xs text-primary hover:underline">
                            Сбросить
                        </button>
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
                                <span className={`text-sm ${filter.flavorCategory === cat.id ? 'text-white font-medium' : 'text-muted group-hover:text-white'}`}>
                                    {cat.title}
                                </span>
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
                                className={`px-3 py-2 rounded-lg text-xs font-medium border text-center flex-grow transition-colors cursor-pointer ${filter.mintCategory === cat.id
                                    ? 'bg-primary border-primary text-white'
                                    : 'bg-white/5 border-white/5 text-muted hover:bg-white/10'
                                    }`}
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
                                className={`px-3 py-2 rounded-lg text-xs font-medium border text-center flex-grow transition-colors cursor-pointer ${filter.coolingCategory === cat.id
                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-200'
                                    : 'bg-white/5 border-white/5 text-muted hover:bg-white/10'
                                    }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
