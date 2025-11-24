
export interface BaseCategory {
  id: string;
  title: string;
}

export type StrengthCategories = {
  [key: string]: BaseCategory;
};

export type MintCategories = {
  [key: string]: BaseCategory;
};

export type FlavorCategories = {
  [key: string]: BaseCategory;
};

export type CoolingCategories = {
  [key: string]: BaseCategory;
};

export interface Ingredient {
  name: string;
  brand?: string;
  percentage: number;
  amount?: number;
  unit?: string;
}

export interface Recipe {
  id: string | number;
  slug?: string; // URL-friendly transliterated slug
  title: string;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
  strength: number; // 1-10

  // New categorization fields
  strengthCategory?: string; // id from strengthCategories
  mintCategory?: string;     // id from mintCategories
  coolingCategory?: string;  // id from coolingCategories
  flavorCategory?: string;   // id from flavorCategoryCategories

  tags: string[];
  author: string;
  createdAt: string;
  likes: number;
  steps?: { title: string; text: string; image?: string }[];
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
}

export type CollectionVariant = 'standard' | 'compact' | 'featured';

export interface FilterState {
  search: string;
  strength: number | null;
  flavorCategory: string | null;
  mintCategory: string | null;
  coolingCategory: string | null;
}

export enum PageRoute {
  HOME = 'home',
  RECIPE = 'recipe'
}

export interface NavigationState {
  page: PageRoute;
  params?: Record<string, any>;
}