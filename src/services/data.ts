
import { Recipe, Collection } from '../types';

// List 1: Standard / Popular
export const COLLECTIONS_POPULAR: Collection[] = [
  {
    id: 1,
    name: "Топ Недели",
    description: "Самые популярные миксы по мнению сообщества.",
    image: "/images/collections/hookah-smoke-top.jpg"
  },
  {
    id: 2,
    name: "Для новичков",
    description: "Легкие и понятные миксы, с которых стоит начать.",
    image: "/images/collections/hookah-coals-beginners.jpg"
  },
  {
    id: 3,
    name: "Летний бриз",
    description: "Освежающие миксы с цитрусами, мятой и льдом.",
    image: "/images/collections/hookah-session-summer.jpg"
  },
  {
    id: 4,
    name: "Крепкая полка",
    description: "Миксы на основе сигарного сырья для профи.",
    image: "/images/collections/hookah-session-summer.jpg"
  }
];

// List 2: Compact / Flavors
export const COLLECTIONS_FLAVORS: Collection[] = [
  {
    id: 5,
    name: "Ягодные",
    description: "Сладкие и кислые",
    image: "/images/collections/berries-mix.jpg"
  },
  {
    id: 6,
    name: "Тропики",
    description: "Манго и ананас",
    image: "/images/collections/tropical-fruits.jpg"
  },
  {
    id: 7,
    name: "Десерты",
    description: "Выпечка и кремы",
    image: "/images/collections/dessert-coffee.jpg"
  },
  {
    id: 8,
    name: "Цитрус",
    description: "Лайм и грейпфрут",
    image: "/images/collections/citrus-fresh.jpg"
  },
  {
    id: 12,
    name: "Напитки",
    description: "Чай, кола, лимонад",
    image: "/images/collections/drinks-beverages.jpg"
  }
];

// List 3: Featured / Large / Mood
export const COLLECTIONS_MOOD: Collection[] = [
  {
    id: 9,
    name: "Вечерний Chill",
    description: "Идеально для расслабления после работы. Глубокие, спокойные вкусы, которые помогут отвлечься от суеты. Чайные ноты, травы и легкая прохлада.",
    image: "/images/collections/hookah-session-summer.jpg"
  },
  {
    id: 10,
    name: "Шумная Вечеринка",
    description: "Яркие, дерзкие и крепкие миксы, которые удивят компанию. Максимум вкуса и дыма для долгой ночи.",
    image: "/images/collections/party-night.jpg"
  },
  {
    id: 11,
    name: "Романтический вечер",
    description: "Нежные, сладкие и интригующие сочетания для двоих. Клубника, шампанское и лепестки роз.",
    image: "/images/collections/romantic-evening.jpg"
  }
];

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 101,
    title: "Цитрусовый Взрыв",
    description: "Яркий кисло-сладкий микс грейпфрута и лайма с ноткой мяты.",
    imageUrl: "/images/collections/citrus-fresh.jpg",
    strength: 5,
    tags: ["tsitrusovye", "svezhiy"],
    
    // Categorization
    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'tsitrusovye',
    mintCategory: 's-myatoy',
    coolingCategory: 'legkiy-kholod',
    
    author: "HookahMaster",
    createdAt: new Date().toISOString(),
    likes: 124,
    ingredients: [
      { name: "Pinkman", percentage: 40, brand: "Musthave" },
      { name: "Lime", percentage: 40, brand: "Darkside" },
      { name: "Supernova", percentage: 20, brand: "Darkside" }
    ],
    steps: [
      { title: "Подготовка", text: "Нарежьте табак мелко для лучшей жаропередачи." },
      { title: "Укладка", text: "Уложите пушисто с небольшим отступом от калауда." }
    ]
  },
  {
    id: 102,
    title: "Ягодный Пирог",
    description: "Нежный десертный вкус свежей выпечки с черникой и малиной.",
    imageUrl: "/images/collections/berries-mix.jpg",
    strength: 4,
    tags: ["deserty", "yagody"],
    
    strengthCategory: 'legkaya-krepost',
    flavorCategory: 'deserty',
    mintCategory: 'bez-myaty',
    coolingCategory: 'bez-kholoda',

    author: "SweetTooth",
    createdAt: new Date().toISOString(),
    likes: 89,
    ingredients: [
      { name: "Blueberry", percentage: 50, brand: "Daily Hookah" },
      { name: "Raspberry", percentage: 30, brand: "Daily Hookah" },
      { name: "Cookie", percentage: 20, brand: "Musthave" }
    ]
  },
  {
    id: 103,
    title: "Тропический Шейк",
    description: "Сладкий манго и маракуйя в сочетании с ледяной крошкой.",
    imageUrl: "/images/collections/tropical-fruits.jpg",
    strength: 6,
    tags: ["ekzotika", "frukty"],
    
    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'ekzotika',
    mintCategory: 'bez-myaty',
    coolingCategory: 'silnyy-kholod',

    author: "SummerVibes",
    createdAt: new Date().toISOString(),
    likes: 210,
    ingredients: [
      { name: "Mango Lassi", percentage: 60, brand: "Black Burn" },
      { name: "Passion Fruit", percentage: 30, brand: "Element" },
      { name: "Ice", percentage: 10, brand: "Supernova" }
    ]
  },
  {
    id: 104,
    title: "Сибирская Ночь",
    description: "Крепкий хвойный микс с эвкалиптом и лесными ягодами.",
    imageUrl: "/images/collections/romantic-evening.jpg",
    strength: 9,
    tags: ["pryanosti-travy", "krepkiy"],
    
    strengthCategory: 'krepkaya-krepost',
    flavorCategory: 'pryanosti-travy',
    mintCategory: 's-myatoy',
    coolingCategory: 'legkiy-kholod',

    author: "HardcoreSmoker",
    createdAt: new Date().toISOString(),
    likes: 56,
    ingredients: [
      { name: "Needls", percentage: 50, brand: "Darkside" },
      { name: "Wildberry", percentage: 30, brand: "Musthave" },
      { name: "Eucalyptus", percentage: 20, brand: "Nakhla" }
    ]
  },
  {
    id: 105,
    title: "Утренний Кофе",
    description: "Ароматный капучино с карамельным сиропом.",
    imageUrl: "/images/collections/dessert-coffee.jpg",
    strength: 5,
    tags: ["deserty", "napitki"],
    
    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'deserty',
    mintCategory: 'bez-myaty',
    coolingCategory: 'bez-kholoda',

    author: "Barista",
    createdAt: new Date().toISOString(),
    likes: 145,
    ingredients: [
      { name: "Coffee", percentage: 60, brand: "Satyr" },
      { name: "Caramel", percentage: 30, brand: "Darkside" },
      { name: "Milk", percentage: 10, brand: "Daily Hookah" }
    ]
  },
  {
    id: 106,
    title: "Гранатовый Фреш",
    description: "Терпкий гранат с нотками киви и клубники.",
    imageUrl: "/images/collections/hookah-session-summer.jpg",
    strength: 7,
    tags: ["frukty", "kislyy"],
    
    strengthCategory: 'krepkaya-krepost',
    flavorCategory: 'frukty',
    mintCategory: 'bez-myaty',
    coolingCategory: 'bez-kholoda',

    author: "JuicyMaker",
    createdAt: new Date().toISOString(),
    likes: 92,
    ingredients: [
      { name: "Pomegranate", percentage: 50, brand: "Chabacco" },
      { name: "Kiwi", percentage: 30, brand: "Sebero" },
      { name: "Strawberry", percentage: 20, brand: "Element" }
    ]
  },
  {
    id: 107,
    title: "Ледяная Дыня",
    description: "Сочная сладкая дыня с мощным кулером. Идеально для жары.",
    imageUrl: "/images/collections/hookah-session-summer.jpg",
    strength: 4,
    tags: ["frukty", "svezhiy"],
    strengthCategory: 'legkaya-krepost',
    flavorCategory: 'frukty',
    mintCategory: 'bez-myaty',
    coolingCategory: 'silnyy-kholod',
    author: "IceKing",
    createdAt: new Date().toISOString(),
    likes: 67,
    ingredients: [
      { name: "Melon", percentage: 70, brand: "Musthave" },
      { name: "Supernova", percentage: 30, brand: "Darkside" }
    ]
  },
  {
    id: 108,
    title: "Вишневый Коктейль",
    description: "Насыщенный вкус вишневого сока с льдом и долькой лимона.",
    imageUrl: "/images/collections/cherry-cocktail.jpg",
    strength: 6,
    tags: ["yagody", "napitki"],
    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'yagody',
    mintCategory: 'bez-myaty',
    coolingCategory: 'legkiy-kholod',
    author: "CherryBomb",
    createdAt: new Date().toISOString(),
    likes: 112,
    ingredients: [
      { name: "Cherry", percentage: 50, brand: "Element" },
      { name: "Cola", percentage: 30, brand: "Darkside" },
      { name: "Lemon", percentage: 20, brand: "Nachla" }
    ]
  },
  {
    id: 109,
    title: "Пряный Чай",
    description: "Уютный микс черного чая с бергамотом и пряностями.",
    imageUrl: "/images/collections/spiced-tea.jpg",
    strength: 5,
    tags: ["napitki", "pryanosti-travy"],
    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'pryanosti-travy',
    mintCategory: 'bez-myaty',
    coolingCategory: 'bez-kholoda',
    author: "TeaLover",
    createdAt: new Date().toISOString(),
    likes: 85,
    ingredients: [
      { name: "Earl Grey", percentage: 60, brand: "Chabacco" },
      { name: "Spices", percentage: 40, brand: "Satyr" }
    ]
  }
];
