import React, { useState, useEffect } from 'react';
import { Header, Footer, Breadcrumbs, MouseSpotlight } from './components/Layout';
import { RecipeCard, RecipeDetailView, CollectionList, RecipeViewAllCard, RecipeList } from './components/RecipeComponents';
import { SeoHead } from './components/SeoHead';
import { fetchRecipes, fetchRecipeById, fetchCollections, fetchSimilarRecipes } from './services/api'; 
import { getMintOptions, getFlavorOptions, getCoolingOptions } from './services/categories';
import { Recipe, NavigationState, PageRoute, FilterState, Collection } from './types';
import { Search, Loader2, ArrowRight, AlertTriangle, Filter, X } from 'lucide-react';

const App: React.FC = () => {
  const [navState, setNavState] = useState<NavigationState>({ page: PageRoute.HOME });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navState]);

  const navigate = (page: PageRoute, params?: any) => {
    setNavState({ page, params });
  };

  // --- PAGES ---

  const HomePage = () => {
    const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);
    const [collections, setCollections] = useState<{ popular: Collection[], flavors: Collection[], mood: Collection[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadData = async () => {
        setLoading(true);
        try {
          // Fetch 7 recipes to fill 2 rows (4 cols) with the "View All" card
          const { recipes } = await fetchRecipes(1, 7);
          setLatestRecipes(recipes);
          const cols = await fetchCollections();
          setCollections(cols);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }, []);

    // Website Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Hookapedia",
      "url": "https://hookapedia.ru/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://hookapedia.ru/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const handleViewAll = () => {
      navigate(PageRoute.CATALOG);
    };

    return (
      <>
        <SeoHead 
          title="Hookapedia - Энциклопедия кальянных вкусов и рецептов" 
          description="Самая полная база миксов для кальяна. Подборки по вкусам, крепости и брендам. Советы по забивке от профессионалов."
          schema={schema}
        />
        
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">Hookapedia — Главная страница кальянных миксов</h1>

        <section className="relative min-h-[500px] md:h-[550px] flex items-center justify-center overflow-hidden py-12 md:py-0">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=2000&auto=format&fit=crop" 
              alt="Hookah Smoke Background" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/20 text-sm font-semibold mb-6 animate-pulse">
              #1 База знаний о кальянах
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight drop-shadow-2xl">
              Искусство <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Вкуса</span>
            </h2>
            <p className="text-lg md:text-2xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed px-2">
              Тысячи проверенных рецептов, умный поиск по ингредиентам и профессиональные советы по забивке.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => navigate(PageRoute.CATALOG)}
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-rose-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2"
              >
                Найти рецепт <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {loading || !collections ? (
          <div className="flex justify-center items-center py-20">
             <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <>
            {/* List 1: Standard Cards - Popular */}
            <CollectionList 
              title="Популярные подборки" 
              subtitle="Выбор нашего сообщества на этой неделе"
              collections={collections.popular}
              variant="standard"
              onSelect={(c) => console.log('Selected', c.name)}
              onViewAll={handleViewAll}
            />

            {/* List 2: Compact Cards - Flavors */}
            <CollectionList 
              title="Вкусовая палитра" 
              subtitle="Найдите идеальный вкус для вашего микса"
              collections={collections.flavors}
              variant="compact"
              onSelect={(c) => console.log('Selected', c.name)}
              onViewAll={handleViewAll}
            />

            {/* List 3: Featured/Large Cards - Mood */}
            <CollectionList 
              title="Под настроение" 
              subtitle="Атмосферные коллекции для особых случаев"
              collections={collections.mood}
              variant="featured"
              onSelect={(c) => console.log('Selected', c.name)}
              onViewAll={handleViewAll}
            />

            <RecipeList 
              title="Свежие миксы"
              subtitle="Новинки, добавленные нашими мастерами"
              recipes={latestRecipes}
              onSelect={(recipe) => navigate(PageRoute.RECIPE, { recipeId: recipe.id })}
              onViewAll={() => navigate(PageRoute.CATALOG)}
            />
          </>
        )}
      </>
    );
  };

  const CatalogPage = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const [filter, setFilter] = useState<FilterState>({ 
      search: '', 
      strength: null,
      flavorCategory: null,
      mintCategory: null,
      coolingCategory: null
    });
    
    useEffect(() => {
      const loadCatalog = async () => {
        setLoading(true);
        try {
          const { recipes: apiRecipes } = await fetchRecipes(1, 100, filter);
          setRecipes(apiRecipes);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      const timeoutId = setTimeout(loadCatalog, 400); 
      return () => clearTimeout(timeoutId);
    }, [filter]); 

    const resetFilters = () => {
      setFilter({
        search: '',
        strength: null,
        flavorCategory: null,
        mintCategory: null,
        coolingCategory: null
      });
    };

    const hasActiveFilters = filter.flavorCategory || filter.mintCategory || filter.coolingCategory || filter.strength !== null;

    return (
      <div className="container mx-auto px-4 py-8">
        <SeoHead 
          title="Каталог кальянных миксов - Hookapedia" 
          description="Подбор кальянных миксов по крепости, вкусу, наличию мяты и холодка. Огромная база рецептов."
        />

        <Breadcrumbs items={[
          { label: 'Главная', action: () => navigate(PageRoute.HOME), path: '' }, 
          { label: 'Каталог', path: 'catalog' }
        ]} />
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Каталог Рецептов</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            
            <div className="bg-surface border border-white/5 rounded-2xl p-6 shadow-lg lg:shadow-none">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-lg text-white flex items-center gap-2"><Filter size={18} /> Фильтры</h3>
                 {hasActiveFilters && (
                   <button onClick={resetFilters} className="text-xs text-primary hover:underline">Сбросить</button>
                 )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-xs text-muted uppercase font-bold mb-2 block">Поиск</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-muted" size={16} />
                  <input 
                    type="text" 
                    placeholder="Название..." 
                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary"
                    value={filter.search}
                    onChange={(e) => setFilter({...filter, search: e.target.value})}
                  />
                </div>
              </div>

              {/* Strength Slider (Single) */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                   <label className="text-xs text-muted uppercase font-bold block">Крепость</label>
                   <span className="text-xs font-bold text-primary">
                     {filter.strength !== null ? `${filter.strength}/10` : 'Любая'}
                   </span>
                </div>
                <div className="space-y-4 px-1">
                  <div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      step="1"
                      value={filter.strength || 5}
                      onChange={(e) => setFilter({...filter, strength: parseInt(e.target.value)})}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted mt-2">
                      <span>Легкий (1)</span>
                      <span>Крепкий (10)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flavor */}
              <div className="mb-6">
                <label className="text-xs text-muted uppercase font-bold mb-2 block">Вкус</label>
                <div className="space-y-2">
                  {getFlavorOptions().map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer group p-1">
                      <input 
                        type="radio" 
                        name="flavor"
                        className="accent-primary w-4 h-4"
                        checked={filter.flavorCategory === cat.id}
                        onChange={() => setFilter({...filter, flavorCategory: cat.id})}
                      />
                      <span className={`text-sm ${filter.flavorCategory === cat.id ? 'text-white font-medium' : 'text-muted group-hover:text-white'}`}>{cat.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mint */}
              <div className="mb-6">
                <label className="text-xs text-muted uppercase font-bold mb-2 block">Мята</label>
                <div className="flex flex-wrap gap-2">
                  {getMintOptions().map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setFilter({...filter, mintCategory: filter.mintCategory === cat.id ? null : cat.id})}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-center flex-grow transition-colors ${
                        filter.mintCategory === cat.id ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/5 text-muted hover:bg-white/10'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

               {/* Cooling */}
               <div>
                <label className="text-xs text-muted uppercase font-bold mb-2 block">Холод</label>
                <div className="flex flex-wrap gap-2">
                  {getCoolingOptions().map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setFilter({...filter, coolingCategory: filter.coolingCategory === cat.id ? null : cat.id})}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-center flex-grow transition-colors ${
                        filter.coolingCategory === cat.id ? 'bg-blue-500/20 border-blue-500/50 text-blue-200' : 'bg-white/5 border-white/5 text-muted hover:bg-white/10'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
             {/* Mobile Filter Toggle */}
             <button 
               className="lg:hidden w-full mb-6 py-4 bg-surface border border-white/10 rounded-xl flex items-center justify-center gap-2 text-white font-bold hover:bg-white/5 transition-colors active:scale-[0.98]"
               onClick={() => setIsFilterOpen(!isFilterOpen)}
             >
               <Filter size={20} /> {isFilterOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
             </button>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} onClick={() => navigate(PageRoute.RECIPE, { recipeId: recipe.id })} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-surface rounded-2xl border border-white/5">
                <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                  <Search size={40} className="text-muted" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                <p className="text-muted">Попробуйте изменить параметры фильтров</p>
                <button onClick={resetFilters} className="mt-4 text-primary font-bold hover:underline">
                  Сбросить все фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const RecipePage = () => {
    const [recipe, setRecipe] = useState<Recipe | null>(navState.params?.recipe || null);
    const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(!navState.params?.recipe);

    useEffect(() => {
      // If we already have the recipe from navigation params, we still might need to load similar recipes
      // If we don't have it, we need to fetch it by ID.
      
      const loadData = async () => {
        setLoading(true);
        try {
          let currentRecipe = recipe;
          
          if (!currentRecipe && navState.params?.recipeId) {
             currentRecipe = await fetchRecipeById(navState.params.recipeId);
             setRecipe(currentRecipe);
          }

          if (currentRecipe) {
             const similar = await fetchSimilarRecipes(currentRecipe.id);
             setSimilarRecipes(similar);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [navState.params?.recipeId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    if (!recipe) return <div className="p-20 text-center text-white">Рецепт не найден</div>;

    // Structured Data for Recipe (Google/Yandex Snippet)
    const recipeSchema = {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": recipe.title,
      "image": [recipe.imageUrl],
      "author": {
        "@type": "Person",
        "name": recipe.author
      },
      "datePublished": recipe.createdAt,
      "description": recipe.description,
      "recipeCategory": recipe.flavorCategory ? getFlavorOptions().find(f => f.id === recipe.flavorCategory)?.title : "Mix",
      "recipeIngredient": recipe.ingredients.map(i => `${i.percentage}% ${i.name} (${i.brand})`),
      "recipeInstructions": recipe.steps?.map((step, index) => ({
        "@type": "HowToStep",
        "name": step.title,
        "text": step.text,
        "position": index + 1
      }))
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <SeoHead 
          title={`${recipe.title} - рецепт кальяна`} 
          description={`Как забить ${recipe.title}. Состав: ${recipe.ingredients.map(i => i.name).join(', ')}. Крепость: ${recipe.strength}/10.`} 
          image={recipe.imageUrl}
          type="article"
          schema={recipeSchema}
        />

        <Breadcrumbs items={[
          { label: 'Главная', action: () => navigate(PageRoute.HOME), path: '' }, 
          { label: 'Каталог', action: () => navigate(PageRoute.CATALOG), path: 'catalog' },
          { label: recipe.title }
        ]} />
        
        {/* Hidden H1 for SEO, visible title is in the DetailView component usually, but we ensure H1 structure here */}
        <h1 className="sr-only">{recipe.title} - рецепт микса для кальяна</h1>
        
        <RecipeDetailView recipe={recipe} />

        {similarRecipes.length > 0 && (
          <section className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-2xl font-bold text-white mb-6">Похожие миксы</h2>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
              {similarRecipes.map(r => (
                <RecipeCard 
                  key={r.id} 
                  recipe={r} 
                  onClick={() => navigate(PageRoute.RECIPE, { recipeId: r.id })} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text font-sans selection:bg-primary selection:text-white">
      <MouseSpotlight />
      <Header onNavigate={navigate} currentPage={navState.page} />
      
      <main className="flex-grow">
        {navState.page === PageRoute.HOME && <HomePage />}
        {navState.page === PageRoute.CATALOG && <CatalogPage />}
        {navState.page === PageRoute.RECIPE && <RecipePage />}
      </main>
      
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;