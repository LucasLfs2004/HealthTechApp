import { LoginData } from '@/types/loginData';
import { Api } from './api';
import { userData } from '@/types/userData';
import { categoryType } from '@/types/categoryType';
import { err } from 'react-native-svg';
import {
  newProductType,
  productsArrayType,
  productType,
} from '@/types/productType';
import axios from 'axios';

export const authLogin = async (data: LoginData) => {
  try {
    const response = await Api.post<userData>('auth/login', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await Api.get<categoryType[]>('products/categories', {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postNewProduct = async (data: newProductType) => {
  try {
    const response = await Api.post<newProductType>('products/add', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductId = async (id: string) => {
  try {
    const response = await Api.get<productType>(`products/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductId = async (id: string) => {
  try {
    const response = await Api.delete<productType>(`products/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProductId = async (data: newProductType, id: string) => {
  try {
    const response = await Api.patch<productType>(`products/${id}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductsCategory = async (slug: {
  url: string;
  slug: string;
}) => {
  try {
    const response = await Api.get(slug.url, {
      headers: { 'Content-Type': 'application/json' },
    });
    response.data.slug = slug.slug;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllProductsCategories = async (
  slugs: { url: string; slug: string }[],
) => {
  try {
    const fetchPromises = slugs.map(slug => fetchProductsCategory(slug));

    const results = await Promise.all<productsArrayType>(fetchPromises);

    return results;
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    throw error;
  }
};
