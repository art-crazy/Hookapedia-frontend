
import { Recipe, Collection, FilterState } from '../types';
import { COLLECTIONS_POPULAR, COLLECTIONS_FLAVORS, COLLECTIONS_MOOD, MOCK_RECIPES } from './data';

const API_URL = 'http://109.205.56.225:3001/api';

// --- API Calls ---

export const fetchRecipes = async (
  page = 1,
  limit = 12,
  filters?: Partial<FilterState>
): Promise<{ recipes: Recipe[], total: number }> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters) {
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.flavorCategory) queryParams.append('flavorCategory', filters.flavorCategory);
      if (filters.strength !== null && filters.strength !== undefined) queryParams.append('strength', filters.strength.toString());
      if (filters.mintCategory) queryParams.append('mintCategory', filters.mintCategory);
      if (filters.coolingCategory) queryParams.append('coolingCategory', filters.coolingCategory);
    }

    const res = await fetch(`${API_URL}/recipes?${queryParams.toString()}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      // Fallback to mock data if API fails
      console.error('Failed to fetch recipes, falling back to mock data');
      return fetchMockRecipes(page, limit, filters);
    }

    const data = await res.json();
    return {
      recipes: data.items || [],
      total: data.total || 0
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return fetchMockRecipes(page, limit, filters);
  }
};

export const fetchRecipeById = async (id: number | string): Promise<Recipe | null> => {
  try {
    const res = await fetch(`${API_URL}/recipes/${id}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch recipe');
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error);
    // Fallback to mock for now if API fails, or return null
    const recipe = MOCK_RECIPES.find(r => r.id.toString() === id.toString());
    return recipe || null;
  }
};

export const fetchCollections = async (): Promise<{ popular: Collection[], flavors: Collection[], mood: Collection[] }> => {
  // Keep using mock data for collections for now as requested only for recipes
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    popular: COLLECTIONS_POPULAR,
    flavors: COLLECTIONS_FLAVORS,
    mood: COLLECTIONS_MOOD
  };
};

export const fetchSimilarRecipes = async (currentId: number | string): Promise<Recipe[]> => {
  try {
    // If the backend has an endpoint for similar recipes, use it. 
    // Otherwise, we might need to fetch all and filter, or just use mock for now.
    // Assuming no specific endpoint for similar recipes yet based on user request.
    // But let's try to fetch a few random ones or use mock.

    // For now, let's keep the mock logic but maybe fetch from API if possible?
    // The user only asked for "page should get data from backend".
    // Let's stick to mock for similar recipes to minimize risk, or fetch list and filter.

    return MOCK_RECIPES.filter(r => r.id.toString() !== currentId.toString()).slice(0, 3);
  } catch (error) {
    console.error('Error fetching similar recipes:', error);
    return [];
  }
};

// Helper for mock fallback
const fetchMockRecipes = async (
  page = 1,
  limit = 12,
  filters?: Partial<FilterState>
): Promise<{ recipes: Recipe[], total: number }> => {

  await new Promise(resolve => setTimeout(resolve, 300));

  let results = [...MOCK_RECIPES];

  if (filters) {
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      results = results.filter(r =>
        r.title.toLowerCase().includes(lowerSearch) ||
        r.description.toLowerCase().includes(lowerSearch)
      );
    }

    if (filters.flavorCategory) {
      results = results.filter(r => r.flavorCategory === filters.flavorCategory);
    }

    if (filters.strength !== null && filters.strength !== undefined) {
      results = results.filter(r => r.strength === filters.strength);
    }

    if (filters.mintCategory) {
      results = results.filter(r => r.mintCategory === filters.mintCategory);
    }

    if (filters.coolingCategory) {
      results = results.filter(r => r.coolingCategory === filters.coolingCategory);
    }
  }

  const total = results.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedRecipes = results.slice(start, end);

  return {
    recipes: paginatedRecipes,
    total: total
  };
};