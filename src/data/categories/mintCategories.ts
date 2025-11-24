import { BaseCategory } from "@/data/categories/type";

type MintCategories = {
    's-myatoy': BaseCategory;
    'bez-myaty': BaseCategory;
};

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
