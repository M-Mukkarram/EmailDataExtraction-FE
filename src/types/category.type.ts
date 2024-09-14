export interface ICategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  sortingOrder: number;
  subCategories: string[];
}

export interface ICreateOrEditCategory {
  name: string;
  description: string;
  isActive: boolean;
  sortingOrder: number;
  subCategoriesId: string[];
  parentCategoryId: string;
}
