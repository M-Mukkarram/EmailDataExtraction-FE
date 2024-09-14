import useGetApi from '@/hooks/useGetApi';
import { IProductsDetails } from '@/types/product.type';
import { API_ROUTES } from '@/utils/constants/api-route.constant';

export default function useProductDetails(productId: string | null) {
  const { data: productDetails, isPending: productDetailsLoading } =
    useGetApi<IProductsDetails>({
      key: [`${API_ROUTES.products.createOrRead}${productId}`],
      url: `${API_ROUTES.products.createOrRead}${productId}`,
      enabled: Boolean(productId),
    });

  return {
    productDetails,
    productDetailsLoading,
  };
}
