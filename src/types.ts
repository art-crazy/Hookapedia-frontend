
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
  tobaccoType?: string;
}

export interface Charcoal {
  size: string;
  type: string;
  brand: string;
  pieces: number;
}

export interface Recipe {
  id: string | number;
  name: string; // URL-friendly slug
  title: string;
  description: string;
  imageMain: string;
  ingredients: Ingredient[];
  preparationTime?: string;
  smokingDuration?: string;
  difficulty?: string;
  recipeType?: string;
  persons?: number;
  bowlType?: string;
  packingMethod?: string;
  charcoal?: Charcoal;
  smokeLevel?: string;
  strength?: number; // 1-10, опционально для обратной совместимости

  // Categorization fields
  strengthCategory?: string;
  mintCategory?: string;
  coolingCategory?: string;
  flavorCategory?: string;

  tags: string[];
  tips?: string[];
  rating?: string;
  reviews?: number;
  likes: number;
  updatedAt?: string;
  steps?: { title: string; text: string; image?: string }[];
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  url?: string;
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