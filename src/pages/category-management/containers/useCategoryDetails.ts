import useGetApi from '@/hooks/useGetApi';
import { ICategory } from '@/types/category.type';
import { API_ROUTES } from '@/utils/constants/api-route.constant';

export default function useCategoryDetails(categoryId?: string | null) {
  const { data: categoryDetails, isPending: categoryDetailsLoading } =
    useGetApi<ICategory>({
      key: [`${API_ROUTES.productCategory.createOrRead}${categoryId}`],
      url: `${API_ROUTES.productCategory.createOrRead}${categoryId}`,
      enabled: Boolean(categoryId),
    });

  return {
    categoryDetails,
    categoryDetailsLoading,
  };
}
