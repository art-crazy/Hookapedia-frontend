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

import { siteConfig } from '@/config/site';

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
        metadataBase: new URL(siteConfig.url.current),
        title,
        description,
        applicationName: 'Hookapedia',
        authors: [{ name: 'Hookapedia Team', url: siteConfig.url.current }],
        creator: 'Hookapedia',
        publisher: 'Hookapedia',
        formatDetection: {
            telephone: false,
            date: false,
            address: false,
            email: false,
        },
        keywords: keywords.join(', '),
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
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
            images: [ogImage],
            creator: '@hookapedia' // Placeholder, update if real handle exists
        }
    };
}
