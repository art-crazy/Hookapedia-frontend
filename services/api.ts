
import { Recipe, Collection, FilterState } from '../types';
import { COLLECTIONS_POPULAR, COLLECTIONS_FLAVORS, COLLECTIONS_MOOD, MOCK_RECIPES } from './data';

// --- API Calls (Mock Implementation with advanced filtering) ---

export const fetchRecipes = async (
  page = 1, 
  limit = 12, 
  filters?: Partial<FilterState>
): Promise<{ recipes: Recipe[], total: number }> => {
  
  // Simulate network delay
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
    
    // Single strength filtering (Exact match)
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

export const fetchRecipeById = async (id: number | string): Promise<Recipe | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const recipe = MOCK_RECIPES.find(r => r.id.toString() === id.toString());
  return recipe || null;
};

export const fetchCollections = async (): Promise<{ popular: Collection[], flavors: Collection[], mood: Collection[] }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    popular: COLLECTIONS_POPULAR,
    flavors: COLLECTIONS_FLAVORS,
    mood: COLLECTIONS_MOOD
  };
};

export const fetchSimilarRecipes = async (currentId: number | string): Promise<Recipe[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Simple logic: return 3 random recipes excluding the current one
  // In a real app, this would filter by tags or category
  return MOCK_RECIPES.filter(r => r.id.toString() !== currentId.toString()).slice(0, 3);
};