
import { Recipe, Collection } from '../types';

// List 1: Standard / Popular
export const COLLECTIONS_POPULAR: Collection[] = [
  {
    id: 1,
    name: "Топ Недели",
    description: "Самые популярные миксы по мнению сообщества.",
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Для новичков",
    description: "Легкие и понятные миксы, с которых стоит начать.",
    image: "https://images.unsplash.com/photo-1616031037011-087000171abe?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Летний бриз",
    description: "Освежающие миксы с цитрусами, мятой и льдом.",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Крепкая полка",
    description: "Миксы на основе сигарного сырья для профи.",
    image: "https://images.unsplash.com/photo-1520699049698-389360156d69?q=80&w=1000&auto=format&fit=crop"
  }
];

// List 2: Compact / Flavors
export const COLLECTIONS_FLAVORS: Collection[] = [
  {
    id: 5,
    name: "Ягодные",
    description: "Сладкие и кислые",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Тропики",
    description: "Манго и ананас",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Десерты",
    description: "Выпечка и кремы",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Цитрус",
    description: "Лайм и грейпфрут",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 12,
    name: "Напитки",
    description: "Чай, кола, лимонад",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop"
  }
];

// List 3: Featured / Large / Mood
export const COLLECTIONS_MOOD: Collection[] = [
  {
    id: 9,
    name: "Вечерний Chill",
    description: "Идеально для расслабления после работы. Глубокие, спокойные вкусы, которые помогут отвлечься от суеты. Чайные ноты, травы и легкая прохлада.",
    image: "https://images.unsplash.com/photo-1518659966270-f1c5c0c98f82?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Шумная Вечеринка",
    description: "Яркие, дерзкие и крепкие миксы, которые удивят компанию. Максимум вкуса и дыма для долгой ночи.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 11,
    name: "Романтический вечер",
    description: "Нежные, сладкие и интригующие сочетания для двоих. Клубника, шампанское и лепестки роз.",
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1200&auto=format&fit=crop"
  }
];

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 101,
    title: "Цитрусовый Взрыв",
    description: "Яркий кисло-сладкий микс грейпфрута и лайма с ноткой мяты.",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1541336032412-2048956132b7?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1571575173772-bb32dd67f18b?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?q=80&w=1000&auto=format&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1000&auto=format&fit=crop",
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
