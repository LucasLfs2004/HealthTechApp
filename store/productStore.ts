// store/authStore.ts
import { categoryType } from '@/types/categoryType';
import { productsArrayType } from '@/types/productType';
import { create } from 'zustand';

type productState = {
  categories: categoryType[] | [];
  productsInCategory: productsArrayType[] | [];
  setCategories: (categories: categoryType[]) => void;
  setProducts: (products: productsArrayType[]) => void;
};

export const productStore = create<productState>(set => ({
  categories: [],
  productsInCategory: [],
  setCategories: (categories: categoryType[]) =>
    set({ categories: categories }),
  setProducts: (products: productsArrayType[]) =>
    set({ productsInCategory: products }),
}));
