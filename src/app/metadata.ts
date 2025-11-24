import { Metadata } from 'next';
import { buildMetadata, DEFAULT_OG_IMAGE } from '@/utils/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    url: siteConfig.url.current,
    keywords: siteConfig.metadata.keywords,
    ogTitle: siteConfig.metadata.title,
    ogDescription: siteConfig.metadata.description,
    ogImage: DEFAULT_OG_IMAGE
});
