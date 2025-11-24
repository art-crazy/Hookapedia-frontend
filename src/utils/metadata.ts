import { Metadata } from 'next';

export const DEFAULT_OG_IMAGE = 'https://kalyany-mix.ru/og-image.jpg';

interface BuildMetadataParams {
    title: string;
    description: string;
    url: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    type?: 'website' | 'article';
}

export function buildMetadata({
    title,
    description,
    url,
    keywords = [],
    ogTitle,
    ogDescription,
    ogImage = DEFAULT_OG_IMAGE,
    type = 'website'
}: BuildMetadataParams): Metadata {
    return {
        title,
        description,
        keywords: keywords.join(', '),
        alternates: {
            canonical: url
        },
        openGraph: {
            title: ogTitle || title,
            description: ogDescription || description,
            url,
            siteName: 'Hookapedia',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: ogTitle || title
                }
            ],
            locale: 'ru_RU',
            type
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle || title,
            description: ogDescription || description,
            images: [ogImage]
        }
    };
}
