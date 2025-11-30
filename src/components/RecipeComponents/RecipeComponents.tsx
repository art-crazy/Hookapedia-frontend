'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { generateRecipeSlug } from '@/utils/slug';
import { Recipe, Ingredient, Collection, CollectionVariant } from '@/types';
import { Thermometer, Heart, Clock, Share2, PlusCircle, ListOrdered, Layers, ArrowRight, Check } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const StrengthIndicator: React.FC<{ level: number }> = ({ level }) => {
  return (
    <div className="flex items-center gap-1" title={`Крепость: ${level}/10`}>
      <Thermometer size={14} className={level > 6 ? 'text-red-500' : 'text-green-500'} />
      <div className="flex gap-0.5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-3 rounded-full ${i < level
              ? level > 7 ? 'bg-red-500' : level > 4 ? 'bg-orange-400' : 'bg-green-500'
              : 'bg-white/10'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export const CollectionCard: React.FC<{
  collection: Collection;
  onClick: () => void;
  variant?: CollectionVariant;
}> = ({ collection, onClick, variant = 'standard' }) => {

  if (variant === 'featured') {
    // Large Card (Mood/Hero)
    return (
      <div
        onClick={onClick}
        className="group relative h-80 md:h-96 min-w-[280px] md:min-w-[450px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/50 transition-all duration-300"
      >
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Badge at top */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-md">
            <Layers size={14} className="text-white" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Подборка</span>
          </div>
        </div>

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3 leading-tight">{collection.name}</h3>
          <p className="text-sm md:text-base text-gray-200 line-clamp-2 max-w-md">{collection.description}</p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    // Compact Card (Flavors) - Square/Small with overlay
    return (
      <div
        onClick={onClick}
        className="group relative h-32 md:h-40 min-w-[140px] md:min-w-[200px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/50 transition-all duration-300"
      >
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-50"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
          <h3 className="text-sm md:text-lg font-bold text-white text-center drop-shadow-md group-hover:scale-105 transition-transform">{collection.name}</h3>
        </div>
      </div>
    );
  }

  // Standard Card (Vertical - Default)
  return (
    <div
      onClick={onClick}
      className="group relative h-72 min-w-[220px] md:min-w-[300px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-surface hover:border-primary/50 transition-all duration-300 flex flex-col"
    >
      <div className="h-44 overflow-hidden relative">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-secondary">
          <Layers size={16} />
        </div>
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">{collection.name}</h3>
          <p className="text-xs md:text-sm text-muted line-clamp-2">{collection.description}</p>
        </div>
        <div className="flex items-center text-xs text-primary font-bold uppercase tracking-wider mt-3">
          Смотреть <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export const ViewAllCard: React.FC<{ onClick: () => void; variant: CollectionVariant }> = ({ onClick, variant }) => {
  const baseClasses = "group cursor-pointer border-2 border-dashed border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 flex flex-col items-center justify-center text-center p-6";

  if (variant === 'featured') {
    return (
      <Link href="/recepty" className={`${baseClasses} h-80 md:h-96 min-w-[280px] md:min-w-[450px] rounded-3xl`}>
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-primary/20">
          <ArrowRight size={32} className="text-white group-hover:text-primary transition-colors" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Весь каталог</h3>
        <p className="text-sm text-muted">Смотреть все коллекции</p>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href="/recepty" className={`${baseClasses} h-32 md:h-40 min-w-[140px] md:min-w-[200px] rounded-2xl`}>
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform group-hover:bg-primary/20">
          <ArrowRight size={16} className="text-white group-hover:text-primary transition-colors" />
        </div>
        <h3 className="text-xs md:text-sm font-bold text-white">Больше</h3>
      </Link>
    );
  }

  // Standard
  return (
    <Link href="/recepty" className={`${baseClasses} h-72 min-w-[220px] md:min-w-[300px] rounded-2xl`}>
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-primary/20">
        <ArrowRight size={24} className="text-white group-hover:text-primary transition-colors" />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-2">Больше</h3>
      <p className="text-xs md:text-sm text-muted">Перейти в каталог</p>
    </Link>
  );
};

export const RecipeViewAllCard: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Link
    href="/recepty"
    className="group h-full min-h-[420px] min-w-[280px] md:min-w-[340px] cursor-pointer bg-surface rounded-2xl border-2 border-dashed border-white/20 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 flex flex-col items-center justify-center text-center p-6"
  >
    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-primary/20">
      <ArrowRight size={32} className="text-white group-hover:text-primary transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">Весь каталог</h3>
    <p className="text-sm text-muted">Смотреть тысячи других рецептов</p>
  </Link>
);

export const CollectionList: React.FC<{
  title: string;
  subtitle?: string;
  collections: Collection[];
  variant: CollectionVariant;
  onSelect: (c: Collection) => void;
  onViewAll?: () => void;
}> = ({ title, subtitle, collections, variant, onSelect, onViewAll }) => {
  if (!collections.length) return null;

  return (
    <section className="py-8 md:py-10 container mx-auto px-4">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        showViewAll={!!onViewAll}
      />
      <div className="modern-scroll pb-6 w-full">
        <div className="flex gap-4 md:gap-6 w-max">
          {collections.map(col => (
            <Link href={`/recepty?collection=${col.id}`} key={col.id} className="block">
              <CollectionCard
                collection={col}
                variant={variant}
                onClick={() => onSelect(col)}
              />
            </Link>
          ))}
          {onViewAll && <ViewAllCard onClick={onViewAll} variant={variant} />}
        </div>
      </div>
    </section>
  );
};

export const RecipeList: React.FC<{
  title: string;
  subtitle?: string;
  recipes: Recipe[];
  onSelect: (recipe: Recipe) => void;
  onViewAll?: () => void;
}> = ({ title, subtitle, recipes, onSelect, onViewAll }) => {
  if (!recipes.length) return null;

  return (
    <section className="py-8 md:py-12 container mx-auto px-4">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        showViewAll={!!onViewAll}
      />

      <div className="modern-scroll pb-6 w-full">
        <div className="flex gap-4 md:gap-6 w-max">
          {recipes.map(recipe => (
            <div key={recipe.id} className="min-w-[280px] md:min-w-[340px]">
              <RecipeCard recipe={recipe} onClick={() => onSelect(recipe)} />
            </div>
          ))}
          {onViewAll && (
            <div className="min-w-[280px] md:min-w-[340px]">
              <RecipeViewAllCard onClick={onViewAll} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const RecipeCard: React.FC<{ recipe: Recipe; onClick?: () => void }> = ({ recipe, onClick }) => {
  if (!recipe) return null;

  return (
    <Link
      href={`/recept/${generateRecipeSlug(recipe)}`}
      className="group relative bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,29,72,0.15)] cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/collections/hookah-session-summer.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1.5">
          <Heart size={12} className="text-primary fill-primary" />
          {recipe.likes || 0}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="font-bold text-lg md:text-xl text-white group-hover:text-primary transition-colors leading-tight line-clamp-2 mb-2">
            {recipe.title}
          </h3>
          <p className="text-muted text-sm md:text-base line-clamp-2 leading-snug">
            {recipe.description}
          </p>
        </div>

        <div className="mt-auto pt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <StrengthIndicator level={recipe.strength || 5} />
            <div className="text-xs text-muted flex items-center gap-1">
              <Clock size={12} /> 45 мин
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.isArray(recipe.tags) && recipe.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-white/5 rounded-md text-gray-400 border border-white/5">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const IngredientsList: React.FC<{ ingredients: Ingredient[] }> = ({ ingredients }) => (
  <div className="space-y-4">
    <h3 className="font-bold text-xl text-white flex items-center gap-2">
      <PlusCircle className="text-primary" /> Состав микса
    </h3>
    <div className="grid gap-3">
      {(ingredients || []).map((ing, idx) => (
        <div key={idx} className="flex items-center bg-white/5 p-3 rounded-lg border border-white/5 relative overflow-hidden">
          <div
            className="vertical-marker rounded-l-lg bg-primary mr-3 z-10"
          />
          <div className="flex-grow z-10">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-white text-sm md:text-base">{ing.name}</span>
              <span className="font-bold text-primary text-sm md:text-base">
                {ing.percentage > 0 ? `${ing.percentage}%` : `${ing.amount} ${ing.unit}`}
              </span>
            </div>
            {ing.brand ? (
              <div className="text-[10px] md:text-xs text-muted uppercase tracking-wider">{ing.brand}</div>
            ) : (
              <div className="text-[10px] md:text-xs text-muted uppercase tracking-wider opacity-50">Табак</div>
            )}
          </div>
          {/* Progress bar visual for percentage */}
          {ing.percentage > 0 && (
            <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full rounded-b-lg overflow-hidden">
              <div
                className="h-full bg-primary progress-fill"
                style={{ '--fill-width': `${ing.percentage}%` } as React.CSSProperties}
              />
            </div>
          )}
        </div>
      ))}
      {ingredients && ingredients.length === 0 && (
        <p className="text-muted italic">Информация об ингредиентах отсутствует.</p>
      )}
    </div>
  </div>
);

export const StepsList: React.FC<{ steps: NonNullable<Recipe['steps']> }> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-4 mt-8">
      <h3 className="font-bold text-xl text-white flex items-center gap-2">
        <ListOrdered className="text-secondary" /> Инструкция
      </h3>
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-sm">
              {idx + 1}
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-white text-base md:text-lg">{step.title}</h4>
              <p className="text-sm md:text-base text-muted leading-relaxed">{step.text}</p>
              {step.image && (
                <img
                  src={step.image.startsWith('http') ? step.image : `http://109.205.56.225:3001${step.image.startsWith('/') ? '' : '/'}${step.image}`}
                  alt={step.title}
                  className="rounded-lg mt-2 max-h-60 object-cover w-full md:w-auto"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const RecipeDetailView: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [copied, setCopied] = useState(false);
  if (!recipe) return null;

  const handleShare = async () => {
    const shareData = {
      title: recipe.title,
      text: `Попробуй этот микс: ${recipe.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
        {/* Image Section */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto h-full min-h-[300px] md:min-h-[400px]">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/collections/hookah-session-summer.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg leading-tight">{recipe.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {(recipe.tags || []).map(tag => (
                <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-primary/80 backdrop-blur-md rounded-full text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-6 p-4 md:p-6">
          <div className="prose prose-invert max-w-none">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white m-0">Описание вкуса</h3>
              <button
                onClick={handleShare}
                className={`p-2 rounded-full transition-colors flex items-center gap-2 ${copied ? 'bg-green-500/20 text-green-500' : 'bg-white/5 hover:bg-white/10 text-muted hover:text-white'}`}
                title="Поделиться"
              >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
                {copied && <span className="text-xs font-bold">Скопировано</span>}
              </button>
            </div>
            <p className="text-muted leading-relaxed text-sm md:text-base">{recipe.description}</p>
          </div>

          <div className="bg-surface rounded-xl p-4 md:p-6 border border-white/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted text-sm">Крепость</span>
              <StrengthIndicator level={recipe.strength} />
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full progress-fill ${recipe.strength > 6 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ '--fill-width': `${recipe.strength * 10}%` } as React.CSSProperties}
              />
            </div>
          </div>

          <IngredientsList ingredients={recipe.ingredients} />

          {recipe.steps && <StepsList steps={recipe.steps} />}
        </div>
      </div>
    </div>
  );
};
