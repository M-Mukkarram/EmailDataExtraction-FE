import { ICategory } from './category.type';

export interface IProducts {
  name: string;
  sku: string;
  description: string;
  isActive: boolean;
  sortingOrder: number;
  price: number;
  discountPrice: number;
  productCategoryId: string;
}

export interface IProductsDetails {
  id: number;
  name: string;
  sku: string;
  description: string;
  isActive: boolean;
  sortingOrder: number;
  price: number;
  discountPrice: number;
  productCategory: ICategory;
}
