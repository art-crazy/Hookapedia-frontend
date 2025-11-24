
import { StrengthCategories, MintCategories, FlavorCategories, CoolingCategories } from '../types';

// Крепость
export const strengthCategories: StrengthCategories = {
    'legkaya-krepost': {
        id: 'legkaya-krepost',
        title: 'Лёгкая крепость'
    },
    'srednyaya-krepost': {
        id: 'srednyaya-krepost',
        title: 'Средняя крепость'
    },
    'krepkaya-krepost': {
        id: 'krepkaya-krepost',
        title: 'Крепкая крепость'
    }
};

// Наличие мяты
export const mintCategories: MintCategories = {
    's-myatoy': {
        id: 's-myatoy',
        title: 'С мятой'
    },
    'bez-myaty': {
        id: 'bez-myaty',
        title: 'Без мяты'
    }
};

// Категории вкуса
export const flavorCategoryCategories: FlavorCategories = {
    'frukty': {
        id: 'frukty',
        title: 'Фруктовый'
    },
    'yagody': {
        id: 'yagody',
        title: 'Ягодный'
    },
    'tsitrusovye': {
        id: 'tsitrusovye',
        title: 'Цитрусовый'
    },
    'deserty': {
        id: 'deserty',
        title: 'Десертный'
    },
    'pryanosti-travy': {
        id: 'pryanosti-travy',
        title: 'Пряности и травы'
    },
    'ekzotika': {
        id: 'ekzotika',
        title: 'Экзотический'
    }
};

// Наличие холодка
export const coolingCategories: CoolingCategories = {
    'bez-kholoda': {
        id: 'bez-kholoda',
        title: 'Без холодка'
    },
    'legkiy-kholod': {
        id: 'legkiy-kholod',
        title: 'Лёгкий холодок'
    },
    'silnyy-kholod': {
        id: 'silnyy-kholod',
        title: 'Сильный холодок'
    }
};

// Helpers for UI
export const getStrengthOptions = () => Object.values(strengthCategories);
export const getMintOptions = () => Object.values(mintCategories);
export const getFlavorOptions = () => Object.values(flavorCategoryCategories);
export const getCoolingOptions = () => Object.values(coolingCategories);
