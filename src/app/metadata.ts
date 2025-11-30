import { Metadata } from 'next';
import { buildMetadata, DEFAULT_OG_IMAGE } from '@/utils/metadata';
import { siteConfig } from '@/config/site';

const baseMetadata = buildMetadata({
    title: "Хукапедия — лучшие миксы табака и инструкции",
    description: "Соберите идеальный кальян: проверенные рецепты, пропорции, жаростойкость и советы по чашам.",
    url: siteConfig.url.current,
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
        'рецепты кальянов',
        'миксы табака',
        'забивка кальяна',
        'кальян дома',
        'как забить кальян',
        'вкусы кальяна',
        'табак для кальяна',
        'кальянные миксы',
        'рецепты забивки',
        'пропорции табака',
        'жаростойкость табака',
        'чаши для кальяна',
        'кальянные рецепты',
        'табачные миксы',
        'кальянный микс'
    ],
});

export const metadata: Metadata = {
    ...baseMetadata,
};
