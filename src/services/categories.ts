import { strengthCategories } from '@/data/categories/strengthCategories';
import { flavorCategoryCategories } from '@/data/categories/flavorCategoryCategories';
import { coolingCategories } from '@/data/categories/coolingCategories';
import { mintCategories } from '@/data/categories/mintCategories';
import { BaseCategory } from '@/data/categories/type';

export const getStrengthOptions = (): BaseCategory[] => {
    return Object.values(strengthCategories);
};

export const getFlavorOptions = (): BaseCategory[] => {
    return Object.values(flavorCategoryCategories);
};

export const getCoolingOptions = (): BaseCategory[] => {
    return Object.values(coolingCategories);
};

export const getMintOptions = (): BaseCategory[] => {
    return Object.values(mintCategories);
};

// Helper to get category by slug
export const getStrengthBySlug = (slug: string): BaseCategory | undefined => {
    return strengthCategories[slug as keyof typeof strengthCategories];
};

export const getFlavorBySlug = (slug: string): BaseCategory | undefined => {
    return flavorCategoryCategories[slug as keyof typeof flavorCategoryCategories];
};

export const getCoolingBySlug = (slug: string): BaseCategory | undefined => {
    return coolingCategories[slug as keyof typeof coolingCategories];
};

export const getMintBySlug = (slug: string): BaseCategory | undefined => {
    return mintCategories[slug as keyof typeof mintCategories];
};
