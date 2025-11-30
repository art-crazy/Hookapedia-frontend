import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/utils/metadata';
import { strengthCategories } from '@/data/categories/strengthCategories';
import { flavorCategoryCategories } from '@/data/categories/flavorCategoryCategories';
import { coolingCategories } from '@/data/categories/coolingCategories';
import { mintCategories } from '@/data/categories/mintCategories';

interface Props {
    params: Promise<{ filters?: string[] }>;
}

function generateMetadataForFilters(filters: string[]) {
    const parts: string[] = [];
    const keywords: string[] = ['рецепты кальянов', 'миксы табака'];

    // Parse filters
    filters.forEach(filter => {
        const strength = strengthCategories[filter as keyof typeof strengthCategories];
        const flavor = flavorCategoryCategories[filter as keyof typeof flavorCategoryCategories];
        const cooling = coolingCategories[filter as keyof typeof coolingCategories];
        const mint = mintCategories[filter as keyof typeof mintCategories];

        if (strength) {
            parts.push(strength.title.toLowerCase());
            keywords.push(strength.title);
        }
        if (flavor) {
            parts.push(flavor.title.toLowerCase());
            keywords.push(flavor.title);
        }
        if (cooling) {
            parts.push(cooling.title.toLowerCase());
            keywords.push(cooling.title);
        }
        if (mint) {
            parts.push(mint.title.toLowerCase());
            keywords.push(mint.title);
        }
    });

    const filterText = parts.length > 0 ? parts.join(', ') : '';
    const title = filterText
        ? `Рецепты кальянов: ${filterText} — ${siteConfig.brand.name}`
        : `Рецепты кальянных миксов — ${siteConfig.brand.name}`;

    const description = filterText
        ? `Подборка рецептов кальянов с фильтрами: ${filterText}. Лучшие миксы табака с инструкциями и советами.`
        : 'Лучшие рецепты кальянных миксов с подробными инструкциями. Найдите идеальный микс табака для кальяна.';

    return {
        title,
        description,
        keywords,
        ogTitle: title,
        ogDescription: description
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const filters = resolvedParams.filters || [];

    const canonicalUrl = filters.length > 0
        ? `${siteConfig.url.current}/recepty/${filters.join('/')}`
        : `${siteConfig.url.current}/recepty`;

    const metadata = generateMetadataForFilters(filters);

    return buildMetadata({
        title: metadata.title,
        description: metadata.description,
        url: canonicalUrl,
        keywords: metadata.keywords,
        ogTitle: metadata.ogTitle,
        ogDescription: metadata.ogDescription
    });
}
