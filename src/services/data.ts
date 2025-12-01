
import { Recipe, Collection } from '../types';

// List 1: Standard / Popular
export const COLLECTIONS_POPULAR: Collection[] = [
  {
    id: 1,
    name: "Популярные рецепты",
    description: "Самые востребованные миксы — проверенная классика от тысяч любителей кальяна.",
    image: "/images/collections/hookah-smoke-top.jpg",
    url: "/recepty"
  },
  {
    id: 2,
    name: "Для новичков",
    description: "Мягкие рецепты легкой крепости — идеальный старт в мире кальяна.",
    image: "/images/collections/hookah-coals-beginners.jpg",
    url: "/recepty/legkaya-krepost"
  },
  {
    id: 3,
    name: "Ледяной цитрус",
    description: "Освежающие цитрусовые миксы с мощным холодом — спасение в жару.",
    image: "/images/collections/hookah-session-summer.jpg",
    url: "/recepty/tsitrusovye/silnyy-kholod"
  },
  {
    id: 4,
    name: "Для профи",
    description: "Крепкие насыщенные миксы высокой жаростойкости для опытных.",
    image: "/images/collections/hookah-session-summer.jpg",
    url: "/recepty/krepkaya-krepost"
  }
];

// List 2: Compact / Flavors
export const COLLECTIONS_FLAVORS: Collection[] = [
  {
    id: 5,
    name: "Ягоды",
    description: "Клубника, малина, вишня",
    image: "/images/collections/berries-mix.jpg",
    url: "/recepty/yagody"
  },
  {
    id: 6,
    name: "Экзотика",
    description: "Манго, маракуйя, личи",
    image: "/images/collections/tropical-fruits.jpg",
    url: "/recepty/ekzotika"
  },
  {
    id: 7,
    name: "Десерты",
    description: "Выпечка, крем, карамель",
    image: "/images/collections/dessert-coffee.jpg",
    url: "/recepty/deserty"
  },
  {
    id: 8,
    name: "Цитрусы",
    description: "Лайм, грейпфрут, лимон",
    image: "/images/collections/citrus-fresh.jpg",
    url: "/recepty/tsitrusovye"
  },
  {
    id: 12,
    name: "Фрукты",
    description: "Персик, дыня, яблоко",
    image: "/images/collections/drinks-beverages.jpg",
    url: "/recepty/frukty"
  },
  {
    id: 13,
    name: "Пряности",
    description: "Травы, специи, чай",
    image: "/images/collections/spiced-tea.jpg",
    url: "/recepty/pryanosti-travy"
  }
];

// List 3: Featured / Large / Mood
export const COLLECTIONS_MOOD: Collection[] = [
  {
    id: 9,
    name: "Теплый вечер",
    description: "Уютные пряные миксы без холода для расслабления. Чайные ноты, травы и специи создают атмосферу спокойствия после долгого дня.",
    image: "/images/collections/spiced-tea.jpg",
    url: "/recepty/pryanosti-travy/bez-kholoda"
  },
  {
    id: 10,
    name: "Крепкие ягоды",
    description: "Мощные миксы с насыщенными ягодными вкусами. Черника, вишня и смородина высокой крепости — для тех, кто знает толк в кальяне.",
    image: "/images/collections/berries-mix.jpg",
    url: "/recepty/krepkaya-krepost/yagody"
  },
  {
    id: 11,
    name: "Сладкая мята",
    description: "Нежные десертные миксы с мягкой мятой без ледяного эффекта. Кремовая выпечка, ваниль и карамель в гармонии со свежестью.",
    image: "/images/collections/dessert-coffee.jpg",
    url: "/recepty/deserty/bez-kholoda/s-myatoy"
  },
  {
    id: 14,
    name: "Ягоды и мята",
    description: "Классическое сочетание сочных ягод с освежающей мятой. Клубничная сладость, малиновая кислинка и мятная свежесть — вечная классика.",
    image: "/images/collections/berries-mix.jpg",
    url: "/recepty/yagody/s-myatoy"
  }
];

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 101,
    name: "tsitrusovyy-vzryv",
    title: "Цитрусовый Взрыв",
    description: "Яркий кисло-сладкий микс грейпфрута и лайма с ноткой мяты.",
    imageMain: "/images/collections/citrus-fresh.jpg",
    strength: 5,
    tags: ["tsitrusovye", "svezhiy"],

    // Categorization
    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'tsitrusovye',
    mintCategory: 's-myatoy',
    coolingCategory: 'legkiy-kholod',

    likes: 124,
    updatedAt: new Date().toISOString(),
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
    name: "yagodnyy-pirog",
    title: "Ягодный Пирог",
    description: "Нежный десертный вкус свежей выпечки с черникой и малиной.",
    imageMain: "/images/collections/berries-mix.jpg",
    strength: 4,
    tags: ["deserty", "yagody"],

    strengthCategory: 'legkaya-krepost',
    flavorCategory: 'deserty',
    mintCategory: 'bez-myaty',
    coolingCategory: 'bez-kholoda',

    likes: 89,
    updatedAt: new Date().toISOString(),
    ingredients: [
      { name: "Blueberry", percentage: 50, brand: "Daily Hookah" },
      { name: "Raspberry", percentage: 30, brand: "Daily Hookah" },
      { name: "Cookie", percentage: 20, brand: "Musthave" }
    ]
  },
  {
    id: 103,
    name: "tropicheskiy-sheyk",
    title: "Тропический Шейк",
    description: "Сладкий манго и маракуйя в сочетании с ледяной крошкой.",
    imageMain: "/images/collections/tropical-fruits.jpg",
    strength: 6,
    tags: ["ekzotika", "frukty"],

    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'ekzotika',
    mintCategory: 'bez-myaty',
    coolingCategory: 'silnyy-kholod',

    likes: 210,
    updatedAt: new Date().toISOString(),
    ingredients: [
      { name: "Mango Lassi", percentage: 60, brand: "Black Burn" },
      { name: "Passion Fruit", percentage: 30, brand: "Element" },
      { name: "Ice", percentage: 10, brand: "Supernova" }
    ]
  },
  {
    id: 104,
    name: "sibirskaya-noch",
    title: "Сибирская Ночь",
    description: "Крепкий хвойный микс с эвкалиптом и лесными ягодами.",
    imageMain: "/images/collections/romantic-evening.jpg",
    strength: 9,
    tags: ["pryanosti-travy", "krepkiy"],

    strengthCategory: 'krepkaya-krepost',
    flavorCategory: 'pryanosti-travy',
    mintCategory: 's-myatoy',
    coolingCategory: 'legkiy-kholod',

    likes: 56,
    updatedAt: new Date().toISOString(),
    ingredients: [
      { name: "Needls", percentage: 50, brand: "Darkside" },
      { name: "Wildberry", percentage: 30, brand: "Musthave" },
      { name: "Eucalyptus", percentage: 20, brand: "Nakhla" }
    ]
  },
  {
    id: 105,
    name: "utrenniy-kofe",
    title: "Утренний Кофе",
    description: "Ароматный капучино с карамельным сиропом.",
    imageMain: "/images/collections/dessert-coffee.jpg",
    strength: 5,
    tags: ["deserty", "napitki"],

    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'deserty',
    mintCategory: 'bez-myaty',
    coolingCategory: 'bez-kholoda',

    likes: 145,
    updatedAt: new Date().toISOString(),
    ingredients: [
      { name: "Coffee", percentage: 60, brand: "Satyr" },
      { name: "Caramel", percentage: 30, brand: "Darkside" },
      { name: "Milk", percentage: 10, brand: "Daily Hookah" }
    ]
  },
  {
    id: 106,
    name: "granatovyy-fresh",
    title: "Гранатовый Фреш",
    description: "Терпкий гранат с нотками киви и клубники.",
    imageMain: "/images/collections/hookah-session-summer.jpg",
    strength: 7,
    tags: ["frukty", "kislyy"],

    strengthCategory: 'krepkaya-krepost',
    flavorCategory: 'frukty',
    mintCategory: 'bez-myaty',
    coolingCategory: 'bez-kholoda',

    likes: 92,
    updatedAt: new Date().toISOString(),
    ingredients: [
      { name: "Pomegranate", percentage: 50, brand: "Chabacco" },
      { name: "Kiwi", percentage: 30, brand: "Sebero" },
      { name: "Strawberry", percentage: 20, brand: "Element" }
    ]
  },
  {
    id: 107,
    name: "ledyanaya-dynya",
    title: "Ледяная Дыня",
    description: "Сочная сладкая дыня с мощным кулером. Идеально для жары.",
    imageMain: "/images/collections/hookah-session-summer.jpg",
    strength: 4,
    tags: ["frukty", "svezhiy"],
    strengthCategory: 'legkaya-krepost',
    flavorCategory: 'frukty',
    mintCategory: 'bez-myaty',
    coolingCategory: 'silnyy-kholod',
    likes: 67,
    updatedAt: new Date().toISOString(),
    ingredients: [
      { name: "Melon", percentage: 70, brand: "Musthave" },
      { name: "Supernova", percentage: 30, brand: "Darkside" }
    ]
  },
  {
    id: 108,
    name: "vishnevyy-kokteyl",
    title: "Вишневый Коктейль",
    description: "Насыщенный вкус вишневого сока с льдом и долькой лимона.",
    imageMain: "/images/collections/cherry-cocktail.jpg",
    strength: 6,
    tags: ["yagody", "napitki"],
    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'yagody',
    mintCategory: 'bez-myaty',
    coolingCategory: 'legkiy-kholod',
    likes: 112,
    updatedAt: new Date().toISOString(),
    ingredients: [
      { name: "Cherry", percentage: 50, brand: "Element" },
      { name: "Cola", percentage: 30, brand: "Darkside" },
      { name: "Lemon", percentage: 20, brand: "Nachla" }
    ]
  },
  {
    id: 109,
    name: "pryaniy-chay",
    title: "Пряный Чай",
    description: "Уютный микс черного чая с бергамотом и пряностями.",
    imageMain: "/images/collections/spiced-tea.jpg",
    strength: 5,
    tags: ["napitki", "pryanosti-travy"],
    strengthCategory: 'srednyaya-krepost',
    flavorCategory: 'pryanosti-travy',
    mintCategory: 'bez-myaty',
    coolingCategory: 'bez-kholoda',
    likes: 85,
    updatedAt: new Date().toISOString(),
    ingredients: [
      { name: "Earl Grey", percentage: 60, brand: "Chabacco" },
      { name: "Spices", percentage: 40, brand: "Satyr" }
    ]
  }
];
