import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { fetchRecipeById } from '@/services/api';
import { buildMetadata } from '@/utils/metadata';
import { extractIdFromSlug } from '@/utils/slug';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const recipeId = extractIdFromSlug(resolvedParams.slug);

    try {
        const recipe = await fetchRecipeById(recipeId);

        if (!recipe) {
            notFound();
        }

        const ingredientNames = recipe.ingredients.map(i => i.name).join(', ');
        const title = `${recipe.title} — рецепт кальяна | Hookapedia`;
        const description = `Как забить ${recipe.title}. Состав: ${ingredientNames}. Крепость: ${recipe.strength}/10. Подробная инструкция и советы.`;

        const keywords = [
            recipe.title,
            ...recipe.ingredients.map(i => i.name),
            ...recipe.ingredients.map(i => i.brand).filter(Boolean),
            'рецепт кальяна',
            'микс табака',
            'как забить кальян'
        ];

        const canonicalUrl = `${siteConfig.url.current}/recept/${resolvedParams.slug}`;

        return buildMetadata({
            title,
            description,
            url: canonicalUrl,
            keywords: [...new Set(keywords)],
            ogTitle: title,
            ogDescription: description,
            ogImage: recipe.imageUrl,
            type: 'article'
        });
    } catch (error) {
        console.error('Error loading recipe metadata:', error);
        notFound();
    }
}
