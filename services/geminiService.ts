import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

// Helper to check if API key exists
export const hasApiKey = (): boolean => !!process.env.API_KEY;

export const generateAiRecipe = async (prompt: string): Promise<Recipe | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key not found");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Создай уникальный и вкусный рецепт кальяна на основе этого запроса: "${prompt}". 
      Придумай креативное название. Опиши вкус.
      Укажи ингредиенты с процентами (в сумме 100%).
      Укажи крепость от 1 до 10.
      Добавь 3-4 тега.
      Верни ответ в формате JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  brand: { type: Type.STRING, description: "Popular hookah tobacco brand available in CIS" },
                  percentage: { type: Type.NUMBER }
                }
              }
            },
            strength: { type: Type.NUMBER },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    const data = JSON.parse(text);

    // Hydrate with client-side only fields and ensure arrays are present
    const newRecipe: Recipe = {
      id: `ai-${Date.now()}`,
      title: data.title || "Без названия",
      description: data.description || "Описание отсутствует",
      imageUrl: "https://images.unsplash.com/photo-1502472584286-07a815752c8c?q=80&w=1000&auto=format&fit=crop", // Safe dark smoke fallback
      ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
      strength: data.strength || 5,
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: "Gemini AI",
      createdAt: new Date().toISOString(),
      likes: 0
    };

    return newRecipe;

  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
};