import { Recipe } from '@/types';

/**
 * Converts a string to a URL-friendly slug (fallback for when recipe.slug is not available)
 */
export function toSlug(text: string): string {
    const translitMap: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    return text
        .toLowerCase()
        .split('')
        .map(char => translitMap[char] || char)
        .join('')
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();
}

/**
 * Generates a recipe slug in the format:
 * [slug]-[id] or [transliterated-title]-[id]
 * Example: tsitrusovyy-vzryv-101
 */
export function generateRecipeSlug(recipe: Recipe): string {
    // Use recipe.slug if available, otherwise transliterate the title
    const baseSlug = recipe.slug || toSlug(recipe.title);
    return `${baseSlug}-${recipe.id}`;
}

/**
 * Extracts recipe ID from a slug
 * Example: tsitrusovyy-vzryv-101 -> 101
 */
export function extractIdFromSlug(slug: string): string {
    const parts = slug.split('-');
    return parts[parts.length - 1];
}
