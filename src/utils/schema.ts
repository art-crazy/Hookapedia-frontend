import { siteConfig } from '@/config/site';

/**
 * Generate Organization schema for the website
 */
export function generateOrganizationSchema(baseUrl: string, siteName: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
            // Add social media links here if available
        ]
    };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema(baseUrl: string, siteName: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: baseUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/recepty?search={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    };
}

/**
 * Generate Recipe schema for individual recipe pages
 */
export function generateRecipeSchema(recipe: any, baseUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: recipe.title,
        image: recipe.imageUrl ? [recipe.imageUrl] : [],
        author: {
            '@type': 'Person',
            name: recipe.author || siteConfig.brand.name
        },
        datePublished: recipe.createdAt,
        description: recipe.description,
        recipeIngredient: recipe.ingredients?.map((i: any) =>
            `${i.percentage}% ${i.name}${i.brand ? ` (${i.brand})` : ''}`
        ) || [],
        recipeInstructions: recipe.steps?.map((step: any, index: number) => ({
            '@type': 'HowToStep',
            name: step.title,
            text: step.text,
            position: index + 1,
            image: step.image
        })) || [],
        aggregateRating: recipe.likes ? {
            '@type': 'AggregateRating',
            ratingValue: Math.min(5, Math.max(1, recipe.likes / 20)),
            reviewCount: recipe.likes
        } : undefined,
        keywords: recipe.tags?.join(', ') || ''
    };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { label: string; path?: string }[], baseUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: item.path ? `${baseUrl}${item.path.startsWith('/') ? item.path : '/' + item.path}` : undefined
        }))
    };
}

/**
 * Generate ItemList schema for recipe collections
 */
export function generateItemListSchema(
    recipes: any[],
    title: string,
    description: string,
    baseUrl: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: title,
        description: description,
        numberOfItems: recipes.length,
        itemListElement: recipes.map((recipe, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${baseUrl}/recept/${recipe.slug || recipe.id}`,
            name: recipe.title
        }))
    };
}

/**
 * Generate DefinedTermSet schema for glossary
 */
export function generateDefinedTermSetSchema(terms: { term: string; definition: string }[], baseUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: 'Глоссарий кальянных терминов',
        description: 'Словарь терминов и определений кальянной индустрии',
        hasDefinedTerm: terms.map(item => ({
            '@type': 'DefinedTerm',
            name: item.term,
            description: item.definition,
            inDefinedTermSet: `${baseUrl}/glossarij`
        }))
    };
}
